# Valorant Agents - Projeto Frontend

## Descrição

O **Valorant Agents** é uma aplicação frontend que consome a **API oficial de Valorant** para exibir todos os agentes e armas do jogo. O projeto foi desenvolvido como estudo de JavaScript, HTML, CSS e Bootstrap, aplicando conceitos de **async/await**, **fetch**, **DOM dinâmico** e manipulação de eventos.
<img width="1346" height="575" alt="image" src="https://github.com/user-attachments/assets/344a66a2-dd33-4b78-9cf0-ea02b4717528" />
<img width="1347" height="596" alt="image" src="https://github.com/user-attachments/assets/11ea29bb-4b5a-4d91-835d-dcdf3d7c042a" />


Funcionalidades principais:

- Lista de agentes jogáveis com cards interativos
- Modal com informações detalhadas dos agentes (nome, função, habilidades, descrição, imagens)
- Barra de pesquisa interativa de armas
- Modal com informações detalhadas das armas (nome, categoria, preço, descrição)
- Consumo de API totalmente via frontend
- Navegação entre páginas (`index.html` e `sobre.html`)  

O projeto foi inspirado e guiado por conceitos aprendidos com **Professor Renan** em sala de aula e em referência ao projeto do Gamma App: [Projeto Lista de Tarefas com localStorage, Navegação e Inicialização](https://gamma.app/docs/Projeto-Lista-de-Tarefas-com-localStorage-Navegacao-e-Inicializac-aopot92tuki4fjk?mode=doc).

---

## Tecnologias utilizadas

- HTML5  
- CSS3  
- Bootstrap 5  
- JavaScript (ES6+)  
- API oficial do Valorant: [https://valorant-api.com](https://valorant-api.com)  

---

## Estrutura do projeto

/valorant-agentes
│
├─ index.html → Página principal com agentes e armas
├─ sobre.html → Página sobre o projeto
├─ css/
│ └─ style.css → Estilos personalizados
├─ js/
│ └─ app.js → Código JavaScript com consumo da API
└─ assets/ → Imagens, logos e ícones


---

## Consumo da API

A aplicação consome a **API oficial do Valorant** de forma **assíncrona** usando `fetch` e `async/await`.  

### Exemplo de consumo de agentes:

```javascript
async function carregarAgentes() {
    const resposta = await fetch("https://valorant-api.com/v1/agents?isPlayableCharacter=true&language=pt-BR");
    const dados = await resposta.json();
    const agentes = dados.data;
    // Agora é possível iterar sobre os agentes e criar os cards no DOM
}

### Estrutura de um agente

```javascript
{
  "uuid": "uuid-do-agente",
  "displayName": "Jett",
  "description": "Jett é uma duelista ágil...",
  "role": { "displayName": "Duelista" },
  "displayIcon": "url-pequena",
  "fullPortrait": "url-grande",
  "abilities": [
    { "displayName": "Updraft", "description": "Salta para cima rapidamente" }
  ]
}

### Consumo de armas

```javascript
async function buscarArmas(query) {
    const resposta = await fetch('https://valorant-api.com/v1/weapons?language=pt-BR');
    const dados = await resposta.json();
    const armas = dados.data.filter(arma => arma.displayName.toLowerCase().includes(query.toLowerCase()));
    // Criar cards dinamicamente com informações
}

Conceitos aprendidos

Durante o desenvolvimento deste projeto, foram aplicados e estudados:

Async/await e fetch API para consumo de dados assíncronos

Manipulação dinâmica do DOM para criar cards e modais

Eventos em JavaScript (click, keyup)

Estruturação de projetos frontend com HTML, CSS e Bootstrap

Criação de componentes reutilizáveis (cards, modais)

Uso de APIs públicas para criar conteúdo interativo

Navegação entre páginas e organização de arquivos

Como rodar

Clone o repositório:

git clone https://github.com/seuusuario/valorant-agents.git


Abra index.html no navegador.

Aguarde os agentes carregarem automaticamente.

Clique nos cards para abrir o modal com detalhes.

Use a barra de pesquisa de armas para buscar e ver informações.

Referências

API Valorant

Projeto Lista de Tarefas - Gamma App

Conceitos ensinados pelo Professor Renan em sala de aula

Observações

Todo o projeto funciona 100% frontend, não precisa de backend.

A API pode retornar dados em inglês se o parâmetro language não for definido.

Este projeto pode ser expandido com filtros por função, skins, mapas e melhorias visuais.
