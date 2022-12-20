import { html, render } from './node_modules/lit-html/lit-html.js';

const divEl = document.querySelector('div');
const form = document.querySelector('form');
form.addEventListener('submit', addItem);
const inputText = document.getElementById('itemText');
const url = 'http://localhost:3030/jsonstore/advanced/dropdown';

const selectTemplate = (items) => html`
    <select id="menu">
        ${items.map(i => html`<option value=${i._id}>${i.text}</option>}`)}
    </select>
`;

// update();
function update(items){
    render(selectTemplate(items), divEl);
}

/*vikame getDate f. kato startira app-a za da podade dannite 
na server-a i da gi vizyalizira i sushto q vikame kogato 
sme dobavili nov el-nt kum servera (post request) v f. addItem */ 
getData();
async function getData(){
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    update(Object.values(data));
}

async function addItem(ev){
    ev.preventDefault();

    const text = inputText.value;
    const response = await fetch(url, {
        method: 'post',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({text}),
    });
    if (response.ok == false) {
        const err = await response.json();
        throw new Error(err.message);
    } else {
        getData();
    }
    form.reset();
}


