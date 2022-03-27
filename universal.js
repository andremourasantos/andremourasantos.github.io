//↓ NOTIFICAÇÃO
let notificacaoIdioma = idioma.includes('pt') ? 'Você foi redirecionado para a versão em Português desta página por causa da sua configuração de idioma.' : idioma.includes('en') ? 'You were redirected to the English version of this page because of your language settings.' : 'You were redirected to the English version of this page because your current language setting is not supported.'

if (window.location.href.includes('?rl')) {var instancia = 1; mostrarNotificacao(instancia)
} else {}

// @ "?rl" é adicionado à URL para indicar que houve um redirecionamento do usuário para outra página devido às suas configurações de idioma.

function mostrarNotificacao(tipo){
    let texto = '';if(tipo==1){texto=notificacaoIdioma} else {}

    document.querySelector('body').innerHTML += `
    <!--POPUP DE NOTIFICAÇÃO-->
    <div class="popupNotificacao" onclick="fecharNotificacao()">
        <img loading="lazy" src="/imagens/info.webp" alt="Grey information icon." height="25" width="25">
        <p id="textoPopupNotificacao"></p>
    </div>
    `;
    document.querySelector('#textoPopupNotificacao').innerText = texto
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