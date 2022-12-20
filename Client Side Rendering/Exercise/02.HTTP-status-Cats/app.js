import { cats } from './catSeeder.js';
import { html, render } from './node_modules/lit-html/lit-html.js';

const sectionCats = document.getElementById('allCats');

const listTemplate = (data, showDetails) => html`
    <li>
        <img src="./images/${data.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
        <div class="info">
            <button @click=${() => showDetails(data)} class="showBtn">${data.info ? 'Hide' : 'Show'} status code</button>
            ${data.info ? html`<div class="status" id=${data.id}>
                <h4>Status Code: ${data.statusCode}</h4>
                <p>${data.statusMessage}</p>
            </div>` : null}
        </div>
    </li>
`;

/*dobavqme kum vsqka kotka svoistvo 'info' koeto go setvame da e false /or true/ 
i s nego pravim ternaren operator za toggle na kartata*/ 
cats.forEach(c => c.info = false);

// kato startira prilojenieto f.update() printira dannite na ekrana 
update();
function update(){
    // v render sme slojili vlojen template za vseki li el-nt, a ul el-ta go suzdavame samo vednuj:
    render(html`<ul>${cats.map(d => listTemplate(d, showDetails))}</ul>`, sectionCats);
}

function showDetails(card){
    // console.log('clicked');
    card.info = !(card.info);
    // pri vsqko edno obnovqvavne na ekrana trqbva da otpechatame dannite pak, za tova vikame 2va puti f.update();
    update();
}




