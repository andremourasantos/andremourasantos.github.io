---
isDraft: false
title: "Estrutura de PROMPT para IA"
description: "Aprenda a criar prompts para maximizar a eficiência da IA em fluxos de trabalho e tarefas repetitivas."
imageName: "Whisk_11a9aff5eb"
pubDate: 2025-05-17
updatedDate: 2025-05-17
tags: ["automação"]
---

Usar a Inteligência Artificial (IA) no trabalho não é mais algo "novo" ou "experimental", mas sim uma realidade em quase todo ambiente de trabalho moderno.

Todo mundo fala de mil e uma formas de usar a IA, desde automatizar "a parte chata" do trabalho até a "liberar mais tempo" para aproveitar melhor o dia.

Mas é importante lembrar que a IA é uma ferramenta, e, como toda ferramenta, você precisa aprender a usá-la.

Eu tenho certeza de que você já sentiu que o ChatGPT não estava te entendendo, ou que o Gemini simplesmente não conseguia seguir as instruções que você fornecia, e você precisou repetir a mesma coisa infinitas vezes.

Mas esses problemas surgem, principalmente:
1. Da forma como você fornece as instruções à IA, e;
1. Da forma como ela as interpreta.

Esse processo, de orientar a IA e refinar as suas instruções com base nas respostas obtidas, é chamado do *prompt engineering*.

E aqui neste artigo, eu vou compartilhar uma técnica para construção de prompts que acabou com esse tipo de problema e mudou como eu interajo com a IA, principalmente no trabalho.

## A importância do prompt

Antes de tudo, é importante definirmos exatamente do que estamos falando.

*Prompt engineering* é o processo de, cuidadosa — e às vezes até dolorosamente —, produzir instruções (prompts) para orientar um LLM a responder você de uma determinada forma.

Portanto, o que vamos refletir é sobre como comunicar instruções de maneira efetiva para que a IA possa, **consistentemente**, responder da forma como queremos.

E a palavra-chave aqui é **consistência**.

Com um prompt bem definido, é possível não só guiar o ChatGPT, por exemplo, corretamente pelas nossas instruções, como também possibilita a criação de agentes de IA e até mesmo a inserção da IA em fluxos de trabalho automatizados.

<!-- > Por sinal, foi assim que eu utilizei a IA para alguns projetos de automação no trabalho, como a [produção de artigos para blogs](/portfolio/producao-textual-para-blog-com-ia) e a [produção de roteiros para vídeos](/portfolio/producao-de-roteiros-para-videos-no-youtube-com-ia). -->

## Atributos de um bom prompt

Agora que já sabemos sobre o que vamos refletir, é hora de começar.

Vamos pensar em uma interação básica que você pode ter com a IA, como, por exemplo, pedir para que ela *escreva um e-mail*:

```md
Escreva um email para o Pablo sobre a nossa última conversa: [texto da conversa]
```

Esse é um prompt bem básico:
1. Eu preciso de um e-mail;
1. Esse e-mail é para o Pablo, e;
1. O assunto do e-mail é a nossa conversa.

Mas perceba que algumas informações importantes estão simplesmente ausentes:
1. Qual o objetivo do e-mail?
1. Qual o contexto da conversa?
1. Qual tom de voz usar?

O resultado vai ser um texto genérico e provavelmente inútil, mas não tem como a IA saber disso agora, porque ela está simplesmente no escuro.

Outro detalhe é que toda vez que você precisar fazer um novo e-mail, vai ter que escrever tudo de novo, e de novo e de novo...

Mas existe uma forma de criar um prompt que você escreve só uma vez e, depois, pode usá-lo repetidamente, com a IA entregando os resultados da exata forma como você quer sempre.

E tudo isso começa com os **delimitadores**.

### Usando delimitadores

Vamos continuar usando o exemplo do e-mail para o Pablo.

Mas, dessa vez, vamos acrescentar um contexto adicional para que a IA possa se encontrar.

E, para isso, vamos introduzir a primeira peça do nosso prompt: os **delimitadores**.

Os delimitadores são sequências de caracteres (como `<texto>`, `---` ou `###`) que vamos usar para marcar o início e o fim de uma seção específica de texto dentro do prompt.

Eles servem para "isolar" o conteúdo que a IA deve processar.

Isso evita com que ela confunda os textos no nosso prompt: o que é especialmente útil quando fazemos prompts grandes.

> Essa é uma técnica com [eficácia comprovada](https://arxiv.org/html/2411.10541v1/) na diminuição de alucionações e no aumento das vezes que a IA segue as instruções do prompt.

Nesse caso, vamos incluir um delimitador de *pontos-chave da conversa*: assim a IA terá um contexto melhor sobre o que escrever no e-mail.

Algo como:

```md
Escreva um email para o Pablo sobre a nossa conversa. Inclua os seguintes pontos que discutimos:
<pontos-discutidos>
[Lista de pontos-chave da conversa]
</pontos-discutidos>

Essa é a nossa conversa:
<conversa>
[texto da conversa]
</conversa>
```

> Eu tenho uma preferência pelo uso de delimitadores no estilo de etiquetas HTML, mas isso sou só eu. Você pode usar o padrão que melhor te atender.

Só esse pequeno detalhe já garante que, mesmo se a nossa conversa for gigantesca, a IA ainda vai conseguir distinguir claramente:
1. As instruções do nosso prompt;
1. A lista de pontos-chave da conversa, e;
1. O texto da conversa.

Em outras palavras: as nossas instruções continuarão a prevalecer, não importa a quantidade de texto que colocamos.

### Usando variáveis

Conseguimos, até agora, criar um prompt bom para escrever o e-mail para o Pablo.

Mas o problema é que esse prompt é muito bom para enviar e-mails para o Pablo, mas não para o Amanda ou o Marcelo.

Isso porque, se quisermos alterar o nome do destinatário, vamos precisar alterar o nosso prompt. Todas as vezes.

Mas existe uma forma de tornarmos o nosso prompt mais **reutilizável**, isso é: conseguir diferentes resultados sem precisar alterar as instruções.

E para isso, vamos inserir a segunda peça do nosso prompt: as **variáveis**.

Variáveis são "marcadores" que indicam onde informações específicas e **dinâmicas** devem ser inseridas no prompt.

Geralmente as variáveis são representados entre chaves, como `{Nome da Pessoa}`, `{objetivo_principal}` ou `{pontos-chave}`.

Isso quer dizer que podemos "mudar" o nosso prompt sem precisar re-escrever nada nele.

Por exemplo, vamos adicionar algumas variáveis para que a IA seja capaz de escrever e-mails de forma mais dinâmica:
1. `{nome}`: nome do destinatário;
1. `{tipo}`: tipo de e-mail;
1. `{objetivo}`: objetivo do e-mail, e;
1. `{pontos-chave}`: pontos-chave da conversa, e;
1. `{conversa}`: texto da conversa.

Adicionando essas informações, e **refinando** o nosso prompt, nós chegamos em:

```md
Escreva um email de {tipo} para {nome} com base na nossa conversa.

O objetivo deste email é {objetivo}.

Inclua os seguintes pontos que discutimos:
<pontos-discutidos>
{pontos-chave}
</pontos-discutidos>

Essa é a nossa conversa:
<conversa>
{conversa}
</conversa>
```

Perceba como utilizamos **delimitadores** e **variáveis** juntos. Isso é possível e vai ajudar muito na organização dos seus prompts.

A partir daqui, já podemos salvar esse prompt como um [GPT](https://help.openai.com/en/articles/8554397-creating-a-gpt) (no ChatGPT) ou [Gem](https://support.google.com/gemini/answer/15235603?hl=pt-BR) (no Gemini) e iniciarmos conversas periodicamente com ele ao invés de utilziar o "modelo padrão".

Agora, quando quisermos falar com a IA, vamos apenas precisar enviar informações como:

```md
{nome}: Taiane
{tipo}: follow-up
{objetivo}: agradecer pelo networking no evento X
{pontos-chave}: [pontos-chave da conversa]
{conversa}: [texto da conversa]
```

E a resposta já vai sair prontinha do forno!

A IA vai interpretar a sua questão preenchendo os campos de variáveis no prompt, algo como:

```md
Escreva um email de {follow-up} para {Taiane} com base na nossa conversa.

O objetivo deste email é {agradecer pelo networking no evento X}.

Inclua os seguintes pontos que discutimos:
<pontos-discutidos>
[pontos-chave da conversa]
</pontos-discutidos>

Essa é a nossa conversa:
<conversa>
[texto da conversa]
</conversa>
```

Com isso, as possibilidades do que pode ser feito já são praticamente infinitas e até mesmo outras pessoas podem usar o seu prompt (e elas nem precisam saber dele, só o que enviar para IA)!

Mas se você sentir que ainda precisa refinar muito as respostas fornecidas pela IA, talvez seja hora de **definir um modelo de resposta**.

### Definindo um modelo de resposta

Um **modelo de resposta** nada mais é do que um guia direto de como a IA deve formular a resposta para a sua questão.

E nós utilizamos e vemos modelos assim todos os dias em outras ferramentas.

Seja como um modelo de briefing no Google Docs, um documento de orçamento ou um modelo de newsletter.

Modelos ajudam não só a salvar tempo com tarefas repetitivas, como também guiam a nossa forma de trabalhar.

E podemos usar essa mesma lógica para as respostas que queremos obter da IA.

Continuando com o nosso exemplo do e-mail para o Pablo, podemos incluir no prompt um modelo como:

```md
<modelo>
Assunto: Follow-up da nossa conversa sobre [Assunto Principal]

Olá, {nome},

Primeiramente, gostaria de [analise o texto do {objetivo} e complete essa senteça].

Escrevo para dar seguimento à nossa conversa sobre [analise os {pontos-chave} e determine o mais importante].

Gostaria de reforçar os seguintes pontos que discutimos:
[lista com os demais {pontos-chave}]

Peço que salve minhas informações de contato:
- Telefone: (41) 9.0000-0000
- LinkedIn: https://www.linkedin.com/in/meulinkedin

Abraços,
André
</modelo>
```

Perceba que eu não só utilizei **delimitadores**, para marcar claramento o que é o modelo, como também inclui **variáveis** e, além disso, ainda instruções sobre como formatar a resposta **DENTRO** do próprio modelo.

Com um modelo assim, a IA terá uma estrutura clara para seguir ao gerar o e-mail, garantindo que todos os elementos importantes estejam **sempre** presentes em um **formato consistente**.

Além disso, torna o seu uso bem flexível, o que, no nosso caso, ajuda a tornar o e-mail mais dinâmico.

E agora que você já sabe sobre o uso de delimitadores, variáveis e a importância de definir um modelo, vamos seguir para criar um prompt completo de verdade — pronto para ser usado em fluxos de trabalho e automação de processos!

## Como criar um bom prompt

Criar um prompt eficaz é como mapear o passo a passo de como executar uma tarefa.

Quanto mais claras e precisas forem suas instruções, melhor será o resultado.

E para construir prompts que realmente funcionam, podemos seguir uma estrutura baseada em quatro pilares essenciais:
* **Quem é?**: define a persona ou o papel que a IA deve assumir;
* **Como trabalha?**: descreve o passo a passo que a IA deve seguir para executar a tarefa;
* **O que faz?**: estabelece o objetivo final da interação;
* **Como faz?**: detalha o formato e quaisquer outros detalhes para a resposta.

Com base nesses pilares, podemos criar um prompt robusto.

E como já informamos o Pablo sobre a nossa intenção de continuarmos a conversa mais tarde, vamos seguir para outro exemplo.

Vamos criar um prompt para nos auxiliar com a produção de briefings para artigos de um blog!

### Persona

Para começar, o primeiro passo é definirmos a personalidade, ou expertise, que a IA deve incorporar.

Isso vai nos ajudar a dar um direcionamento na forma de "pensar" que ela vai ter quando for responder às nossas requisições.

Como neste caso estamos criando um prompt para nos ajudar com a criação de briefings de artigo, vamos utilizar a seguinte Persona:

```md
# PERSONA
Você é um redator de blog de tecnologia e design com amplo conhecimento em storytelling.
```

Pronto! Bem simples assim mesmo.

Aqui só precisamos definir o "universo" que a IA vai estar.

Agora ela já sabe *"Quem é?"*.

Partiremos então para o *"Como trabalha?"*.

### Roteiro

O próximo passo é o que a IA deve fazer para nos entregar uma resposta.

Pense nisso como um passo a passo para executar a tarefa que você planeja atribuir à ela — como se estivesse ensinando uma outra pessoa a fazer.

Essa é a parte mais importante do prompt, já que estamos definindo exatamente quais ações a IA irá realizar.

E, para te ajudar, eu separei algumas dicas:
* Caso a IA precise ler ou interpretar algum texto, peça isso *explicitamente*.
* Enumere as instruções em ordem crescente.
* Forneça apenas uma instrução por linha.
* Atenção para que a última ação sempre seja o **Objetivo**.

```md
# ROTEIRO
1. Analise as informações de {tema}.
2. Analise as informações de {descrição}.
3. Infira o público-alvo para o tema.
4. Salve as {ideiasChave} enviadas pelo usuário.
5. Produza o briefing.
```

Agora que a IA já sabe *"Como trabalha?"*, podemos seguir para *"O que faz?"*.

### Objetivo

O **Objetivo** é uma outra parte muito importante do prompt.

Ele permite que a gente defina exatamente o que é esperado da IA, ajudando a evitar que ela interprete erroneamente alguma de nossas instruções.

Por isso, vamos focar em definir uma meta simples e objetiva, algo como:

```md
# OBJETIVO
Criar um briefing para a posterior produção de um artigo para o blog pessoal.
```

Feito isso, podemos seguir direto para o útlimo pilar do nosso prompt: *"Como faz?"*.

### Modelo

Aqui, nós vamos definir o formato de resposta que esperamos.

A depender de *como* e *onde* você vai usar esse prompt, o seu modelo pode ser *mais* ou *menos* detalhado.

Como neste exemplo estamos criando um prompt para produzir briefings de artigos, eu vou detalhar melhor como eu quero que a resposta seja.

Mas, colocar todas essas informações bem no meio do nosso prompt vai deixar ele mais difícil de ler depois (para nós).

Então, o que eu vou fazer é inserir um **Delimitador** e, dentro dele, escrever o modelo que eu quero a IA use para me responder.

Algo como:

```md
# MODELO
Siga a estrutura de <modelo> para produção do briefing.
```

Assim, a gente evita poluir muito as instruções e torna a leitura mais fácil.

> Isso também ajuda na hora que você precisar alterar o modelo, já que ele vai ficar "separado" do restante do prompt.

Agora, mais abaixo no nosso prompt, eu vou inserir o delimitar `modelo` com as seguintes frases:

```md
[... restante do prompt]

<modelo>
# Ideia central
- **Tema principal**: [Aqui você insere o assunto geral do artigo.]
- **Ideias-chave**: [Insira as ideias-chave indicadas pelo usuário]
- **Título provisório (Opcional)**: [Sugestão de título para guiar o redator, incluindo primeira palavra-chave fornecida, ele pode adaptar/melhorar. Máximo de 60 caracteres.]
- **Descrição da ideia**: [Detalhe o que você espera que o artigo aborde. Qual o enfoque principal? Há alguma pergunta específica que deve ser respondida? Qual história ele conta?]
</modelo>
```

Aqui, nós já finalizamos os 4 pilares do nosso prompt:
* [x] Quem é?
* [x] Como trabalha?
* [x] O que faz?
* [x] Como faz?

Mas eu ainda quero apresentar outros dois elementos que podem auxiliar bastante na construção das respostas.

E o primeiro deles é o **Panorama**.

### Panorama

Todos já ouvimos que "quanto mais contexto você fornecer para IA, melhor". E isso é bem verdade.

Mas nem todo contexto é útil.

Como estamos criando um prompt bem objetivo, vamos inserir um contexto pequeno: apenas o suficiente para que a IA entenda em que ambiente está.

No nosso exemplo, eu vou detalhar *como* o briefing será usado:

```md
# PANORAMA
Você está criando um briefing que será usado para produzir um artigo no blog de André S., um profissional de Growth Marketing com habilidades em desenvolvimento web e automação de processos.
```

O efeito que o **Panorama** tem no prompt é mínimo, mas eu o considero como uma cerca que delimita o "mundo" da IA.

E chegando ao final do nosso prompt, temos os polimentos finais com o **Transformar**.

### Transformar

Agora que já produzimos todo o prompt, chegou a hora de testar!

E durantes os testes, você vai notar que alguns detalhes ou vícios na resposta podem surgir.

Alguns exemplos desses vícios são:
* Uso exagerado de emojis;
* Formatação incorreta de palavras;
* Pequenas fugas do modelo de resposta;
* Interpretações errôneas das instruções;
* Entre outros.

Para resolver esses detalhes menores, ao invés de voltar lá em cima e alterar o **Roteiro** ou o **Modelo**, nós podemos concentrar tudo em **Transformar**.

Além disso, também podemos usar essa parte final do nosso prompt para fornecer algumas orientações extras, como por exemplo:

```md
# TRANSFORMAR
- Sua resposta deve ser em Markdown.
- Substitua os textos entre "[]" em <modelo> pela sua resposta.
- Proibido emojis.
```

Perceba que, apesar de lá em cima eu ter escrito o `<modelo>` como Markdown, eu reforcei esse detalhe aqui novamente, pois a I.A. não havia compreendido de primeira.

Ainda no `<modelo>`, como eu espero uma resposta mais detalhada, além das instruções em **Roteiro** (que são mais gerais), eu forneci orientações mais locais sobre como a I.A. deve interpretar e preencher modelo.

> Além disso, ninguém gosta do batalhão de emojis que a I.A. invoca, então eu tentei inibir esse comportamento também.

## Resultado final

E com isso, senhoras e senhores, podemos enfim juntar todas essas peças e ter o nosso **prompt básico de criação de briefings**!

Vamos ver como ficou:

```md
# PERSONA
Você é um redator de blog de tecnologia e design com amplo conhecimento em storytelling.

# ROTEIRO
1. Analise as informações de {tema}.
2. Analise as informações de {descrição}.
3. Infira o público-alvo para o tema.
4. Salve as {ideiasChave} enviadas pelo usuário.
5. Produza o briefing.

# MODELO
Siga a estrutura de <modelo> para produção do briefing.

# PANORAMA
Você está criando um briefing que se tornará um artigo no blog de André Moura Santos, profissional de Growth Marketing com habilidades em desenvolvimento web e automação de processos.

# TRANSFORMAR
- Sua resposta deve ser em Markdown.
- Substitua os textos entre "[]" em <modelo> pela sua resposta.
- Proibido emojis.

---

<modelo>
# Ideia central
- **Tema principal**: [Aqui você insere o assunto geral do artigo.]
- **Ideias-chave**: [Insira as ideias-chave indicadas pelo usuário]
- **Título provisório (Opcional)**: [Sugestão de título para guiar o redator, incluindo primeira palavra-chave fornecida, ele pode adaptar/melhorar. Máximo de 60 caracteres.]
- **Descrição da ideia**: [Detalhe o que você espera que o artigo aborde. Qual o enfoque principal? Há alguma pergunta específica que deve ser respondida? Qual história ele conta?]
</modelo>
```

Agora, para utilizar o prompt, podemos salvar como um [Gem](https://gemini.google.com/gems/view) (do [Gemini](https://gemini.google.com/)), por exemplo, e conversar com ele sempre que precisarmos de um novo briefing.

E como instruímos a I.A. com **Variáveis**, na hora de iniciar uma conversa, podemos inserir algo como:

```md
{tema}: Estruturando um PROMPT para uso na IA.
{descrição}: Artigo ensinando a criar prompts para maximizar a eficiência da IA em fluxos de trabalho e tarefas repetitivas.
{ideiasChave}: A importância do prompt, Atributos de um bom prompt, Criando um prompt.
```

E a I.A. vai imediatamente começar a produzir o briefing, sem enrolação!

Ah, e como os *inputs* serão sempre os mesmos e a repsosta também está padronizada, [incluir esse prompt em um fluxo automatizado](/portfolio/automacao) se torna ainda mais fácil!


## Selecionando a IA adequada para o trabalho

Agora que já temos um prompt em mãos, precisamos descobrir qual a melhor I.A. para o serviço.

Cada I.A. possui habilidades e proficiências diferentes em diferentes nichos de atuação, mesmo os modelos mais populares e generalistas.

Eu recomendo que você teste o prompt em vários modelos diferentes e veja qual melhor atende as suas expectativas.

No meu caso, eu preferi usar o Gemini, mais especificamente o modelo 2.5 Flash (de abril de 2025).

Uma outra vantagem do Gemini é que você não precisa pagar para utilizar os Gems (equivalente a um GPT no ChatGPT), então fica mais acessível de para criar e utilizar os prompts por lá também.

## Conclusão

Dominar a estrutura de prompts com **delimitadores**, **variáveis** e **modelos** é um divisor de águas na interação com IAs.

Eu particularmente uso essa estrutura sempre que preciso automatizar uma tarefa com IA, é uma daquelas coisas que, depois que você aprende, não tem como viver sem.

Agora, a bola está com você: pratique, experimente e veja na prática como esses conceitos transformam o uso da IA no seu dia a dia!

E se quiser ir além e integrar a IA de forma mais profunda nos seus processos, [fale comigo](https://api.whatsapp.com/send/?phone=5541935009236&text=Oi%2C%20gostaria%20de%20entrar%20em%20contato%20para%20apresentar%20meu%20projeto) e vamos discutir um projeto!