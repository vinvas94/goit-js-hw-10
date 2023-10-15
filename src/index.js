import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreeds } from './cat-api';

const refs = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  list: document.querySelector('.cat-info'),
};

function populateBreedOptions(data) {
  return data
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}

function loadBreeds() {
  refs.loader.classList.remove('hide');
  fetchBreeds()
    .then(({ data }) => {
      refs.select.innerHTML = populateBreedOptions(data);
      new SlimSelect({
        select: refs.select,
      });
    })
    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!',
        {
          position: 'right-top',
        }
      );
    })
    .finally(() => {
      refs.loader.classList.add('hide');
      refs.select.classList.remove('hide');
    });
}

refs.select.addEventListener('change', onChangeOption);
loadBreeds();

function onChangeOption(event) {
  refs.loader.classList.remove('hide');
  fetchCatByBreeds(event.target.value)
    .then(({ data }) => {
      refs.list.innerHTML = '';
      refs.loader.classList.remove('hide');
      let { name, description, temperament } = data[0].breeds[0];
      let { url } = data[0];
      refs.list.innerHTML = catMarkup({
        name,
        description,
        temperament,
        url,
      });
    })
    .catch(error => {
      refs.list.innerHTML = '';
      Notiflix.Notify.failure('FAILED FETCH API', {
        position: 'right-top',
      });
    })
    .finally(() => {
      refs.loader.classList.add('hide');
    });
}

function catMarkup({ name, description, temperament, url }) {
  return `
    <img src="${url}" alt="${name}" style="width: 1240px" />
    <div style="width: 1240px">
    <h2>${name}</h2>
    <p>${description}</p>
    <p><span>Temperament:</span> ${temperament}</p>
    </div >`;
}
