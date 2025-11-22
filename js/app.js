//inicio do codigo , função carregarAgentes , ao carregar a pagina 
async function carregarAgentes() {
    // Faz a requisição à API  , await espera a resposta antes de continuar e fetch busca os dados da url 
    let resposta = await fetch("https://valorant-api.com/v1/agents?isPlayableCharacter=true&language=pt-BR");

    // Verifica se a resposta foi bem-sucedida
    if (resposta.ok) {
        let dados = await resposta.json(); // Converte a resposta em JSON
        let agentes = dados.data; // Array de agentes retornado pela API
        let lista = document.getElementById("lista-agentes"); // Container onde os cards serão adicionados

        // Para cada agente, cria um card dinâmico
        //for each  percorre cada elemento do array
        agentes.forEach(agente => {
            let card = document.createElement("div");
            card.classList.add("col-6", "col-md-4", "col-lg-3"); // Classes Bootstrap para responsividade
            //teste para ver o que tem no agente 
            //console.log(agente);

            // Conteúdo HTML do card
            card.innerHTML = `
                <div class="card bg-dark text-white card-agente" data-id="${agente.uuid}">
                    <img src="${agente.displayIcon}" class="card-img-top" alt="${agente.displayName}">
                    <div class="card-body text-center">
                        <h5 class="card-title">${agente.displayName}</h5>
                    </div>
                </div>
            `;

            // Adiciona evento de clique para abrir modal do agente
            card.addEventListener("click", () => abrirModalAgente(agente));

            // Adiciona o card ao container
            lista.appendChild(card);
        });
    } else {
        console.error("Erro ao carregar agentes: status", resposta.status);
    }
}

//agente modulo  , função abrirModalAgente
function abrirModalAgente(agente) {
    // Atualiza o conteúdo do modal com informações do agente
    document.getElementById("agenteNome").textContent = agente.displayName;
    document.getElementById("agenteImagem").src = agente.fullPortrait || agente.displayIcon;
    document.getElementById("agenteFuncao").textContent = agente.role ? agente.role.displayName : "Sem função";
    document.getElementById("agenteDescricao").textContent = agente.description;

    // Lista de habilidades
    let listaHabilidades = document.getElementById("agenteHabilidades");
    listaHabilidades.innerHTML = ""; // Limpa conteúdo antigo

    // Adiciona cada habilidade do agente
    agente.abilities.forEach(hab => {
        if (!hab.displayName) return; // Ignora habilidades sem nome

        let li = document.createElement("li");
        li.textContent = `${hab.displayName} – ${hab.description}`;
        listaHabilidades.appendChild(li);
    });

    // Inicializa e mostra o modal com Bootstrap
    let modal = new bootstrap.Modal(document.getElementById("modalAgente"));
    modal.show();
}

// Inicializa a função de carregar agentes assim que o script é carregado
carregarAgentes();


//selecao de armas
let inputArma = document.getElementById('inputPesquisaArma'); // Campo de busca
let btnPesquisarArma = document.getElementById('btnPesquisarArma'); // Botão de pesquisa
let resultadoArmas = document.getElementById('resultadoArmas'); // Container dos resultados

//Armas na api , função buscarArmas
async function buscarArmas(query) {
    // Requisição à API de armas
    let resposta = await fetch('https://valorant-api.com/v1/weapons?language=pt-BR');

    // Verifica se a resposta foi bem-sucedida
    if (resposta.ok) {
        let dados = await resposta.json();
        let armas = dados.data;

        // filtra armas pelo nome digitado (case insensitive)
        let resultados = armas.filter(arma => arma.displayName.toLowerCase().includes(query.toLowerCase()));

        // Limpa resultados antigos
        resultadoArmas.innerHTML = '';

        // Cria cards para cada arma encontrada
        resultados.forEach(arma => {
            let card = document.createElement('div');
            card.classList.add('col-6', 'col-md-4', 'col-lg-3');
            // Conteúdo HTML do card innerHTML faz o preenchimento do card com elemento HTML
            card.innerHTML = `
                <div class="card bg-dark text-white card-arma" data-id="${arma.uuid}">
                    <img src="${arma.displayIcon}" class="card-img-top" alt="${arma.displayName}">
                    <div class="card-body text-center">
                        <h5 class="card-title">${arma.displayName}</h5>
                    </div>
                </div>
            `;

            // Evento para abrir modal da arma
            card.addEventListener('click', () => abrirModalArma(arma));

            resultadoArmas.appendChild(card);
        });

        // Mensagem caso nenhuma arma seja encontrada
        if (resultados.length === 0) {
            resultadoArmas.innerHTML = '<p class="text-center mt-3">Nenhuma arma encontrada.</p>';
        }
    } else {
        console.error("Erro ao buscar armas: status", resposta.status);
    }
}

//Abrir arma  modulo  , função 
function abrirModalArma(arma) {
    document.getElementById('armaNome').textContent = arma.displayName;
    document.getElementById('armaImagem').src = arma.displayIcon || '';
    document.getElementById('armaCategoria').textContent = arma.shopData ? arma.shopData.categoryText : 'Sem categoria';
    document.getElementById('armaPreco').textContent = arma.shopData ? `${arma.shopData.cost} VP` : 'N/A';
    document.getElementById('armaDescricao').textContent = arma.description || 'Sem descrição';

    let modal = new bootstrap.Modal(document.getElementById('modalArma'));
    modal.show();
    //console.log(arma);
}

// Clique no botão de pesquisa interage com a função buscarArmas
btnPesquisarArma.addEventListener('click', () => buscarArmas(inputArma.value));

// Digitar no campo de pesquisa (busca em tempo real)
inputArma.addEventListener('keyup', () => {
    if (inputArma.value.length >= 2) { // Apenas busca se tiver 2 ou mais caracteres
        buscarArmas(inputArma.value);
    } else {
        resultadoArmas.innerHTML = ''; // Limpa resultados ao ter menos de 2 caracteres
    }
});
