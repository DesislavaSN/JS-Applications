  function loadRepos() {
    const httpRequest = new XMLHttpRequest();

    httpRequest.addEventListener("readystatechange", ajaxHandler);
    httpRequest.open("GET", "https://api.github.com/users/testnakov/repos");
    httpRequest.send();

    function ajaxHandler() {
      if (httpRequest.readyState == 4 && httpRequest.status == 200) {
        const data = JSON.parse(httpRequest.responseText);
        textarea.value = JSON.stringify(data, null, 3);
      }
    }
  }
