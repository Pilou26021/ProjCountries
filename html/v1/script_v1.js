const all_countries = countries;

const $tableBody = $("#countries-table tbody");

$tableBody.html(all_countries.map(country => `
    <tr>
        <td>${country.name}</td>
        <td>${country.capital}</td>
        <td>${country.region}</td>
        <td>${country.population.toLocaleString()}</td>
        <td>${country.area}</td>
        <td><img src="${country.flag}" alt="Drapeau de ${country.name}"></td>
    </tr>
`).join(''));
