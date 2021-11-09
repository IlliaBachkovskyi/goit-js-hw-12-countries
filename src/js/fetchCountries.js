export default { fetchCountries };
const DATA_URL = 'https://restcountries.com/v2';

function fetchCountries(searchQuery) {
  const url = `${DATA_URL}/name/${searchQuery}`;
  return fetch(url).then(response => response.json());
}