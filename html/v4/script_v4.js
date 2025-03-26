const all_countries = countries;
let filteredCountries = all_countries;
const $tableBody = $("#countries-table tbody");
const $prevButton = $("#prev-button");
const $nextButton = $("#next-button");
const $detailsZone = $("#details-zone");
const $detailsCloseButton = $("#details-close-button");
const $flagModal = $("#flag-modal");
const $flagModalImg = $("#flag-modal img");
const $flagModalClose = $("#flag-modal-close");

let currentPage = 1;
const itemsPerPage = 25;

// Populer les filtres dynamiquement
function populateFilters() {
    const continents = [...new Set(all_countries.map(c => c.region))].sort();
    const allLanguages = new Set();
    
    // Récupérer toutes les langues et les ajouter dans un Set pour éviter les doublons
    Country.all_countries.forEach(country => {
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
    $("#continent-filter").append(continents.map(continent => `<option value="${continent}">${continent}</option>`));
}

// Fonction pour rendre la table
function renderTable() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const countriesToDisplay = filteredCountries.slice(startIndex, endIndex);

    $tableBody.html(countriesToDisplay.map((country, index) => `
        <tr data-country-index="${startIndex + index}">
            <td>${country.name}</td>
            <td>${country.capital}</td>
            <td>${country.region}</td>
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
        const matchesContinent = !selectedContinent || country.region.toLowerCase() === selectedContinent;
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
    const countryIndex = $(this).data("country-index");
    const country = all_countries[countryIndex];

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
                <p><strong>Capitale:</strong> ${country.capital}</p>
                <p><strong>Région:</strong> ${country.region}</p>
                <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                <p><strong>Superficie:</strong> ${country.area} km²</p>
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
