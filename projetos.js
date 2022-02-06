const popupContainer = document.getElementById('popupcontainer')
const html = document.querySelector('html')
let idioma = window.navigator.userLanguage || window.navigator.language;

if (window.location.pathname.includes('en-US')) {
    if (idioma == 'pt-BR') {window.location.replace(`/projetos.html`)} else {}
} else {
    if (idioma == 'pt-BR') {} else {window.location.replace(`/en-US/projects.html`)}
}

//↑ CONFIGURAÇÕES

// ↓ POPUPS ↓
function abrirContainerPopup() {
    var nodes = document.getElementById('popupcontainer').childNodes;
    for(var i=0; i<nodes.length; i++) {
        if (nodes[i].nodeName.toLowerCase() == 'div') {
            nodes[i].style.animation = '250ms linear abrirPopup';
        }}
    setTimeout(() => {
        popupContainer.style.display = 'flex'
        html.style.scrollBahavior = 'auto'
        html.style.overflowY = 'hidden'
    }, 250);
}

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

// ↓ SITE PROFISSIONAL ↓
function siteProfissionalPopup() {
    document.getElementById('siteProfissional').style.display = 'block'
}

// ↓ SITE DR. ANDRÉ ↓
function siteDrAndréPopup() {
    document.getElementById('siteDrAndré').style.display = 'block'
}

// ↓ REBRANDING DA BUSINESS SCHOOL ↓
function rebrandingBSPopup() {
    document.getElementById('rebrandingBS').style.display = 'block'
}

// ↓ UM ANDRÉ EM CURITIBA ↓
function umAndreemCuritibaPopup() {
    document.getElementById('umAndreemCuritiba').style.display = 'block'
}

// ↓ INTERVENÇÃO ARTÍSTICA ↓
function intervençãoArtísticaPopup() {
    document.getElementById('intervençãoArtística').style.display = 'block'
}

// ↓ WAVE ↓
function wavePopup() {
    document.getElementById('wave').style.display = 'block'
}

// ↓ EMCT ↓
function ecmtPopup() {
    document.getElementById('emct').style.display = 'block'
}