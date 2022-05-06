console.log("w...");
// set Properties in loop
function addProp(selectors, varName, step=0.5){
    if(!Array.isArray(selectors)) return;

    for(let selector of selectors){
        let elems = document.querySelectorAll(selector);
        for(let elem of elems){
            for(let i = 0; i < elem.children.length; i++){
                elem.children[i].style.setProperty(varName, (i*step)+'s');
            }
        }
    }
}

addProp(["[data-hidden]"],
    "--anim-delay",
    0.2
);

function isVisible(elem){
    let coords = elem.getBoundingClientRect();
    let windowHeight = document.documentElement.clientHeight;
    let topVisible = coords.top > 0 && coords.top < windowHeight;
    let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;
    return topVisible || bottomVisible;
}

function showVisible(){
    for (let elem of document.querySelectorAll('[data-hidden]')) {
        if (isVisible(elem)) {
            elem.dataset.hidden = "false";
        }
    }
}
showVisible();
window.onscroll = showVisible;