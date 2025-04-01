// On récupère le tableau d'Objets pays
const all_countries = Country.all_countries;;

// On initialise le tableau des pays filtrés
let filteredCountries = all_countries;

// On récup les éléments importants du DOM
const $tableBody = $("#countries-table tbody"); // Corps du tableau des pays
const $prevButton = $("#prev-button"); // Bouton pour aller à la page précédente
const $nextButton = $("#next-button"); // Bouton pour aller à la page suivante
const $detailsZone = $("#details-zone"); // Zone d'affichage des détails d'un pays
const $detailsCloseButton = $("#details-close-button"); // Bouton pour fermer la zone de détails
const $flagModal = $("#flag-modal"); // Modale pour afficher le drapeau en grand
const $flagModalImg = $("#flag-modal img"); // Image du drapeau dans la modale
const $flagModalClose = $("#flag-modal-close"); // Bouton pour fermer la modale du drapeau

let currentPage = 1; //page courante
const itemsPerPage = 25; // Nombre d'éléments par page

// Populer les filtres dynamiquement
function populateFilters() {
    const continents = new Set();
    const allLanguages = new Set();

    // Récupérer tous les continents
    all_countries.forEach(country => {
        if (country.continent) {
            //si il n'est pas déjà dans le set
            if (!continents.has(country.continent)) {
                continents.add(country.continent);
            }
        }
    });
     
    // Récupérer toutes les langues et les ajouter dans un Set pour éviter les doublons
    all_countries.forEach(country => {
        country.getLanguages().forEach(lang => allLanguages.add(lang));
    });

    // Trier les langues par ordre alphabétique
    const sortedLanguages = [...allLanguages].sort();

    // Ajouter l'option "Toutes les langues" au début
    $("#language-filter").html(`
        <option value="">Toutes les langues</option>
    ` + sortedLanguages.map(lang => `
        <option value="${lang}">${lang}</option>
    `).join(''));

    // Ajouter les continents dans le filtre
    $("#continent-filter").html(`
        <option value="">Tous les continents</option>
    ` + [...continents].map(continent => `
        <option value="${continent}">${continent}</option>
    `).join(''));
}

// Fonction pour rendre la table
function renderTable() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const countriesToDisplay = filteredCountries.slice(startIndex, endIndex);

    $tableBody.html(countriesToDisplay.map((country, index) => `
        <tr data-country-index="${startIndex + index}" data-alpha3code="${country.alpha3Code}">
            <td>${country.name}</td>
            <td>${country.capital}</td>
            <td>${country.continent}</td>
            <td>${country.population.toLocaleString()}</td>
            <td>${country.area}</td>
            <td><img src="${country.flag}" alt="Drapeau de ${country.name}" class="img-drapeau"></td>
        </tr>
    `).join(''));

    // on change la visibilité des boutons 
    $prevButton.css("display", currentPage > 1 ? "inline-block" : "none");
    $nextButton.css("display", endIndex < filteredCountries.length ? "inline-block" : "none");
}

// Filtrage des données selon les critères sélectionnés
function filterCountries() {
    const selectedContinent = $("#continent-filter").val().toLowerCase();
    const selectedLanguage = $("#language-filter").val().toLowerCase();
    const searchText = $("#country-filter").val().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    filteredCountries = all_countries.filter(country => {
        const matchesContinent = !selectedContinent || country.continent.toLowerCase() === selectedContinent;
        const matchesLanguage = !selectedLanguage || country.languages?.map(lang => lang.name.toLowerCase()).includes(selectedLanguage);
        const matchesName = !searchText || country.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchText) ||
            country.translations["fr"].toLowerCase().includes(searchText);
        return matchesContinent && matchesLanguage && matchesName;
    });

    currentPage = 1; // reset à la première page
    renderTable();
}

// Les events listeners pour les filtres
$("#continent-filter, #language-filter, #country-filter").on("input", filterCountries);

// Les events listeners pour la navigation
$prevButton.on("click", () => {
    if (currentPage > 1) {
        currentPage--;
        renderTable();
    }
});

$nextButton.on("click", () => {
    if (currentPage * itemsPerPage < filteredCountries.length) {
        currentPage++;
        renderTable();
    }
});

// Event listener pour afficher les détails d'un pays
$tableBody.on("click", "tr",  function (event) {
    const countryIndex = $(this).data("alpha3code");
    const country = Country.getCountryByAlpha3Code(countryIndex);

    // Si le clic est sur le drapeau, afficher le drapeau en grand
    if ($(event.target).hasClass("img-drapeau")) {
        $flagModalImg.attr("src", country.flag);
        $flagModalImg.attr("alt", `Drapeau de ${country.name}`);
        $flagModal.show();
        return;
    }

    // Sinon, afficher les détails du pays
    $detailsZone.html(`
        <div class="details-header">
            <button class="close-details-button">X</button>
        </div>
        <div class="details-content">
            <div class="details-info">
                <h2>${country.name}</h2>
                <p><strong>Code alpha-3:</strong> ${country.alpha3Code}</p>
                <p><strong>Capitale:</strong> ${country.capital ? country.capital : "Aucune capitale"}</p>
                <p><strong>Nom des habitants:</strong> ${country.demonym}</p>
                <p><strong>Région:</strong> ${country.continent}</p>
                <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                <p><strong>Superficie:</strong> ${country.area} km²</p>
                <p><strong>Densité de population:</strong> ${country.getPopDensity()}  hab/km²</p>
                <p><strong>Frontières:</strong> ${country.getCountryNameBorder()} </p>
                <p><strong>Langues:</strong> ${country.languages.map(language => language.name).join(", ")}</p>
                <p><strong>Devise:</strong> ${country.currencies ? country.currencies.map(currency => currency.name).join(", ") : "Aucune monnaie"}</p>
                <p><strong>Domaine de premier niveau:</strong> ${country.getTLDsNames()}</p>
            </div>
            <div class="details-flag">
                <img src="${country.flag}" alt="Drapeau de ${country.name}" class="img-drapeau-details">
            </div>
        </div>
    `);
    
    // Ajouter un event listener pour fermer avec le bouton
    $detailsZone.find(".close-details-button").on("click", () => {
        $detailsZone.hide();
    });

    $detailsZone.find(".img-drapeau-details").on("click", function () {
        $flagModalImg.attr("src", $(this).attr("src"));
        $flagModalImg.attr("alt", $(this).attr("alt"));
        $flagModal.show();
    }
    );
    
    $detailsZone.show();
});

$tableBody.on("click", ".img-drapeau-details", function () {
    $flagModalImg.attr("src", $(this).attr("src"));
    $flagModalImg.attr("alt", $(this).attr("alt"));
    $flagModal.show();
});

// Event listener pour fermer la zone de détails
$detailsCloseButton.on("click", () => {
    $detailsZone.hide();
});

// Event listener pour fermer le modal du drapeau
$flagModalClose.on("click", () => {
    $flagModal.hide();
});

$flagModal.hide();

// Initialiser les filtres et rendre la table
populateFilters();
renderTable();
