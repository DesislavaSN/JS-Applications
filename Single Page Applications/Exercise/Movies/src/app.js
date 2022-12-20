import { showHome } from "./home.js";
import { showLogin } from "./login.js";
import { showRegister } from "./register.js";
import { showDetails } from "./details.js";

//  http://localhost:3030
// create placeholder modules for every view
// configure and test navigation 
// implement modules
// - create async functions for requests
// - implement DOM logic

// Order of views:
// x - catalog (home view)
// x - login
// x - register 
// x - create 
// x - details
// x - likes 
// - edit (load data, populate form with existing data, validation, request for update)
// x - delete

// opredelqme na koi anchor tag v Nav bara e click-nato:
const sections = {
    'homeLink': showHome,
    'loginLink': showLogin,
    'registerLink': showRegister,
}

document.getElementById('logoutBtn').addEventListener('click', onLogout);
const nav = document.querySelector('nav');
nav.addEventListener('click', (event) => {
    if(event.target.tagName == 'A'){
        const view = sections[event.target.id];
        if (typeof view == 'function') {
            event.preventDefault();
            view();
        }
    }
});


updateNav();
// Start application in 'homeView'
showHome();

// update Nav bar view - guest or user + welcome greet
export function updateNav(){
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData != null) {
        nav.querySelector('#welcomeMsg').textContent = `Welcome, ${userData.email}`;
        [...nav.querySelectorAll('.user')].forEach(e => e.style.display = 'block');
        [...nav.querySelectorAll('.guest')].forEach(e => e.style.display = 'none');
    } else {
        [...nav.querySelectorAll('.user')].forEach(e => e.style.display = 'none');
        [...nav.querySelectorAll('.guest')].forEach(e => e.style.display = 'block');
    }
}

// Logout 
async function onLogout(event){
    event.preventDefault();
    event.stopImmediatePropagation();
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    await fetch('http://localhost:3030/users/logout', {
        method: 'get',
        headers: {
            'X-Authorization': userData.token,
        }
    });
    sessionStorage.removeItem('userData');
    updateNav();
    showLogin();

}
