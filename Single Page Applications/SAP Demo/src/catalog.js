/*vzemame referencia kum elementa s infoto i posle go premahame za da ne se vijda */
const section = document.getElementById('catalogView');
/* vzemame refernciq na 'ul' ot section-a koito sme incializirali i toi e zakachen na tozi section */
const ulList = section.querySelector('ul');
section.remove();

export async function showCatalog(){
    /* i samo kogato cuknem na 'showCatalog' elementite ot DOM shte se replacevat i zakachat na 'main' el-ta: */
    document.querySelector('main').replaceChildren(section);

    ulList.replaceChildren('Loading...');
    const res = await fetch('http://localhost:3030/data/movies');
    const movies = await res.json();
    // console.log(movies.map(createMovieItem));

    /* kogato podadem na MAP operaciqta function, po referenciq to avtomatichno 
    shte si vzeme vseki edin element ot masiva, koito sme go spread-nali, 
    i avtomatichno shte go dade kato parametar na function-a*/
    // ulList.replaceChildren(...movies.map(createMovieItem));

    /* (tezi redove pravqt edno i sushto kakto gornia red) 
    tyk polzvame fragment i zakachame na nego novite elementi i sled tova tozi fragment go zakachame za 'ul'-a */ 
    const fragment = document.createDocumentFragment();
    movies.map(createMovieItem).forEach(m => fragment.appendChild(m))
    ulList.replaceChildren(fragment);
}

function createMovieItem(movie){
    const li = document.createElement('li');
    li.textContent = movie.title;
    return li;
}