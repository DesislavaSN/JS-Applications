import { html, render } from './node_modules/lit-html/lit-html.js';

const form = document.querySelector('.content');
form.addEventListener('submit', onUpdate);
const divList = document.getElementById('root');
const ul = document.createElement('ul');
divList.appendChild(ul);

const listTemplate = (data) => html`<li>${data}</li>`;

function onUpdate(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const input = formData.get('towns');
    const data = input.split(', ');
    // console.log(data);
    form.reset();
    render(data.map(listTemplate), ul);
}


