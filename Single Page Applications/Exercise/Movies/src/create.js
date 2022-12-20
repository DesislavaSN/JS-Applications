import { showDetails } from "./details.js";
import { showView } from "./dom.js";
import { showHome } from "./home.js";

// initialization
// - find the relevan section
// - detach the section

const section = document.getElementById('add-movie');
const form = section.querySelector('.addMovieform');
form.addEventListener('submit', onCreate);
section.remove();

// display logic
export function showCreate(){
    showView(section);
    // showHome();
}

async function onCreate(event){
    event.preventDefault();

    const formData = new FormData(form);
    const title = formData.get('title');
    const description = formData.get('description');
    const img = formData.get('imageUrl');

    const userData = JSON.parse(sessionStorage.getItem('userData'));

    try {
        if (title == "" || description == "" || img == "") {
            throw new Error('All fields are required!');
        }
        const res = await fetch('http://localhost:3030/data/movies', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': userData.token
            },
            body: JSON.stringify({
                title, 
                description, 
                img
            })
        });

        if (res.ok == false) {
            const err = await res.json();
            throw new Error(err.message);
        }
        const movie = await res.json();
        form.reset();
        showHome();
    } catch (error) {
        alert(error.message);
    }

}