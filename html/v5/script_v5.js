// On récupère le tableau d'Objets pays
const all_countries = Country.all_countries;;

// On initialise le tableau des pays filtrés
let filteredCountries = all_countries;

// On récup les éléments importants du DOM
const $tableBody = $("#countries-table tbody"); // Corps du tableau des pays
const $prevButton = $(".prev-button"); // Bouton pour aller à la page précédente
const $nextButton = $(".next-button"); // Bouton pour aller à la page suivante
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
            <td>${country.capital ? country.capital : "Aucune capitale"}</td>
            <td>${country.continent}</td>
            <td>${country.population.toLocaleString()} hab</td>
            <td>${country.area > 0 ? `${country.area} km²` : "Inconnue"}</td>
            <td><img src="${country.flag}" alt="Drapeau de ${country.name}" class="img-drapeau"></td>
        </tr>
    `).join(''));

    // on change la visibilité des boutons 
    $prevButton.css({
        "visibility": currentPage > 1 ? "visible" : "hidden",
        "display": "inline-block"
    });
    $nextButton.css({
        "visibility": endIndex < filteredCountries.length ? "visible" : "hidden",
        "display": "inline-block"
    });
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
                <p><strong>Population:</strong> ${country.population.toLocaleString()} hab</p>
                <p><strong>Superficie:</strong> ${country.area > 0 ? `${country.area} km²` : "Inconnue"}</p>
                <p><strong>Densité de population:</strong> ${country.area > 0 ? `${country.getPopDensity().toFixed(2)} hab/km²` : "Inconnue"}</p>
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

function updateCurrentPageDisplay() {
    $(".current-page").text(`Page ${currentPage}`);
}

renderTable = (function(originalRenderTable) {
    return function() {
        originalRenderTable.apply(this, arguments);
        updateCurrentPageDisplay();
    };
})(renderTable);

// Initialiser l'affichage de la page actuelle
updateCurrentPageDisplay();

// Initialiser les filtres et rendre la table
populateFilters();
renderTable();


// Ajouter un tri sur les colonnes du tableau
document.addEventListener("DOMContentLoaded", () => {
    const table = document.querySelector("table");
    let sortColumn = null;
    let sortOrder = 1;

    table.querySelectorAll("th").forEach(th => {
        th.addEventListener("click", () => {
            if (th.dataset.column) {
                const column = th.dataset.column;
                sortOrder = (sortColumn === column) ? -sortOrder : 1;
                sortColumn = column;

                table.querySelectorAll("th").forEach(header => {
                    header.classList.remove("sorted");
                    header.querySelector(".sort-indicator")?.remove();
                });

                th.classList.add("sorted");
                const sortIndicator = document.createElement("span");
                sortIndicator.classList.add("sort-indicator");
                sortIndicator.textContent = sortOrder === 1 ? "↗" : "↘";
                th.appendChild(sortIndicator);

                // Trier le tableau filteredCountries
                filteredCountries.sort((a, b) => {
                    let valueA = a[column];
                    let valueB = b[column];

                    // Gérer le tri pour la colonne "capital"
                    if (column === "capital") {
                        valueA = valueA || ""; // Remplacer les valeurs nulles ou undefined par une chaîne vide
                        valueB = valueB || "";
                    }

                    if (typeof valueA === "number" && typeof valueB === "number") {
                        return (valueA - valueB) * sortOrder;
                    }
                    return valueA.toString().localeCompare(valueB.toString()) * sortOrder;
                });

                // Revenir à la première page et re-render le tableau
                currentPage = 1;
                renderTable();
            }
        });
    });
});
