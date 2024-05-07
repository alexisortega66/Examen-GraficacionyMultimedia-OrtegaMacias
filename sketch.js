//Examen de graficacion y multimedia
/*
intrucciones de examen
Crear una aplicación en p5 la cual dibujará 3 relojes análogos. Cada reloj tendrá una hora de acuerdo a las siguientes ciudades. 

Reloj 1: La Paz, BCS

Reloj 2: Ciudad de México

Reloj 3: Barcelona, Esp

Se deberá contar con un input(time) que permita configurar la hora del primer reloj(La Paz, BCS), mientras que los otros reloj se ajustarán tomando en cuenta la diferencia de hora con el primer reloj.

Consideraciones:

El Segundero se deberá mover cada segundo.
El minutero se deberá mover cada minuto
El Horario se deberá mover cada hora
Para dibujar la circunferencia de cada uno de los relojes deberán utilizar el algoritmo Punto y medio para círculos
Para las manecillas del primer reloj se realizarán utilizando el algoritmo de la ecuación punto-pendiente
Para las manecillas del segundo reloj se realizarán utilizando el algoritmo DDA
Para las manecillas del tercer reloj se realizarán utilizando el algoritmo BRESENHAM
*/
//Dijujando los relojes con punto y medio para circulos
let timeZones = [
  { name: "La Paz, BCS", difference: 0, algorithm: "point_slope" },
  { name: "Ciudad de México", difference: -1, algorithm: "dda" },
  { name: "Barcelona, Esp", difference: 9, algorithm: "bresenham" }
];

let times = [];
let maxPoints = 100; // Limit the number of points for DDA and Bresenham algorithms

function setup() {
  createCanvas(800, 300);
  textAlign(CENTER, CENTER);
  textSize(20);

  for (let i = 0; i < timeZones.length; i++) {
    times.push({
      hour: 0,
      minute: 0,
      second: 0
    });
  }
}

function draw() {
  background(255);
  
  updateTimes();
  
  let xOffset = 150;
  for (let i = 0; i < times.length; i++) {
    drawClock(xOffset, 150, times[i], timeZones[i].algorithm);
    fill(0);
    noStroke();
    text(timeZones[i].name, xOffset, 20);
    xOffset += 250;
  }
}

function updateTimes() {
  for (let i = 0; i < times.length; i++) {
    let time = times[i];
    let timeZone = timeZones[i];
    
    time.second = second();
    time.minute = minute();
    time.hour = (hour() + timeZone.difference + 24) % 24;
  }
}
