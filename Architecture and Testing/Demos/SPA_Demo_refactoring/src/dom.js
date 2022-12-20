/* render f. hvashta 'main' tag i na nego zakacha 
section-a koito otgovarq za opredeleniq module */

export function render(section){
    document.querySelector('main').replaceChildren(section);

}