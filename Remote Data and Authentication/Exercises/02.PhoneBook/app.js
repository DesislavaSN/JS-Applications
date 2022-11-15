const loadBtn = document.getElementById('btnLoad');
const createBtn = document.getElementById('btnCreate')
const personInput = document.getElementById('person');
const phoneInput = document.getElementById('phone');
const phonebook = document.getElementById('phonebook');
const url = 'http://localhost:3030/jsonstore/phonebook';

function attachEvents() {
    loadBtn.addEventListener('click', loadNumbers);
    createBtn.addEventListener('click', onSubmit);

// avtomatichno se zarejdat vsichki kontakti ot spisaka, predi da natisne Load!
    loadNumbers();
}

attachEvents();

async function onSubmit(){
    const person = personInput.value;
    const phone = phoneInput.value;

    const result = await createNumber({ person, phone});
    // console.log(result);
    const liEl = createListItem(`${person}:${phone}`);
    phonebook.appendChild(liEl);

    personInput.value = '';
    phoneInput.value = '';
}

// load all phone numbers to the list
async function loadNumbers(){
    try {
        const response = await fetch(url);
        if (response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }
        const data = await response.json();
        phonebook.replaceChildren();
        const details =  Object.values(data);
        // console.log(details);
        details.forEach(d => {
            phonebook.appendChild(createListItem(`${d.person}:${d.phone}`));
        });

    } catch (error) {
        alert(error.message);
    }
}


// creat a new phone number to the list
async function createNumber(number){
    try {
        const response = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(number)
        });
        if (response.ok == false) {
            const err = await response.json();
            throw new Error(err.message);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        alert(error.message);
    }
}

// delete a phone number from the list 
async function deleteData(id, element){
    // console.log(id);
    console.log('clicked');

    const response = await fetch(url + '/' + id,{
        method: 'delete'
    });
    element.remove();
}

// create a list item for each phone number:
function createListItem(record){
    const element = document.createElement('li');
    element.textContent = record;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteData(record._id, element));
    element.appendChild(deleteBtn)

    return element;
}