var tam = 4;
var tablero, nombre, tiempo, segundos = 0, movimientos = 0;
var i, j;

function inicio(){
    nombre = prompt("Escribe tu nombre:");

    tablero = new Array(tam);
    // Inicializar el arreglo bidimensional
    for(i = 0; i < tam; i++)
        tablero[i] = new Array(tam);

    let numArray = [...Array(16).keys()].map(n => n + 1); // Crea un array con números del 1 al 16
    numArray = numArray.sort(() => Math.random() - 0.5); // Mezcla el array aleatoriamente

    let index = 0;
    for (let i = 0; i < tam; i++) {
        for (let j = 0; j < tam; j++) {
            if (numArray[index] !== 16) {
                tablero[i][j] = numArray[index];
                document.getElementById(i + "" + j).innerHTML = numArray[index];
            }
            else {
                tablero[i][j] = -1;
                document.getElementById(i + "" + j).innerHTML = ''; // Vacía la casilla para la casilla vacía
            }
            index++;
        }
    }

    imprimeTablero();

    // Mostrar nombre del jugador
    document.getElementsByClassName("Nombre")[0].innerHTML = "Nombre: " + nombre;

    // Iniciar el contador de tiempo
    tiempo = window.setInterval(function(){
        segundos++;
        document.getElementsByClassName("Tiempo")[0].innerHTML = "Tiempo: " + segundos + " segundos";
    }, 1000);
    
    // Inicializar el contador de movimientos en la pantalla
    movimientos = 0;
    document.getElementsByClassName("Movimientos")[0].innerHTML = "Movimientos: " + movimientos;
}

function imprimeTablero(){
    for(i=0; i<tam; i++)
        console.log(tablero[i]);
}

function juego(posI, posJ) {
    // Buscar la posición de la casilla vacía (representada por -1)
    let emptyPosI, emptyPosJ;
    for (let i = 0; i < tam; i++) 
        for (let j = 0; j < tam; j++) 
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
        if (verificarVictoria()) {
            alert("¡Felicidades " + nombre + ", ganaste en " + segundos + " segundos y " + movimientos + " movimientos!");
            clearInterval(tiempo); // Detener el contador de tiempo
        }
    }
}

// Función para verificar si el tablero está en orden (condición de victoria)
function verificarVictoria() {
    let num = 1;
    for (let i = 0; i < tam; i++) 
        for (let j = 0; j < tam; j++) {
            if (tablero[i][j] != num && num != 16) return false;
            num++;
        }

    return true;
}