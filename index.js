function findPos(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
        do {
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return [curtop];
    }
}

let atalho = window.location.href.split('#')[1]
let idioma = window.navigator.userLanguage || window.navigator.language
let computador = false
let contadorCliquesVideo = 0

if (window.location.pathname.includes('en-US')) {
    if (idioma.includes('pt')) {window.location.replace(`/index.html${atalho != undefined ? `#${atalho}`: ''}`)} else {}
} else {
    if (idioma.includes('pt')) {} else {window.location.replace(`/en-US/index.html${atalho != undefined ? `#${atalho}`: ''}`)}
}

function checarDispositivo(){
    if (window.innerWidth<768) {} else {computador = true}
}

checarDispositivo()
//↑ CONFIGURAÇÕES ↑

//↓ CABEÇALHO ↓
document.getElementById('cabeçalho-linkedin-icone').addEventListener('click', function timeFunction(){
    setTimeout(() => {
        window.scroll(0, findPos(document.getElementById('cartão-contato-linkedin')));
    }, 250);
});

//↓ APRESENTAÇÃO ↓
document.querySelectorAll('li.hab01').forEach(item => {item.addEventListener('click', function timeFunction(){
    setTimeout(function(){
        window.scroll(0, findPos(document.getElementById('habilidade-1')));
    },250)
})})

document.querySelectorAll('li.hab02').forEach(item => {item.addEventListener('click', function timeFunction(){
    setTimeout(function(){
        window.scroll(0, findPos(document.getElementById('habilidade-2')));
    },250)
})})

document.querySelectorAll('li.hab03').forEach(item => {item.addEventListener('click', function timeFunction(){
    setTimeout(function(){
        window.scroll(0, findPos(document.getElementById('habilidade-3')));
    },250)
})})

function adicionarVideo() {
    if (contadorCliquesVideo == 0) {
        document.getElementById('video-iframe').style.background = 'none'
        document.getElementById('video-iframe').innerHTML =     '<iframe width="560" height="315" src="https://www.youtube.com/embed/V_UE0XM3TX0?&autoplay=1&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
        contadorCliquesVideo++
    }
}

//↓ POPUPS ↓
document.querySelectorAll('*[id^="abrirPopup"]').forEach(item => {item.addEventListener('click', function(){
    document.querySelector('#'+this.id.replace('abrirPopup', 'popup')).style.animation = '250ms linear abrirPopup'
    setTimeout(() => {
        document.querySelector('#'+this.id.replace('abrirPopup', 'popup')).style.display = 'block'
        document.querySelectorAll('*[class^="popup-container"]').forEach(item => {item.style.display = 'flex'})
        document.querySelector('html').style.scrollBehavior = 'auto';
        document.querySelector('html').style.overflowY = 'hidden';
    }, 250);
})})

document.querySelectorAll('*[id^="fecharPopup"]').forEach(item => {item.addEventListener('click', function(){
    document.querySelector(this.id.includes('-') ? '#'+this.id.replace('fecharPopup', 'popup').split('-',1):'#'+this.id.replace('fecharPopup', 'popup')).style.animation = '250ms linear fecharPopup'
    setTimeout(() => {
        document.querySelectorAll('div.popup').forEach(item => {item.style.display = 'none'})
        document.querySelectorAll('*[class^="popup-container"]').forEach(item => {item.style.display = 'none'})
        document.querySelector('html').style.scrollBehavior = 'smooth';
        document.querySelector('html').style.overflowY = 'auto';
    }, 250);
})})

document.querySelectorAll('*[id^="avançarPopupCertificados"]').forEach(item => {item.addEventListener('click', function(){
    var idDoBotãoCertificados = this.id.replace("avançarPopupCertificados-", '')
    if (this.id == 'avançarPopupCertificados-1') {
        idDoBotãoCertificados = 2
        document.querySelector('#popupCertificados').style.display = 'none'
        document.querySelector('#popupCertificados' + idDoBotãoCertificados).style.display = 'block'
    } else {
        document.querySelector('#popupCertificados' + idDoBotãoCertificados).style.display = 'none'
        idDoBotãoCertificados++
        document.querySelector('#popupCertificados' + idDoBotãoCertificados).style.display = 'block'
    }
})})

document.querySelectorAll('*[id^="voltarPopupCertificados"]').forEach(item => {item.addEventListener('click', function(){
    var idDoBotãoCertificados = this.id.replace("voltarPopupCertificados-", '')
    idDoBotãoCertificados++
    if (this.id == 'voltarPopupCertificados-1') {
        document.querySelector('#popupCertificados' + idDoBotãoCertificados).style.display = 'none'
        document.querySelector('#popupCertificados').style.display = 'block'
    } else {
        document.querySelector('#popupCertificados' + idDoBotãoCertificados).style.display = 'none'
        idDoBotãoCertificados--
        document.querySelector('#popupCertificados' + idDoBotãoCertificados).style.display = 'block'
    }
})})

//↓ TELA-PEQUENA ↓
document.getElementById('telaPequenaAbrirSite').addEventListener('click', function timeFunction(){
    setTimeout(() => {
        document.querySelector('main.tela-pequena').style.display = 'none';
        document.querySelector('footer').style.display = 'flex';
        document.querySelector('header.universal').style.display = 'flex';
        document.querySelector('main').style.display = 'initial';
        document.querySelector('html').style.height = 'initial';
    }, 500);
});