// initiaziation 
// load data from server

const user = document.getElementById("user");
const guest = document.getElementById("guest");
const loadBtn = document.querySelector(".load");
const spanWelcome = document.querySelector("header nav p.email span");
const allCatches = document.getElementById("catches");
let userData = null;
const addForm = document.getElementById("addForm");
const editForm = document.getElementById('editForm');
const logoutBtn = document.getElementById('logout');
const fieldset = document.getElementById('main') ;


window.addEventListener("DOMContentLoaded", () => {
  userData = JSON.parse(sessionStorage.getItem("userData"));
  console.log('userData ID: ', userData);

  if (userData != null) {
    guest.style.display = "none";
    spanWelcome.textContent = userData.email;
    document.querySelector("#addForm .add").disabled = false;
  } else {
    user.style.display = "none";
  }

  loadBtn.addEventListener("click", loadData);
  logoutBtn.addEventListener('click', onLogout);
  fieldset.addEventListener('click', onTableClick);
  addForm.addEventListener("submit", onCreateSubmit);
  editForm.addEventListener('submit', onUpdateSubmit);
  
});

loadData();

// --------------- ON TABLE CLICK - pozlvam q za Delete & Edit komandite ----------------
function onTableClick(event){
    if (event.target.className == 'delete') {
        onDelete(event.target);
    } else if (event.target.className == 'update'){
        onUpdate(event.target);
        console.log('edit button is clicked');
    }
}

// ----------- EDIT AN EXISTING CATCH CARD ----------------------
async function loadCatchById(id){
    try {
        const response = await fetch('http://localhost:3030/data/catches/' + id);
        if (response.ok == false) {
            const err = await response.json();
            throw new Error(err.message)
        }
        const result = await response.json()
        return result;
    } catch (error) {
        alert(error.message);
    }
}

async function onUpdateSubmit(event){
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
        angler: formData.get("angler"),
        weight: formData.get("weight"),
        species: formData.get("species"),
        location: formData.get("location"),
        bait: formData.get("bait"),
        captureTime: formData.get("captureTime"),
    };
    const result = await updateCatch(data);
    console.log(result);
    createPreview(data);
    event.target.reset();
    createForm.style.display = 'block';
    editForm.style.display = 'none';
}

async function updateCatch(singleCatch){
    // console.log(userData.id);
    const response = await fetch('http://localhost:3030/data/catches/' + userData.id, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': userData.token
        },
        body: JSON.stringify({ singleCatch })
    });
    const data = await response.json();
    console.log(data);
    return data;
}

async function onUpdate(button){
    const id = button.parentElement.dataset.id;
    console.log(id);
    const singleCatchCard = await loadCatchById(id);
    // console.log(singleCatchCard.angler);
    addForm.style.display = 'none';
    editForm.style.display = 'block';

    const divContainer = document.querySelector('.catch');
    // editForm.querySelector('[name="id"]').value = id;
    editForm.querySelector('.angler').value = singleCatchCard.angler;
    editForm.querySelector('.weight').value = singleCatchCard.weight;
    editForm.querySelector('.species').value = singleCatchCard.species;
    editForm.querySelector('.location').value = singleCatchCard.location;
    editForm.querySelector('.bait').value = singleCatchCard.bait;
    editForm.querySelector('.captureTime').value = singleCatchCard.captureTime;

    button.parentElement.remove();
}

// ----------------- DELETE AN EXISTING CATCH CARD ---------------------- 
// delete request:
async function deleteCatch(id){
    const response = await fetch('http://localhost:3030/data/catches/' + id, {
        method: 'delete',
        headers: {
            'X-Authorization': userData.token
        }
    });
    return response;
}

async function onDelete(button){
    const id = button.parentElement.dataset.id;
    // console.log(id);
    const result = await deleteCatch(id);
    button.parentElement.remove();
}


// -------------- CREATE NEW CATCH CARD ----------------
async function onCreateSubmit(event) {
  event.preventDefault();
  if (userData == false) {
    window.location = "login.html";
    return;
  }

  const formData = new FormData(event.target);
  const data = {
    angler: formData.get("angler"),
    weight: formData.get("weight"),
    species: formData.get("species"),
    location: formData.get("location"),
    bait: formData.get("bait"),
    captureTime: formData.get("captureTime"),
  };

  try {
    if (Object.values(data).some((el) => el == "")) {
        throw new Error("All fields are required");
    }

    const response = await fetch("http://localhost:3030/data/catches", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": userData.token,
      },
      body: JSON.stringify(data),
    });

    if (response.ok == false) {
      const err = await response.json();
      alert(err.message);
      throw new Error(err.message);
    }

    const responseData = await response.json();
    // console.log(responseData);
    createPreview(responseData);
    event.target.reset();
    
  } catch (error) {
    alert(error.message);
  }
}

// ------------- LOAD DATA -------------------------
// load all data 
async function loadData() {
  try {
    const response = await fetch("http://localhost:3030/data/catches");
    if (response.ok == false) {
      const err = await response.json();
      alert(err.message);
      throw new Error(err.message);
    }
    allCatches.innerHTML = "";
    const data = await response.json();
    Object.values(data).map((d) => createPreview(d));
    // console.log(data);
  } catch (error) {
    alert(error.message);
  }
}

function createPreview(item) {
  const divContainer = createElement("div", null, "catch");
  divContainer.setAttribute("data-id", item._id);
  const labelAngler = createElement("label", "Angler");
  const inputAngler = createElement("input", null, "angler", null, item.angler);
  inputAngler.setAttribute("type", "text");
  const labelWeight = createElement("label", "Weight");
  const inputWeight = createElement("input", null, "weight", null, item.weight);
  inputWeight.setAttribute("type", "text");
  const labelSpecies = createElement("label", "Species");
  const inputSpecies = createElement(
    "input",
    null,
    "species",
    null,
    item.species
  );
  inputSpecies.setAttribute("type", "text");
  const labelLocation = createElement("label", "Location");
  const inputLocation = createElement(
    "input",
    null,
    "location",
    null,
    item.location
  );
  inputLocation.setAttribute("type", "text");
  const labelBait = createElement("label", "Bait");
  const inputBait = createElement("input", null, "bait", null, item.bait);
  inputBait.setAttribute("type", "text");
  const labelCaptureTime = createElement("label", "Capture Time");
  const inputCaptureTime = createElement(
    "input",
    null,
    "captureTime",
    null,
    item.captureTime
  );
  inputCaptureTime.setAttribute("type", "number");
  const updateBtn = createElement("button", "Update", "update");
  const deleteBtn = createElement("button", "Delete", "delete");

  allCatches.appendChild(divContainer);
  divContainer.appendChild(labelAngler);
  divContainer.appendChild(inputAngler);
  divContainer.appendChild(labelWeight);
  divContainer.appendChild(inputWeight);
  divContainer.appendChild(labelSpecies);
  divContainer.appendChild(inputSpecies);
  divContainer.appendChild(labelLocation);
  divContainer.appendChild(inputLocation);
  divContainer.appendChild(labelBait);
  divContainer.appendChild(inputBait);
  divContainer.appendChild(labelCaptureTime);
  divContainer.appendChild(inputCaptureTime);
  divContainer.appendChild(updateBtn);
  divContainer.appendChild(deleteBtn);

  if (!(userData && item._ownerId == userData.id)) {
    inputAngler.setAttribute("disabled", "true");
    inputWeight.setAttribute("disabled", "true");
    inputSpecies.setAttribute("disabled", "true");
    inputLocation.setAttribute("disabled", "true");
    inputBait.setAttribute("disabled", "true");
    inputCaptureTime.setAttribute("disabled", "true");
    updateBtn.setAttribute("disabled", "true");
    deleteBtn.setAttribute("disabled", "true");
  }

  return item;
}


// --------------------- LOGOUT THE USER ---------------------
// Logout function:
async function onLogout(){
    const response = await fetch('http://localhost:3030/users/logout');
    sessionStorage.clear();
    window.location = 'index.html';
}


// create HTML El-nts:
function createElement(type, content, className, id, value) {
  const element = document.createElement(type);
  element.textContent = content;
  if (className) {
    element.classList.add(className);
  }
  if (id) {
    element.id = id;
  }
  if (value) {
    element.value = value;
  }
  return element;
}







