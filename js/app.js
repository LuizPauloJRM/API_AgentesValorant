async function carregarAgentes() {
    try {
        const resposta = await fetch("https://valorant-api.com/v1/agents?isPlayableCharacter=true&language=pt-BR");
        const dados = await resposta.json();

        const agentes = dados.data;
        const lista = document.getElementById("lista-agentes");

        agentes.forEach(agente => {
            const card = document.createElement("div");
            card.classList.add("col-6", "col-md-4", "col-lg-3");

            card.innerHTML = `
                <div class="card bg-dark text-white card-agente" data-id="${agente.uuid}">
                    <img src="${agente.displayIcon}" class="card-img-top" alt="${agente.displayName}">
                    <div class="card-body text-center">
                        <h5 class="card-title">${agente.displayName}</h5>
                    </div>
                </div>
            `;

            card.addEventListener("click", () => abrirModalAgente(agente));

            lista.appendChild(card);
        });

    } catch (erro) {
        console.error("Erro ao carregar agentes:", erro);
    }
}

function abrirModalAgente(agente) {
    document.getElementById("agenteNome").textContent = agente.displayName;
    document.getElementById("agenteImagem").src = agente.fullPortrait || agente.displayIcon;
    document.getElementById("agenteFuncao").textContent = agente.role ? agente.role.displayName : "Sem função";
    document.getElementById("agenteDescricao").textContent = agente.description;

    const listaHabilidades = document.getElementById("agenteHabilidades");
    listaHabilidades.innerHTML = "";

    agente.abilities.forEach(hab => {
        if (!hab.displayName) return;

        const li = document.createElement("li");
        li.textContent = `${hab.displayName} – ${hab.description}`;
        listaHabilidades.appendChild(li);
    });

    const modal = new bootstrap.Modal(document.getElementById("modalAgente"));
    modal.show();
}

carregarAgentes();
// Seletores
const inputArma = document.getElementById('inputPesquisaArma');
const btnPesquisarArma = document.getElementById('btnPesquisarArma');
const resultadoArmas = document.getElementById('resultadoArmas');

// Função para buscar armas na API
async function buscarArmas(query) {
    try {
        const resposta = await fetch('https://valorant-api.com/v1/weapons?language=pt-BR');
        const dados = await resposta.json();
        const armas = dados.data;

        // Filtra pelo nome que o usuário digitou (case insensitive)
        const resultados = armas.filter(arma => arma.displayName.toLowerCase().includes(query.toLowerCase()));

        // Limpa resultados antigos
        resultadoArmas.innerHTML = '';

        resultados.forEach(arma => {
            const card = document.createElement('div');
            card.classList.add('col-6', 'col-md-4', 'col-lg-3');

            card.innerHTML = `
                <div class="card bg-dark text-white card-arma" data-id="${arma.uuid}">
                    <img src="${arma.displayIcon}" class="card-img-top" alt="${arma.displayName}">
                    <div class="card-body text-center">
                        <h5 class="card-title">${arma.displayName}</h5>
                    </div>
                </div>
            `;

            card.addEventListener('click', () => abrirModalArma(arma));

            resultadoArmas.appendChild(card);
        });

        if (resultados.length === 0) {
            resultadoArmas.innerHTML = '<p class="text-center mt-3">Nenhuma arma encontrada.</p>';
        }

    } catch (erro) {
        console.error("Erro ao buscar armas:", erro);
    }
}

// Função para abrir modal com informações da arma
function abrirModalArma(arma) {
    document.getElementById('armaNome').textContent = arma.displayName;
    document.getElementById('armaImagem').src = arma.displayIcon || '';
    document.getElementById('armaCategoria').textContent = arma.shopData ? arma.shopData.categoryText : 'Sem categoria';
    document.getElementById('armaPreco').textContent = arma.shopData ? `${arma.shopData.cost} VP` : 'N/A';
    document.getElementById('armaDescricao').textContent = arma.description || 'Sem descrição';

    const modal = new bootstrap.Modal(document.getElementById('modalArma'));
    modal.show();
}

// Eventos
btnPesquisarArma.addEventListener('click', () => buscarArmas(inputArma.value));
inputArma.addEventListener('keyup', (e) => {
    // Busca ao digitar, apenas se tiver mais de 2 caracteres
    if (inputArma.value.length >= 2) {
        buscarArmas(inputArma.value);
    } else {
        resultadoArmas.innerHTML = '';
    }
});
