import { html } from '../node_modules/lit-html/lit-html.js';

export const timerTemplate = (time) => html`
<h3>Timer: ${time.hours}:${time.minutes}:${time.seconds}</h3>`;