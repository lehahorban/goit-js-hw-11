
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const axios = require('axios').default;
const form = document.querySelector("#search-form")
const input = document.querySelector("input") 
const gallery = document.querySelector(".gallery")
const btnLoadMore = document.querySelector(".load-more")
const KEY = "28091582-4f46659dd3a5179a3fd2eadd3"
let findImages = ""
let numberPage = 1
let perPage = 40
console.log(form);
console.log(input);
console.log(gallery);
console.log(btnLoadMore);

 async function fetchImages(key, find) {
   try {
    const results = await axios.get(`https://pixabay.com/api/?key=${key}&q=${find}&image_type=photo&orientation=horizontal&safesearch=true&page=${numberPage}&per_page=${perPage}`)
   const response = await results.data    
   console.log(response);
    return response
   } catch (error) {
    console.log(error);
   }
}

function incrementPage() {
  
  numberPage += 1
  return numberPage
}



form.addEventListener("submit", submitForm)
btnLoadMore.addEventListener("click", loadMore)
async function loadMore() {
  incrementPage()
 const response = await fetchImages(KEY, findImages)
    try {
      renderImages(response.hits)
      if (response.hits < perPage) {
         Notify.warning("We're sorry, but you've reached the end of search results.");
        btnLoadMore.style.visibility = "hidden";
        smoothScroll()
       }
    } catch (error) {
      console.log(error);
    }
}

async function submitForm(e) {
  e.preventDefault()
  removeMarcup()
  const findToInput = input.value
  findImages = findToInput
  // console.log(findToInput);

  const response = await fetchImages(KEY, findImages)
  try {
       renderImages(response.hits)
      console.log(response);
     
    
      if (findImages === "") {
        Notify.failure("Field cannot be empty.")
        btnLoadMore.style.visibility = "hidden"
      }
      if (response.hits.length === 0) {
       
        Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        btnLoadMore.style.visibility = "hidden"
      }
      if(findImages !== "" && response.hits.length !== 0 ) {
        Notify.success(`Hooray! We found ${response.totalHits} images.`)
        btnLoadMore.style.visibility = "visible";
      }
       
      
      if (findImages === "") {
        removeMarcup()
      }
      
    } catch (error) {
      console.log(error);
    }
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
 
    gallery.insertAdjacentHTML("beforeend", marcup)
}

function removeMarcup() {
  gallery.innerHTML = ""
}

gallery.addEventListener("click", showModal)

 

function showModal(e) { 
    e.preventDefault()
    const lightbox = new SimpleLightbox('.gallery .photo-card a', { captionsData: "alt", captionDelay: 250 }).refresh();
}



function smoothScroll() {
  const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});

}
















// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import axios from 'axios';
// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";

// const axios = require('axios').default;
// const form = document.querySelector("#search-form")
// const input = document.querySelector("input")
// const gallery = document.querySelector(".gallery")
// const btnLoadMore = document.querySelector(".load-more")
// const KEY = "28091582-4f46659dd3a5179a3fd2eadd3"
// let findImages = ""
// let numberPage = 1
// let perPage = 40
// console.log(form);
// console.log(input);
// console.log(gallery);
// console.log(btnLoadMore);

//  function fetchImages(key, find) {
//     return  fetch(`https://pixabay.com/api/?key=${key}&q=${find}&image_type=photo&orientation=horizontal&safesearch=true&page=${numberPage}&per_page=${perPage}`).then(response => {
//         return response.json()
//     })
// }

// function incrementPage() {
  
//   numberPage += 1
//   return numberPage
// }



// form.addEventListener("submit", submitForm)
// btnLoadMore.addEventListener("click", loadMore)
//  function loadMore() {
//   console.log(incrementPage());
//   fetchImages(KEY, findImages)
//     .then(response => {
      
//       renderImages(response.hits)
//       if (response.hits < perPage) {
//          Notify.warning("We're sorry, but you've reached the end of search results.");
//           btnLoadMore.style.visibility = "hidden"
//        }
//     })
// }

// function submitForm(e) {
//   e.preventDefault()
//   removeMarcup()
//   const findToInput = input.value
//   findImages = findToInput
//   console.log(findToInput);

//   fetchImages(KEY, findImages)
//     .then(response => {
//       renderImages(response.hits)
//       console.log(response);
     
    
//       if (findImages === "") {
//         Notify.failure("Field cannot be empty.")
//         btnLoadMore.style.visibility = "hidden"
//       }
//       if (response.hits.length === 0) {
       
//         Notify.failure("Sorry, there are no images matching your search query. Please try again.");
//         btnLoadMore.style.visibility = "hidden"
//       }
//       if(findImages !== "" && response.hits.length !== 0 ) {
//         Notify.success(`Hooray! We found ${response.totalHits} images.`)
//         btnLoadMore.style.visibility = "visible";
//       }
       
      
//       if (findImages === "") {
//         removeMarcup()
//       }
      
//     })
//   .catch(error => console.log(error))
// }



// function renderImages(items) {
//     const marcup = items.map(({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) =>
//        `<div class="photo-card">
//         <a href = "${largeImageURL}">
//   <img class="image" src="${webformatURL}" alt="${tags}" width = "300" height = "300" loading="lazy" />
//   </a>
//   <div class="info">
//     <p class="info-item">
//       <b>Likes ${likes}</b>
//     </p>
//     <p class="info-item">
//       <b>Views ${views}</b>
//     </p>
//     <p class="info-item">
//       <b>Comments ${comments}</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads ${downloads}</b>
//     </p>
//   </div>
// </div>`).join("")
 
//     gallery.insertAdjacentHTML("beforeend", marcup)
// }

// function removeMarcup() {
//   gallery.innerHTML = ""
// }

// gallery.addEventListener("click", showModal)

 

// function showModal(e) {
//     e.preventDefault()
//     const lightbox = new SimpleLightbox('.gallery .photo-card a', { captionsData: "alt", captionDelay: 250 }).refresh();
// }









