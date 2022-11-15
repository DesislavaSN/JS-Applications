window.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', onLogin);
    user.style.display = 'none';

});

const user = document.getElementById('user');

async function onLogin(event){
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');

    try {

        if (email == '' || password == '') {
            throw new Error('Email and Password are required!');
        }

        const response = await fetch('http://localhost:3030/users/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok == false) {
            const err = await response.json();
            alert(err.message);
            throw new Error(err.message);
        }
        const data = await response.json();

        // v 'userData' pazim vsichki danni za user-a (id,email & token!!!);
        const userData = {
            email: data.email,
            id: data._id,
            token: data.accessToken
        }
        // console.log(userData);

        sessionStorage.setItem('userData', JSON.stringify(userData));
        window.location = 'index.html';

    } catch (error) {
        alert(error.message);
    }

}