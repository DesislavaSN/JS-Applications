import { post } from "./api.js";
import { createSubmitHandler } from "./util.js";

const section = document.getElementById('registerView');
const form = section.querySelector('form');
createSubmitHandler(form, onRegister)
section.remove();

let ctx = null;
export function showRegister (inCtx){
    ctx = inCtx;
    ctx.render(section);
}

export async function onRegister({ email, password, repass }){
    
    if (email == "" || password == "") {
        return alert('All fields are required!');
    }
    if (password !== repass) {
        return alert('Passwords don\'t match');
    }

    const data = await post('/users/register', { email, password });
    const userData = {
        id: data._id,
        accessToken: data.accessToken,
        email: data.email,
    }
    sessionStorage.setItem('userData', JSON.stringify(userData));
    ctx.checkUserNav();
    ctx.goTo('homeBtn');

}

