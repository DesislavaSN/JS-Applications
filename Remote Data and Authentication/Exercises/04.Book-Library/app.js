/* 
To create a book, you have to send a "POST" request and 
the JSON body should be in the following format: 
{
  "author": "New Author",
  "title": "New Title"
}
*/

// load all books
// create a book
// update a book
// delete a book

// handle Create Form
// handle Edit form

// load book for editting
// handle delete button

// initialization:
const url = "http://localhost:3030/jsonstore/collections/books";

// -- Load btn
const loadBtn = document.getElementById("loadBooks");
loadBtn.addEventListener("click", loadBooks);

// --Table body
const tbody = document.querySelector("tbody");
tbody.addEventListener("click", onTableClick);

// -- Forms
const createForm = document.getElementById("createForm");
createForm.addEventListener("submit", onCreate);

const editForm = document.getElementById("editForm");
editForm.addEventListener("submit", onEditSubmit);

// zarejdame vsichki knigi ot server-a oshte v nachaloto
loadBooks();

// ------------------- LOAD ALL BOOKS & 1 BOOK ONLY -----------------
// zarejdame all books i polzvame f.request za da load-nem response.
async function loadBooks() {
  const books = await request(url);
  // vadim id-to ot knigite tui kato id-to e izvun obekta na knigata, za tova destryktorirame s .map()
  const result = Object.entries(books).map(([id, book]) => createRow(id, book));
  // console.log(...result);
  tbody.replaceChildren(...result);
}

// f. koqto zarejda edna edinstvenna kniga za da moje da q izpolzvame pri edit butona za da q redaktirame
async function loadOneBookById(id) {
  const book = await request(url + "/" + id);
  return book;
}

// ------------------- CREATE A NEW BOOK -------------------
// tyk & pri f. updateBook lipsva 'headers:' tui kato sme go slojili v f.request (ako ima body da se priloji)
async function createBook(book) {
  const result = await request(url, {
    method: "post",
    body: JSON.stringify(book)
  });
  return result;
}

/* f. 'onCreate' event e zakachen sus 'submit' event na butona na formata, 
kogato click-nem na submit za suzdavane na nova kniga */ 
async function onCreate(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const author = formData.get("author");
  const title = formData.get("title");

  const result = await createBook({ author, title });
  // console.log(result);

  // apendvame novosuzdadenia reda kum tbody-to
  tbody.appendChild(createRow(result._id, result));

  // zachistva poletata ot formata
  event.target.reset();
}

// tyk vikame 'data-id' za da postavim id-to na dadenata kniga i da mojem da q iztriem ili edit-nem posle
function createRow(id, book) {
  const tableRow = createElement("tr");
  const tdTitle = createElement("td", book.title);
  const tdAuthor = createElement("td", book.author);
  const tdButtons = createElement("td");
  tdButtons.setAttribute("data-id", id);
  const editBtn = createElement("button", "Edit", "edit");
  const deleteBtn = createElement("button", "Delete", "delete");

  tableRow.appendChild(tdTitle);
  tableRow.appendChild(tdAuthor);
  tableRow.appendChild(tdButtons);
  tdButtons.appendChild(editBtn);
  tdButtons.appendChild(deleteBtn);

  return tableRow;
}

// ------------------- UPDATE A BOOK -------------------
async function updateBook(id, book) {
  const result = await request(url + "/" + id, {
    method: "put",
    body: JSON.stringify(book),
  });
  return result;
}

// f. koqto editva izbranata kniga sled kato sme q redaktirali
async function onEditSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);

  /* tova 'id' go vzehme ot novosuzdadenoto ot nas hidden pole v HTML-a i 
    my zadadohme value id-to na izbranata kniga vuv f. onEdit */
  const id = formData.get("id");
  const author = formData.get("author");
  const title = formData.get("title");

  const result = await updateBook(id, { author, title });

  event.target.reset();
  createForm.style.display = "block";
  editForm.style.display = "none";
  // shte zaredi vsichki knigi nanovo sled kato sme redaktirali spisaka
  loadBooks();
}

// f. koqto manipylira butona EDIT i promenq neshto po izbranata kniga
async function onEdit(button) {
  const id = button.parentElement.dataset.id;
  // vzemame knonkretnata kniga koqto iskame da se edit-ne
  const book = await loadOneBookById(id);
  // console.log(book);
  createForm.style.display = "none";
  editForm.style.display = "block";

  // vzemame dannite na knigata i gi slagame v poletata na formata za editvane
  /* -- slojihme hidden pole vuv formata i kato value zadavame id-to na samata kniga, 
    za da mojem da go polzvame v onEditSumbit f.*/
  editForm.querySelector('[name="id"]').value = id;
  editForm.querySelector('[name="author"]').value = book.author;
  editForm.querySelector('[name="title"]').value = book.title;
}

// --------------- DELETE A BOOK -------------------------
async function deleteBook(id) {
  const result = await request(url + "/" + id, {
    method: "delete",
  });
  return result;
}

// f. koqto manipylira butona DELETE i iztriva izbranata knigata
async function onDelete(button) {
  const id = button.parentElement.dataset.id;
  console.log(id);
  const result = await deleteBook(id);
  console.log(result);
  button.parentElement.parentElement.remove();
}

// ------------ CLICK ON THE TABLE - DELETE btn or EDIT btn ---------------
/* f. koqto dava qsnota na koi byton e kliknato - delete or edit za konkretna kniga i
eventListener-a e na tbody-to */ 
function onTableClick(event) {
  if (event.target.className == "delete") {
    // console.log('clicked delete');
    /* kogato click-nem na delete shte se izvika onDelete() 
        s button-a, koito e predizvikal eventa - demek event.target*/
    onDelete(event.target);
  } else if (event.target.className == "edit") {
    // console.log('clicked edit');
    onEdit(event.target);
  }
}

// ------------------ REQUEST / FETCH FUNCTION - request the data from the server -----------------
// f. za pravene na fetch request za vsichki deistviq (load, create, update, delete):
async function request(url, options) {
  // ako v options ima body, nie my assignvame headers, kato go assign-vame kato vlojen obekt (obekt v obekta);
  if (options && options.body != undefined) {
    Object.assign(options, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const response = await fetch(url, options);
  if (response.ok == false) {
    const error = await response.json();
    alert(error.message);
    throw new Error(error.message);
  }
  const data = await response.json();
  return data;
}

// ------------------ create HTML EL-nts ---------------
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
