async function subscribeToArticleRelease(articleId:string, articleTitle:string) {
  const btn = document.getElementById(articleId);

  if(!btn){return};
  
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let email = window.prompt(`Insira seu endereço de e-mail para receber uma notificação quando o artigo "${articleTitle}" ficar pronto!\n\nE-mail:`);

  if(!email){
    return alert("Ok, nada foi feito.");
  } else if (!emailRegex.test(email)){
    return alert("Algo não parece certo...\nConfira o e-mail inserido e tente novamente.");
  }

  let confirm = window.confirm(`Você receberá apenas a notificação referente a este artigo. Caso queria saber quando outros artigos forem ao ar, é necessário que se cadastre individualmente em cada um deles.\n\nAo confirmar o seu cadastro, você concorda em receber emails esporádicos sobre novidades por aqui.\nVocê pode conferir como seu e-mail é tratado na Política de Privacidade.`);
  if(confirm === false){
    return alert("Ok, nada foi feito.")
  }

  try {
    const register = await fetch(`${import.meta.env.PUBLIC_WEBHOOK}?email=${encodeURI(email)}&articleId=${encodeURI(articleId)}&articleTitle=${encodeURI(articleTitle)}`);
    if(!register.ok) {
      throw new Error();
    }
  } catch (error) {
    btn.removeAttribute("disabled");
    return alert("Ocorreu um erro ao registrar o seu interesse, por favor, tente novamente.");
  }
  
  return alert("Seu e-mail foi cadastrado com sucesso! Fico feliz que tenha se interessado.\n\nVocê será um dois primeiros a saber quando o artigo for ao ar.");
}

document.addEventListener("DOMContentLoaded", () => {
  let notifyMeBtn = Array.from(document.querySelectorAll(".btnGroup button")).filter(btn => {
    if(btn.innerHTML.includes("Notifique-me")){
      return btn;
    };
  });

  notifyMeBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      subscribeToArticleRelease(btn.id, (btn as HTMLElement).dataset.articleTitle || "");
    })
  });
});