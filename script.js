const ACCESS_KEY = "9JsuQ5MT2n63GJvGgqgI4BnkKaXfwpsgcggfWaIX82s";
const basePath = `https://api.unsplash.com/photos/random`;

const resultContainer = document.querySelector(".result-container");
const loader = document.querySelector(".loader");

let loaded;


async function getPhotos () {

    let data = await getData(basePath + `?count=15&client_id=${ACCESS_KEY}`);
    displayPhotos(data);
}

async function getData (url) {
    const response = await fetch (url);
    const result = await response.json();
    // console.log(result);
    return result;
}

function displayPhotos (arr) {
    loaded = false;
    loader.style.display = "block";

    const fragment = document.createDocumentFragment();
   
   arr.forEach((obj) => {
    const anchor = document.createElement("a");
    anchor.href = obj.links.html;
    anchor.target = "blank";
    const photoDiv = document.createElement("div");
    photoDiv.classList.add("photoDiv");
    const image = document.createElement("img");
    image.src = obj.urls.small;

    photoDiv.append(image);
    anchor.append(photoDiv);
    fragment.append(anchor);
   });

   resultContainer.append(fragment);
   loaded = true;
   loader.style.display = "none";
}

window.addEventListener("scroll", (e)=> {
    if (window.scrollY + window.innerHeight >= document.body.offsetHeight && loaded) {
        getPhotos();
    }

});

getPhotos();