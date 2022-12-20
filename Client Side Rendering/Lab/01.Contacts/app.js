/*Zakachame Event listener s DELEGIRANE - zakachame eventListener na container-a 
i ot tam targetirame samiq button: ima razlika i v samiq template */ 

import { html, render } from './node_modules/lit-html/lit-html.js';
import { contacts } from "./contacts.js";

const divContact = document.querySelector('#contacts');

const cardTemplate = (card) => { 
    // console.log(card.id);
    return html`
    <div class="contact card">
    <div>
        <i class="far fa-user-circle gravatar"></i>
    </div>
    <div class="info">
        <h2>Name: ${card.name}</h2>
        <button class="detailsBtn">Details</button>
        <div class="details" id=${card.id}>
            <p>Phone number: ${card.phoneNumber}</p>
            <p>Email: ${card.email}</p>
        </div>
    </div>
    </div>`
};


start();
function start(){
    onRender();

    divContact.addEventListener('click', onClick);

    function onClick(event){
        if (event.target.tagName == 'BUTTON') {
            const divDetails = event.target.parentElement.querySelector('.details');
            if (divDetails.style.display == 'block') {
                divDetails.style.display = 'none';
            } else {
                divDetails.style.display = 'block';
            }
        }
    }

    function onRender(){
        render(contacts.map(cardTemplate), divContact);
    }
}

