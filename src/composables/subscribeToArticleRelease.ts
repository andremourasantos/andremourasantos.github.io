async function subscribeToArticleRelease(event:Event, articleId:string, articleTitle:string) {
  const targetButton = Array.from(document.querySelectorAll(`[data-btn-article-id="${articleId}"][data-btn="subscribeToNewsletter"]`)) as HTMLButtonElement[];
  const loadingStateButton = Array.from(document.querySelectorAll(`[data-btn-article-id="${articleId}"][data-btn="loadingSubscribeToNewsletter"]`)) as HTMLButtonElement[];
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let email = window.prompt(`Insira seu endereço de e-mail para receber uma notificação quando o artigo "${articleTitle}" ficar pronto!\n\nE-mail:`);

  if(!email){
    return alert("Ok, nada foi feito.");
  } else if (!emailRegex.test(email)){
    return alert("Algo não parece certo...\nConfira o e-mail inserido e tente novamente.");
  }

  let confirm = window.confirm(`Você receberá apenas a notificação referente a este artigo. Caso queria saber quando outros artigos forem ao ar, é necessário que se cadastre individualmente em cada um deles.\n\nAo confirmar o seu cadastro, você concorda em receber emails esporádicos sobre novidades por aqui. Você pode conferir como seu e-mail é tratado na Política de Privacidade.`);
  if(confirm === false){
    return alert("Ok, nada foi feito.")
  }

  try {
    targetButton.forEach(btn => {btn.style.display = "none"});
    loadingStateButton.forEach(btn => {btn.style.display = "flex"});
    
    const register = await fetch(`${import.meta.env.PUBLIC_WEBHOOK}?email=${encodeURI(email)}&articleId=${encodeURI(articleId)}&articleTitle=${encodeURI(articleTitle)}`);
    
    if(!register.ok) {
      throw new Error();
    };
  } catch (error) {
    targetButton.forEach(btn => {btn.style.display = "flex"});
    loadingStateButton.forEach(btn => {btn.style.display = "none"});
    return alert("Ocorreu um erro ao registrar o seu interesse, por favor, tente novamente.");
  }

  loadingStateButton.forEach(btn => {btn.style.display = "none"});
  targetButton.forEach(btn => {btn.disabled = true});
  saveArticleSubscriptionToLocalStorage(articleId);
  dispatchSubscriptionEvent(articleId);
  
  return alert("Seu e-mail foi cadastrado com sucesso! Fico feliz que tenha se interessado.\n\nVocê será um dois primeiros a saber quando o artigo for ao ar.");
}

const subscriptions = localStorage.getItem("articleSubscriptions");

function saveArticleSubscriptionToLocalStorage(articleId:string) {
  if(subscriptions) {
    const subscriptionsArray = subscriptions.split(",");
    subscriptionsArray.push(articleId);
    localStorage.setItem("articleSubscriptions", subscriptionsArray.toString());
  } else {
    localStorage.setItem("articleSubscriptions", articleId);
  }
}

function dispatchSubscriptionEvent(articleId:string) {
  const myEvent = new Event('subscribedTo-' + articleId);
  document.dispatchEvent(myEvent);
}

document.addEventListener("DOMContentLoaded", () => {
  let notifyMeBtn = Array.from(document.querySelectorAll("button")).filter(btn => {
    if(btn.dataset.btn === "subscribeToNewsletter"){
      return btn;
    };
  });

  if(subscriptions) {
    const subscriptionsArray = subscriptions.split(",");
    notifyMeBtn.forEach((btn) => {
      const btnEl = btn as HTMLButtonElement;
      subscriptionsArray.forEach(sub => {
        if(btnEl.dataset.btnArticleId === sub){
          dispatchSubscriptionEvent(sub);
          btnEl.disabled = true;
        };
      })
    })
  };

  notifyMeBtn.forEach((btn) => {
    const btnEl = btn as HTMLButtonElement;
    if(!btnEl.disabled){
      btnEl.addEventListener("click", (event) => {
        subscribeToArticleRelease(event, btnEl.dataset.btnArticleId || "geral", btnEl.dataset.articleTitle || "Geral");
      });
    };
  });
});