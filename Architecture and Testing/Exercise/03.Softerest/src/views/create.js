import { createIdea } from "../api/data.js";

const section = document.getElementById('createPage');
const form = section.querySelector('.createForm');
form.addEventListener('submit', onCreate);

let ctx = null;
export function showCreate(context){
    ctx = context;
    context.showSection(section);
}

async function onCreate(event){
    event.preventDefault();

    const formData = new FormData(form);
    const title = formData.get('title').trim();
    const description = formData.get('description').trim();
    const img = formData.get('imageURL').trim();

    if (title.lenght < 7) {
        return alert('The Title should be at least 6 characters long!');
    }
    if (description.lenght < 11) {
        return alert('The Description should be at least 10 characters long!');
    }
    if (img.lenght < 6 ) {
        return alert('The image should be at least 5 characters long!');
    }

    const idea = await createIdea({title, description, img});
    console.log(idea);

    ctx.goTo('/catalog');
    form.reset();
}

