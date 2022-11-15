
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

loadBooks();

// ------------------- LOAD ALL BOOKS & 1 BOOK ONLY -----------------
async function loadBooks() {
  const books = await request(url);
  const result = Object.entries(books).map(([id, book]) => createRow(id, book));
  tbody.replaceChildren(...result);
}

async function loadOneBookById(id) {
  const book = await request(url + "/" + id);
  return book;
}

// ------------------- CREATE A NEW BOOK -------------------
async function createBook(book) {
  const result = await request(url, {
    method: "post",
    body: JSON.stringify(book)
  });
  return result;
}

async function onCreate(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const author = formData.get("author");
  const title = formData.get("title");

  const result = await createBook({ author, title });
  tbody.appendChild(createRow(result._id, result));
  event.target.reset();
}

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

async function onEditSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);

  const id = formData.get("id");
  const author = formData.get("author");
  const title = formData.get("title");

  const result = await updateBook(id, { author, title });

  event.target.reset();
  createForm.style.display = "block";
  editForm.style.display = "none";
  loadBooks();
}

async function onEdit(button) {
  const id = button.parentElement.dataset.id;
  const book = await loadOneBookById(id);
  createForm.style.display = "none";
  editForm.style.display = "block";

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

async function onDelete(button) {
  const id = button.parentElement.dataset.id;
  console.log(id);
  const result = await deleteBook(id);
  console.log(result);
  button.parentElement.parentElement.remove();
}

// ------------ CLICK ON THE TABLE - DELETE btn or EDIT btn ---------------

function onTableClick(event) {
  if (event.target.className == "delete") {
    onDelete(event.target);
  } else if (event.target.className == "edit") {
    onEdit(event.target);
  }
}

// ------------------ REQUEST / FETCH FUNCTION - request the data from the server -----------------
async function request(url, options) {
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
