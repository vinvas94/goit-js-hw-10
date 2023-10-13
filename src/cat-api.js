import axios from 'axios';

const BASE_URL = 'https://api.thecatapi.com/v1';
axios.defaults.headers.common['x-api-key'] =
  'live_lYmOKTQRHsB8sJe9ygzuQe7FXcc2ZvtWiVnNozCi85ub5YUZiLk8YnrbwAneZI04';

export function fetchBreeds() {
  return axios.get(`${BASE_URL}/breeds`);
}

export function fetchCatByBreeds(breedId) {
  return axios.get(`${BASE_URL}/images/search?breed_ids=${breedId}`);
}
