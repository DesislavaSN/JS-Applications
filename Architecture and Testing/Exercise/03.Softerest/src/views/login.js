import { login } from "../api/users.js";

const section = document.getElementById('loginPage');
const form = section.querySelector('.loginForm');
form.addEventListener('submit', onLogin);

let ctx = null;
export function showLogin(context){
    ctx = context;
    context.showSection(section);
}

async function onLogin(event){
    event.preventDefault();
    const formData = new FormData(form);
    const email = formData.get('email').trim();
    const password = formData.get('password').trim();
    await login(email,password);
    
    ctx.updateNav();
    ctx.goTo('index.html');
    form.reset();
}