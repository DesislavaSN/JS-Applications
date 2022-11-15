const section = document.getElementById('catalogView');
const ulList = section.querySelector('ul');
section.remove();

export async function showCatalog(){
    document.querySelector('main').replaceChildren(section);

    ulList.replaceChildren('Loading...');
    const res = await fetch('http://localhost:3030/data/movies');
    const movies = await res.json();
    // console.log(movies.map(createMovieItem));

    const fragment = document.createDocumentFragment();
    movies.map(createMovieItem).forEach(m => fragment.appendChild(m))
    ulList.replaceChildren(fragment);
}

function createMovieItem(movie){
    const li = document.createElement('li');
    li.textContent = movie.title;
    return li;
}
