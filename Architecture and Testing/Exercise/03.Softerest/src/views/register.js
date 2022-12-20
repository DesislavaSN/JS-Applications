import { register } from "../api/users.js";

const section = document.getElementById('registerPage');
const form = section.querySelector('.registerForm');
form.addEventListener('submit', onRegister); 

let ctx = null;
export function showRegister(context){
    ctx = context;
    context.showSection(section);
}

async function onRegister(event){
    event.preventDefault();

    const formData = new FormData(form);
    const email = formData.get('email').trim();
    const password = formData.get('password').trim();
    const repass = formData.get('repeatPassword').trim();

    if (email.length < 3) {
        return alert('Password should be at least 3 characters long!');
    }
    if (password.length < 3) {
        return alert('Password must be at least 3 characters long!');
    }
    if (password !== repass) {
        return alert('Passwords do not match!');
    }

    await register(email, password);
    ctx.updateNav();
    ctx.goTo('index.html');
    form.reset();

}