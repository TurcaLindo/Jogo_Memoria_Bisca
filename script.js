const cards = document.querySelectorAll('.memory-card');

let virou = false;
let baralho = false;
let carta1, carta2;
let vitoria = 0;
let jogadas = 0;

function resetarTabuleiro() {
  [virou, baralho] = [false, false];
  [carta1, carta2] = [null, null];
}

document.getElementById('reset').addEventListener('click', function() {
  window.location.reload();
});

function click() {
  if (baralho) return;
  if (this === carta1) return;

  if (this.dataset.framework === "Joker") {
    this.classList.add('flip')
    setTimeout(() => {
      alert("🃏CORINGUEI🃏 HAHAHAHAHAHAHHAHAHAHA\n Você Perdeu em: "+ jogadas +" jogadas");
      location.reload(); /*usado para carregar dnv a página, se quiser da pra ativar!*/
    }, 500);
    return;
  }

  this.classList.add('flip');

  if (!virou) {
    virou = true;
    carta1 = this;

    return;
  }
  carta2 = this;
  igual();

  jogadas++;
}

function igual() {
  let isMatch = carta1.dataset.framework === carta2.dataset.framework;
  isMatch ? retiraclick() : desvirar();
}

(function embaralhar() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 9);
    card.style.order = randomPos;
  });
})();

function desvirar() {
  baralho = true;

  setTimeout(() => {
    carta1.classList.remove('flip');
    carta2.classList.remove('flip');

    resetarTabuleiro();
  }, 1500);
}

function retiraclick() {
  carta1.removeEventListener('click', click);
  carta2.removeEventListener('click', click);

  vitoria++;
  
  if (vitoria === 4) {
    setTimeout(() => {
      alert("Parabéns! Você venceu o jogo! em: " + jogadas + " jogadas!");
      location.reload();
    }, 500);

  }

  resetarTabuleiro();
}

cards.forEach(card => card.addEventListener('click', click));
function recaregar(){
    location.reload()
}