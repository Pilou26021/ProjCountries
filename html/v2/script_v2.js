const all_countries = countries;
const tableBody = document.querySelector("#countries-table tbody");
const prevButton = document.querySelector("#prev-button");
const nextButton = document.querySelector("#next-button");

let currentPage = 1;
const itemsPerPage = 25;

function renderTable() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const countriesToDisplay = all_countries.slice(startIndex, endIndex);

    tableBody.innerHTML = countriesToDisplay.map(country => `
        <tr>
            <td>${country.name}</td>
            <td>${country.capital}</td>
            <td>${country.region}</td>
            <td>${country.population.toLocaleString()}</td>
            <td>${country.area}</td>
            <td><img src="${country.flag}" alt="Drapeau de ${country.name}"></td>
        </tr>
    `).join('');

    // on change la visibilité des boutons 
    prevButton.style.display = currentPage > 1 ? "inline-block" : "none";
    nextButton.style.display = endIndex < all_countries.length ? "inline-block" : "none";
}

// Les events listeners pour les boutons de navigation
prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        renderTable();
    }
});

nextButton.addEventListener("click", () => {
    if (currentPage * itemsPerPage < all_countries.length) {
        currentPage++;
        renderTable();
    }
});

//render du dom
renderTable();
