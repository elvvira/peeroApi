import '../scss/styles.scss';
import { fetchData } from './fetch.js';

const select = document.getElementById('select');
const image = document.getElementById('image');
const button = document.getElementById('button');
const like = document.getElementById('like');
const gallery = document.getElementById('gallery');
const deleteButton = document.getElementById('delate-button');
let imgFinal = '';

const getListSelect = async () => {
  const data = await fetchData('https://dog.ceo/api/breeds/list/all');
  createOptions(data);
};

getListSelect();

const createOptions = data => {
  const fragment = document.createDocumentFragment();

  Object.entries(data).forEach(([key]) => {
    const optionElement = document.createElement('option');
    optionElement.textContent = key;
    fragment.append(optionElement);
  });
  select.append(fragment);
};

let favoriteImages = [];

// const saveFavorites = () => {
//   favoriteImages.push(imgFinal);
//   printFavorites();
//   // console.log(favoriteImages);
// };
const saveFavorites = () => {
  if (!imgFinal) return;
  favoriteImages.push(imgFinal);
  updateLocalStorage();
  printFavorites();
  // console.log(favoriteImages);
};
const printDog = async () => {
  imgFinal = await fetchData(
    `https://dog.ceo/api/breed/${select.value}/images/random`
  );
  image.src = imgFinal;
};

const printFavorites = () => {
  const fragment = document.createDocumentFragment();

  gallery.innerHTML = '';

  favoriteImages.forEach(image => {
    const createElement = document.createElement('div');
    createElement.classList.add('gallery__image');
    fragment.append(createElement);
    const createImageDog = document.createElement('img');
    createImageDog.classList.add('gallery__dog');
    createImageDog.src = image;
    createElement.append(createImageDog);
    const createButton = document.createElement('button');
    createButton.textContent = 'delate';
    createButton.classList.add('gallery__button');
    createButton.addEventListener('click', e => {
      deleteFavorites(image);
    });
    createElement.append(createButton);
  });
  gallery.append(fragment);
};
const deleteFavorites = image => {
  favoriteImages.splice(image, 1);
  printFavorites();
};

const readLocalStorage = () => {
  const storageDogs = localStorage.getItem('gallery');
  console.log(storageDogs);
  if (storageDogs) {
    favoriteImages = JSON.parse(storageDogs);
  } else {
    localStorage.setItem('gallery', JSON.stringify(favoriteImages));
  }
};
const updateLocalStorage = () => {
  localStorage.setItem('gallery', JSON.stringify(favoriteImages));
  deleteFavorites();
};

readLocalStorage();
if (favoriteImages.length > 0) printFavorites();
printDog();

like.addEventListener('click', e => {
  saveFavorites();
});

button.addEventListener('click', () => {
  printDog();
});
