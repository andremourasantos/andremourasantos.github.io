function findPos(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
        do {
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
    return [curtop];
    }
}

document.getElementById('abrir-popup').addEventListener('click', function() {
    document.querySelector('html').style.scrollBehavior = "auto";
    document.querySelector('.popup-container').style.display = 'flex';
    document.querySelector('#fechar-popup').style.display = 'inline-block';
    document.querySelector('#abrir-popup2').style.display = 'inline-block';
    document.querySelector('#irParaPopupCertificados').style.display = 'none';
    document.querySelector("div.popup1").style.display = "block";
    document.querySelector("html").style.overflowY = "hidden";
    window.scroll(0,findPos(document.getElementById("popup1")));
});

document.getElementById("fechar-popup").addEventListener("click", function(){
    document.querySelector(".popup-container").style.display = "none";
    document.querySelector("html").style.overflowY = "auto";
    window.scroll(0,findPos(document.getElementById("conhecimentos")));
    document.querySelector('html').style.scrollBehavior = "smooth";
});

document.getElementById("abrir-popup2").addEventListener("click", function(){
    document.querySelector("div.popup1").style.display = "none";
    document.querySelector("div.popup2").style.display = "block";
});

document.getElementById("fechar-popup2").addEventListener("click", function(){
    document.querySelector(".popup-container").style.display = "none";
    document.querySelector("html").style.overflowY = "auto";
    document.querySelector("div.popup1").style.display = "block";
    document.querySelector("div.popup2").style.display = "none";
    window.scroll(0,findPos(document.getElementById("conhecimentos")));
    document.querySelector('html').style.scrollBehavior = "smooth";
});

//↓ CERTIFICADOS ↓
document.getElementById('abrirPopupCertificados').addEventListener('click', function(){
    document.querySelector('html').style.scrollBehavior = "auto";
    document.querySelector('.popup-container').style.display = 'flex';
    document.querySelector("div.popup1").style.display = "block";
    document.querySelector('#fechar-popup').style.display = 'none';
    document.querySelector('#abrir-popup2').style.display = 'none';
    document.querySelector('#irParaPopupCertificados').style.display = 'block';
    document.querySelector("html").style.overflowY = "hidden";
    window.scroll(0,findPos(document.getElementById("popup1")));
});

document.getElementById('irParaPopupCertificados').addEventListener('click', function(){
    document.querySelector('#popupCertificados1').style.display = 'block';
    document.querySelector('div.popup1').style.display = 'none';
});

document.getElementById('fecharPopupCertificados-1').addEventListener('click', function(){
    document.querySelector(".popup-container").style.display = "none";
    document.querySelector("html").style.overflowY = "auto";
    document.querySelector("#popupCertificados1").style.display = "none";
    window.scroll(0,findPos(document.getElementById("conhecimentos")));
    document.querySelector('html').style.scrollBehavior = "smooth";
});

document.getElementById('avançarPopupCertificados-1').addEventListener('click', function(){
    document.querySelector('#popupCertificados1').style.display = 'none';
    document.querySelector('#popupCertificados2').style.display = 'block';
});

document.getElementById('voltarPopupCertificados-1').addEventListener('click', function(){
    document.querySelector('#popupCertificados2').style.display = 'none';
    document.querySelector('#popupCertificados1').style.display = 'block';
});

document.getElementById('avançarPopupCertificados-2').addEventListener('click', function(){
    document.querySelector('#popupCertificados2').style.display = 'none';
    document.querySelector('#popupCertificados3').style.display = 'block';
});

document.getElementById('voltarPopupCertificados-2').addEventListener('click', function(){
    document.querySelector('#popupCertificados3').style.display = 'none';
    document.querySelector('#popupCertificados2').style.display = 'block';
});

document.getElementById('fecharPopupCertificados-2').addEventListener('click', function(){
    document.querySelector(".popup-container").style.display = "none";
    document.querySelector("html").style.overflowY = "auto";
    document.querySelector("#popupCertificados3").style.display = "none";
    window.scroll(0,findPos(document.getElementById("conhecimentos")));
    document.querySelector('html').style.scrollBehavior = "smooth";
});