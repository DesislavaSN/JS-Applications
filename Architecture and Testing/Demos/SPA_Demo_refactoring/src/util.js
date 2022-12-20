import { get } from "./api.js";

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


export function onLogout(ctx){
    get('/users/logout');
    sessionStorage.removeItem('userData');
    ctx.checkUserNav();
    ctx.goTo('homeBtn');
}

export function createSubmitHandler(form, callback){
    form.addEventListener('submit', onSubmit);

    function onSubmit(event){
        event.preventDefault();
        const formData = new FormData(form);

        /* formData ima 'entries' koeto vrushta iterator na entritata, pravim go na masiv, 
        i kato dobavim Object.fromEntries -> vrushta object - imeto na polete e 'key': stoinostta na poleto e 'value'.
        v callback shte se polychat parsnatite danni ot formata */  
        callback(Object.fromEntries([...formData.entries()]));

    }
}
