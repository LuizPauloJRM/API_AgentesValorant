# API_AgentesValorant
 cada detalhe do projeto "Agentes do Valorant" e aprender a criar um aplicativo web de qualidade. 
A API que você está usando é a Valorant API: https://valorant-api.com/.
Ela é gratuita, pública, não exige autenticação e fornece dados de agentes, mapas, armas, skins, etc.

Como consumir

No seu projeto, você faz um fetch em JavaScript puro:

const resposta = await fetch("https://valorant-api.com/v1/agents?isPlayableCharacter=true&language=pt-BR");
const dados = await resposta.json();


https://valorant-api.com/v1/agents → Endpoint de agentes

isPlayableCharacter=true → Retorna apenas os agentes jogáveis

language=pt-BR → Retorna os textos em Português

O resultado (dados.data) é um array de objetos representando cada agente.

Estrutura de um agente

Exemplo simplificado de um agente:

{
  "uuid": "uuid-do-agente",
  "displayName": "Jett",
  "description": "Jett é uma duelista ágil...",
  "role": {
    "displayName": "Duelista"
  },
  "displayIcon": "url-da-imagem-pequena",
  "fullPortrait": "url-da-imagem-grande",
  "abilities": [
    {
      "displayName": "Updraft",
      "description": "Salta para cima rapidamente",
      "slot": "Ability1",
      "displayIcon": "url-icone"
    },
    ...
  ]
}


uuid → Identificador único do agente

displayName → Nome do agente

description → Descrição do agente

role.displayName → Função do agente (Duelista, Controlador, Sentinela, Iniciador)

displayIcon → Imagem pequena para card

fullPortrait → Imagem grande para modal

abilities → Array com habilidades do agente

Como funciona no seu projeto

Você faz o fetch → pega JSON com todos os agentes.

Itera sobre o array (forEach) → cria cards HTML dinamicamente.

Adiciona evento de clique → abre Modal com informações detalhadas do agente.

O Modal exibe:

Nome, função, descrição

Imagem completa (fullPortrait)

Lista de habilidades

Tudo sem backend, apenas HTML, CSS e JS puro.

2️⃣ README completo para o projeto
# Valorant Agents - Projeto Frontend

## Descrição
Esta é uma página de estudo que consome a **API oficial do Valorant** para mostrar todos os agentes do jogo. 
O projeto utiliza **HTML, CSS, Bootstrap e JavaScript puro**, funcionando totalmente local sem backend.

Você pode:
- Visualizar todos os agentes em cards clicáveis
- Abrir um modal com informações detalhadas de cada agente
- Ver habilidades e descrição dos agentes
- Ver imagens pequenas e grandes de cada agente

---

## API Utilizada

**Base URL:** `https://valorant-api.com/v1/`

**Endpoints principais:**

1. **Agentes**


GET /agents?isPlayableCharacter=true&language=pt-BR

- Retorna todos os agentes jogáveis
- Parâmetros opcionais:
  - `isPlayableCharacter=true` → filtra apenas agentes jogáveis
  - `language=pt-BR` → retorna informações em português

**Exemplo de resposta de um agente:**
```json
{
  "uuid": "uuid-do-agente",
  "displayName": "Jett",
  "description": "Jett é uma duelista ágil...",
  "role": {
    "displayName": "Duelista"
  },
  "displayIcon": "url-da-imagem-pequena",
  "fullPortrait": "url-da-imagem-grande",
  "abilities": [
    {
      "displayName": "Updraft",
      "description": "Salta para cima rapidamente",
      "slot": "Ability1",
      "displayIcon": "url-icone"
    }
  ]
}


Outros endpoints úteis (opcional):

Mapas: /maps

Armas: /weapons

Skins: /skins

Todos suportam o parâmetro language para retornar textos em português.

Estrutura do projeto
/valorant-agents
│
├─ index.html         → Página principal
├─ sobre.html         → Página “Sobre”
├─ css/
│   └─ style.css      → Estilos personalizados
├─ js/
│   └─ app.js         → Código JavaScript
└─ assets/            → Imagens e logos

Funcionamento do JavaScript

Faz fetch na API para obter dados dos agentes

Itera sobre os agentes e cria cards dinamicamente

Cada card recebe evento de clique que abre um modal

Modal mostra:

Nome

Função

Descrição

Habilidades

Imagem grande

Tudo atualizado automaticamente sempre que a página é carregada

Como rodar

Clone ou baixe o projeto

Abra index.html no navegador

Os agentes serão carregados automaticamente da API

Clique em qualquer agente para ver detalhes no modal

Tecnologias utilizadas

HTML5

CSS3

Bootstrap 5

JavaScript puro (ES6)

API oficial do Valorant (https://valorant-api.com/)