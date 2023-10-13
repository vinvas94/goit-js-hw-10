import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';

import { fetchBreeds, fetchCatByBreeds } from './cat-api';
const refs = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  list: document.querySelector('.cat-info'),
};

refs.select.style = 'width: 1200px';
refs.select.addEventListener('change', onChangeOption);
refs.error.classList.add('hide');
refs.loader.classList.remove('hide');

function onChangeOption(event) {
  fetchCatByBreeds(event.target.value)
    .then(({ data }) => {
      let { name, description, temperament } = data[0].breeds[0];
      let { url } = data[0];
      refs.list.innerHTML = catMarkup({
        name,
        description,
        temperament,
        url,
      });
    })
    .catch(() =>
      Notiflix.Notify.failure('FAILED FETCH API', {
        position: 'right-top',
      })
    )
    .finally(refs.loader.classList.add('hide'));
}

function catMarkup({ name, description, temperament, url }) {
  return `
    <img src=${url} alt="${name}" style="width: 1200px" />
    <div style="width: 1200px">
    <h2>${name}</h2>
    <p>${description}</p>
    <p><span>Temperament:</span> ${temperament}</p>
    </div >`;
}

function populateBreedOptions(data) {
  return data
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}

function loadBreeds() {
  refs.loader.classList.remove('hide');
  return fetchBreeds()
    .then(({ data }) => {
      refs.loader.classList.add('hide');
      refs.select.innerHTML = populateBreedOptions(data);
      new SlimSelect({
        select: refs.select,
        settings: {},
      });
    })
    .catch(() =>
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!',
        {
          position: 'right-top',
        }
      )
    )
    .finally(refs.loader.classList.add('hide'));
}

loadBreeds();
