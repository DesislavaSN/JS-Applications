// main module: app.js
// - initialize modules
// - init modules with dependencies (comunication between the modules by dependency injection):
// -- rendering
// -- comunication between modules

import { render } from './utility.js';
import { showCatalog } from './catalog.js';
import { showCreate } from './create.js';
import { showUpdate } from './update.js';

const root = document.querySelector('body');
const ctx = {
    update,
}

update();
function update(){
    render ([
        showCatalog(ctx),
        showCreate(ctx),
        showUpdate(ctx),
    ], root);
}
