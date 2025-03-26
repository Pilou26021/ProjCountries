const all_countries = countries;
const $tableBody = $("#countries-table tbody");
const $prevButton = $("#prev-button");
const $nextButton = $("#next-button");

let currentPage = 1;
const itemsPerPage = 25;

function renderTable() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const countriesToDisplay = all_countries.slice(startIndex, endIndex);

    $tableBody.html(countriesToDisplay.map(country => `
        <tr>
            <td>${country.name}</td>
            <td>${country.capital}</td>
            <td>${country.region}</td>
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
