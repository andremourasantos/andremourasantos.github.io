function findPos(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
        do {
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
    return [curtop];
    }
}

document.getElementById('botaobioCompartilhar').addEventListener('click', function timeFunction(){
    setTimeout(function() {
        document.querySelector("#biopopup1Container").style.display = "flex";
        window.scroll(0,findPos(document.getElementById("biopopup1Container")));
        document.querySelector("html").style.overflowY = "hidden";
    }, 350);
});

document.getElementById("fecharbiopopup0").addEventListener("click", function timeFunction(){
    setTimeout(function(){
        document.querySelector("#biopopup0").style.display = "none";
        document.querySelector("#biopopup1").style.display = "flex";
    }, 350);
});

document.getElementById("fecharbiopopup1").addEventListener("click", function timeFunction(){
    setTimeout(function(){
        document.querySelector("#biopopup1Container").style.display = "none";
        document.querySelector("html").style.overflowY = "auto";
        document.querySelector("#biopopup0").style.display = "flex";
        document.querySelector("#biopopup1").style.display = "none";
        window.scroll(0,0);
    }, 350);
});