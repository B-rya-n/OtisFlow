# OtisFlow

**Da ocorrência à solução.**

MVP acadêmico desenvolvido para o Challenge 2026 FIAP + OTIS. O OtisFlow centraliza registros de operação e manutenção de elevadores para apoiar triagem, priorização, despacho, acompanhamento e análise do histórico.

## Problema e proposta

Ocorrências recebidas por canais diferentes podem ficar dispersas, dificultando a identificação de urgência, a organização da fila e o acompanhamento do atendimento. O OtisFlow reúne as informações em uma central e registra as mudanças do chamado, apoiando decisões mais ágeis e rastreáveis.

## O que é possível demonstrar

- Painel com indicadores e gráficos calculados a partir dos registros disponíveis.
- Central com busca e filtros por prioridade, categoria, status e período.
- Abertura de ocorrência com validação e prioridade calculada por regras explicáveis.
- Detalhes do chamado, atribuição de técnico, atualização de status, observações e resumo obrigatório para conclusão.
- Cadastro e edição demonstrativa da equipe, com sugestão assistida por especialidade, região e disponibilidade.
- Prazos demonstrativos por prioridade, com edição local e sinalização de vencimento.
- Escalonamento gradual e configurável para chamados sem atribuição, com motivo registrado no histórico.
- Registro de canal de entrada, etapas operacionais e marcos de atendimento humano em ocorrências prioritárias.
- Atualização entre abas abertas no mesmo navegador via BroadcastChannel; armazenamento segue local ao navegador.
- Análise de recorrências pelo histórico, com exportação CSV.
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
│   ├── equipe.html            # gestão e despacho
│   ├── recorrencias.html      # análise histórica
│   └── sla.html               # prazos demonstrativos
├── css/
│   ├── base.css               # sistema visual compartilhado
│   ├── dashboard.css
│   ├── ocorrencias.css
│   ├── equipe.css
│   ├── recorrencias.css
│   └── sla.css
├── js/app.js                  # regras, persistência e interações
├── README.md

```

Cada módulo possui seu próprio HTML e CSS, com `css/base.css` compartilhado para navegação, componentes e responsividade. O JavaScript mantém as regras e os dados em um único lugar para evitar divergências entre telas.

## Publicação estática

O aplicativo é composto por arquivos estáticos. Publique a estrutura completa de pastas, mantendo os caminhos relativos. `index.html` fica na raiz e as telas complementares em `pages/`. Não há comando de build. Depois da publicação, abra a URL pública em uma janela anônima e confirme a navegação e o fluxo de registro. O armazenamento continua sendo local ao navegador de cada visitante; uma versão multiusuário exigiria API, banco de dados e autenticação.

## Dados e equipe

O primeiro acesso carrega 12 registros demonstrativos fictícios e cinco técnicos igualmente fictícios. Novos chamados, técnicos e parâmetros de SLA ficam no navegador da pessoa que os cadastrou. A demonstração inclui diversidade suficiente para observar filtros, prioridades, status, indicadores e recorrências. Os tempos e escalonamentos são parâmetros acadêmicos configuráveis, não SLAs ou regras oficiais OTIS; escalonamentos automáticos só atuam em chamados não atribuídos, avançam um nível por vez e não criam criticidade automaticamente. A análise de recorrência é descritiva e limitada ao histórico disponível.

Integrantes 
