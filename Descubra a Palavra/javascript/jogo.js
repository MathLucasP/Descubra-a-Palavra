var Palavras = [];
var Dicas = [];
var Erros = [];
var aux = 0; // Variável auxiliar para controlar a posição da palavra atual
var chances = 4; // Número de chances inicial

// Função para atualizar e exibir as chances restantes
function calcularChances() {
    var imagem = document.getElementById("condicao-jogador");
    var outChances = document.getElementById("outChances");
    var custo = document.getElementById("custo");
    
    outChances.textContent = chances; // Atualiza o número de chances exibido
    if (btDica.disabled == true) { // Se o botão de dica estiver desabilitado
        custo.textContent = ""; // Limpa o texto de custo
    }

    if(chances == 0) {
        Jogo();
    }
    
    imagem.src = `Imagem/Chance${chances}.jpg`; // Atualiza a imagem conforme o número de chances
}

// Função para obter palavras e dicas do localStorage
function obterLocalStorage() {
    var palavras = localStorage.getItem("palavra");
    var dicas = localStorage.getItem("dica");

    if(palavras == null) {
       mostrarPalavra(); 
    }

    palavras = palavras.toUpperCase();
    if (palavras) {
        var arrayPalavras = palavras.split(";");
        for (var i = 0; i < arrayPalavras.length; i++) {
            if (arrayPalavras[i].trim() !== "") {
                Palavras.push(arrayPalavras[i].trim()); // Adiciona palavras ao array Palavras
            }
        }
    }

    if (dicas) {
        var arrayDicas = dicas.split(";");
        for (var i = 0; i < arrayDicas.length; i++) {
            if (arrayDicas[i].trim() !== "") {
                Dicas.push(arrayDicas[i].trim()); // Adiciona dicas ao array Dicas
            }
        }
    }
}

// Função para mostrar a palavra atual com traços
function mostrarPalavra() {
    var outChances = document.getElementById("outChances");
    var outPalavra = document.getElementById("outPalavra");
    var custo = document.getElementById("custo");

    custo.textContent = "Custo: 1 chance"; // Exibe o custo de uma dica

    outChances.textContent = chances; // Exibe o número de chances restantes
    if (Palavras.length === 0) {
        outPalavra.textContent = 'Não há palavras cadastradas.'; // Exibe mensagem se não houver palavras cadastradas
        return;
    }

    var palavraAtual = Palavras[aux];
    traços = palavraAtual.charAt(0); // Cria a representação inicial da palavra com traços

    for (var i = 1; i < palavraAtual.length; i++) {
        traços += " _"; // Adiciona traços para as letras da palavra
    }

    outPalavra.textContent = traços; // Exibe a palavra com traços
}

// Função para mostrar a próxima palavra do jogo
function mostrarProximaPalavra() {
    chances = 4; // Reinicia o número de chances
    aux = (aux + 1) % Palavras.length; // Avança para a próxima palavra no array Palavras
    mostrarPalavra(); // Mostra a nova palavra
    Erros = []; // Limpa o array de erros
    
    var imagem = document.getElementById("condicao-jogador");
    imagem.src = `Imagem/Chance4.jpg`; // Reinicia a imagem de acordo com as chances
    document.getElementById("outErrosMain").textContent = "";
    document.getElementById("outErros").textContent = Erros.join(", ");
    document.getElementById("outDica").textContent = "";
    document.getElementById("custo").textContent = "Custo: 1 chance";
    btDica.disabled = false; // Habilita o botão de dica
    btDica.style.display = "inline";
}

// Função principal do jogo, verifica a letra inserida
function Jogo() {
    
    if (chances == 0) {
        alert("Você perdeu!"); // Mensagem de perda se acabarem as chances
        location.reload(); // Recarrega a página
        return;
    }

    var outPalavra = document.getElementById("outPalavra");
    var inLetra = document.getElementById("inLetra");
    var outErros = document.getElementById("outErros");
    var outErrosMain = document.getElementById("outErrosMain");
    var outChances = document.getElementById("outChances");
    var imagem = document.getElementById("condicao-jogador");

    outErrosMain.textContent += ""
    outChances.textContent = chances;

    if (Palavras.length === 0) {
        alert("Cadastre uma palavra primeiro."); // Alerta se não houver palavras cadastradas
        return;
    }

    var palavraAtual = Palavras[aux];
    var letra = inLetra.value.toUpperCase();

    if (letra == "" || letra.match(/[0-9]/)) {
        alert("Insira uma letra."); // Alerta se nenhuma letra for inserida
        inLetra.focus();
        return;
    }

    if (Erros.includes(letra)) {
        alert("Você já tentou a letra: '" + letra + "'. Tente outra"); // Alerta se a letra já foi tentada
        inLetra.value = "";
        inLetra.focus();
        return;
    }

    if (!palavraAtual.includes(letra)) {
        chances--;
        if (chances <= 3) {
            outErrosMain.textContent = "Erros: "; // Atualiza o campo de erros
        }
        Erros.push(letra); // Adiciona a letra ao array de erros
        outErros.textContent = Erros.join(", "); // Exibe os erros
        outChances.textContent = chances; // Atualiza as chances
        calcularChances(); // Atualiza a imagem de acordo com as chances
    }

    var novaPalavra = "";
    for (var i = 0; i < palavraAtual.length; i++) {
        if (palavraAtual[i] === letra) {
            novaPalavra += letra + " ";
        } else if (traços[i * 2] !== "_") {
            novaPalavra += traços[i * 2] + " ";
        } else {
            novaPalavra += "_ ";
        }
    }

    traços = novaPalavra.trim();
    outPalavra.textContent = traços; // Atualiza a palavra exibida com as letras descobertas

    if (!traços.includes("_")) {
        alert("Parabéns! Você descobriu a palavra!"); // Mensagem de vitória se todas as letras foram descobertas
        mostrarProximaPalavra(); // Mostra a próxima palavra
    }

    inLetra.value = "";
    inLetra.focus();
}

// Função para mostrar a dica da palavra atual
function mostrarDica() {
    if (Dicas.length === 0) {
        alert("Não há dicas cadastradas."); // Alerta se não houver dicas cadastradas
        return;
    }

    var outDica = document.getElementById("outDica");
    outDica.textContent = "Dica: " + Dicas[aux]; // Exibe a dica correspondente à palavra atual
    chances--; // Reduz uma chance ao mostrar a dica
    document.getElementById("outErros").textContent = Erros.join(", "); // Atualiza os erros exibidos
    btDica.disabled = true; // Desabilita o botão de dica
    btDica.style.display = "none"; // Esconde o botão de dica
    
    calcularChances(); // Atualiza a imagem de acordo com as chances
}

// Event listeners para os botões do jogo
document.getElementById("btTrocar").addEventListener("click", mostrarProximaPalavra);
document.getElementById("btChutar").addEventListener("click", Jogo);
document.getElementById("btDica").addEventListener("click", mostrarDica);

obterLocalStorage(); // Obtém palavras e dicas do localStorage ao carregar a página
mostrarPalavra(); // Mostra a primeira palavra ao iniciar o jogo
