/* zakachame EventListener na samiq button v template */

import { html, render } from './node_modules/lit-html/lit-html.js';
import {styleMap} from './node_modules/lit-html/directives/style-map.js';
import { contacts } from "./contacts.js";

const divContent = document.querySelector('#contacts');

const cardTemplate = (card, onDetails) => { 
    // console.log(card.id);
    return html`
    <div class="contact card">
    <div>
        <i class="far fa-user-circle gravatar"></i>
    </div>
    <div class="info">
        <h2>Name: ${card.name}</h2>
        <button @click=${() => onDetails(card)} class="detailsBtn">${card.details ? 'Hide' : 'Details'}</button>
        <div class="details" id=${card.id} style=${styleMap({
            display: card.details ? 'block' : 'none'})}>
            <p>Phone number: ${card.phoneNumber}</p>
            <p>Email: ${card.email}</p>
        </div>
    </div>
    </div>`
};


start();
function start(){
    onRender();

    function onDetails(contact){
        // contact.details = true;
        // console.log(contact);
        // !(contact.details); - ako stoinosta e true - napraviq da e false i obratnoto
        contact.details = !(contact.details);
        onRender();
    }

    function onRender(){
        render(contacts.map(c => cardTemplate(c, onDetails)), divContent);
    }
}

