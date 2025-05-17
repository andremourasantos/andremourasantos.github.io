---
isDraft: true
title: "Projeto Kai"
description: "Assistente de IA especializado para atividades do Marketing (MVP), como projeto de aprendizagem."
imageName: "test"
pubDate: 2025-02-20
updatedDate: 2025-05-01
tags: ["programação"]
---

O mundo da Inteligência Artificial tem avançado a passos largos, e confesso que, como profissional de Growth Marketing e entusiasta de tecnologia, gosto de acompanhar de perto.

Já vi IAs surgindo para tudo, prometendo otimizar tarefas, gerar conteúdo, analisar dados e até gerenciar as campanhas de anúncio por mim...

Mas, em meio a esse "boom", senti falta de algo mais **personalizado**, algo que realmente se encaixasse mais nas minhas atividades diárias, no que eu fazia ali no dia a dia.

Aí surgiu o **Deepseek**.

Eu vi de perto as notícias sobre o desempenho de ponta e custo incrivelmente acessível da API do Deepseek V3, e a minha curiosidade para testar só aumentou.

Mas além de apenas testar o chatbot, essa era a oportunidade perfeita para ir além do uso de ferramentas prontas e criar a minha própria, uma que **me auxiliasse** com as **minhas** atividades do dia a dia.

Uma IA revolucionária, um custo de API irrisório e uma vontade de aprender mais: foi assim que nasceu a ideia do **Projeto Kai**.

## Construindo o Projeto Kai do jeito certo

Com uma ideia na cabeça e a empolgação de começar, logo me perguntei: "ok, mas por onde eu começo?".

A primeira coisa que veio na minha cabeça foi criar uma IA que poderia fazer tudo!

Mas logo a ideia de desenvolver uma IA complexa do zero se mostrou não só inviável, como desnecessária.

O que eu precisava era testar a **ideia** (um assistente personalizado é útil?), a **tecnologia** (a API DeepSeek funciona para isso?) e o **modelo de desenvolvimento** (consigo construir algo assim rápido?).

E a resposta veio com a filosofia do MVP: o **Mínimo Produto Viável**.

Em vez de tentar construir um sistema robusto e cheio de funcionalidades desde o zero: eu foquei em criar a versão mais simples possível do Projeto Kai.

O meu objetivo era claro: validar os conceitos principais da ideia, sem gastar uma fortuna ou investir meses de trabalho em algo que talvez nem funcionasse como esperado.

Essa mentalidade inicial me permitiu aprender rapidamente, iterar e, se/ou quando necessário, pivotar o caminho sem grandes perdas de tempo ou dinheiro.

E com isso, eu comecei a minha jornada!

## Dominando o uso da IA via API

É meio clichê dizer que nenhum projeto vem sem desafios, mas no meu primeiro mergulho no desenvolvimento de IA, isso se tornou uma verdade literal.

Cada etapa trouxe uma imensidão de problemas completamente novos que precisavam ser solucionados, desde configuração a formatação da resposta fornecida pela IA.

Aqui, eu fiz um recorte dos principais desafios que encontrei e como os superei.

### Conectando com a API da DeepSeek

O primeiro grande obstáculo foi a integração com a API do DeepSeek V3.

Embora ela usasse a mesma arquitetura da API da **OpenAI** (o que significava que trocar do modelo `gpt-4o` para o `deepseek-chat` era bem simples), eu também nunca tinha usado a API da OpenAI.

E mesmo com uma documentação razoável, colocar tudo para funcionar, entender os modelos de requisição e resposta, e garantir que a comunicação entre meu código e a IA fosse fluida exigiu muitas tentativas.

> A OpenAI chegou até a lançar uma [atualização das requisições via API](https://platform.openai.com/docs/guides/responses-vs-chat-completions), vale a pena conferir, mas à época usei a *Responses API*.

Por isso, para começar implementar as requisições e capturar as respostas, eu comecei bem aos poucos:
1. Primeiro aprendi a configurar a API e a minha chave;
2. Depois enviava as mensagens e logava as resposta no console mesmo;
3. A partir daí comecei a pensar em formas de adicionar as mensagens anteriormente enviadas à conversa (pra que a IA não perdesse o contexto).
	* Até aqui, a IA sempre me respondia como se a estivesse iniciando uma nova conversa.
4. Por fim, encontrei uma forma de armazenar toda conversa em um vetor e enviar ele para API, mas a conversa ainda acontecia pelo console do navegador.
5. Só então que passei a pensar em criar uma interface simples para enviar as perguntas.
	* Comecei a trabalhar em renderizar as respostas da IA na interface mais à frente no projeto.

É claro que eu dei uma bela simplificada em todo processo, mas o que eu quero destacar é que desde o princípio eu comecei com o mínimo viável.

E, apesar de parecer que adicionei etapas a mais no processo, tudo andou bem rápido, já que eram tarefas bem pequenas e que me ajudaram a ganhar momento.

Paciência e persistência foram chaves aqui.

## Criação de um roadmap

Como um MVP, eu não podia perder tempo com uma interface refinada.

O foco total era na **funcionalidade**.

Isso significava que eu precisava criar um **roadmap** para me auxiliar e evitar que eu me perdesse no desenvolvimento da IA.

E para me ajudar, eu a ferramenta de projetos do GitHub, organizando **9 marcos** e atribuindo **46 tarefas** no total.

Com isso, o projeto ficou dividido em:
1. *Full Markdown Support*;
2. *Agents*;
3. *Chat UI Enhancements*;
4. *Authentication System*;
5. *File Upload & Analysis*;
6. *Multiple Chat Support*;
7. *PWA App*;
8. *Voice Interaction*, e;
9. *Public Launch*

> A minha ideia no começo era criar um agente de IA completo, portanto já desenvolvi todo roadmap com isso em mente. Mas no final, acabei por encerrar os trabalhos, pois desenvolver mais a ferramenta não me traria os benefícios que buscava.

Esse foco em funcionalidades também também significou deixar o design de lado por um momento e me concentrar na lógica por trás do sistema.

Com isso a interface construída foi simples e funcionava tanto no computador quanto no telefone:
![](https://andremourasantos.com.br/assets/image-1-79CNRKHL.png)

Essa mentalidade me permitiu avançar rapidamente e ter algo funcional em mãos para testar em pouquíssimo tempo.

## Segurança em primeiro lugar

Lidar com APIs pagas e sensíveis como a do DeepSeek trouxe uma preocupação imediata: a segurança das chaves de API.

Deixar essas chaves expostas no código ou em um local inseguro seria um convite para o desastre, tanto em termos de uso indevido quanto de custos inesperados.

> O tanto de chaves de API que vazam no GitHub não é brincadeira...

Por isso, implementei boas práticas de segurança desde o começo, com grande foco para o armazenamento adequado das chaves de API.

E para isso, utilizei tanto variáveis de ambiente quanto sistemas de gerenciamento de segredos (como o do Firebase — Google Cloud Platform (GCP)).

Essa etapa foi crucial para garantir que o projeto pudesse crescer de forma segura, sem se tornar uma dor de cabeça ou um risco financeiro.

Além disso, esse gerencimaneto de credenciais sensíveis foi um grande aprendizado que pode ser utilziado em diversos outros projetos.

## Moldando a personalidade da minha IA

O ponto central de todo esse projeto era a personalização do comportamento e da atitude da IA.

Eu não queria um assistente genérico, mas sim um que pudesse adotar diferentes "personas" ou focar em tarefas específicas de marketing, por exemplo.

E a chave para isso residiu na **estrutura de prompt** e na capacidade de ter diferentes "agentes" pré-configurados.

Eu passei um bom tempo experimentando diferentes formas de "instruir" a IA através do prompt inicial para que ela entendesse o papel que deveria desempenhar, o tom de voz a ser usado e o tipo de resposta esperada.

E isso tudo envolvia desde definir que ela deveria agir como um copywriter experiente até a instruir a focar em gerar ideias para títulos de artigos.

Explorar as nuances da criação de prompts eficazes foi um dos aprendizados mais importantes que tive com esse projeto.

Entender como instrui a IA realmente faz toda diferença na qualidade dos resultados, que, por sua vez, refletem diretamente na utilidade do mesmo.

Eu até cheguei a fazer um pequeno vídeo apresentando as novidades que consegui desenvolver no projeto, olha só:

<iframe  src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7297280051954249728?collapsed=1"  frameborder="0"  allowfullscreen=""  title="Publicação incorporada"></iframe>

Para conseguir me aprofundar e organizar esse conhecimento, eu desenvolvi uma estrutura própria para a criação de prompts junto com conhecimentos de um curso de prompts para IA que fiz.

> Essa estrutura é inclusive algo que detalhei em outro artigo também, caso esteja com dificuldades para fazer com que a IA aja como quer eu recomendo a leitura: ([estrutura de PROMPT para IA](/portfolio/estrutura-de-prompt-para-ia)).

Dominar essa "arquitetura da conversa" com a IA foi fundamental para o sucesso da personalização no Kai.

E esse foi uma das grandes lições de todo esse projeto: ter agentes específicos era melhor do que ter um agente generalista que tentava ser específico.

Essa é uma filosofia que utilizo até hoje nos [meus projetos de IA](/portfolio/automacao).

## Os grandes aprendizados dessa jornada

Mais do que um produto final polido (lembre-se, é só um MVP), o Projeto Kai me trouxe uma bagagem imensa de aprendizados.

Primeiro, que a validação através de um MVP é um caminho poderosíssimo: me permitiu testar a ideia central e a viabilidade técnica sem o peso (em tempo ou dinheiro) de um projeto de larga escala.

É uma lição valiosa para qualquer área, não só desenvolvimento web.

Segundo, a importância da segurança ao integrar com serviços externos, especialmente aqueles baseados em consumo (como APIs pagas).

Proteger as credenciais de acesso não é um detalhe, é uma prioridade.

Se uma credencial minha tivesse vazado não teria sido um problema tão grande nesse projeto em específico (já que a API do DeepSeek é pré-paga), mas com certeza poderia causar prejuízos enormes em outra realidade.

E, por fim, e talvez o mais empolgante, a confirmação do potencial da personalização da IA.

Ver como a IA pode gerar resultados tão diferentes e direcionados apenas mudando a forma como "conversamos" com ela (através do prompt e configuração dos agentes) abriu um leque de possibilidades na minha mente sobre como usar IA de forma estratégica no Growth Marketing.

Inclusive, já até fiz alguns artigos sobre como utilizei a IA para montar um [fluxo de produção de artigos](/portfolio/producao-textual-para-blog-com-ia) e um outro para [criação de roteiros para vídeos no YouTube](/portfolio/producao-de-roteiros-para-videos-no-youtube-com-ia).

## O significado do nome Kai

Se você se perguntou o porquê do nome **Kai** (凯) esse tempo todo, saiba que tem um significado.

Em chinês, 凯 (kai) significa "vitória".

E para mim, o Projeto Kai representa uma dupla vitória: a conquista pessoal de dar o primeiro passo no desenvolvimento de IA, superando os desafios técnicos e conceituais, e a validação da ideia de que IAs personalizadas são, de fato, ferramentas poderosas e viáveis.

Embora o Projeto Kai em si tenha sido um MVP focado na validação, os conhecimentos e a experiência adquiridos com ele são a base que usei para [construir projetos ainda maiores](/trabalhos).

O Projeto Kai foi o laboratório, a prova de conceito, o marco zero.

Agora, a "vitória" que ele representa se traduz na confiança e no *know-how* para aplicar a inteligência artificial de forma prática e estratégica em novos projetos.

## Dê o seu primeiro passo com a IA

Minha jornada com o Projeto Kai é um lembrete poderoso de que a melhor forma de aprender algo novo e complexo é **fazendo**.

Começar pequeno, focar no essencial (o **MVP**), criar um **roadpmap** de aonde quer chegar e como chegar lá e, acima de tudo, **aprender** com cada passo.

Se você também tem essa curiosidade sobre como personalizar a IA para o seu dia a dia no trabalho, ou tem uma ideia de como a tecnologia pode resolver um problema específico seu, meu conselho é: comece.

Não precisa ser algo grandioso.

Identifique a menor parte funcional da sua ideia, escolha uma ferramenta acessível (existem muitas APIs de IA com planos gratuitos ou de baixo custo para experimentação — hoje em dia eu particularmente recomendaria o [Gemini](https://aistudio.google.com/)) e coloque a mão na massa!

Se você tem uma ideia para um assistente de IA personalizado para suas necessidades, entre em contato e vamos conversar sobre como tirar sua ideia do papel.