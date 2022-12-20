/*s tozi red kod probvahme dali login/register & logout rabotqt kato gi viknahme v 
consolata na application-a: await api.login('peter@abv.bg', '123456'); / await api.logout();*/ 
// import * as api from './api/users.js';
// window.api = api; 

import { logout } from "./api/users.js";
import { initialize } from "./router.js";
import { showCatalog } from "./views/catalog.js";
import { showCreate } from "./views/create.js";
import { showDetails } from "./views/details.js";
import { showHome } from "./views/home.js";
import { showLogin } from "./views/login.js";
import { showRegister } from "./views/register.js";


//razkachihme ot DOM div el-ta s id=views:
document.getElementById('views').remove();

/* suzdavame si object za da moge da go zakachim za navigaciqta i v nego 
sa vkarani vsichki function-s koito sa za otdelnite stranici/views na app-a */
const links = {
    'index.html': showHome,
    '/catalog': showCatalog,
    '/login': showLogin,
    '/register': showRegister,
    '/details': showDetails,
    '/create': showCreate,
    '/logout': onLogout,
}


const router = initialize(links);
router.updateNav();
// Start app in home view
router.goTo('index.html');

async function onLogout(){
    await logout();
    router.updateNav();
    router.goTo('index.html');

}


