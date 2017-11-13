const bpm = document.getElementById('bpm');
const h1 = document.querySelector('h1');
const play = document.getElementById('play');
const clap = document.getElementById('clap');
const beep = document.getElementById('beep');
const divNota = document.querySelector('.nota');

const quartas = document.getElementById
let currentBpm = 40;
let isPlaying = false;
let timer = null;

var max = 11;
var notas = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
var qtdNota = 7;
var play4axis = true;
var tipo = '';

function tick() {
    clap.currentTime = 0;
    clap.play();
    use4Axis();
}

function use4Axis() {
    if (qtdNota > 1) {
        if (qtdNota == 7) {
            randomNota();
            qtdNota--;
            /*
            switch (tipo) {
                case "quartas":
                    porIntervalos(4);
                    break;
                case "quintas":
                    porIntervalos(5);
                    break;
                case "aleatorio":
                    randomNota();
                    break;
            }
            */
        }
        else
            qtdNota--;
    } else {
        qtdNota = 7;
    }
}

bpm.addEventListener('change', function () {
    h1.innerHTML = this.value + ' bpm'
    currentBpm = parseInt(this.value)
    if (isPlaying) {
        clearInterval(timer)
        timer = setInterval(tick, (60 * 1000) / currentBpm)
    }
});

function getTipo() {
    return "aleatorio";
    /*
    var tipos = document.getElementsByName('tipo')
    tipos.forEach(function (element) {
        if (element.checked) {
            tipo = element.value;
        }
    }, this);
    */
}

play.addEventListener('click', function () {
    if (isPlaying) {
        play.innerHTML = 'Play'
        clearInterval(timer)
    } else {
        getTipo();
        tick()
        play.innerHTML = 'Stop'
        timer = setInterval(tick, (60 * 1000) / currentBpm)
    }
    isPlaying = !isPlaying
});

function randomNota() {
    beep.currentTime = 0;
    beep.play();
    var index = Math.round(Math.random() * (max - 0) + 0);
    var nota = notas[index];
    divNota.innerHTML = nota;
}

let currentInterval = undefined;
function porIntervalos(intervalo) {
    var nota = '';
    if (currentInterval == undefined) {
        nota = notas[0];
        currentInterval = 0;
    }
    else if ((currentInterval + intervalo) > notas.length - 1) {
        var diff = Math.abs((currentInterval + intervalo) - (notas.length - 1));
        nota = notas[diff];
    }
    else {
        nota = notas[currentInterval + intervalo];
        currentInterval = currentInterval + intervalo;
    }
    divNota.innerHTML = nota;
}