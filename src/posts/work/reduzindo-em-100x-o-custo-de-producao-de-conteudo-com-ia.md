---
isDraft: false
title: "Reduzindo em 100x o custo de produção de conteúdo com IA"
description: "Como usei IA para potencializar a produção de conteúdo em um escritório de advocacia."
imageName: "patrick-tomasso-Oaqk7qqNh_c-unsplash"
pubDate: 2025-07-31
updatedDate: 2025-08-12
tags: ["trabalho", "automação"]
---

> Este projeto foi inscrito para o prêmio DNA+ da FENALAW 2025.

No mundo do marketing digital, a eficiência é a chave para o sucesso.

Neste projeto, demonstro como o escritório Engel Advogados superou o desafio de um processo de produção de conteúdo demorado e caro.

A solução?

Uma abordagem inovadora que uniu **automação**, **inteligência artificial** e a reestruturação do **fluxo de trabalho**.

O objetivo era claro: otimizar a criação de artigos para o blog e roteiros para vídeos no YouTube, que, por sua vez, se transformam em posts para redes sociais e anúncios, garantindo um canal de aquisição de clientes robusto e com economia substancial!

## Qual o impacto do tráfego orgânico na Engel Advogados?

Na Engel, o conteúdo orgânico representa uma grande fatia de acessos ao site: de fato, dos mais de **130 mil acessos** que tivemos no escritório entre janeiro e julho de 2025, 50% do total são da **pesquisa orgânica do Google** (*acessos de graça*).

> Caso tivéssemos que pagar pelos pouco mais de 70 mil acessos da pesquisa orgânica do Google, esse seria um custo adicional de **R$ 64.500,00** com anúncios entre janeiro e julho (ou pouco mais de R$ 10 mil/mês).

Com isso, é evidente que a estratégia de manter relevância no meio orgânico gerou não só uma grande economia financeira para a empresa, como também uma gigantesca oportunidade para obtenção de leads a um baixo custo.

Essa grande parcela de acessos orgânicos também representa o **principal canal de obtenção de clientes** para o escritório.

Somente do 2° trimestre de 2025, ~90% dos mais de 500 novos clientes tiveram como origem nossos canais orgânicos (seja o YouTube, redes sociais ou o blog).

Na Engel, a base para produção de conteúdo consiste em **artigos para o nosso blog**.

Mas o principal desafio enfrentado pelo escritório era a **demora** e o **custo** que todo o processo de produção de artigos apresentava: desde a ideia de um artigo até o produto final.

## Como era o processo de criação de conteúdo?

O processo de produção de contéudo na Engel era extenso e bem ramificado, fruto de anos de desenvolvimento e aprimoramento.

A base do fluxo de trabalho consistia no trabalho conjunto entre a empresa e dois prestadores de serviço, como demonstrado no fluxograma abaixo:

![fluxograma](dsa)

Com tudo, esse processo todo, essencial para suportar o canal orgânico, era gerenciado em uma única pipeline (à base de cards) dentro do CRM da Engel.

Além da falta da *especialização* dos fluxos de trabalho, haviam também outros problemas que impactavam na eficiência da operação, como:
* Trabalho de 3 a 4 operadores internos não dedicados — sem especialização em Marketing — e não plenamente dedicados a essa atividade;
* A sincronização manual do status de cada card entre o CRM da Engel e o sistema de controle do prestador de serviço, e;
* A ação manual de criar todas as pastas e arquivos relacionados a criação do conteúdo na nuvem (neste caso o Google Drive) e, posteriormente, sincronizar essas pastas e documentos nos respectivos cards do nosso CRM.
    * Após isso, também era necessário atualizar o sistema do prestador de serviço com os acessos para esses documentos.

Como você já deve ter notado, era um processo extremamente manual e maçante, mas que permanecia rodando pelo alto impacto que gerava quanto a aquisição de clientes.

### Prazos: teoria vs realidade

Para cada etapa do processo, também eram estipulados prazos em SLA (*service-level agreement*) pelos prestador de serviço para conclusão das solicitações.

Isso, em teoria, deveria tornar a duração do processo **previsível** e **consistente**. No entanto, esse não era o cenário experienciado pelo escritório.

Pelos prazos fornecidos pelo prestador de serviço, de **3 dias úteis para produção do briefing** e **5 dias úteis para artigos e roteiros de vídeo**, o tempo médio entre a concepção de uma ideia e o produto final deveria variar de **13 a 16 dias úteis**.

Contudo, em consequência da forma como o fluxo de trabalho fora organizado, o tempo médio **real** experienciado era de impressionantes **142 dias corridos** (ou 101 dias úteis): quase **10x mais lento do que o previsto**.

![Comparação dentre tempos estimados para produção: usar calendários para demonstrar diferença de forma didática](ds)

Essa demora entre uma ideia e o produto final afetava também a capacidade do escritório em abordar temas do momento, já que, quando nosso artigo finalmente estivesse pronto, a chance dele ainda ser relevante era muito baixo, pois o boom de interesse já havia passado.

Além disso, os custos dessa operação eram significativos para a balança financeira do escritório, já que, somente o prestador de serviço para produção textual custava em torno de **R$ 72 mil/ano**.

## Quais foram as estratégias implementadas para abordar o problema?

A solução proposta para otimizar o tempo de produção de conteúdo e economizar em custos com prestadores de serviços foi uma abordagem multifacetada que consiste em **internalizar**, **diagnosticar** e **otimizar**.

Começando pela **internalização**: foi contradado um especialista para atuar especificamente na resolução deste problema.

> Até então, o escritório não contava com um profissional de Marketing especializado para que lhe fosse atribuído esse trabalho.

A partir desse momento, foi possível construir uma estrutura interna que permitisse **diagnosticar** as raízes do problema, ponderar soluções e implementar as ações necessárias para resolver esses empecilhos.

Durante a etapa inicial de dianóstico do problema, foram identificados pontos de atrito críticos dentro do fluxo de trabalho, e que já mencionamos anteriormente, como:
1. **Pipeline única** cuidava de atividades de diferentes especialidades;
1. **Excesso de atividades manuais** no CRM;
1. **Retrabalho constante** para sincronizar os sistemas do escritório com os do prestador de serviço, e;
1. **Criação manual de pastas e documentos** e a posterior atualização de cards e do sistema do prestador de serviço.

E, para eliminar esses atritos e otimizar o processo de criação de conteúdo no escritório, foram implementadas as seguintes ações, estruturadas em quatro pilares:

### Desmembramento do fluxo de trabalho

Como primeira ação, foi realizado o mapeamento e particionamento da antiga pipeline monolítica para trabalho com produção de conteúdo.

A partir desse único fluxo de trabalho, foram então criados dois fluxos especializados:

* Um dedicado à produção de artigos, abrangendo pesquisa, redação, revisão e publicação;
* E outro voltado à produção de vídeos, incluindo concepção do roteiro, gravação, edição, pós-produção e distribuição.

Com isso, foi possível criar POPs (procedimentos operacionais padrão) atomizadas e criar atividades mais especializadas para o êxito na produção de cada conteúdo, reduzindo a carga de trabalho manual e agilizando o processo.

Veja um antes e depois:

![fluxo de trabalho antes, com pipeline extensa, e depois, com duas pipelines reduzidas](dsa)

Além disso, com a melhor separação das atividades, a audotoria de eficiência na execução era facilitada, pois agora era possível identificar quais atividades mais acumulavam, e em quais etapas do processo.

### Automação de processos repetitivos

Outra grande peça na estratégia de otimização da produção de conteúdo foi a automaticação de tarefas repetividas.

Com os fluxos de trabalho devidamente separados e padronizados, contratamos uma plataforma no-code para auxiliar com as automações e interações entre sistemas. Além dessa plataforma, o própria CRM da empresa permitia a criação de automações com base em etapas do SPA (*Smart Process Automation*).

E, partir disso, foi possível criar automações específicas que auxiliavam tanto como guia sobre *o que fazer* em cada etapa, como também na eliminação na maioria das atividades manuais de antes.

Veja abaixo como funcionaram as automações desenvolvidas para a pipeline de produção de artigos:

![fluxograma apresentando funcionamento das automações na pipeline de produção de artigos. O diagrama deve destacar o que aparecia no CRM para o operador concluir, quais as consequências de concluir uma determinada tarefa e o tempo média de conclusão dessas.](dsa)

Assim, foi possível [reduzir o trabalho com tarefas repetivivas em mais de 40 horas](/trabalhos/automacao-de-trabalho-operacional-repetitivo), aumentando não somente a eficiência, como também o grau de satisfação com o trabalho sendo executado (por conta da diminuição das atividades repetividas morosas).

### Sincronização entre sistemas

Anteriormente, esse processo era totalmente manual, exigindo intervenções constantes para adicionar demandas e atualizar o status dos projetos.

Essa era uma atividade que não só demandava muito tempo, como também era muito propensa a erros.

Como uma tarefa maçante, e de baixo valor agregado, sua execução exauria os responsáveis, que, lembre-se, não eram profissionais da área; o que também resultava em uma baixa eficiência de uso do capital humano da empresa.

Agora, atrelada às automações introduzidas anteriormente, também haviam gatilhos que sincronizavam as informações entre os dois sistemas (Engel x Prestador de serviço) de forma automática, eliminando completamente a necessidade de realização dessa atividade.

Veja abaixo como foram adicionados os gatilhos e seu funcionamento:

![diagrama apresentando fluxograma de automações na pipeline de produção de artigos. O diagrama deve destacar que a automação funciona em via de mão dupla: ou seja, quando o sistema do prestador de serviço é atualizado, o CRM também é, e vice-versa.](dsa)

### Implementação de Inteligência Artificial

Por fim, a estratégia também incluia a implementação de inteligência artificial (IA) como um meio de dar um salto de agilidade ao processo.

A proposta era utilizar a IA para **auxiliar em atividades repetitivas** e que **poderiam ser realizadas de maneira programática**.

E, durante a criação dos fluxos de trabalho especializados, identificamos oportunidades de inserir LLMs generativas como operadores no fluxo.

> Testamos diversas IAs, como as famílias *DeepSeek*, *GPT-4o* e *Gemini 2.5*. Acabamos por escolher os modelos *2.5 Flash* e *2.5 Pro*, do *Gemini*, pela capacidade criativa e de [seguir os prompts consistentemente](/portfolio/estrutura-de-prompt-para-ia).

Com a oportunidade ideal localizada e um objetivo claro, seguimos com a implementação gradual da IA para a criação dos **documentos de briefing**, tanto para os artigos de blog quanto para os roteiros de vídeos para o YouTube.

Os documento de briefing são o início de todo processo criativo, e, por isso, a utilização da IA deve ser cuidadosa: dá-se muito espaço e a IA alucina, restringe a liberdade e ela não entrega — é uma linha tênue.

> Com ajuda da plataforma no-code, também foi feita uma [integração que gerava as pastas e arquivos automaticamente no Google Drive do escritório e já os linkava ao respectivo card na pipeline](/portfolio/bitrix24-api-assistant-app-make-com) também.

E, após validação do funcionamento, extendemos o alcance da IA para também produzir os textos do blog por completo, seguindo essa mesma premissa de implementação gradual.

Veja o funcionamento dos fluxos de trabalho após implementação da IA:
![](dsa)

Com isso, conseguimos um fluxo de trabalho em que a IA faz grande parte do processo e as pessoas responsáveis necessitam apenas de fornecer o direcionamento inicial e conferir as produções da LLM.

## Quais foram os resultados alcançados?

Com a implementação de todas as estratégias, conseguimos resolver os desafios de **custo** e **demora** que antes travavam a produção de conteúdo, o principal canal de aquisição de clientes do escritório.

### Gigantesca diminuição nos custos operacionais

E o resultado mais impactante foi a **diminuição nos custos operacionais**:
* A **internalização**, **reestruturação** e **automação** do processo permitiram o encerramento do contrato com o prestador de serviços de produção textual, que, sozinho, representava um custo anual de aproximadamente **R$ 72 mil**.

Este valor foi substituído por despesas operacionais mínimas, incluindo uma média de **R$ 60/mês** com a plataforma no-code de automação contratada (*Make.com*) e apenas **R$ 0,36/mês** com o provedor de IA (*Gemini*).

O sucesos na implementação resultou em uma redução de custos anual de mais de **100x** (ou, apenas **R$ 720/ano** em despesas operacionais), atingindo em cheio o objetivo inicial de "otimizar e economizar gastos com prestadores de serviços".

Com isso, conseguimos alcançar uma economia anual estimada (sistema + mão de obra) de mais de R$ 72 mil, com uma **economia em 5 anos de aproximadamente R$ 360 mil com a produção de conteúdo**.

Isso, para escritórios de médio porte, que faturam até **R$ 1 milhão por ano**, representa uma **economia de 7,2% do faturamento anual**, que podem ser reinvestidos em outras áreas do escritório, como os [anúncios](como-alcancei-um-roas-de-1065-em-um-escritorio-de-advocacia).

> E, para escritórios menores, essa economia pode ser ainda mais representativa do faturamento total.

Além dos ganhos de tempo e dinheiro, houve um **impacto significativo no capital humanos**:
* A automação de tarefas repetitivas, como a gestão de cards e tarefas no CRM e a criação de pastas e arquivos, aliviou a carga de trabalho da equipe interna.

[Essas automações diminuíram a quantidade de horas humanas alocadas em atividades de baixo valor](automacao-de-trabalho-operacional-repetitivo) e permitiram que os colaboradores se concentrassem em **tarefas mais estratégicas**, como a pesquisa de conteúdo e palavras-chave.

### Drástica redução no tempo de produção

A segunda grande vitória foi a **redução no tempo de produção**:

O **tempo médio** entre a concepção de uma ideia e a entrega do produto final (artigo/roteiro de vídeo), que antes era de **142 dias corridos**, foi reduzido para **apenas 15 dias**!

> Essa otimização representa um aumento de quase **10x** na eficiência da produção.

Essa melhoria foi alcançada em etapas:

1. A **reestruturação do fluxo de trabalho reduziu** o tempo inicial de 173 dias para 52 dias (tornando o processo 3x mais eficiente);
1. E a posterior **implementação da IA** para gerar documentos como briefings, artigos e roteiros, diminuiu o tempo para a média final de 15 a 17 dias (aumento de 3x na eficiência).

> Como os conteúdos divulgados pela são de cunho jurídico, todos os textos, tanto o briefing como artigos e roteiros, passam pelo crivo das advogadas do escritório — uma etapa que não foi alterada.

Ao eliminar erros manuais e atrasos, as novas pipelines também permitiram que **mais conteúdos fossem produzidos simultaneamente**, escalando a capacidade de entrega e fortalecendo o principal canal de aquisição de clientes do escritório.

### Conclusão

Com todas essas inovações implementadas, o escritório não só conseguiu **internalizar a produção de conteúdo**, como também **aprimorou a qualidade** e **escalou significativamente sua capacidade de entrega**.

Esse ganho de eficiência, por consequência, gerou a liberação de horas de trabalho dos operadores, o que permitiu que o analista contratado expandisse sua atuação para outras frentes estratégicas do escritório — expandindo o aproveitamento do capital humano do escritório, como:
  * Tráfego pago;
  * Automações no CRM, e;
  * Análise de dados;

Isso demonstra o impacto positivo do projeto na **produtividade geral da equipe interna**, que agora pode se dedicar a **tarefas estratégicas** e iniciativas que **geram mais valor para o escritório**.