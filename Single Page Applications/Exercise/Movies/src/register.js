import { updateNav } from "./app.js";
import { showView } from "./dom.js";

// initialization
// - find the relevan section
// - detach the section

const section = document.getElementById('form-sign-up');
const form = section.querySelector('.signUpForm');
form.addEventListener('submit', onRegister);
section.remove();

// display logic
export function showRegister(){
    showView(section);

}

async function onRegister(event){
    event.preventDefault();

    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');
    const repass = formData.get('repeatPassword');

    try {
        if (email == "" || password == "") {
            throw new Error('All fields are required!');
        }
        if (password.length < 5) {
            throw new Error('Password must be at least 6 characters!');
        }
        if (password != repass) {
            throw new Error('Passwords do not match!');
        }
        const res = await fetch('http://localhost:3030/users/register', {
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
        showView();
        updateNav();
    } catch (error) {
        alert(error.message)
    }

}

