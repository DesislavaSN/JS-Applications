import { get } from "./api.js";

const section = document.getElementById('catalogView');
const ulList = section.querySelector('ul');
section.remove();

export async function showCatalog(ctx){
    ctx.render(section);

    ulList.replaceChildren('Loading...');
    
    const movies = await get('/data/movies');
    const fragment = document.createDocumentFragment();
    movies.map(createMovieItem).forEach(m => fragment.appendChild(m))
    ulList.replaceChildren(fragment);
}

function createMovieItem(movie){
    const li = document.createElement('li');
    li.textContent = movie.title;
    return li;
}