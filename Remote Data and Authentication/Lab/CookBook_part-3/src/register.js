document.querySelector('form').addEventListener('submit', onRegister);

async function onRegister(event){
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const repass = formData.get('rePass');

    try {
        if (email == '' || password == '') {
            throw new Error('Email and Password are required!');
        }

        if (password != repass) {
            throw new Error('Passwords do not match!');
        }

        const response = await fetch('http://localhost:3030/users/register', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }

        const responseData = await response.json();
        console.log(responseData);
        sessionStorage.setItem('accessToken', responseData.accessToken);
        window.location = 'index.html';
    } catch (error) {
        alert(error.message);
    }
}

