import { post } from "./api.js";
import { createSubmitHandler } from "./util.js";

const section = document.getElementById("loginView");
const form = section.querySelector("form");
createSubmitHandler(form, onLogin);
section.remove();

let ctx = null;
export function showLogin(inCtx) {
    ctx = inCtx;
    ctx.render(section);
}

async function onLogin({ email, password }) {
  if (email == "" || password == "") {
    return alert("Email & Password are required!");
  }

  const data = await post('/users/login', { email, password });
  const userData = {
    id: data._id,
    accessToken: data.accessToken,
    email: data.email,
  };

  sessionStorage.setItem("userData", JSON.stringify(userData));

  ctx.checkUserNav();
  ctx.goTo('homeBtn');

}


