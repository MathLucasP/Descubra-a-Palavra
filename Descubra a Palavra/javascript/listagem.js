// Inicializa o array 'palavra' e chama a função Recuperar() para preencher o array com dados do localStorage.
let palavra = [];
palavra = Recuperar();

// Função para recuperar palavras do localStorage.
function Recuperar() {
    // Pega a string de palavras do localStorage e divide em um array, ou cria um array vazio se não houver dados.
    var palavras = localStorage.getItem("palavra").split(";") || [];
    // Remove o último elemento se for uma string vazia.
    if (palavras[palavras.length - 1] === "") {
        palavras.pop();
    }
    return palavras;
}

// Guarda a quantidade de palavras recuperadas.
const quantPalavras = palavra.length;

// Chama a função para listar as palavras na tabela.
listarPalavras();

// Função para salvar as palavras no localStorage.
function Salvar() {
    // Remove o último elemento do array se for uma string vazia.
    if (palavra[palavra.length - 1] === "") {
        palavra.pop();
    }
    // Salva o array de palavras no localStorage, convertendo-o em uma string separada por ";"
    localStorage.setItem("palavra", palavra.join(";"));
}

// Função para listar as palavras na tabela.
function listarPalavras() {
    var tabela = document.getElementById("tabela").getElementsByTagName("tbody")[0];
    // Limpa o conteúdo atual da tabela.
    tabela.innerHTML = "";

    // Recupera o array de palavras do localStorage.
    var arrPalavras = localStorage.getItem("palavra")?.split(";") || [];
    // Remove o último elemento se for uma string vazia.
    if (arrPalavras[arrPalavras.length - 1] === "") {
        arrPalavras.pop();
    }

    // Recupera o array de dicas do localStorage.
    var arrDicas = localStorage.getItem("dica")?.split(";") || [];
    // Remove o último elemento se for uma string vazia.
    if (arrDicas[arrDicas.length - 1] === "") {
        arrDicas.pop();
    }

    // Adiciona as palavras e dicas na tabela.
    for (let i = 0; i < quantPalavras; i++) {
        var novaLinha = tabela.insertRow(0);
        novaLinha.id = "Table" + i;
        var celulaPalavra = novaLinha.insertCell(0);
        var celulaDica = novaLinha.insertCell(1);
        var celulaCheckbox = novaLinha.insertCell(2);

        celulaPalavra.id = "palavraTable";
        celulaDica.id = "dicaTable";

        celulaPalavra.innerHTML = arrPalavras[i];
        celulaDica.innerHTML = arrDicas[i];
        celulaCheckbox.innerHTML = "<input type='checkbox' data-index='" + i + "'>";

        // Alterna a cor de fundo das células para linhas pares.
        if (i % 2 === 0) {
            celulaPalavra.style.backgroundColor = "rgb(180, 175, 175)";
            celulaDica.style.backgroundColor = "rgb(180, 175, 175)";
            celulaCheckbox.style.backgroundColor = "rgb(180, 175, 175)";
        }
    }
}

// Função para excluir as palavras selecionadas.
function excluirSelecionados() {
    // Recupera os arrays de palavras e dicas do localStorage.
    let arrPalavras = localStorage.getItem("palavra").split(";") || [];
    if (arrPalavras[arrPalavras.length - 1] === "") {
        arrPalavras.pop();
    }

    let arrDicas = localStorage.getItem("dica").split(";") || [];
    if (arrDicas[arrDicas.length - 1] === "") {
        arrDicas.pop();
    }

    var tabela = document.getElementById("tabela").getElementsByTagName("tbody")[0];
    var checkboxes = tabela.querySelectorAll('input[type="checkbox"]');

    var novasPalavras = [];
    var novasDicas = [];

    // Adiciona ao novo array apenas as palavras e dicas que não estão marcadas para exclusão.
    for (let i = 0; i < checkboxes.length; i++) {
        if (!checkboxes[i].checked) {
            novasPalavras.push(arrPalavras[checkboxes[i].dataset.index]);
            novasDicas.push(arrDicas[checkboxes[i].dataset.index]);
        }
    }

    // Atualiza o localStorage com as novas listas de palavras e dicas.
    if (novasPalavras.length > 0) {
        localStorage.setItem("palavra", novasPalavras.join(";") + ";");
    } else {
        localStorage.removeItem("palavra");
    }

    if (novasDicas.length > 0) {
        localStorage.setItem("dica", novasDicas.join(";") + ";");
    } else {
        localStorage.removeItem("dica");
    }

    // Recarrega a lista de palavras e a página.
    listarPalavras();
    location.reload();
}

// Função para marcar ou desmarcar todos os checkboxes.
function mudarCheckboxes(event) {
    var checkboxes = document.querySelectorAll('#tabela input[type="checkbox"]');
    var isChecked = event.target.checked;
    for (var checkbox of checkboxes) {
        checkbox.checked = isChecked;
    }
}

// Adiciona os event listeners aos botões de excluir e selecionar todos.
document.getElementById("btn-excluir").addEventListener("click", excluirSelecionados);
document.getElementById('ckTodos').addEventListener('change', mudarCheckboxes);