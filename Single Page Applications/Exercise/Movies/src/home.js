import { e, showView } from "./dom.js";
import { showCreate } from "./create.js";
import { showDetails } from "./details.js";

// initialization
// - find the relevan section
// - detach the section

const section = document.getElementById("home-page");
const catalog = section.querySelector(".card-deck.d-flex.justify-content-center");

section.querySelector("#createLink").addEventListener("click", (event) => {
  event.preventDefault();
  showCreate();
});

/* vzemame konkretniq button na koito e clicknal potrebitelq i na nego sme slojili 
attr: data-id i taka se izbira koi film da se pokaje sled click-ane na 'Details' btn*/
catalog.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.tagName == "BUTTON") {
    const id = event.target.dataset.id;
    showDetails(id);
  }
});

section.remove();

// display logic
export function showHome() {
  showView(section);
  getMovies();
}


// promenliva za Cash-irane na data ot servera
let moviesCash = null;
let lastLoaded = null;
const maxAge = 5000;

// load all movies from server
export async function getMovies() {
  try {
    catalog.replaceChildren(e("p", {}, "Loading..."));
    const now = Date.now();
    // cash-irame filmite sled 1voto im zarejdane za da ne se zarejdat vseki put ot servera
    if (moviesCash == null || (now - lastLoaded) > maxAge) {
      lastLoaded = now;

      const res = await fetch("http://localhost:3030/data/movies");
      if (res.ok == false) {
        const err = await res.json();
        throw new Error(err.message);
      }
      const data = await res.json();
      moviesCash = data;
    }

    catalog.replaceChildren(...moviesCash.map(createMovieCard));
  } catch (error) {
    alert(error.message);
  }
}
// window.getMovies = getMovies;

// create movie card
function createMovieCard(movie) {
  const element = e("div", { className: "card mb-4" });
  element.innerHTML = `
    <img class="card-img-top" src="${movie.img}"
        alt="Card image cap" width="400">
    <div class="card-body">
        <h4 class="card-title">${movie.title}</h4>
    </div>
    <div class="card-footer">
        <a href="#">
            <button data-id=${movie._id} type="button" class="btn btn-info">Details</button>
        </a>
    </div>`;
  return element;
}
