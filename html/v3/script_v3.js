const all_countries = countries;
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

function renderTable() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const countriesToDisplay = all_countries.slice(startIndex, endIndex);

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
    $nextButton.css("display", endIndex < all_countries.length ? "inline-block" : "none");
}

// Les events listeners pour les boutons de navigation
$prevButton.on("click", () => {
    if (currentPage > 1) {
        currentPage--;
        renderTable();
    }
});

$nextButton.on("click", () => {
    if (currentPage * itemsPerPage < all_countries.length) {
        currentPage++;
        renderTable();
    }
});

// Event listener pour afficher les détails d'un pays
$tableBody.on("click", "tr", function (event) {
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
        <h2>${country.name}</h2>
        <p><strong>Capitale:</strong> ${country.capital}</p>
        <p><strong>Région:</strong> ${country.region}</p>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Superficie:</strong> ${country.area} km²</p>
        <img src="${country.flag}" alt="Drapeau de ${country.name}" class="img-drapeau">
    `);
    
    // Ajouter un event listener pour fermer avec le bouton
    $detailsZone.find(".close-details-button").on("click", () => {
        $detailsZone.hide();
    });
    
    $detailsZone.show();
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

// Render du DOM
renderTable();
