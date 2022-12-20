import { showView } from "./dom.js";

// initialization
// - find the relevan section
// - detach the section

const section = document.getElementById('edit-movie');
section.remove();

// display logic

export function showEdit(){
    showView(section);

}