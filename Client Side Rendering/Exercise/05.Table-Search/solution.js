import { html, render } from './node_modules/lit-html/lit-html.js';

document.querySelector("#searchBtn").addEventListener("click", onClick);
const tbody = document.querySelector('tbody');
const searchInput = document.getElementById('searchField');
const url = 'http://localhost:3030/jsonstore/advanced/table';

const rowTemplate = (student) => html`
   <tr class=${student.match == true ? 'select' : ''}>
      <td>${student.item.firstName} ${student.item.lastName}</td>
      <td>${student.item.email}</td>
      <td>${student.item.course}</td>
   </tr>
`;

/*pravim si edna globalna promenliva koqto q update-vame 
s dannite koito sme vzeli ot server-a */
let students;
async function getData(){
   const response = await fetch(url);
   const data = await response.json();
   students = Object.values(data).map(s => ({ item: s, match: false}));
   
   update();
}
getData();

function update(){
   render(students.map(rowTemplate), tbody);
}

function onClick() {
   const search = searchInput.value.trim().toLocaleLowerCase();
   // console.log(students);
   for (const student of students) {
      student.match = Object.values(student.item).some(v => search && v.toLocaleLowerCase().includes(search));
   }
   update();
}

