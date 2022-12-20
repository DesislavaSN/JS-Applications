// api module
// - load books
// - edit books
// - delete books
// - create books

import { html, render } from '../node_modules/lit-html/lit-html.js';
import { until } from '../node_modules/lit-html/directives/until.js';

export {
    html, 
    render,
    until,
};

const host = 'http://localhost:3030/jsonstore/collections';

async function request(url, method = 'get', data){
    const options = {
        method,
        headers: {},
    }

    if (data !== undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }
    try {
        const response = await fetch(host + url, options);
        if (response.ok == false) {
            const err = await response.json();
            alert(err.message);
            throw new Error(err.message);
        }

        // tova vrushta Promise i drygite koito vikat f. request shte go AWAIT-nat !!!
        return response.json();
    } catch (error) {
        alert(error.message);
        throw new Error(error.message);
    }
    
}

/*suzdavame si f. za vsqka zaqvka i gi export-irame za da gi polzvame 
v module-ite kato tam gi awaitvame za da polychim data-ta ot servera*/ 
export async function getBooks(){
    return request('/books');
};

export async function getBookById(id){
    return request('/books/' + id);
};

export async function createBook(book){
    return request('/books', 'post', book);
};

export async function updateBook( id, book){
    return request('/books/' + id, 'put', book);
};

export async function deleteBook(id){
    return request('/books/' + id, 'delete');
};