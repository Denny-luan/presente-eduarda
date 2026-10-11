"use strict";

const etapas = [
  document.getElementById("etapa-inicial"),
  document.getElementById("etapa-carta"),
  document.getElementById("etapa-mensagem"),
  document.getElementById("etapa-final")
];

const botaoComecar = document.getElementById("comecar");
const botaoAbrirCarta = document.getElementById("abrir-carta");
const botaoContinuar = document.getElementById("continuar");
const botaoRecomecar = document.getElementById("recomecar");

const textoCarta = document.getElementById("texto-carta");
const recipienteCoracoes = document.getElementById("coracoes");

const mensagem = [
  "Eduarda, você é uma pessoa muito especial para mim. ",
  "Sua presença deixa meus dias mais leves, e cada conversa ",
  "com você se torna um motivo para sorrir.\n\n",
  "Quero que saiba que pode contar comigo, seja para ",
  "desabafar, rir ou enfrentar um dia difícil. Estarei aqui ",
  "para te ouvir, te apoiar e torcer pela sua felicidade.\n\n",
  "Às vezes, o coração sente coisas que a amizade sozinha ",
  "não consegue explicar... E talvez um dia você descubra ",
  "o que o meu tenta dizer em silêncio.\n\n",
  "Sem pressa, sem cobrança, apenas com muito carinho por você."
].join("");

let temporizadorTexto = null;
let indiceTexto = 0;
let geracaoTexto = 0;

function mostrarEtapa(indice) {
  etapas.forEach((etapa, posicao) => {
    const ativa = posicao === indice;
    etapa.hidden = !ativa;
    etapa.classList.toggle("ativa", ativa);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function pararDigitacao() {
  geracaoTexto++;

  if (temporizadorTexto !== null) {
    clearTimeout(temporizadorTexto);
    temporizadorTexto = null;
  }
}

function escreverCarta() {
  pararDigitacao();

  const minhaGeracao = geracaoTexto;

  indiceTexto = 0;
  textoCarta.textContent = "";
  botaoContinuar.hidden = true;

  const velocidade = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches ? 0 : 28;

  function escreverProximoTrecho() {
    if (minhaGeracao !== geracaoTexto) return;

    if (indiceTexto >= mensagem.length) {
      temporizadorTexto = null;
      botaoContinuar.hidden = false;
      return;
    }

    const tamanhoTrecho = velocidade === 0 ? mensagem.length : 2;

    textoCarta.textContent += mensagem.slice(
      indiceTexto,
      indiceTexto + tamanhoTrecho
    );

    indiceTexto += tamanhoTrecho;

    temporizadorTexto = setTimeout(
      escreverProximoTrecho,
      velocidade
    );
  }

  escreverProximoTrecho();
}

const reduzirMovimento = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

function criarCoracao() {
  if (reduzirMovimento) return;

  if (recipienteCoracoes.childElementCount >= 24) return;

  const coracao = document.createElement("span");

  coracao.className = "coracao-flutuante";
  coracao.textContent = Math.random() > 0.25 ? "♥" : "♡";
  coracao.style.left = `${Math.random() * 96}%`;
  coracao.style.fontSize = `${12 + Math.random() * 20}px`;
  coracao.style.animationDuration = `${7 + Math.random() * 7}s`;
  coracao.style.animationDelay = `${Math.random() * 1.5}s`;

  recipienteCoracoes.appendChild(coracao);

  coracao.addEventListener(
    "animationend",
    () => coracao.remove(),
    { once: true }
  );
}

if (!reduzirMovimento) {
  criarCoracao();
  window.setInterval(criarCoracao, 650);
}

botaoComecar.addEventListener("click", () => {
  mostrarEtapa(1);
});

botaoAbrirCarta.addEventListener("click", () => {
  mostrarEtapa(2);
  escreverCarta();
});

botaoContinuar.addEventListener("click", () => {
  pararDigitacao();
  mostrarEtapa(3);
});

botaoRecomecar.addEventListener("click", () => {
  pararDigitacao();

  indiceTexto = 0;
  textoCarta.textContent = "";
  botaoContinuar.hidden = true;

  mostrarEtapa(0);
});

mostrarEtapa(0);