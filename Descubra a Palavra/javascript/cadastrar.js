// Função para cadastrar uma nova palavra e sua dica
function cadastrar() {
    var inPalavra = document.getElementById("inPalavra");
    var inDica = document.getElementById("inDica");
    
    var palavra = inPalavra.value; // Obtém o valor do campo de palavra
    var dica = inDica.value; // Obtém o valor do campo de dica
    
    // Verifica se os campos estão vazios
    if (dica == "" || palavra == "") {
        alert("Preencha os campos corretamente!"); // Alerta se algum campo estiver vazio
        inPalavra.focus(); // Coloca o foco de volta no campo de palavra
        return;
    }

    // Verifica se no campo inPalavra contém números
    if(palavra.match(/[0-9]/)) {
        alert("Não insira números na palavra");
        inPalavra.focus();
        return;
    }
    
    // Verifica se já existem palavras e dicas armazenadas no localStorage
    if (localStorage.getItem("palavra") && localStorage.getItem("dica")) {
        palavra = localStorage.getItem("palavra") + palavra + ";"; // Concatena a nova palavra ao que já existe
        dica = localStorage.getItem("dica") + dica + ";"; // Concatena a nova dica ao que já existe
        localStorage.setItem("palavra", palavra); // Atualiza o localStorage com a nova lista de palavras
        localStorage.setItem("dica", dica); // Atualiza o localStorage com a nova lista de dicas
    } else {
        palavra += ";"; // Adiciona a nova palavra seguida de ponto e vírgula
        dica += ";"; // Adiciona a nova dica seguida de ponto e vírgula
        localStorage.setItem("palavra", palavra); // Armazena a nova palavra no localStorage
        localStorage.setItem("dica", dica); // Armazena a nova dica no localStorage
    }
    
    inPalavra.value = ""; // Limpa o campo de palavra após cadastrar
    inDica.value = ""; // Limpa o campo de dica após cadastrar
    inPalavra.focus(); // Coloca o foco de volta no campo de palavra para o próximo cadastro
}

// Obtém o botão de cadastrar pelo ID e adiciona um listener para chamar a função cadastrar() ao clicar
var btCadastrar = document.getElementById("btCadastrar");
btCadastrar.addEventListener('click', cadastrar);
