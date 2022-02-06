function findPos(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
        do {
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return [curtop];
    }
}

let idioma = window.navigator.userLanguage || window.navigator.language
let computador = false

if (window.location.pathname.includes('en-US')) {
    if (idioma == 'pt-BR') {window.location.replace(`/index.html`)} else {}
} else {
    if (idioma == 'pt-BR') {} else {window.location.replace(`/en-US/index.html`)}
}

function checarDispositivo(){
    if (window.innerWidth<768) {} else {computador = true}
    adicionarVideo()
}

checarDispositivo()
window.addEventListener('resize', adicionarVideo)
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
    if (window.innerWidth<=425) {
        document.getElementById('video-iframe').innerHTML = ''
    } else {
        document.getElementById('video-iframe').innerHTML = '<div id="video-iframe"><iframe defer width="560" height="315" src="https://www.youtube.com/embed/V_UE0XM3TX0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
    }
}

/* ESSE CÓDIGO FICARÁ SALVO PARA FUTURO USO
//↓ FUNÇÃO EM TESTE ↓
document.getElementById('abrir-popup').addEventListener('click', function timeFunction(){
    setTimeout(function(){
        document.querySelector('html').style.scrollBehavior = 'auto';
        document.querySelector('#irParaPopupCurrículo').style.display = 'inline-block';
        document.querySelector('#irParaPopupCertificados').style.display = 'none';
        document.querySelector('#popupConhecimentos').style.display = 'flex';
        document.querySelector('#popupNovidade').style.display = 'block';
        document.querySelector('html').style.overflowY = 'hidden';
        window.scroll(0, findPos(document.getElementById('popupConhecimentos')));
    }, 250);
});

//↓ CURRICULO ↓
document.getElementById('irParaPopupCurrículo').addEventListener('click', function timeFunction(){
    setTimeout(function(){
        document.querySelector('#popupNovidade').style.display = 'none';
        document.querySelector('#popupCurrículo').style.display = 'block';
    }, 250);
});

document.getElementById('fecharPopupCurrículo-2').addEventListener('click', function timeFunction(){
    setTimeout(() => {
        document.getElementById('popupCurrículo').style.display = 'none';
        document.querySelector('#popupNovidade').style.display = 'block';
        document.querySelector('html').style.overflowY = 'auto';
        document.querySelector('#popupConhecimentos').style.display = 'none';
        document.querySelector('html').style.scrollBehavior = 'smooth';
    }, 250);
});
*/

//↓ CURRÍCULO ↓
document.getElementById('abrirPopupCurrículo').addEventListener('click', function timeFunction(){
    setTimeout(() => {
        document.querySelector('html').style.scrollBehavior = 'auto';
        document.querySelector('html').style.overflowY = 'hidden';
        document.querySelector('#popupConhecimentos').style.display = 'flex';
        document.querySelector('#popupCurrículo').style.display = 'block';
    }, 250);
});

document.getElementById('fecharPopupCurrículo-2').addEventListener('click', function timeFunction(){
    setTimeout(() => {
        document.querySelector('html').style.scrollBehavior = 'smooth';
        document.querySelector('html').style.overflowY = 'auto';
        document.querySelector('#popupConhecimentos').style.display = 'none';
        document.querySelector('#popupCurrículo').style.display = 'none';
    }, 250);
});

/* ESSE CÓDIGO FICARÁ SALVO PARA FUTURO USO
//↓ CERTIFICADOS ↓
document.getElementById('abrirPopupCertificados').addEventListener('click', function timeFunction(){
    setTimeout(function(){
        document.querySelector('.popup-container').style.display = 'flex';
        document.querySelector('#popupNovidade').style.display = 'block';
        document.querySelector('#irParaPopupCurrículo').style.display = 'none';
        document.querySelector('#irParaPopupCertificados').style.display = 'inline-block';
        document.querySelector('html').style.scrollBehavior = 'auto';
        document.querySelector('html').style.overflowY = 'hidden';
        window.scroll(0, findPos(document.getElementById('popupConhecimentos')));
    }, 250);
});

document.getElementById('irParaPopupCertificados').addEventListener('click', function timeFunction(){
    setTimeout(function(){
        document.querySelector('#popupNovidade').style.display = 'none';
        document.querySelector('#popupCertificados1').style.display = 'block';
    }, 250);
});
*/

//↓ CERTIFICADOS ↓
document.getElementById('abrirPopupCertificados').addEventListener('click', function timeFunction(){
    setTimeout(() => {
        document.querySelector('html').style.scrollBehavior = 'auto';
        document.querySelector('html').style.overflowY = 'hidden';
        document.querySelector('#popupConhecimentos').style.display = 'flex';
        document.querySelector('#popupCertificados1').style.display = 'block';
    }, 250);
});

document.getElementById('fecharPopupCertificados-1').addEventListener('click', function timeFunction(){
    setTimeout(() => {
        document.querySelector('.popup-container').style.display = 'none';
        document.querySelector('html').style.overflowY = 'auto';
        document.querySelector('#popupCertificados1').style.display = 'none';
        document.querySelector('html').style.scrollBehavior = 'smooth';
    }, 250);
});

document.getElementById('avançarPopupCertificados-1').addEventListener('click', function timeFunction(){
    setTimeout(function() {
        document.querySelector('#popupCertificados1').style.display = 'none';
        document.querySelector('#popupCertificados2').style.display = 'block';
    }, 250);
});

document.getElementById('voltarPopupCertificados-1').addEventListener('click', function timeFunction(){
    setTimeout(function() {
        document.querySelector('#popupCertificados2').style.display = 'none';
        document.querySelector('#popupCertificados1').style.display = 'block';
    }, 250);
});

document.getElementById('avançarPopupCertificados-2').addEventListener('click', function timeFunction(){
    setTimeout(function() {
        document.querySelector('#popupCertificados2').style.display = 'none';
        document.querySelector('#popupCertificados3').style.display = 'block';
    }, 250);
});

document.getElementById('voltarPopupCertificados-2').addEventListener('click', function timeFunction(){
    setTimeout(function() {
        document.querySelector('#popupCertificados3').style.display = 'none';
        document.querySelector('#popupCertificados2').style.display = 'block';
    }, 250);
});

document.getElementById('avançarPopupCertificados-3').addEventListener('click', function timeFunction(){
    setTimeout(function() {
        document.querySelector('#popupCertificados3').style.display = 'none';
        document.querySelector('#popupCertificados4').style.display = 'block';
    }, 250);
});

document.getElementById('voltarPopupCertificados-3').addEventListener('click', function timeFunction(){
    setTimeout(function() {
        document.querySelector('#popupCertificados4').style.display = 'none';
        document.querySelector('#popupCertificados3').style.display = 'block';
    }, 250);
});

document.getElementById('avançarPopupCertificados-4').addEventListener('click', function timeFunction(){
    setTimeout(function() {
        document.querySelector('#popupCertificados4').style.display = 'none';
        document.querySelector('#popupCertificados5').style.display = 'block';
    }, 250);
});

document.getElementById('voltarPopupCertificados-4').addEventListener('click', function timeFunction(){
    setTimeout(function() {
        document.querySelector('#popupCertificados5').style.display = 'none';
        document.querySelector('#popupCertificados4').style.display = 'block';
    }, 250);
});

document.getElementById('avançarPopupCertificados-5').addEventListener('click', function timeFunction(){
    setTimeout(function() {
        document.querySelector('#popupCertificados5').style.display = 'none';
        document.querySelector('#popupCertificados6').style.display = 'block';
    }, 250);
});

document.getElementById('voltarPopupCertificados-5').addEventListener('click', function timeFunction(){
    setTimeout(function() {
        document.querySelector('#popupCertificados6').style.display = 'none';
        document.querySelector('#popupCertificados5').style.display = 'block';
    }, 250);
});

document.getElementById('avançarPopupCertificados-6').addEventListener('click', function timeFunction(){
    setTimeout(function() {
        document.querySelector('#popupCertificados6').style.display = 'none';
        document.querySelector('#popupCertificados7').style.display = 'block';
    }, 250);
});

document.getElementById('voltarPopupCertificados-6').addEventListener('click', function timeFunction(){
    setTimeout(function() {
        document.querySelector('#popupCertificados7').style.display = 'none';
        document.querySelector('#popupCertificados6').style.display = 'block';
    }, 250);
});

document.getElementById('avançarPopupCertificados-7').addEventListener('click', function timeFunction(){
    setTimeout(function() {
        document.querySelector('#popupCertificados7').style.display = 'none';
        document.querySelector('#popupCertificados8').style.display = 'block';
    }, 250);
});

document.getElementById('voltarPopupCertificados-7').addEventListener('click', function timeFunction(){
    setTimeout(function() {
        document.querySelector('#popupCertificados8').style.display = 'none';
        document.querySelector('#popupCertificados7').style.display = 'block';
    }, 250);
});

document.getElementById('avançarPopupCertificados-8').addEventListener('click', function timeFunction(){
    setTimeout(function() {
        document.querySelector('#popupCertificados8').style.display = 'none';
        document.querySelector('#popupCertificados9').style.display = 'block';
    }, 250);
});

document.getElementById('voltarPopupCertificados-8').addEventListener('click', function timeFunction(){
    setTimeout(function() {
        document.querySelector('#popupCertificados9').style.display = 'none';
        document.querySelector('#popupCertificados8').style.display = 'block';
    }, 250);
});

document.getElementById('avançarPopupCertificados-9').addEventListener('click', function timeFunction(){
    setTimeout(function() {
        document.querySelector('#popupCertificados9').style.display = 'none';
        document.querySelector('#popupCertificados10').style.display = 'block';
    }, 250);
});

document.getElementById('voltarPopupCertificados-9').addEventListener('click', function timeFunction(){
    setTimeout(function() {
        document.querySelector('#popupCertificados10').style.display = 'none';
        document.querySelector('#popupCertificados9').style.display = 'block';
    }, 250);
});

document.getElementById('avançarPopupCertificados10').addEventListener('click', function timeFunction(){
    setTimeout(function() {
        document.querySelector('#popupCertificados10').style.display = 'none';
        document.querySelector('#popupCertificados11').style.display = 'block';
    }, 250);
});

document.getElementById('voltarPopupCertificados-10').addEventListener('click', function timeFunction(){
    setTimeout(function() {
        document.querySelector('#popupCertificados11').style.display = 'none';
        document.querySelector('#popupCertificados10').style.display = 'block';
    }, 250);
});

document.getElementById('fecharPopupCertificados-2').addEventListener('click', function timeFunction(){
    setTimeout(function(){
        document.querySelector('.popup-container').style.display = 'none';
        document.querySelector('html').style.overflowY = 'auto';
        document.querySelector('#popupCertificados11').style.display = 'none';
        document.querySelector('html').style.scrollBehavior = 'smooth';
    }, 250);
});

//↓ RODAPÉ ↓
document.getElementById('abrirPopupGitHub').addEventListener('click', function timeFunction(){
    setTimeout(function() {
        document.querySelector('#popupRodapé').style.display = 'flex';
        document.querySelector('#popupGitHub').style.display = 'block';
        document.querySelector('html').style.overflowY = 'hidden';
        document.querySelector('html').style.scrollBehavior = 'auto';
    }, 250);
});

document.getElementById('fecharPopupRodapé').addEventListener('click', function timeFunction(){
    setTimeout(function(){
        document.querySelector('#popupRodapé').style.display = 'none';
        document.querySelector('html').style.overflowY = 'auto';
        document.querySelector('html').style.scrollBehavior = 'smooth';
    }, 250);
});

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