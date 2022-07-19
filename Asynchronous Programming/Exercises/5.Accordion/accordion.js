window.addEventListener("load", solution);

const baseUrl = "http://localhost:3030/jsonstore/advanced/articles";
const mainSection = document.getElementById("main");

// Creat the div elements and display the titles of the articles:
async function solution() {
  try {
    const response = await fetch(`${baseUrl}/list`);
    if (response.ok == false) {
      throw new Error("Request error!");
    }
    const data = await response.json();

    for (const line of data) {
      // console.log(line._id);
      // console.log(line.title);

      // Create all HTML Elements:
      const accordionDivEl = createElement("div", null, "accordion");
      const headDivEl = createElement("div", null, "head");
      const titleSpanEl = createElement("span", line.title);
      const showInfoBtn = createElement("button", "More", "button", line._id);
      const contentDivEl = createElement("div", null, "extra");

      // Append all HTML El-ts:
      mainSection.appendChild(accordionDivEl);
      accordionDivEl.appendChild(headDivEl);
      headDivEl.appendChild(titleSpanEl);
      headDivEl.appendChild(showInfoBtn);
      accordionDivEl.appendChild(contentDivEl);

      // add event listener to the 'More' button:
      showInfoBtn.addEventListener("click", revelInfo);
    }
  } catch (error) {
    alert(error.message);
  }

  // Reveal the hidden information 
  async function revelInfo(event) {
    try {
      const selectedArticle = event.currentTarget;
      const parent = selectedArticle.parentNode.parentNode;
      //console.log(selectedArticle.id);

      const responseContent = await fetch(`${baseUrl}/details/${selectedArticle.id}`);
      if (responseContent.ok == false) {
        throw new Error("Request error!");
      }
      const dataContent = await responseContent.json();
      console.log(dataContent.content);

      // select 
      const contentDiv = parent.querySelector("div .extra");
      const contentParagraphEl = createElement("p", dataContent.content);
      contentDiv.appendChild(contentParagraphEl);

      if (selectedArticle.textContent == "More") {
        contentDiv.style.display = "inline";
        selectedArticle.textContent = "Less";
      } else {
        contentDiv.style.display = "none";
        selectedArticle.textContent = "More";
      }

    } catch (error) {
      alert(error.message);
    }
  }

  // Create HTML Elements function:
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
