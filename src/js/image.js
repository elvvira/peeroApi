// import { fetchData } from "./fetch.js";

// let imgFinal = "";

// const getListSelect = async () => {
//   const data = await fetchData("https://dog.ceo/api/breeds/list/all");
//   createOptions(data.message);
// };

// const createOptions = (data) => {
//   const fragment = document.createDocumentFragment();

//   Object.entries(data).forEach(([key]) => {
//     const optionElement = document.createElement("option");
//     optionElement.textContent = key;
//     fragment.append(optionElement);
//   });
//   select.append(fragment);
// };

// const generateRandomImage = async (value) => {
//   const imgUrl = await fetchData(
//     `https://dog.ceo/api/breed/${value}/images/random`
//   );
//   imgFinal = imgUrl.message;
// };
// export { generateRandomImage, getListSelect, imgFinal };
