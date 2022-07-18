const mainElement = document.getElementById("main");
const url = "http://localhost:3030/jsonstore/advanced/profiles";

async function lockedProfile() {
  try {
    const response = await fetch(url);
    if (response.ok == false) {
      throw new Error("Request error!");
    }
    const data = await response.json();
    // console.log(Object.entries(data));

    mainElement.innerHTML = "";

    // Loop through the data and create the HTML elements:
    for (let i = 0; i < Object.entries(data).length; i++) {
      const profileUser = Object.entries(data)[i][1];
      // console.log(profileUser.username);

      // All HTML Elements:
      const profileDivEl = createElement("div", null, "profile");
      const imageEl = createElement("img", null, "userIcon");
      imageEl.src = "./iconProfile2.png";
      const lockLable = createElement("label", "Lock");
      const inputLock = createElement("input");
      inputLock.setAttribute("type", "radio");
      inputLock.setAttribute("name", `user${i + 1}Locked`);
      inputLock.setAttribute("value", "lock");
      inputLock.setAttribute("checked", true);
      const unlockLable = createElement("label", "Unlock");
      const inputUnlock = createElement("input");
      inputUnlock.setAttribute("type", "radio");
      inputUnlock.setAttribute("name", `user${i + 1}Locked`);
      inputUnlock.setAttribute("value", "unlock");
      const brEl = createElement("br");
      const hrEl = createElement("hr");
      const usernameLable = createElement("label", "Username");
      const usernameInput = createElement("input");
      usernameInput.setAttribute("type", "text");
      usernameInput.setAttribute("name", `user${i + 1}Username`);
      usernameInput.setAttribute("value", `${profileUser.username}`);
      usernameInput.setAttribute("disabled", "disabled");
      usernameInput.setAttribute("readonly", "readonly");
      // -- hidden fields:
      const hiddenFieldsDivEl = createElement(
        "div",
        null,
        null,
        `user${i + 1}HiddenFields`
      );
      const hr2El = createElement("hr");
      const emailLabel = createElement("label", "Email:");
      const emailInput = createElement("input");
      emailInput.setAttribute("type", "email");
      emailInput.setAttribute("name", `user${i + 1}Email`);
      emailInput.setAttribute("value", `${profileUser.email}`);
      emailInput.setAttribute("disabled", "disabled");
      emailInput.setAttribute("readonly", "readonly");
      const ageLabel = createElement("label", "Age:");
      const ageInput = createElement("input");
      ageInput.setAttribute("type", "email");
      ageInput.setAttribute("name", `user${i + 1}Age`);
      ageInput.setAttribute("value", `${profileUser.age}`);
      ageInput.setAttribute("disabled", "disabled");
      ageInput.setAttribute("readonly", "readonly");
      hiddenFieldsDivEl.style.display = "none";
      const showInfoBtn = createElement("button", "Show more");

      // Apending all HTML Elements:
      // -- profile el:
      mainElement.appendChild(profileDivEl);
      profileDivEl.appendChild(imageEl);
      profileDivEl.appendChild(lockLable);
      profileDivEl.appendChild(inputLock);
      profileDivEl.appendChild(unlockLable);
      profileDivEl.appendChild(inputUnlock);
      profileDivEl.appendChild(brEl);
      profileDivEl.appendChild(hrEl);
      profileDivEl.appendChild(usernameLable);
      profileDivEl.appendChild(usernameInput);
      // -- hidden fields:
      profileDivEl.appendChild(hiddenFieldsDivEl);
      hiddenFieldsDivEl.appendChild(hr2El);
      hiddenFieldsDivEl.appendChild(emailLabel);
      hiddenFieldsDivEl.appendChild(emailInput);
      hiddenFieldsDivEl.appendChild(ageLabel);
      hiddenFieldsDivEl.appendChild(ageInput);
      // -- show more button:
      profileDivEl.appendChild(showInfoBtn);
      showInfoBtn.addEventListener("click", revelInfo);
    }

    function revelInfo(event) {
      // console.log(event.target.parentNode.children[10]);

      const unlockedBtn = event.target.parentNode.children[4];
      const hiddenFields = event.target.parentNode.children[9];
      const showHideBtn = event.target.parentNode.children[10];

      if (unlockedBtn.checked) {
        if (showHideBtn.textContent == "Show more") {
          hiddenFields.style.display = "inline";
          showHideBtn.textContent = "Hide it";
        } else {
          hiddenFields.style.display = "none";
          showHideBtn.textContent = "Show more";
        }
      }
    }
  } catch (error) {
    alert(error.message);
  }

  // Create HTML El-ts function:
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
}

