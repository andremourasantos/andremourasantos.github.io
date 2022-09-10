//↓ CHECA IDIOMA DO USUÁRIO
window.addEventListener('DOMContentLoaded',()=>{
    //Checa idioma do usuário
    switch (sessionStorage.getItem('redirecionamento')) {
        case '0':
            break;
    
        default:
            if(PAGINA.idioma.includes('en')) {
                if(PAGINA.idiomaUsuario.includes('pt')) {window.location.replace(`/${PAGINA.nome}.html${PAGINA.atalho != undefined ? `#${PAGINA.atalho}`: ''}`); sessionStorage.setItem('redirecionamento', 1);}
            } else {
                if (idioma.includes('pt')) {} else {window.location.replace(`/en-US/${PAGINA.nomeAlternativo}.html${PAGINA.atalho != undefined ? `#${PAGINA.atalho}`: ''}`); sessionStorage.setItem('redirecionamento', 1);}
            }
            break;
    }
})

window.addEventListener('load', ()=>{
    mostrarNotificacao(sessionStorage.getItem('redirecionamento'))
    sessionStorage.setItem('redirecionamento', 0)
})

//TODO utilizar Fetch API para importar o HTML da notificação e JS para alterar o texto.
function mostrarNotificacao(tipo=0){
    let Texto = {
        pt: '',
        en: '',
        mensagem: (pt, en) => {return PAGINA.idiomaUsuario.includes('pt') ? pt : en}
    }

    tipo = Number(tipo)
    switch (tipo) {
        case 0:
            return;
            break;

        case 1:
            Texto.pt = 'Você foi redirecionado para a versão em Português desta página por causa da sua configuração de idioma.';
            Texto.en = 'You were redirected to the English version of this page because of your language settings.'
            break;
    
        case 400:
            Texto.pt = 'A página que você tentou acessar não existe.';
            Texto.en = "The page you attempt to access doesn't exist.";
            break;

        default:
            Texto.pt = 'Houve um erro e você foi redirecionado para a página inicial.';
            Texto.en = "An error occurred and you were redirected to the home page.";
            break;
    }
    
    let containerNotificacao = document.querySelector('body').appendChild(document.createElement('div'))
    containerNotificacao.innerHTML = `
    <img loading="lazy" src="/imagens/info.webp" alt="Grey information icon." height="25" width="25">
        <p id="textoPopupNotificacao">${Texto.mensagem(Texto.pt,Texto.en)}</p>
    `

    containerNotificacao.classList.add("popupNotificacao")
    containerNotificacao.setAttribute('onclick', 'fecharNotificacao()')

    document.querySelector('div.popupNotificacao').style.display = 'flex'
    setTimeout(() => {
        document.querySelector('div.popupNotificacao').style.animation = '150ms linear fecharNotificacao'
    }, 3500);
    setTimeout(() => {
        document.querySelector('div.popupNotificacao').style.display = 'none'
    }, 3650);
}

function fecharNotificacao(){
    document.querySelector('div.popupNotificacao').style.animation = '150ms linear fecharNotificacao'
    setTimeout(() => {
        document.querySelector('div.popupNotificacao').style.display = 'none'
    }, 150);
}