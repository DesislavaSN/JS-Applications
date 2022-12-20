// catalog / list module:
// - display list of books
// - control book (edit, delete)

import { deleteBook, getBooks, html, until, updateBook } from './utility.js';


const catalogTemplate = (booksPromise) => html`
<table>
    <thead>
        <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
    <!-- tozi booksPromise kato se resolv-ne trqbva da vurne array s all books -->
    ${until(booksPromise, html`<tr><td colSpan="3">Loading&hellip;</td></tr>`)}
    </tbody>
    </table>
`;

const bookRow = (book, onEdit, onDelete) => html`
<tr>
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>
        <button @click=${onEdit}>Edit</button>
        <button @click=${onDelete}>Delete</button>
    </td>
</tr>
`;

/*showCatalog polychava ctx, podava go na loadBooks, loadBooks vzima knigite i  */
export function showCatalog(ctx){
    return catalogTemplate(loadBooks(ctx));

};

/* loadBooks vzima knigite i kato gi zaredi v return-a, ctx gi podava chrez bind v toggleEditor-a
(v koito vinagi shte imame ctx) i osven nego podava i book  */
async function loadBooks(ctx) {
    const data = await getBooks();
    const books = Object.entries(data).map(([k, v]) => Object.assign(v, {_id: k}));
    console.log(books);

    // ako tyk ne bind-nem toggleEditor f. nqma kak da i podadem parametri kogato q suzdavame i za tova se opakova s .bind()
    return Object.values(books).map(book => bookRow(book, toggleEditor.bind(null, book, ctx), onDelete.bind(null, book._id, ctx)));

    // tova e sushtiq red i ima sushtoto znachenie kato gorniq, tyk e s arrow f., a ne .bind()
    // return Object.values(books).map(book => bookRow(book, () => toggleEditor(book, ctx), () => onDelete(book._id, ctx)));

};

/* toggleEditor-a(v koito vinagi shte imame ctx) podava i book */
function toggleEditor(book, ctx){
    ctx.book = book;
    ctx.update();
}

async function onDelete(id, ctx){
    await deleteBook(id);
    ctx.update();
}