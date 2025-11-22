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
