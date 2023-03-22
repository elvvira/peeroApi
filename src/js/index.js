import '../scss/styles.scss';
import { fetchData } from './fetch.js';

const select = document.getElementById('select');
const image = document.getElementById('image');
const button = document.getElementById('button');
const like = document.getElementById('like');
const gallery = document.getElementById('gallery');
let imgFinal = '';

const getListSelect = async () => {
  const data = await fetchData('https://dog.ceo/api/breeds/list/all');
  createOptions(data.message);
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

const generateRandomImage = async value => {
  const imgUrl = await fetchData(
    `https://dog.ceo/api/breed/${value}/images/random`
  );
  imgFinal = imgUrl.message;
};

const favoriteImages = [];

const saveFavorites = () => {
  favoriteImages.push(imgFinal);
  console.log(favoriteImages);
};

const printFavorites = () => {
  saveFavorites();

  const fragment = document.createDocumentFragment();

  favoriteImages.forEach(image => {
    const createElement = document.createElement('div');
    createElement.classList.add('gallery__image');
    fragment.append(createElement);
    const createImageDog = document.createElement('img');
    createImageDog.classList.add('gallery__dog');
    createImageDog.src = image;
    createElement.append(createImageDog);
    const createImage = document.createElement('img');
    createImage.classList.add('gallery__heart');
    createImage.src = 'assets/images/heart-solid.svg';
    createElement.append(createImage);
  });
  gallery.append(fragment);
};

like.addEventListener('click', e => {
  if (like.classList.contains('image__heart')) {
    like.src = '/assets/images/heart-solid.svg';
    like.classList.add('image__heartSolid');
    like.classList.remove('image__heart');
    printFavorites();
  } else {
    like.src = '/assets/images/heart-regular.svg';
    like.classList.add('image__heart');
    like.classList.remove('image__heartSolid');
  }
});

select.addEventListener('change', e => {
  generateRandomImage(e.target.value);
});

button.addEventListener('click', () => {
  generateRandomImage(select.value);
  console.log(imgFinal);
  image.src = imgFinal;
  like.src = '/assets/images/heart-regular.svg';
});
