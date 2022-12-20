import { get, post } from './api.js';

const endpoint = {
    'login': '/users/login',
    'register': '/users/register',
    'logout': '/users/logout',
}
export async function login(email, password){
    const user = await post(endpoint.login, {email, password});
    
    localStorage.setItem('user', JSON.stringify(user));
}

export async function register(email, password){
    const user = await post(endpoint.register, {email, password} )
    
    localStorage.setItem('user', JSON.stringify(user));
}

export async function logout(){
    get(endpoint.logout);
    localStorage.removeItem('user');
}
