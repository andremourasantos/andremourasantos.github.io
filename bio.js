/* Função de achar objeto
function findPos(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
        do {
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
    return [curtop];
    }
}
*/
let idioma = window.navigator.userLanguage || window.navigator.language
let computador = false


if (window.location.pathname.includes('en-US')) {
    if (idioma == 'pt-BR') {window.location.replace(`/bio.html${atalho != undefined ? `#${atalho}`: ''}`)} else {}
} else {
    if (idioma == 'pt-BR') {} else {window.location.replace(`/en-US/bio.html${atalho != undefined ? `#${atalho}`: ''}`)}
}

function checarDispositivo(){
    if (window.innerWidth<768) {} else {
        computador = true
        if (idioma == 'pt-BR') {} else {document.querySelector('#compartilharCopiarLink > span').innerText = 'Copy webstie link'}
    }
}

checarDispositivo()
window.addEventListener('resize', checarDispositivo)
// ↑ CONFIGURAÇÕES

// ↓ COMPARTILHAR
document.getElementById('botaobioCompartilhar').addEventListener('click', async()=>{
    const compartilharDadosptBR = {
        title: 'André Moura Santos | Marketing Digital',
        text: 'Profissional de Marketing e Estratégia Digital para ajudar sua empresa a gerenciar campanhas de publicidade online, criar e gerenciar perfils em redes sociais, landing pages, criação de conteúdo e outros para seu público-alvo.',
        url: window.location.href
    }

    const compartilharDadosenUS = {
        title: 'André | Digital Marketing Strategist',
        text: 'Digital Marketing Strategy professional to help your company manage publicity campains online, create and manage social media profiles, pages and landing pages, copywriting and segmented publicity.',
        url: window.location.href
    }

    try {
        if (idioma == 'pt-BR') {
            await navigator.share(compartilharDadosptBR)
        } else {
            await navigator.share(compartilharDadosenUS)
        }
    } catch(err) {
        setTimeout(() => {
            document.querySelector("#biopopup1Container").style.display = "flex"
            document.querySelector("html").style.overflowY = "hidden"
        }, 350)
    }
})

document.getElementById("fecharbiopopup0").addEventListener("click", function timeFunction(){
    setTimeout(function(){
        document.querySelector("#biopopup0").style.animation = '250ms fecharPopup0 linear'
        setTimeout(() => {
            document.querySelector("#biopopup0").style.display = "none";
            document.querySelector("#biopopup0").style.animation = '250ms abrirPopup0 linear'
            document.querySelector("#biopopup1").style.display = "flex";
        }, 250);
    }, 350);
});

document.getElementById("fecharbiopopup1").addEventListener("click", function timeFunction(){
    setTimeout(function(){
        document.querySelector("#biopopup1").style.animation = '250ms fecharPopup0 linear'
        setTimeout(() => {
            document.querySelector("#biopopup1Container").style.display = "none";
            document.querySelector("html").style.overflowY = "auto";
            document.querySelector("#biopopup1").style.animation = '250ms abrirPopup0 linear'
        }, 250);
    }, 350);
});

document.getElementById('compartilharCopiarLink').addEventListener('click', function(){
    if (idioma == 'pt-BR') {
        navigator.clipboard.writeText(`Veja este link: ${window.location.href}`).then(function(){
            alert('Link copiada para área de transferência.')
        }, function(){
            alert('Não foi possível copiar o link para a sua área de transferência.')
        })
    } else {
        navigator.clipboard.writeText(`Take a look at: ${window.location.href}`).then(function(){
            if (computador==false) {
                alert('Link copied to your clipboard. Opening your messages app.')
                window.open('sms:')
            } else{
                alert('Link copied to your clipboard.')
            }
        }, function(){
            alert('Something went wrong while coping the link to your clipboard.')
        })
    }
})