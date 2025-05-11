---
title: Criador de UTMs
description: Facilite a parametrização das suas URLs e obtenha insights sobre suas campanhas pagas e orgânicas.
image: 1981-digital-bMWHu8wU1Vk-unsplash
date: 2024-01-13
tags: programming
---

Imagine a seguinte cena: você investe tempo, energia e recursos em diversas ações de marketing.

Cria posts nas redes sociais, envia e-mails caprichados, produz panfletos com QR Codes para usar no próximo grande evento ou investe em anúncios online.

O tráfego no seu site aumenta, a movimentação cresce, mas... de onde, exatamente, essas pessoas estão vindo?

Quais as ações que estão realmente trazendo leads qualificados e quais estão enchendo o Comercial de leads ruins?

Descobrir isso foi uma dor constante no começo da minha carreira, e eu sei que muitos de vocês também já sentiram dificuldade em provar quais ações estão rendendo e quais não estão.

A dificuldade em rastrear a origem do tráfego é um dos maiores entraves para otimizar o seu esforço e provar o retorno sobre o investimento com anúncios (ROAS), por exemplo.

Mas existe uma ferramenta simples e acessível para colocar um fim nessa confusão: e aqui eu vou te mostrar como descobrir **exatamente** de onde vêm o seu tráfego.

## Como descobrir de onde vêm o seu tráfego?

Indo direto ao ponto: a solução são as UTMs.

Esse nome pode soar um pouco técnico, mas a ideia é bem simples.

"UTM" significa *Urchin Tracking Module* (apesar de ninguém nunca se referir a eles como isso, te garanto), e são pequenos trechos de texto que você adiciona ao final das suas URLs para rastrear informações específicas sobre a origem do clique.

Pense neles como etiquetas que você cola em cada link que distribui por aí.

E elas funcionam tanto para o universo digital (com tráfego pago e Inbound Marketing) quanto para elementos físicos, como QR Codes ou até tags NFC!

![Diagrama com um smartphone central exibindo o site da agência de viagens 'OKDOKEY'. O smartphone atua como um hub, conectando-se a logos de diversas plataformas de mídia social e publicidade à esquerda (WhatsApp, TikTok, Instagram e Facebook) e à direita (Google Ads, Meta Ads, Pesquisa do Google e Pesquisa do Bing). As linhas conectando o smartphone a essas plataformas ilustram como um site próprio pode centralizar o tráfego proveniente de diferentes canais online, permitindo o rastreamento de visitantes independentemente de sua origem.](/src/assets/photos/okdokey-agencia-de-viagens_hub.png)

> Essa foto, por sinal, é de um estudo de caso que fiz sobre a [importância de sites para negócios digitais](/portfolio/okdokey-agencia-de-viagens), caso queira conferir.

Essas "etiquetas" são compostas por cinco parâmetros:
* `utm_source`: indica a origem do tráfego (ex.: *google, facebook, newsletter, panfleto*);
* `utm_medium`: especifica como essa pessoa interagiu com o link (ex.: *cpc, organic, email, stories, qrcode*);
* `utm_campaign`: nomeia a campanha específica desse link (ex.: *promocao_volta_as_aulas, black_friday_2025*);
* `utm_term`: é usado mais em anúncios para identificar a palavra-chave que gerou o clique (ex: *marketing+digital, ferramenta+utm*), e;
* `utm_content`: que diferencia conteúdos semelhantes dentro da mesma campanha ou anúncio, como botões diferentes ou versões de criativos (ex.: *botao_saiba_mais, banner_topo, qr_code_verso*).

> Se você ainda não entende sobre parâmetros de URL e como eles funcionam, recomendo dar uma olhada nisso antes de usar as UTMs.

Ao adicionar esses parâmetros na sua URL, você explicita algumas informações importantes sobre a interação do usuário com o link, por exemplo:

```
https://sualoja.com.br/tenis-addidas/?utm_source=ig&utm_medium=stories&utm_campaign=bf25&utm_content=33_off
```

* A pessoa que clicou neste link veio do *Instagram* (`utm_source`);
* Por meio de um *Stories* (`utm_medium`);
* Sobre a campanha de *Black Friday 2025* (`utm_campaign`);
* Que fala do *desconto de 33%* em todo site (`utm_content`).

> Perceba que aqui eu não utilizei o `utm_term`, e isso se deve ao fato de que o uso de qualquer um desses parâmetros é totalmente opcional.

Com essas informações, ferramentas como o **Google Analytics 4** ou o **Gerenciador de Anúncios da Meta** vão conseguir registrar essas interações e, posteriormente, apresentá-las em gráficos e painéis didáticos.

As UTMs são tratadas como um **padrão universal na internet**.

Portanto, você geralmente não precisa configurar nada nessas ferramentas para que elas capturem e usem essas informações em [relatórios](/portfolio/relatorios-de-ads-no-google-looker-studio).

Basta que você comece a usá-los.

## Quais as melhores práticas para usar os UTMs?

Parametrizar links com UTMs não é apenas adicionar qualquer texto na URL.

Para que a mágica do rastreamento aconteça de verdade e você obtenha percepções sólidas dos seus dados, é fundamental seguir algumas boas práticas:
* **Padronização**: defina uma convenção de nomenclatura para `source`, `medium` e `campaign` e a enforce.
	* Use sempre letras minúsculas, não use espaços (substitua por `-` ou `_`) e não use caracteres especiais (como acentos ou `!@#$%`).
* **Seja conciso**: os nomes devem ser claros o suficiente para você entender rapidamente do que se trata, mas não tão longos a ponto de poluir a URL (pense em palavras-chave).
  * Atenção: *"Facebook"* é diferente de *"facebook"* para as ferramentas de análise. Por isso se você escolher escrever de uma forma, **mantenha essa forma**.
* **Use apenas os parâmetros necessários**: nem sempre você precisará de todos os UTMs, como no exemplo que mostrei mais acima. Para a maioria das ações orgânicas, `source`, `medium` e `campaign` já são suficientes.
  * O parâmetro `utm_term` é mais usado em *paid search* e o `utm_content` pode ser usado para diferenciar elementos específicos (ou o assunto) de um criativo, por exemplo.
* **Documente a sua estratégia**: mantenha um registro de quais UTMs você está utilizando para cada campanha e canal para evitar erros e facilitar a gestão dos parâmetros.

Essas são dicas simples, mas lembre-se: os UTMs são *"sensíveis"*.

Uma letra capitalizada, um espaço incorreto ou um caractere diferente e subitamente o seu site agora tem *"fb"*, *"facebook"*, *"Facebook"* e *"face"* como origens de tráfego.

Isso não só acaba com todo o propósito de facilitar o rastreio e a [obtenção de insights](/portfolio/relatorios-de-ads-no-google-looker-studio), como ainda dificulta a sua análise para determinar qual estratégia está funcionando.

## Quais os benefícios de usar UTMs?

Agora, pode até parecer um trabalhão e uma dedicação imensa trabalhar com UTMs.

Mas eu garanto a você: os benefícios superam as dificuldades.

E eles impactam diretamente na eficácia das suas ações de marketing.

Você não só será capaz de apontar, com exatidão, quais esforços estão rendendo frutos no orgânico, como também atribuir anúncios específicos a leads e clientes.

E isso é ouro para qualquer gestor ou empreendedor: um funcionário que consegue dizer exatamente o que está bom, e deve continuar, e o que está ruim, e precisa de atenção.

É uma baita forma de se destacar no mercado, mostrando profissionalismo e conhecimento técnico sobre as ferramentas que irá trabalhar.

### Benefícios de uso na mídia paga

Em campanhas pagas, cada clique custa dinheiro.

Essa é inclusive a origem do famoso `utm_medium=cpc`, do inglês *Cost per click*.

Por isso, saber exatamente quais anúncios, criativos, plataformas e até mesmo palavras-chave estão gerando leads qualificados é vital.

Isso mesmo: com os UTMs, você pode dizer exatamente de onde vieram tanto os leads qualificados quanto os desqualificados.

Assim, se os SDRs começarem a comentar sobre muitos leads desqualificados, você pode descobrir precisamente de onde esses leads chegaram e, por exemplo, desativar as camapnhas **sem que isso afete a chega de leads qualificados**.

![](/src/assets/photos/criador-de-utms-midia_paga.png)

Além disso, com UTMs, você pode identificar as fontes e campanhas de melhor performance e realocar seu orçamento para o que realmente funciona, otimizando os investimentos com anúncios.

> Estamos falando aqui das campanhas com menor CAC (Custo por Aquisição de Cliente) e não das que geram o maior número de leads ou as que tem o menor CPL (Custo por Lead). É com essa otimização que profissionais distintos no mercado trabalham — fica a dica.

Isso, por sua vez, incrementa o [ROAS](/trabalhos/obtendo-o-roas-de-campanhas-publicitarias) para o seu cliente, agregando valor ao seu trabalho com dados e citações precisas e fidedignas.

### Benefícios de uso na mídia orgânica

Mas se você já se esqueceu: os UTMs também podem ser usados na mídia orgânica.

E eles são igualmente — ou até mais — importantes para entender o impacto das suas ações de Inbound Marketing.

Nos canais orgânicos, os seus clientes têm muito mais pontos de contato: seja em uma mensagem no WhatsApp, um link nos Stories, um vídeo no YouTube ou até mesmo um artigo no seu blog.

Aliada a essa incrível quantidade de canais, também está uma incrível quantidade de horas de trabalho e investimento financeiro.

Produzir conteúdo de qualidade não é barato, e custa até você acertar o ponto.

Por isso a importância de você começar a implementar os UTMs nos seus canais orgânicos.

Imagine só, no seu próximo relatório de marketing, você apresentando que, por exemplo, aquele artigo de blog que fez gerou, precisamente, 27 leads para o Comercial no mês passado.

Além disso, se você tiver um CRM bem configurado, poderá ainda dizer o quanto esses leads avançaram no funil e quantos fecharam negócio, além do valor desses negócios.

![](/src/assets/photos/criador-de-utms-midia_organica.png)

Percebe o **poder** que isso traz?

As UTMs transformam os dados mais obscuros de tráfego em algo sólido, palpável, permitindo que você tome decisões baseadas em evidências e não em achismos.

> E esse é outro grande diferencial para profissionais de Marketing no mercado, viu?

## Como começar a implementar UTMs na minha operação?

Compreender a importância dos UTMs e como utilizá-los corretamente é o primeiro passo.

O segundo é colocar a mão na massa.

E é aqui que a complicação pode surgir, especialmente se você precisa criar e gerenciar muitos links parametrizados (o que provavelmente vai ser o seu caso).

Essa bagunça pode levar a erros, inconsistências e, no fim das contas, todo o seu trabalho não vai ter valido nada porque você não vai conseguir tirar os insights dos dados.

E foi pensando nisso que eu desenvolvi uma planilha simples e prática justamente para simplificar esse processo.

![](https://andremourasantos.com.br/assets/image-2-YnY4Z4FY.png)

Ela não é apenas uma ferramenta para gerar links com UTMs, mas também um guia para principiantes.

Nela, você encontra:
* Um local centralizado para criar seus parâmetros de UTM;
* Explicações claras sobre cada parâmetro, te ajudando caso tenha esquecido como usar algum deles, e;
* Autocompletar na hora de criar links, forçando a usar a coletânea padronizada de parâmetros que criou.
	* Isso aqui vai te ajudar muito nesse primeiro momento.

Essa planilha foi pensada para ser a sua porta de entrada para o mundo dos parâmetros de UTM para rastreamento.

Ela elimina as barreiras técnicas (e de idioma, pois os nomes dos UTMs são todos e inglês e precisam ser escritos certinho sempre) e te permite focar no que realmente importa: entender o comportamento do seu público.

Você pode acessar a minha [Planilha de Criação de UTMs](https://docs.google.com/spreadsheets/d/1cFzBMUsTDFfMZQt-2u0paDxYeLouGz_iwSWTHfwaHNg/edit?usp=sharing) totalmente de graça.

Basta fazer uma cópia para a sua conta do Google e voilà!

## O início da sua especialização em marketing digital

Dominar o uso de UTMs é fundamental para qualquer profissional que deseja ir além do "eu acho que isso funciona" e começar a tomar decisões estratégicas baseadas em dados concretos.

Eles são a bússola que vão guiar os seus esforços tantos com a mídia paga quanto com o Inbound Marketing.

Eu recomendo você a começar pequeno: padronize seus links das redes sociais primeiro e, com o tempo, você verá a clareza que os UTMs trarão para suas análises.

E para te dar um empurrãozinho nesse caminho, a planilha está aí para simplificar a sua jornada!

> Se você achou interessante o meu trabalho, recomendo conferir essa [planilha de acompanhamento de OKRs](/portfolio/planilha-para-acompanhamento-de-okrs) — que também é excelente para principiantes no assunto.