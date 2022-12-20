import { towns as townsData } from './towns.js';
import { html, render } from './node_modules/lit-html/lit-html.js';

const searchInput = document.getElementById('searchText');
const divRes = document.getElementById('towns');
const output = document.getElementById('result');
document.querySelector('button').addEventListener('click', onClick)

// dobavqme class kum li el-ta za da dobavim classa kum namereniq match v dolnata f. onClick
const listTemplate = (town) => html`<li class=${town.match ? 'active' : ''}>${town.name}</li>`;

/* pravim nov masiv ot sushtestvyvashtiq s data-a za da dobavim svoistvoto match: false 
i s nego da moje da dobavim stila kum namereniq match, ako match = false to nqma stilizaciq */ 
const towns = townsData.map(t => ({name: t, match: false}));

update();
function update(){
   render(html`<ul>${towns.map(listTemplate)}</ul>`, divRes);
}

function onClick(){
   let matches = 0;
   const matchTown = searchInput.value.trim().toLocaleLowerCase();
   for (const town  of towns) {
      if (matchTown && town.name.toLocaleLowerCase().includes(matchTown)) {
         matches++;
         town.match = true;
      } else {
         town.match = false;
      }
   }
   output.textContent = `${matches} matches found`;
   update();
}


// const matches = towns.filter(t => match && t.name.toLocaleLowerCase().includes(match)).length;
