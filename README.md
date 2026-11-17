# OtisFlow

**Da ocorrência à solução.**

MVP acadêmico desenvolvido para o Challenge 2026 FIAP + OTIS. O OtisFlow centraliza registros de operação e manutenção de elevadores para apoiar triagem, priorização, despacho, acompanhamento e análise do histórico.

## Problema e proposta

Ocorrências recebidas por canais diferentes podem ficar dispersas, dificultando a identificação de urgência, a organização da fila e o acompanhamento do atendimento. O OtisFlow reúne as informações em uma central e registra as mudanças do chamado, apoiando decisões mais ágeis e rastreáveis.

## O que é possível demonstrar

- Painel com indicadores e gráficos calculados a partir dos registros disponíveis.
- Central com busca ampliada por chamado, pessoa, local ou técnico, filtros por prioridade, categoria, status e período, exportação CSV e despacho em lote dos chamados selecionados, com evento de auditoria por registro.
- Relatório CSV de passagem de turno com resumo das emergências, chamados sem técnico, prazos e último evento, gerado a partir da fila atual.
- Cadastro próprio de equipamentos com edifício, localização, modelo, série, região, situação operacional, data de instalação e contrato; ativos cadastrados sem ocorrência também aparecem no inventário.
- Formalização de equipamentos que só existiam no histórico, edição do cadastro, filtros por condição e identificação e preenchimento contextual de edifício/endereço/região ao abrir chamado pelo ativo.
- Histórico de ocorrências e chamados ativos conectado ao cadastro técnico do equipamento.
- Abertura e edição de ocorrência com cliente separado do edifício, validação, prioridade calculada por regras explicáveis e transições de status controladas.
- Ordenação da central por data, prioridade ou prazo; classificação desacoplada em `js/classification.js` e coberta por testes nativos Node (`node --test tests/classification.test.cjs`).
- Detalhes do chamado, atribuição de técnico, atualização de status, observações e resumo obrigatório para conclusão.
- Procedimento digital por chamado, com etapas persistidas, histórico de conclusão/reabertura e bloqueio do encerramento enquanto houver etapas pendentes.
- Relatório de serviço imprimível/salvável em PDF após conclusão, com ativo, local, técnico, pedido, checklist, solução e linha do tempo.
- Cadastro e edição demonstrativa da equipe, com sugestão assistida por especialidade, região, disponibilidade e carga ativa.
- Prazos demonstrativos por prioridade, com edição local e sinalização de vencimento.
- Escalonamento gradual e configurável para chamados sem atribuição, com motivo registrado no histórico.
- Registro de canal de entrada, etapas operacionais e marcos de atendimento humano em ocorrências prioritárias.
- Atualização entre abas abertas no mesmo navegador via BroadcastChannel; armazenamento segue local ao navegador.
- Análise de recorrências pelo histórico, janela de tempo e exportação CSV correspondente ao período escolhido.
- Atalho para abrir uma revisão preventiva a partir de padrões repetidos; o operador revisa e confirma o novo chamado.
- Layout responsivo para desktop e celular.

As regras apoiam a triagem. Passageiro preso é sinalizado como crítico e a tela permite registrar confirmações realizadas pelos responsáveis, sem fornecer instruções de resgate ou acionar equipes. O sistema não substitui emergência, avaliação profissional ou processos da OTIS. A análise de recorrência descreve apenas registros passados; ela não prevê falhas futuras.

## Executar localmente

Não é necessário instalar dependências ou configurar uma API.

1. Abra `index.html` no navegador; ou sirva esta pasta com um servidor estático local.
2. Use os registros fictícios para navegar pelos módulos e testar os fluxos.
3. Registre uma ocorrência, abra seus detalhes, atribua um técnico, altere o status e consulte o painel atualizado.

Os dados são armazenados no `localStorage` do navegador. Abas do mesmo navegador podem refletir atualizações em tempo real, mas os dados não são compartilhados entre pessoas, navegadores ou dispositivos. O seletor Operador/Técnico/Gestor serve apenas para demonstração: não existe autenticação nem controle de acesso real.

Para reiniciar a demonstração, remova a chave `otisflow.mvp.v1` do armazenamento local do site no navegador e recarregue a página. Os registros iniciais são fictícios e não representam dados reais da OTIS.

## Tecnologias e estrutura

- HTML semântico, CSS responsivo e JavaScript puro.
- Persistência demonstrativa no `localStorage`.
- Gráficos SVG/CSS gerados no próprio navegador.
- Sem dependências externas ou integrações com sistemas da OTIS.

```text
.
├── index.html                 # dashboard
├── pages/
│   ├── ocorrencias.html       # central e registro
│   ├── equipamentos.html      # registro de ativos e histórico
│   ├── equipe.html            # gestão e despacho
│   ├── recorrencias.html      # análise histórica
│   └── sla.html               # prazos demonstrativos
├── css/
│   ├── base.css               # sistema visual compartilhado
│   ├── dashboard.css
│   ├── ocorrencias.css
│   ├── equipamentos.css
│   ├── equipe.css
│   ├── recorrencias.css
│   └── sla.css
├── js/app.js                  # regras, persistência e interações
└── README.md
```

Cada módulo possui seu próprio HTML e CSS, com `css/base.css` compartilhado para navegação, componentes e responsividade. O JavaScript mantém as regras e os dados em um único lugar para evitar divergências entre telas.

## Referências funcionais

A organização das telas e fluxos considera padrões documentados em produtos de manutenção e despacho: ordens associadas a ativos, contexto histórico por equipamento, procedimentos com etapas rastreáveis, relatórios de serviço, seleção de técnicos por competência e carga, além de prazos visíveis por prioridade. Estas referências servem como inspiração de produto; o MVP não copia processos proprietários nem integra com esses serviços.

- [MaintainX — About Work Orders](https://help.getmaintainx.com/about-work-orders) e [About Assets](https://help.getmaintainx.com/about-assets): histórico por ativo, ordens reativas e preventivas.
- [MaintainX — Complete a Work Order](https://help.getmaintainx.com/complete-a-work-order), [What's in a Service Report](https://help.getmaintainx.com/what-is-in-service-report) e [About Service Reports](https://help.getmaintainx.com/about-service-reports): execução de procedimentos, rastreio por etapa e relatório compartilhável/imprimível.
- [ServiceNow — Manage work order tasks](https://www.servicenow.com/docs/r/field-service-management/manage-work-order-tasks.html) e [What is Field Service Management?](https://www.servicenow.com/products/field-service-management/what-is-fsm.html): despacho, disponibilidade, especialidade, carga e contexto da tarefa.
- [Zendesk — Defining SLA policies](https://support.zendesk.com/hc/en-us/articles/4408829459866-Defining-SLA-policies): metas de resposta e resolução relacionadas a prioridade.

## Publicação estática

O aplicativo é composto por arquivos estáticos. Publique a estrutura completa de pastas, mantendo os caminhos relativos. `index.html` fica na raiz e as telas complementares em `pages/`. Não há comando de build. Depois da publicação, abra a URL pública em uma janela anônima e confirme a navegação e o fluxo de registro. O armazenamento continua sendo local ao navegador de cada visitante; uma versão multiusuário exigiria API, banco de dados e autenticação.

## Dados e equipe

O primeiro acesso carrega 12 registros demonstrativos fictícios e cinco técnicos igualmente fictícios. Novos chamados, técnicos e parâmetros de SLA ficam no navegador da pessoa que os cadastrou. A demonstração inclui diversidade suficiente para observar filtros, prioridades, status, indicadores e recorrências. Os tempos e escalonamentos são parâmetros acadêmicos configuráveis, não SLAs ou regras oficiais OTIS; escalonamentos automáticos só atuam em chamados não atribuídos, avançam um nível por vez e não criam criticidade automaticamente. A análise de recorrência é descritiva e limitada ao histórico disponível.

Integrantes 
