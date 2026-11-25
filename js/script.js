/* ==========================================================
   Lendas do Octógono - JavaScript
   Autor: Lucas Corrêa Tomm - DSM3 2025

   Este arquivo trata os dois formulários da página:
   - Cadastro: valida os dados, confere os números e calcula o
     nível de torcedor.
   - Contato: confere se os campos foram preenchidos.
   ========================================================== */

/* ---------- Funções auxiliares ---------- */

// Converte o texto digitado em número.
// Se o texto estiver vazio ou não for um número, lança um erro (Error)
// com uma mensagem que depois é mostrada ao usuário.
function converterNumero(texto, nomeDoCampo) {
  // Remove espaços e troca vírgula por ponto (ex.: "1,75" vira "1.75")
  const limpo = String(texto).trim().replace(",", ".");

  if (limpo === "") {
    throw new Error("Preencha o campo " + nomeDoCampo + ".");
  }

  const numero = Number(limpo);

  // Number("abc") resulta em NaN; Infinity também não serve
  if (!Number.isFinite(numero)) {
    throw new Error("O campo " + nomeDoCampo + " precisa ser um número.");
  }

  return numero;
}

// Marca um campo com erro (borda vermelha definida no CSS)
function marcarErro(campo) {
  campo.classList.add("campo-erro");
  campo.setAttribute("aria-invalid", "true");
}

// Tira a marcação de erro de todos os campos de um formulário
function limparErros(formulario) {
  const campos = formulario.querySelectorAll(".campo-erro");
  campos.forEach(function (campo) {
    campo.classList.remove("campo-erro");
    campo.removeAttribute("aria-invalid");
  });
}

// Mostra uma mensagem na caixa indicada.
// tipo pode ser "erro" ou "sucesso" (muda a cor pelo CSS).
// A caixa recebe o foco para o leitor de tela ler a mensagem.
function mostrarMensagem(caixa, tipo, conteudoHtml) {
  caixa.className = tipo === "erro" ? "mensagem-erro" : "mensagem-sucesso";
  caixa.innerHTML = conteudoHtml;
  caixa.hidden = false;
  caixa.focus();
}

// Evita que texto digitado pelo usuário vire código HTML na página
function escaparHtml(texto) {
  const div = document.createElement("div");
  div.textContent = texto;
  return div.innerHTML;
}

/* ---------- Validação do formulário de cadastro ---------- */

// Regras de validação (definidas por mim):
// - nome: obrigatório, com pelo menos 3 letras
// - e-mail: obrigatório e com formato nome@dominio.com
// - nascimento: obrigatório, não pode ser no futuro; idade entre 10 e 120 anos
// - altura: opcional; se preenchida, entre 1,00 m e 2,50 m
// - melhor lutador, categoria e termos: obrigatórios
// - lutas assistidas: obrigatório, número inteiro de 0 a 500
//
// Retorna um objeto com a lista de erros e os dados já convertidos.
function validarCadastro(formulario) {
  const erros = [];
  const dados = {};

  const campoNome = formulario.querySelector("#cad-nome");
  const campoEmail = formulario.querySelector("#cad-email");
  const campoNascimento = formulario.querySelector("#cad-nascimento");
  const campoAltura = formulario.querySelector("#cad-altura");
  const campoLutas = formulario.querySelector("#lutas-assistidas");
  const campoCategoria = formulario.querySelector("#categoria");
  const campoTermos = formulario.querySelector("#termos");
  const melhorEscolhido = formulario.querySelector('input[name="melhor"]:checked');

  // Nome
  dados.nome = campoNome.value.trim();
  if (dados.nome.length < 3) {
    erros.push("Informe seu nome completo (mínimo de 3 letras).");
    marcarErro(campoNome);
  }

  // E-mail
  dados.email = campoEmail.value.trim();
  const modeloEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (dados.email === "") {
    erros.push("Informe seu e-mail.");
    marcarErro(campoEmail);
  } else if (!modeloEmail.test(dados.email)) {
    erros.push("O e-mail digitado não é válido. Exemplo: nome@email.com");
    marcarErro(campoEmail);
  }

  // Data de nascimento e idade
  if (campoNascimento.value === "") {
    erros.push("Informe sua data de nascimento.");
    marcarErro(campoNascimento);
  } else {
    dados.idade = calcularIdade(campoNascimento.value);
    if (dados.idade < 0) {
      erros.push("A data de nascimento não pode estar no futuro.");
      marcarErro(campoNascimento);
    } else if (dados.idade < 10 || dados.idade > 120) {
      erros.push("A idade deve ficar entre 10 e 120 anos.");
      marcarErro(campoNascimento);
    }
  }

  // Altura (opcional): só é conferida se o usuário preencher
  if (campoAltura.value.trim() !== "") {
    try {
      dados.altura = converterNumero(campoAltura.value, "altura");
      if (dados.altura < 1 || dados.altura > 2.5) {
        throw new Error("A altura deve ficar entre 1,00 m e 2,50 m.");
      }
    } catch (erro) {
      erros.push(erro.message);
      marcarErro(campoAltura);
    }
  }

  // Quantidade de lutas assistidas (obrigatório e numérico)
  try {
    dados.lutas = converterNumero(campoLutas.value, "lutas assistidas");
    if (!Number.isInteger(dados.lutas)) {
      throw new Error("As lutas assistidas devem ser um número inteiro, sem vírgula.");
    }
    if (dados.lutas < 0 || dados.lutas > 500) {
      throw new Error("As lutas assistidas devem ficar entre 0 e 500.");
    }
  } catch (erro) {
    erros.push(erro.message);
    marcarErro(campoLutas);
  }

  // Melhor lutador (radio)
  if (melhorEscolhido === null) {
    erros.push("Escolha quem é o melhor lutador de todos.");
  } else {
    dados.melhor = melhorEscolhido.nextElementSibling.textContent;
  }

  // Categoria de peso
  if (campoCategoria.value === "") {
    erros.push("Escolha uma categoria de peso favorita.");
    marcarErro(campoCategoria);
  } else {
    dados.categoria = campoCategoria.options[campoCategoria.selectedIndex].text;
  }

  // Termos de uso
  if (!campoTermos.checked) {
    erros.push("É preciso aceitar os termos de uso.");
    marcarErro(campoTermos);
  }

  return { erros: erros, dados: dados };
}

/* ---------- Cálculos do resultado ---------- */

// Calcula a idade em anos a partir da data no formato AAAA-MM-DD
// (formato devolvido pelo campo type="date")
function calcularIdade(dataTexto) {
  const nascimento = new Date(dataTexto + "T00:00:00");
  const hoje = new Date();

  let idade = hoje.getFullYear() - nascimento.getFullYear();

  // Se o aniversário ainda não chegou neste ano, tira 1 ano
  const jaFezAniversario =
    hoje.getMonth() > nascimento.getMonth() ||
    (hoje.getMonth() === nascimento.getMonth() && hoje.getDate() >= nascimento.getDate());
  if (!jaFezAniversario) {
    idade = idade - 1;
  }

  return idade;
}

// Define o nível de torcedor pela quantidade de lutas assistidas
function descobrirNivel(lutas) {
  if (lutas === 0) {
    return "Novato";
  } else if (lutas <= 10) {
    return "Iniciante";
  } else if (lutas <= 50) {
    return "Torcedor";
  } else if (lutas <= 200) {
    return "Fã de carteirinha";
  }
  return "Lenda do octógono";
}

// Calcula e monta o texto do resultado com os dados já validados
function montarResultado(dados) {
  // Média de lutas assistidas por ano de vida, com 1 casa decimal
  const mediaPorAno = (dados.lutas / dados.idade).toFixed(1).replace(".", ",");
  const nivel = descobrirNivel(dados.lutas);

  let html = "<p><strong>Cadastro enviado com sucesso, " + escaparHtml(dados.nome) + "!</strong></p>";
  html += "<ul>";
  html += "<li>Idade: " + dados.idade + " anos</li>";
  if (dados.altura !== undefined) {
    html += "<li>Altura: " + dados.altura.toFixed(2).replace(".", ",") + " m</li>";
  }
  html += "<li>Melhor lutador para você: " + escaparHtml(dados.melhor) + "</li>";
  html += "<li>Categoria favorita: " + escaparHtml(dados.categoria) + "</li>";
  html += "<li>Lutas assistidas: " + dados.lutas + " (média de " + mediaPorAno + " por ano de vida)</li>";
  html += "<li>Seu nível de torcedor: <strong>" + nivel + "</strong></li>";
  html += "</ul>";
  return html;
}

/* ---------- Envio do formulário de cadastro ---------- */
const formCadastro = document.getElementById("form-cadastro");
const caixaCadastro = document.getElementById("cadastro-mensagem");

formCadastro.addEventListener("submit", function (evento) {
  // Impede o envio normal para o JavaScript conferir os dados primeiro
  evento.preventDefault();

  limparErros(formCadastro);
  caixaCadastro.hidden = true;

  const resultado = validarCadastro(formCadastro);

  if (resultado.erros.length > 0) {
    // Dados inválidos: mostra os problemas e deixa o usuário corrigir
    let html = "<p><strong>Não foi possível enviar. Corrija:</strong></p><ul>";
    resultado.erros.forEach(function (mensagem) {
      html += "<li>" + escaparHtml(mensagem) + "</li>";
    });
    html += "</ul>";
    mostrarMensagem(caixaCadastro, "erro", html);
    return;
  }

  // Dados válidos: mostra o resultado calculado
  mostrarMensagem(caixaCadastro, "sucesso", montarResultado(resultado.dados));
});

// Ao clicar em "Limpar", some também a mensagem e as marcações de erro
formCadastro.addEventListener("reset", function () {
  limparErros(formCadastro);
  caixaCadastro.hidden = true;
});
