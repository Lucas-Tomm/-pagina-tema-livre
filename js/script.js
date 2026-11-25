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
