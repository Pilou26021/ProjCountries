// On récupère le tableau d'Objets pays
const all_countries = Country.all_countries;

const $tableBody = $("#countries-table tbody");

$tableBody.html(all_countries.map(country => `
    <tr>
        <td>${country.name}</td>
        <td>${country.capital}</td>
        <td>${country.continent}</td>
        <td>${country.population.toLocaleString()}</td>
        <td>${country.area}</td>
        <td><img src="${country.flag}" alt="Drapeau de ${country.name}"></td>
    </tr>
`).join(''));
