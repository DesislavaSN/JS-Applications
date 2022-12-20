/* dependency injection - vkarvane na nezavisimostta ot otvun 'ctx' = context, vmesto 
edin modul da si go importira samoruchno, nqkoi dryg shte vkara tazi zavisimost ot otvun. 
Kato podadem parametara 'ctx' v showAbout f.(i vsichki ostanali module koito vizyalizirat section) 
toi shte renreira/ izpechata tova koeto my e podadeno -> 'ctx.render(section);' */  

const section = document.getElementById('aboutView');
section.remove();

export function showAbout(ctx){
    ctx.render(section);
}
