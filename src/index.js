import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const axios = require('axios').default;
const form = document.querySelector("#search-form")
const input = document.querySelector("input") 
const gallery = document.querySelector(".gallery")
const btnLoadMore = document.querySelector(".load-more")
const KEY = "28091582-4f46659dd3a5179a3fd2eadd3"
console.log(form);
console.log(input);
console.log(gallery);
console.log(btnLoadMore);

async function fetchImages(key, find) {
    return fetch(`https://pixabay.com/api/?key=${key}&q=${find}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`).then(response => {
        return response.json()
    })
}



form.addEventListener("submit", submitForm)

function submitForm(e) {
  e.preventDefault()
  const findToInput = input.value
  console.log(findToInput);

  fetchImages(KEY, findToInput)
    .then(response => {
      renderImages(response.hits)
      if (Number(response.status) === 404) {
                    Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      }
      if (findToInput === "") {
        removeMarcup()
      }
    })
  .catch(error => console.log(error))
}



function renderImages(items) {
    const marcup = items.map(({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => 
       `<div class="photo-card">
        <a href = "${largeImageURL}">
  <img class="image" src="${webformatURL}" alt="${tags}" width = "300" height = "300" loading="lazy" />
  </a>
  <div class="info">
    <p class="info-item">
      <b>Likes ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${downloads}</b>
    </p>
  </div>
</div>`).join("")    
 
    gallery.insertAdjacentHTML("afterbegin", marcup)
}

function removeMarcup() {
  gallery.innerHTML = ""
}

gallery.addEventListener("click", showModal)

 

function showModal(e) { 
    e.preventDefault()
    const lightbox = new SimpleLightbox('.gallery .photo-card a', { captionsData: "alt", captionDelay: 250 });
}