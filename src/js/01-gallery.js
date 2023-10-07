// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
console.log(galleryItems);
console.log('hello');

const listEl = document.querySelector('.gallery');
listEl.insertAdjacentHTML('beforeend', createMarkup(galleryItems));

function createMarkup(element) {
  return element
    .map(
      ({ preview, original, description }) => `

  <li class="gallery__item">
   <a class="gallery-link" href="${original}">
 <img
      class="gallery__image"
      src="${preview}"
      alt="${description}"
    /></a>
 </li>`
    )
    .join('');
}

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
