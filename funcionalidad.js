var nCasillas = 3;
var numeros;
var tablero, nombre, tiempo, segundos = 0, movimientos = 0;
var i, j;

function inicio() {
    nombre = prompt("Escribe tu nombre:");
    // Pedir el número de casillas
    do {
        nCasillas = prompt("Escribe el número de casillas");
    } while (nCasillas < 3);

    tablero = new Array(nCasillas);
    // Inicializar el arreglo bidimensional
    for (i = 0; i < nCasillas; i++) {
        tablero[i] = new Array(nCasillas);
    }

    numeros = nCasillas * nCasillas;
    let numArray = [...Array(numeros).keys()].map(n => n + 1); // Crea un array con números del 1 al N
    numArray = numArray.sort(() => Math.random() - 0.5); // Mezcla el array aleatoriamente

    // Generar el tablero en el DOM
    let tableroHTML = document.getElementById('juegoTablero');
    tableroHTML.innerHTML = ''; // Limpiar tablero anterior
    tableroHTML.style.gridTemplateColumns = `repeat(${nCasillas}, 1fr)`; // Establecer el número de columnas

    let index = 0;
    for (let i = 0; i < nCasillas; i++) {
        for (let j = 0; j < nCasillas; j++) {
            let div = document.createElement('div');
            div.className = 'cuadro';
            div.id = `${i}${j}`;
            div.onclick = function() {
                juego(i, j);
            };
            if (numArray[index] !== numeros) {
                tablero[i][j] = numArray[index];
                div.innerHTML = numArray[index];
            } else {
                tablero[i][j] = -1;
                div.innerHTML = ''; // Casilla vacía
            }
            tableroHTML.appendChild(div);
            index++;
        }
    }

    imprimeTablero();

    // Mostrar nombre del jugador
    document.getElementsByClassName("Nombre")[0].innerHTML = "Nombre: " + nombre;

    // Iniciar el contador de tiempo
    tiempo = window.setInterval(function() {
        segundos++;
        document.getElementsByClassName("Tiempo")[0].innerHTML = "Tiempo: " + segundos + " segundos";
    }, 1000);

    // Inicializar el contador de movimientos en la pantalla
    movimientos = 0;
    document.getElementsByClassName("Movimientos")[0].innerHTML = "Movimientos: " + movimientos;
}

function imprimeTablero() {
    for (i = 0; i < nCasillas; i++)
        console.log(tablero[i]);
}

function juego(posI, posJ) {
    // Buscar la posición de la casilla vacía (representada por -1)
    let emptyPosI, emptyPosJ;
    for (let i = 0; i < nCasillas; i++)
        for (let j = 0; j < nCasillas; j++)
            if (tablero[i][j] == -1) {
                emptyPosI = i;
                emptyPosJ = j;
            }

    // Verificar si el movimiento es válido (la casilla está adyacente a la vacía)
    if ((posI == emptyPosI && Math.abs(posJ - emptyPosJ) == 1) || (posJ == emptyPosJ && Math.abs(posI - emptyPosI) == 1)) {
        // Intercambiar la ficha con la casilla vacía
        tablero[emptyPosI][emptyPosJ] = tablero[posI][posJ];
        tablero[posI][posJ] = -1;

        // Actualizar la visualización del tablero en la interfaz usando id
        document.getElementById(emptyPosI + "" + emptyPosJ).innerHTML = tablero[emptyPosI][emptyPosJ];
        document.getElementById(posI + "" + posJ).innerHTML = '';

        // Imprimir el tablero actualizado
        imprimeTablero();

        // Incrementar el contador de movimientos
        movimientos++;
        document.getElementsByClassName("Movimientos")[0].innerHTML = "Movimientos: " + movimientos;

        // Verificar si el jugador ha ganado
        if (verificarVictoria() || verificarVictoriaCaracol() ) {
            alert("¡Felicidades " + nombre + ", ganaste en " + segundos + " segundos y " + movimientos + " movimientos!");
            clearInterval(tiempo); // Detener el contador de tiempo
        }
    }
}

function verificarVictoria() {
    let num = 1;
    for (let i = 0; i < nCasillas; i++)
        for (let j = 0; j < nCasillas; j++) {
            if (tablero[i][j] != num && num != numeros) return false;
            num++;
        }
    return true;
}

function verificarVictoriaCaracol() {
    let left = 0, right = nCasillas - 1, top = 0, bottom = nCasillas - 1;
    let numEsperado = 1;

    while (left <= right && top <= bottom) {
        // De izquierda a derecha
        for (let j = left; j <= right; j++) {
            if (tablero[top][j] !== numEsperado && tablero[top][j] !== -1) return false;
            if (tablero[top][j] !== -1) numEsperado++;
        }
        top++;

        // De arriba hacia abajo
        for (let i = top; i <= bottom; i++) {
            if (tablero[i][right] !== numEsperado && tablero[i][right] !== -1) return false;
            if (tablero[i][right] !== -1) numEsperado++;
        }
        right--;

        // De derecha a izquierda
        if (top <= bottom) {
            for (let j = right; j >= left; j--) {
                if (tablero[bottom][j] !== numEsperado && tablero[bottom][j] !== -1) return false;
                if (tablero[bottom][j] !== -1) numEsperado++;
            }
            bottom--;
        }

        // De abajo hacia arriba
        if (left <= right) {
            for (let i = bottom; i >= top; i--) {
                if (tablero[i][left] !== numEsperado && tablero[i][left] !== -1) return false;
                if (tablero[i][left] !== -1) numEsperado++;
            }
            left++;
        }
    }

    // Si todos los números están en su lugar correcto, retorna true (victoria)
    return true; 
}