import { showHome } from "./home.js";
import { checkUserNav } from "./util.js";

const section = document.getElementById('registerView');
const form = section.querySelector('form');
form.addEventListener('submit', onRegister);
section.remove();

export function showRegister (){
    document.querySelector('main').replaceChildren(section);
}

export async function onRegister(event){
    event.preventDefault();

    const formData = new FormData(form);
    const email = formData.get('email').trim();
    const password = formData.get('password').trim();
    const repass = formData.get('repass').trim();


    try {
        if (email == "" || password == "") {
            throw new Error('All fields are required!');
        }
        if (password != repass) {
            throw new Error('Passwords don\'t match');
        }

        const res = await fetch('http://localhost:3030/users/register', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password})
        });
        if (res.ok == false) {
            const err = await res.json();
            throw new Error(err.message);
        }
        const data = await res.json();
        const userData = {
            id: data._id,
            accessToken: data.accessToken,
            email: data.email
        }
        sessionStorage.setItem('userData', JSON.stringify(userData));
        checkUserNav();
        showHome()
    } catch (error) {
        alert(error.message);
    }

}