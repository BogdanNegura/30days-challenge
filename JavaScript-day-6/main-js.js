const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
const cities = [];

fetch(endpoint)
  .then(blob => blob.json())
  .then(data => cities.push(...data));

const findMatchs = (wardToMatch, cities) => {
  return cities.filter(place => {
    // Here needs to figure out if the city or state matche what was searched

    const regex = new RegExp(wardToMatch, "gi");
    return place.city.match(regex) || place.state.match(regex);
  });
};

function displayMatches() {
  const matchArray = findMatchs(this.value, cities);
  const html = matchArray.map(place => {
    const regex = new RegExp(this.value, "gi");
    const cityName = place.city.replace(
      regex,
      `<span className="hl">${this.value}</span>`
    );
    return `
        <li>
            <span className="name">${cityName}, ${place.state}</span>
            <span className="population">${place.population}</span>
        </li>
      `;
  });
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);
