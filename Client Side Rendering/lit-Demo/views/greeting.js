import { html } from '../node_modules/lit-html/lit-html.js';
import { styleMap } from '../node_modules/lit-html/directives/style-map.js';


export const greetingTemplate = (name, count) => html`
<h2 style=${styleMap({
    color: 'orange',
    fontSize: '50px',
    textDecoration: 'underline',
})}>Hellow there, ${name}! Ciclked ${count} times.</h2>
<h2>Attribute Binding:</h2>
<label>Disabled field  where -> ?disabled=\${true}<input type="text" ?disabled=${true}></label>
<br />
<label>Active Input field where -> ?disabled=\${false}<input .value=${'your name'} type="text" ?disabled=${false}></label>
<br />
<textarea .value=${'leave your  message here'}></textarea>
`;