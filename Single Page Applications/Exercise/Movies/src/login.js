import { updateNav } from "./app.js";
import { showView } from "./dom.js";
import { showHome } from "./home.js";

// initialization
// - find the relevan section
// - detach the section

const section = document.getElementById('form-login');
const form = document.querySelector('.loginForm');
form.addEventListener('submit', onLogin);
section.remove();

// display logic
export function showLogin(){
    showView(section);

}

async function onLogin(event){
    event.preventDefault();
    // console.log('submited');
    const formData = new FormData(form);
    const email = formData.get('email').trim();
    const password = formData.get('password').trim();

    try {
        if (email == '' || password == '') {
            throw new Error('All fields are required!');
        }
        const res = await fetch('http://localhost:3030/users/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        if (res.ok == false) {
            const err = await res.json();
            throw new Error(err.message);
        }
        const data = await res.json();
        const userData = {
            id: data._id,
            email: data.email,
            token: data.accessToken
        }
        sessionStorage.setItem('userData', JSON.stringify(userData));
        form.reset();
        updateNav();
        showHome();
    } catch (error) {
        alert(error.message);
    }

}