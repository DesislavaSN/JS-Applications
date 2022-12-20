import { post } from "./api.js";
import { createSubmitHandler } from "./util.js";

const section = document.getElementById('createView');
const form = section.querySelector('form');
createSubmitHandler(form, createMovie);
section.remove();

let ctx = null;

export function showCreate(inCtx){
    ctx = inCtx;
    ctx.render(section);
}

async function createMovie({ title }){
    await post('/data/movies', { title });
    ctx.goTo('catalogBtn');
}