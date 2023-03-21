import '../scss/styles.scss';
import { fetchData } from './fetch.js';

const select = document.getElementById('select');
const image = document.getElementById('image');
const button = document.getElementById('button');
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
select.addEventListener('change', e => {
  generateRandomImage(e.target.value);
});

button.addEventListener('click', () => {
  generateRandomImage(select.value);
  image.src = imgFinal;
});
