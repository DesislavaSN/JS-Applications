import { showHome } from "./home.js";
import { checkUserNav } from "./util.js";

const section = document.getElementById('loginView');
const form = section.querySelector('form');
form.addEventListener('submit', onLogin);
section.remove();

export function showLogin(){
    document.querySelector('main').replaceChildren(section);
}

async function onLogin(event){
    event.preventDefault();

    const formDara = new FormData(form);
    const email = formDara.get('email').trim();
    const password = formDara.get('password').trim();

    try {
        if (email == "" || password == "") {
            throw new Error('Email & Password are required!');
        }
        const res = await fetch('http://localhost:3030/users/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });
        if (res.ok == false) {
            const err = await res.json();
            throw new Error(err.message)
        }
        const data = await res.json();
        const userData = {
            id: data._id,
            accessToken: data.accessToken,
            email: data.email,
        };
        sessionStorage.setItem('userData', JSON.stringify(userData));
        // console.log('token: ', userData.accessToken );
        /* redirectva kum stranicata koqto iskame, vikame si opredeleneta function-a i 
        q importvame v tova view, sushto taka raboti i za proverka na user-a*/ 
        checkUserNav();
        showHome();
    } catch (error) {
        alert(error.message);
    }

}