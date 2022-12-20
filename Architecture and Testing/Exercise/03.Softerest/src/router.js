/* Navigator page - f. intialize priema 'links' ( koito sa v app.js) za da moje da gi dosupi v tozi file. 
Router-a podava sebe si v handler-a (na 40ti red) i vsichki shte mogat da dostupqt 
2te f. showSection & goTo */

export function initialize(links) {
  // suzdadohme si main tag v HTML file za da zakachame po otdelno vsqko View:
  const main = document.querySelector("main");
  /*hvashtame NAV bar-a i my zakachame event da slysha za click na opredelen A tag*/
  const nav = document.querySelector("nav");
  nav.addEventListener("click", onNavigate);


  /* router-a shte suzdade 'context' i shte go vurne */
  const context = {
    showSection,
    goTo,
    updateNav
  };
  return context;


  /*suzdavame si f. koqto vizyalizira sekciite */
  function showSection(section) {
    main.replaceChildren(section);
  }

  // click handler - navigira po NAV bar-a
  function onNavigate(event) {
    /*tui kato v linka za homePage e image to 
    redirektvame kum parent element-a koito e 'A' tag */
    if (event.target.tagName == "IMG") {
      event.target = event.target.parentElement;
    }
    if (event.target.tagName == "A") {
      event.preventDefault();
      const url = new URL(event.target.href);
      goTo(url.pathname);
    }
  }

  /*namira po ime v dadenite linkove kakvo se opitvame da vizyalizirame;
  '...params' - oznachava hvani vsichki parametri sled 'name' */ 
  function goTo(name, ...params) {
    const handler = links[name];
    if (typeof handler == "function") {
      /* ...params - oznachava vsichki parametri gi razdeli na otdelni elementi */
      handler(context, ...params);
    }
  }

  /*f. kakvo vijda v NAV bar-a logged-nat potrebitel ili guest bez registraciq */
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
