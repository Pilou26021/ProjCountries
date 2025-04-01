// On récupère le tableau d'Objets pays
const all_countries = Country.all_countries;

// On récup les éléments importants du DOM
const $tableBody = $("#countries-table tbody"); // Corps du tableau des pays
const $prevButton = $("#prev-button"); // Bouton pour aller à la page précédente
const $nextButton = $("#next-button"); // Bouton pour aller à la page suivante

let currentPage = 1; //page courante
const itemsPerPage = 25; // Nombre d'éléments par page

function renderTable() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const countriesToDisplay = all_countries.slice(startIndex, endIndex);

    $tableBody.html(countriesToDisplay.map(country => `
        <tr>
            <td>${country.name}</td>
            <td>${country.capital}</td>
            <td>${country.continent}</td>
            <td>${country.population.toLocaleString()}</td>
            <td>${country.area}</td>
            <td><img src="${country.flag}" alt="Drapeau de ${country.name}"></td>
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

//render du dom
renderTable();
