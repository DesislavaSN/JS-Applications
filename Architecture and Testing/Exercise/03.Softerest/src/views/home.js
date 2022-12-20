/*zapazvame vsqko view v otdelna promenliva(slojihme id-ta ma vsqka section koqto si nqmashe)
i v HTML file slojihme vsichki 'views'/sections v edin div s id=views i go napravihme da 
e display=none; suzdadohme si papka VIEWS i v neq file za vsqko view: home.js - homePage, etc.*/ 
// const homePage = document.getElementById('homePage');

const section = document.getElementById('homePage');
/*tozi module NE import-ira nishto, a chaka 'context' da doide otvun 
i vutre vuv f. showHome iskame da imame dostap do nqkakva f.-> showSection 
i kato q viknem tq da vizyalizira section-a koito nie iskame */ 

/*'context' e dependency */
export function showHome(context){
    // v tova dependency 'context' vikame showSection f. i my podavame section-a
    context.showSection(section);

}