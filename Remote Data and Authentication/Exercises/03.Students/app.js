// load all students 
// create a new student and display it

// initialization 
const url = 'http://localhost:3030/jsonstore/collections/students';
const form = document.getElementById('form');
form.addEventListener('submit', onCreate);

const submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click', loadStudents);

tbody = document.querySelector('tbody');

// vikam tazi f. za da zaredi vsichki students v nachaloto
loadStudents();

// ------------- LOAD STUDENTS ---------------
// load all students:
async function loadStudents(){
    const students = await request(url);
    const result = Object.values(students).map(s => createRow(s));
    // return students;

    tbody.replaceChildren(...result);
}

// ---------- CREATE STUDENT ---------------
// create Student fetch request:
async function createStudent(student){
    const result = await request(url, {
        method: 'post',
        body: JSON.stringify(student)
    });
    return result;
}

// za suzdavane na nov student :
async function onCreate(event){
    event.preventDefault();
    const formData = new FormData(event.target);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const facultyNumber = formData.get('facultyNumber');
    const grade = formData.get('grade');

    const result = await createStudent({ firstName, lastName, facultyNumber, grade});

    tbody.appendChild(createRow(result));

    event.target.reset();
}

// create a new row for each student:
function createRow(student){
    const tableRow = createElement('tr');
    const tdFirstN = createElement('td', student.firstName);
    const tdLastN = createElement('td', student.lastName);
    const tdFacultyNum = createElement('td', student.facultyNumber);
    const tdgrade = createElement('td', student.grade);
    tbody.appendChild(tableRow);
    tableRow.appendChild(tdFirstN);
    tableRow.appendChild(tdLastN);
    tableRow.appendChild(tdFacultyNum);
    tableRow.appendChild(tdgrade);

    return tableRow;
}


// request function:
async function request(url, options){
    if(options && options.body == null){
        Object.assign(options, {
            headers: {
                'Content-type': 'application/json'
            }
        });
    }

    const response = await fetch(url, options);
    if (response.ok == false) {
        const err = await response.json();
        alert(err.message);
        throw new Error(err.message);
    }
    const data = await response.json();
    return data;
}

// create HTML El-nts:
function createElement(type, content, className, id) {
    const element = document.createElement(type);
    element.textContent = content;
    if (className) {
      element.classList.add(className);
    }
    if (id) {
      element.id = id;
    }
    return element;
}