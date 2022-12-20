const main = document.querySelector('main');
// showView: zakachame vsqka 'section' za 'main' sled kato sme gotovi s logkata
export function showView(section){
    main.replaceChildren(section);
}

export function e(type, attributes, ...content) {
    // suzdava element
    const result = document.createElement(type);

    // slaga event Listenr na elemnta
    for (let [attr, value] of Object.entries(attributes || {})) {
        if (attr.substring(0, 2) == 'on') {
            result.addEventListener(attr.substring(2).toLocaleLowerCase(), value);
        } else {
            result[attr] = value;
        }
    }

    content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);
    // append-va neshta/ elementi kum suzdadenoto
    content.forEach(e => {
        if (typeof e == 'string' || typeof e == 'number') {
            const node = document.createTextNode(e);
            result.appendChild(node);
        } else {
            result.appendChild(e);
        }
    });

    return result;
}
