const all_countries = countries;

const tableBody = document.querySelector("#countries-table tbody");

tableBody.innerHTML = all_countries.map(country => `
    <tr>
        <td>${country.name}</td>
        <td>${country.capital}</td>
        <td>${country.continent}</td>
        <td>${country.population.toLocaleString()}</td>
        <td>${country.area}</td>
        <td><img src="${country.flag}" alt="Drapeau de ${country.name}"></td>
    </tr>
`).join('');
