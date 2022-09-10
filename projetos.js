const PAGINA = {
    nome: 'projetos',
    nomeAlternativo: 'projects',
    atalho: window.location.href.split('#')[1],
    idioma: window.location.pathname,
    idiomaUsuario: window.navigator.userLanguage || window.navigator.language
}
const popupContainer = document.getElementById('popupcontainer')
const html = document.querySelector('html')
let atalho = window.location.href.split('#')[1]
let idioma = window.navigator.userLanguage || window.navigator.language;

/*
if (window.location.pathname.includes('en-US')) {
    if (idioma.includes('pt')) {window.location.replace(`/projetos.html${atalho != undefined ? `#${atalho}`: ''}?redirecionamento=idioma`)} else {}
} else {
    if (idioma.includes('pt')) {} else {window.location.replace(`/en-US/projects.html${atalho != undefined ? `#${atalho}`: ''}?redirecionamento=idioma`)}
}*/
//↑ CONFIGURAÇÕES

// ↓ POPUPS ↓
document.querySelectorAll('*[id^="abrirPopup"]').forEach(item => item.addEventListener('click', function(){
    setTimeout(() => {
        var idDoPopup = document.querySelector('#' + this.id.replace('abrirPopup', ''))

        popupContainer.style.display = 'flex'
        html.style.scrollBahavior = 'auto'
        html.style.overflowY = 'hidden'
        idDoPopup.style.animation = '250ms linear abrirPopup'
        idDoPopup.style.display = 'block'
    }, 250);
}))

function fecharPopup() {
    var nodes = document.getElementById('popupcontainer').childNodes;
        for(var i=0; i<nodes.length; i++) {
            if (nodes[i].nodeName.toLowerCase() == 'div') {
                nodes[i].style.animation = '250ms linear fecharPopup';
            }}
    setTimeout(() => {
        for(var i=0; i<nodes.length; i++) {
            if (nodes[i].nodeName.toLowerCase() == 'div') {
                nodes[i].style.display = 'none';
            }}
        popupContainer.style.display = 'none'
        html.style.scrollBahavior = 'smooth'
        html.style.overflowY = 'auto'
    }, 250);
}