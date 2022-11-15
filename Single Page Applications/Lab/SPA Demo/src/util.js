import { showHome } from "./home.js";

//Check if there is a loged in user
export function checkUserNav(){
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData != null) {
        document.getElementById('greeting').textContent = `Welcome, ${userData.email}`;
        document.getElementById('userNav').style.display = 'inline-block';
        document.getElementById('guestNav').style.display = 'none';
    } else {
        document.getElementById('userNav').style.display = 'none';
        document.getElementById('guestNav').style.display = 'inline-block';
    }
}

// Logout the user
export function onLogout(){
    const userData= JSON.parse(sessionStorage.getItem('userData'));
    fetch('http://loacalhost:3030/users/logout', {
        method: 'get',
        headers: {
            'X-Authorization': userData.accessToken,
        }
    });
    sessionStorage.removeItem('userData');
    checkUserNav();
    showHome();
}
