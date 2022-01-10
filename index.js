function findPos(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
        do {
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return [curtop];
    }
}
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
        window.scroll(0, findPos(document.getElementById('popupConhecimentos')));
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
        window.scroll(0, findPos(document.getElementById('popupConhecimentos')));
        document.querySelector('#popupCertificados1').style.display = 'block';
    }, 250);
});

document.getElementById('fecharPopupCertificados-1').addEventListener('click', function timeFunction(){
    setTimeout(() => {
        document.querySelector('.popup-container').style.display = 'none';
        document.querySelector('html').style.overflowY = 'auto';
        document.querySelector('#popupCertificados1').style.display = 'none';
        window.scroll(0, findPos(document.getElementById('conhecimentos')));
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
        window.scroll(0, findPos(document.getElementById('conhecimentos')));
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
        window.scroll(0, findPos(document.getElementById('popupRodapé')));
    }, 250);
});

document.getElementById('fecharPopupRodapé').addEventListener('click', function timeFunction(){
    setTimeout(function(){
        document.querySelector('#popupRodapé').style.display = 'none';
        document.querySelector('html').style.overflowY = 'auto';
        document.querySelector('html').style.scrollBehavior = 'smooth';
        window.scroll(0, findPos(document.getElementById('abrirPopupGitHub')));
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