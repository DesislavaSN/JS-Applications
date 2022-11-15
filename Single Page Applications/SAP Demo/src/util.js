import { showHome } from "./home.js";

// proverqvame dali ima lognat potrebitel i koi navigacii da sa pokazani na ekrana ako ima i nqma takuv
export function checkUserNav(){
    /* za da proraboti 'greeting' trqbva da slojim sessionStorage v JSON.parse */
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


/* ne e nyjno tazi f. da e async tui kato tq pravi authorizirana zaqvka,
ako neshto se slychi i servera se restartira to potrebitelq moje da 
ostane lognat v app-a no da e razlognat ot server-a i shte se polychi 'softlog' 
i samata fynkcialnost nqma da raboti, ta pravim Logout-a da e normalna f. koqto 
shte se izpulni nezavisimop ot sustoqniteo na servera*/
export function onLogout(){
    const userData= JSON.parse(sessionStorage.getItem('userData'));
    /* tazi zaqvka shte se izpulni i bez await, 
    s await vijdame kakuv e otgovora no v tozi slychei na nas ne ni e nyjen!*/ 
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
