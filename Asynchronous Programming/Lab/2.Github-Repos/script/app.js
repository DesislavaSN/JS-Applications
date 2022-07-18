async function loadRepos() {
  // read input
  const usernameInput = document.querySelector("#username").value;
  const ulItem = document.querySelector("#repos");

  try {
    // send request
    const response = await fetch(`https://api.github.com/users/${usernameInput}/repos`);

    if (response.ok == false) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
    const data = await response.json();

    // display response data 
    ulItem.innerHTML = "";
    for (const repo of data) {
      const liEl = document.createElement("li");
      const anchorEl = document.createElement("a");
      anchorEl.href = `${repo.html_url}`;
      anchorEl.textContent = `${repo.full_name}`;
      ulItem.appendChild(liEl);
      liEl.appendChild(anchorEl);
    }

  } catch (error) {
    // handle error 
    ulItem.innerHTML = `${error.message}`;
  }
}
