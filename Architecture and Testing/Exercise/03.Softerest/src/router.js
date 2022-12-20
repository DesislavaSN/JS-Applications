export function initialize(links) {
  const main = document.querySelector("main");
  const nav = document.querySelector("nav");
  nav.addEventListener("click", onNavigate);

  const context = {
    showSection,
    goTo,
    updateNav
  };
  return context;

  function showSection(section) {
    main.replaceChildren(section);
  }

  function onNavigate(event) {
    if (event.target.tagName == "IMG") {
      event.target = event.target.parentElement;
    }
    if (event.target.tagName == "A") {
      event.preventDefault();
      const url = new URL(event.target.href);
      goTo(url.pathname);
    }
  }

  function goTo(name, ...params) {
    const handler = links[name];
    if (typeof handler == "function") {
      handler(context, ...params);
    }
  }

  function updateNav(){
    const user = localStorage.getItem('user');
    if (user) {
      nav.querySelectorAll('.user').forEach(u => u.style.display = 'block');
      nav.querySelectorAll('.guest').forEach(u => u.style.display = 'none');
    } else {
      nav.querySelectorAll('.user').forEach(u => u.style.display = 'none');
      nav.querySelectorAll('.guest').forEach(u => u.style.display = 'block');
    }
  }
}
