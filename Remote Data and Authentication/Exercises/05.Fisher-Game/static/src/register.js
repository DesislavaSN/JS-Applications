window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('register-form');
    form.addEventListener('submit', onRegister);
    user.style.display = 'none';

});


async function onRegister(event){
    event.preventDefault();
    console.log('registered');

    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const repass = formData.get('rePass');

    try {
        if (email == "" || password == "") {
            throw new Error('Email and Password are required!');
        }
        if (password != repass) {
            throw new Error('Passwords do not match!');
        }
        const response = await fetch('http://localhost:3030/users/register', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email, 
                password
            })
        });
        if (response.ok == false) {
            const err = await response.json();
            alert(err.message);
            throw new Error(err.message);
        }
        const data = await response.json();

        const userData = {
            email: data.email,
            id: data._id,
            token: data.accessToken,
            password: data.password
        }
        // console.log('userData: ->', userData);
        sessionStorage.setItem('userData', JSON.stringify(userData));
        // console.log('token: ', userData.token);
        window.location = 'index.html';

    } catch (error) {
        alert(error.message);
    }
}