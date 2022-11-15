import { showCatalog } from "./catalog.js";

const section = document.getElementById('createView');
const form = section.querySelector('form');
form.addEventListener('submit', createMovie)
section.remove();

export function showCreate(){
    document.querySelector('main').replaceChildren(section)
}

async function createMovie(event){
    event.preventDefault();

    const formData = new FormData(form);
    const title = formData.get('title');

    try {
        const res = await fetch('http://localhost:3030/data/movies',{
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': JSON.parse(sessionStorage.getItem('userData')).accessToken,
            },
            body: JSON.stringify({title})
        });
        if (res.ok == false) {
            const err = await res.json();
            throw new Error(err.message);
        }
        /* tyk dannite koito poluchavame ne ni interesyvat, a napravo 
        redirektvame kum kataloga! i za tova ne pishem: const data = await res.json();*/ 
        showCatalog();

    } catch (error) {
        alert(error.message);
    }
}