import "../scss/styles.scss";
import { fetchData } from "./fetch.js";

const select = document.getElementById("select");
const image = document.getElementById("image");
const button = document.getElementById("button");
const like = document.getElementById("like");
let imgFinal = "";

const getListSelect = async () => {
  const data = await fetchData("https://dog.ceo/api/breeds/list/all");
  createOptions(data.message);
};

getListSelect();

const createOptions = (data) => {
  const fragment = document.createDocumentFragment();

  Object.entries(data).forEach(([key]) => {
    const optionElement = document.createElement("option");
    optionElement.textContent = key;
    fragment.append(optionElement);
  });
  select.append(fragment);
};

const generateRandomImage = async (value) => {
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

like.addEventListener("click", (e) => {
  if (like.classList.contains("image__heart")) {
    like.src = "/assets/images/heart-solid.svg";
    like.classList.add("image__heartSolid");
    like.classList.remove("image__heart");
    saveFavorites();
  } else {
    like.src = "/assets/images/heart-regular.svg";
    like.classList.add("image__heart");
    like.classList.remove("image__heartSolid");
  }
});

select.addEventListener("change", (e) => {
  generateRandomImage(e.target.value);
});

button.addEventListener("click", () => {
  generateRandomImage(select.value);
  image.src = imgFinal;
  like.src = "/assets/images/heart-regular.svg";
});
