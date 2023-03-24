const currentDogElement = document.getElementById("current-dog");
const favouriteDogsElement = document.getElementById("favourite-dogs");
const button = document.getElementById("button");
const saveButton = document.getElementById("save");
let currentDog;

let favouriteDogs = [];

const fetchData = async url => {
  const res = await fetch(url);
  const data = await res.json();
  return data.message;
};

const paintDog = async () => {
  currentDog = await fetchData("https://dog.ceo/api/breeds/image/random");
  currentDogElement.innerHTML = "";
  const newDog = document.createElement("img");
  newDog.src = currentDog;
  currentDogElement.append(newDog);
};

const paintFavouriteDogs = () => {
  if (favouriteDogs.length > 0) {
    const fragment = document.createDocumentFragment();
    favouriteDogs.forEach(dog => {
      favouriteDogsElement.innerHTML = "";
      const newDog = document.createElement("img");
      newDog.src = dog;
      fragment.append(newDog);
    });
    favouriteDogsElement.append(fragment);
  }
};

const readLocalStorage = () => {
  const storageDogs = localStorage.getItem("favourite-dogs");
  console.log(storageDogs);
  if (storageDogs) {
    favouriteDogs = JSON.parse(storageDogs);
  } else {
    localStorage.setItem("favourite-dogs", JSON.stringify(favouriteDogs));
  }
};

const updateLocalStorage = () => {
  localStorage.setItem("favourite-dogs", JSON.stringify(favouriteDogs));
};

const saveDog = () => {
  if (!currentDog) return;
  favouriteDogs.push(currentDog);
  updateLocalStorage();
  paintFavouriteDogs();
};

readLocalStorage();
if (favouriteDogs.length > 0) paintFavouriteDogs();
paintDog();

button.addEventListener("click", paintDog);
saveButton.addEventListener("click", saveDog);