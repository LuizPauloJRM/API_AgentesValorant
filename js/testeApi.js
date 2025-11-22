
async function testarAgentes() {
    try {
        console.log("Testando API de agentes...");
        let resposta = await fetch("https://valorant-api.com/v1/agents?isPlayableCharacter=true&language=pt-BR");
        let dados = await resposta.json();

        console.log("Agentes recebidos da API:", dados.data);
        //console.log(`Total de agentes jogáveis: ${dados.data.length}`);

        // Exemplo: exibir nomes no console
        dados.data.forEach((agente, index) => {
            console.log(`${index + 1} - ${agente.displayName} (${agente.role ? agente.role.displayName : "Sem função"})`);
        });

    } catch (erro) {
        console.error("Erro ao testar API de agentes:", erro);
    }
}
async function testarArmas() {
    try {
        console.log("Testando API de armas...");
        let resposta = await fetch("https://valorant-api.com/v1/weapons?language=pt-BR");
        let dados = await resposta.json();

        console.log("Armas recebidas da API:", dados.data);
        console.log(`Total de armas: ${dados.data.length}`);

        // Exemplo: exibir nomes no console
        dados.data.forEach((arma, index) => {
            console.log(`${index + 1} - ${arma.displayName} (${arma.shopData ? arma.shopData.categoryText : "Sem categoria"})`);
        });

    } catch (erro) {
        console.error("Erro ao testar API de armas:", erro);
    }
}

testarAgentes();
testarArmas();
