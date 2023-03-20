import '../scss/styles.scss';
import { fetchData } from './fetch.js';

const select = document.getElementById('select');

const getListSelect = async () => {
  const data = await fetchData('https://dog.ceo/api/breeds/list/all');
  //   console.log(Object.values(data));
  createOptions(Object.values(data.message));
};
getListSelect();

const createOptions = async data => {
  const fragment = document.createDocumentFragment();
  const array = await data;
  array.forEach(dog => {
    console.dir(dog);
    const optionElement = document.createElement('option');
    optionElement.textContent = dog;
    fragment.append(optionElement);
  });
  //   optionElement.textContent = data;

  select.append(fragment);
};
