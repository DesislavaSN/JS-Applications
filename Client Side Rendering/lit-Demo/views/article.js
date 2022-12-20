import { html } from '../node_modules/lit-html/lit-html.js';
import { classMap } from '../node_modules/lit-html/directives/class-map.js';


export const articleTemplate = (article, onAlart) => {
    // console.log('this is the article: ', article);
    return html` 
    <article class=${classMap({
        highlight: article.highlight,
        red: article.class == 'red',
        green: article.class == 'green',
        blue: article.class == 'blue',
    })}>
    
      <h2>${article.title}</h2>
      ${article.highlight ? html`<h3>Article of the day!</h3>` : null}
      <button @click=${onAlart}>Click me</button>
      <div class="content">
        <p>${article.content}</p>
      </div>
      ${footerTemplate(article.author)}
    </article>`;
};

const footerTemplate = (author) => html`<footer>Author: <span style="font-style: italic;">${author}</span></footer>`
