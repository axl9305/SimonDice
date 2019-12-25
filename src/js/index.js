// JavaScript source code
// JavaScript source 
const celeste = document.getElementById('celeste');
const violeta = document.getElementById('violeta');
const naranja = document.getElementById('naranja');
const verde = document.getElementById('verde');
const btnEmpezar = document.getElementById('btnEmpezar');
const players = [];
const ULTIMO_NIVEL = 5;
const GLOBAL_OPTIONS_SWEETALERT = {
    closeOnClickOutside: false,
}

class Juego {

    constructor() {
        setTimeout(() => {
            this.inicializar();
            this.generarSecuencia();
            setTimeout(() => {
                this.siguienteNivel();
            }, 500)

        }, 1000)


    }

    inicializar() {
        this.elegirColor = this.elegirColor.bind(this)
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.inicializar = this.inicializar.bind(this)
        this.nivel = 1
        this.colores = {
            celeste,
            violeta,
            naranja,
            verde

        }
    }

    generarSecuencia() {
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
    }

    siguienteNivel() {
        this.subnivel = 0;
        this.iluminarSecuencia();
        this.agregarEventosClick();
    }

    iluminarSecuencia() {
        for (var i = 0; i < this.nivel; i++) {
            let color = this.transformarNumeroAColor(this.secuencia[i])
            setTimeout(() => {
                this.iluminarColor(color)
            }, 1000 * i)
        }
    }

    transformarNumeroAColor(numero) {
        switch (numero) {
            case 0:
                return 'celeste';
            case 1:
                return 'violeta';
            case 2:
                return 'naranja'
            case 3:
                return 'verde'
        }
    }

    transformarColorANumero(color) {
        switch (color) {
            case 'celeste':
                return 0;
            case 'violeta':
                return 1;
            case 'naranja':
                return 2;
            case 'verde':
                return 3;
        }
    }

    iluminarColor(color) {
        this.colores[color].classList.add('light');

        setTimeout(() => {
            this.apagarColor(color)
        }, 350);
    }

    apagarColor(color) {
        this.colores[color].classList.remove('light');
    }

    agregarEventosClick() {
        this.colores.celeste.addEventListener('click', this.elegirColor)
        this.colores.verde.addEventListener('click', this.elegirColor)
        this.colores.violeta.addEventListener('click', this.elegirColor)
        this.colores.naranja.addEventListener('click', this.elegirColor)
    }

    eliminarEventosClick() {
        this.colores.celeste.removeEventListener('click', this.elegirColor)
        this.colores.verde.removeEventListener('click', this.elegirColor)
        this.colores.violeta.removeEventListener('click', this.elegirColor)
        this.colores.naranja.removeEventListener('click', this.elegirColor)
    }

    elegirColor(ev) {
        const nombreColor = ev.target.dataset.color;
        const numeroColor = this.transformarColorANumero(nombreColor);
        this.iluminarColor(nombreColor)
        if (numeroColor === this.secuencia[this.subnivel]) {
            this.subnivel++;
            if (this.subnivel === this.nivel) {
                this.nivel++
                this.eliminarEventosClick()
                if (this.nivel === (ULTIMO_NIVEL + 1)) {
                    //Gano
                    this.ganoElJuego()
                } else {
                    setTimeout(this.siguienteNivel, 1500)
                }

            }
        } else {
            this.perdioElJuego()

        }
    }

    ganoElJuego() {
        swal('platzi', 'Felicitaciones ganaste el juego', 'success')
            .then(() => this.inicializar());
    }

    perdioElJuego() {
        swal('platzi', 'Lo lamentamos, perdiste :(', 'error')
            .then(() => this.eliminarEventosClick());
    }

}

class Player {

    constructor(name) {
        this.name = name;
        this.score = 0;
    }

    getName() {
        return this.name;
    }

}



function empezarJuego() {
    swal
    window.juego = new Juego();
}

window.onload = () => {
    createPlayer();
}

let createPlayer = () => {
    swal(`Ingreso nombre de jugador`, {
        ...GLOBAL_OPTIONS_SWEETALERT,
        content: `input`,
        button: {
            text: 'Next',

        }
    })
        .then(playerName => {
            players.push(new Player(playerName));
            optionsAlert()
        });
}

let optionsAlert = () => {
    const playersRegister = players.map(player => player.getName())
    swal(`Jugadores registrados:
    ${playersRegister.join(',')}`, {
        ...GLOBAL_OPTIONS_SWEETALERT,
        buttons: {
            register: {
                text: 'Add player',
            },
            start: "Start Game"
        }
    })
        .then(value => {
            switch (value) {
                case 'register':
                    createPlayer();
                    break;
                case 'start':
                    empezarJuego();
                    break;

            }
        });
}