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
let maxPoints = 100; // para que no truene

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

function drawClock(x, y, time, algorithm) {
  fill(255);
  stroke(0);
  strokeWeight(2);
  ellipse(x, y, 200, 200);
  
  // Dibuja las horas
  strokeWeight(4);
  for (let i = 0; i < 12; i++) {
    let angle = map(i, 0, 12, 0, TWO_PI);
    let x1 = x + cos(angle) * 90;
    let y1 = y + sin(angle) * 90;
    let x2 = x + cos(angle) * 100;
    let y2 = y + sin(angle) * 100;
    line(x1, y1, x2, y2);
  }
  
  let hourAngle = map(time.hour % 12, 0, 12, 0, TWO_PI) - HALF_PI;
  let minuteAngle = map(time.minute, 0, 60, 0, TWO_PI) - HALF_PI;
  let secondAngle = map(time.second, 0, 60, 0, TWO_PI) - HALF_PI;

  switch (algorithm) {
    case "point_slope":
      drawHandPointSlope(x, y, 50, hourAngle, 10);
      drawHandPointSlope(x, y, 70, minuteAngle, 5);
      drawHandPointSlope(x, y, 70, secondAngle, 2);
      break;
    case "dda":
      drawHandDDA(x, y, 50, hourAngle, 10);
      drawHandDDA(x, y, 70, minuteAngle, 5);
      drawHandDDA(x, y, 70, secondAngle, 2);
      break;
    case "bresenham":
      drawHandBresenham(x, y, 50, hourAngle, 10);
      drawHandBresenham(x, y, 70, minuteAngle, 5);
      drawHandBresenham(x, y, 70, secondAngle, 2);
      break;
    default:
      console.error("Invalid algorithm");
  }
}

function drawHandPointSlope(x, y, length, angle, weight) {
  let slope = tan(angle);
  let newX = x + length / sqrt(1 + sq(slope));
  let newY = y + slope * (newX - x);
  strokeWeight(weight);
  line(x, y, newX, newY);
}

function drawHandDDA(x, y, length, angle, weight) {
  let steps = min(maxPoints, length); 
  let deltaX = (length * cos(angle)) / steps;
  let deltaY = (length * sin(angle)) / steps;
  let newX = x;
  let newY = y;
  strokeWeight(weight);
  for (let i = 0; i < steps; i++) {
    point(newX, newY);
    newX += deltaX;
    newY += deltaY;
  }
}

function drawHandBresenham(x, y, length, angle, weight) {
  let steps = min(maxPoints, length); 
  let x1 = x;
  let y1 = y;
  let x2 = x + length * cos(angle);
  let y2 = y + length * sin(angle);
  let dx = abs(x2 - x1);
  let dy = abs(y2 - y1);
  let sx = (x1 < x2) ? 1 : -1;
  let sy = (y1 < y2) ? 1 : -1;
  let err = dx - dy;

  strokeWeight(weight);
  for (let i = 0; i < steps; i++) {
    point(x1, y1);
    if (x1 == x2 && y1 == y2) break;
    let e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x1 += sx;
    }
    if (e2 < dx) {
      err += dx;
      y1 += sy;
    }
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
