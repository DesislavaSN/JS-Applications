import { logout } from "./api/users.js";
import { initialize } from "./router.js";
import { showCatalog } from "./views/catalog.js";
import { showCreate } from "./views/create.js";
import { showDetails } from "./views/details.js";
import { showHome } from "./views/home.js";
import { showLogin } from "./views/login.js";
import { showRegister } from "./views/register.js";


document.getElementById('views').remove();

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


