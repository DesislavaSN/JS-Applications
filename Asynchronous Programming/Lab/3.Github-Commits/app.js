async function loadCommits() {
  const usernameInput = document.querySelector("#username").value;
  const repoInput = document.querySelector("#repo").value;
  const listItem = document.querySelector('#commits');

  try {
    const response = await fetch(
      `https://api.github.com/repos/${usernameInput}/${repoInput}/commits`
    );
    if (response.ok == false) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);

    for (const {commit} of data) {
        const liEl = document.createElement('li');
        listItem.appendChild(liEl);
        // console.log(commit.author);
        liEl.textContent = `${commit.author.name}: ${commit.message}`;
    }

  } catch (error) {
    const liEl = document.createElement('li');
    listItem.appendChild(liEl);
    liEl.textContent = `Error: ${error.message} (Not Found)`;
  }
}
