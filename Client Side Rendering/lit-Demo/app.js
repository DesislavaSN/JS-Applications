import { html, render } from './node_modules/lit-html/lit-html.js';

import { data } from "./data.js";
import { articleTemplate } from "./views/article.js";
import { greetingTemplate } from "./views/greeting.js";
import { timerTemplate } from "./views/timer.js";

const main = document.querySelector("main");
const divTimer = document.querySelector('.timer');
const header = document.querySelector("header");


start();
function start() {
  document.getElementById("reloadBtn").addEventListener("click", onClick);
  document.getElementById("createBtn").addEventListener("click", onCreate);

  // tova vrushta masiv s elementi ot vsichkite danni ot data.js file
  // console.log(data.map(articleTemplate));

  /* v render function-a igrae rolqta na replace with i mojem da pysnem direktno array: */
  render(data.map(a => articleTemplate(a, onAlart)), main);

  setInterval(updateTime, 1000);
  
}

function updateTime(){
    const now = new Date();
    const time = {
        hours: now.getHours(),
        minutes: ('0' + now.getMinutes()).slice(-2),
        seconds: ('0' + now.getSeconds()).slice(-2),
    }
    render(timerTemplate(time), divTimer);
}

let counter = 1;
function onClick() {
  // console.log('template result: ', greetingTemplate('Desi'));
  const resultTemplate = greetingTemplate("Desi", counter++);
  render(resultTemplate, header);
}

function onCreate(){
    const element = document.createElement('h3');
    element.textContent = 'I\'ve just created a manula HTML element with lit-html';
    render(element, document.querySelector('section'));
}

function onAlart(event){
    console.log(event.target);
    alert('Clicked!');
}
