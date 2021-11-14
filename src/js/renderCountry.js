import API from './fetchCountries';
import getRefs from './refs';
import countryMarkup from '../templates/country_success.hbs';
import listMarkup from '../templates/country_list.hbs';
import debounce from 'lodash.debounce';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';

const refs = getRefs();

refs.searchForm.addEventListener('input', debounce(onSearch, 400));

function onSearch(e) {
  e.preventDefault();
  const searchQuery = refs.searchForm.value;
  clearContainer();
  API.fetchCountries(searchQuery).then(renderCountry).catch(onFetchError);
}

function renderCountry(country) {
  let countryList = country.length;

  if (countryList === 1) {
    refs.cardContainer.innerHTML = countryMarkup(country);
  } else if (countryList <= 10) {
    refs.cardContainer.innerHTML = listMarkup(country);
  } else if (countryList > 10) {
    console.log('Need More Letters');
    error({
      title: false,
      text: 'Give me more letters',
      shadow: true,
      icon: false,
      width: '250px',
      sticker: false,
      delay: 2500,
    });
  } else if (countryList == null) {
    console.log('Incorrect name');
    error({
      title: false,
      text: 'Give me another letters',
      shadow: true,
      icon: false,
      width: '250px',
      sticker: false,
      delay: 2500,
    });
  }
}

function onFetchError(error) {
  alert('Oops, Problem');
}

function clearContainer() {
  refs.cardContainer.innerHTML = '';
}
