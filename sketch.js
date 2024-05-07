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
  { name: "La Paz, BCS", difference: 0 },
  { name: "Ciudad de México", difference: 1 },
  { name: "Barcelona, Esp", difference: 9 }
];

let times = [];
let maxPoints = 100; // para que no truene
let selectedTimeZone = 0;

let timeInput;

function setup() {
  createCanvas(800, 300);
  textAlign(CENTER, CENTER);
  textSize(20);

  timeInput = createInput('', 'time');
  timeInput.position(width/2 - timeInput.width/2, height + 20);
  timeInput.style('text-align', 'center'); // Centra el texto dentro del input
  
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
    if (i === 0) {
      drawClockWithPointSlope(xOffset, 150, times[i]);
    } else if (i === 1) {
      drawClockWithDDA(xOffset, 150, times[i]);
    } else if (i === 2) {
      drawClockWithBresenham(xOffset, 150, times[i]);
    }
    fill(0);
    noStroke();
    text(timeZones[i].name, xOffset, 20);
    xOffset += 250;
  }
}

function drawClockWithPointSlope(x, y, time) {
  fill(255);
  stroke(0);
  strokeWeight(2);
  
  // Dibujar el círculo utilizando la fórmula del punto medio para círculos
  let r = 100;
  let x0 = 0;
  let y0 = r;
  let p0 = 5 / 4 - r;
  drawCirclePoints(x, y, x0, y0);
  while (x0 < y0) {
    x0++;
    if (p0 < 0) {
      p0 += 2 * x0 + 1;
    } else {
      y0--;
      p0 += 2 * (x0 - y0) + 1;
    }
    drawCirclePoints(x, y, x0, y0);
  }
  
  // Dibujar las horas
  strokeWeight(4);
  for (let i = 0; i < 12; i++) {
    let angle = map(i, 0, 12, 0, TWO_PI);
    let x1 = x + cos(angle) * 90;
    let y1 = y + sin(angle) * 90;
    let x2 = x + cos(angle) * 100;
    let y2 = y + sin(angle) * 100;
    line(x1, y1, x2, y2);
  }
  
  let hourAngle = map(time.hour % 12 + time.minute / 60, 0, 12, 0, TWO_PI) - HALF_PI;
  let minuteAngle = map(time.minute, 0, 60, 0, TWO_PI) - HALF_PI;
  let secondAngle = map(time.second, 0, 60, 0, TWO_PI) - HALF_PI;

  // Manecillas de hora
  drawHandPointSlope(x, y, 50, hourAngle, 10);
  // Manecillas de minutos
  drawHand(x, y, 70, minuteAngle, 5, color(255, 0, 0)); // Manecilla de minutos en rojo
  // Manecillas de segundos
  drawHand(x, y, 70, secondAngle, 2);
}

function drawClockWithDDA(x, y, time) {
  fill(255);
  stroke(0);
  strokeWeight(2);
  
  // Dibujar el círculo utilizando la fórmula del punto medio para círculos
  let r = 100;
  let x0 = 0;
  let y0 = r;
  let p0 = 5 / 4 - r;
  drawCirclePoints(x, y, x0, y0);
  while (x0 < y0) {
    x0++;
    if (p0 < 0) {
      p0 += 2 * x0 + 1;
    } else {
      y0--;
      p0 += 2 * (x0 - y0) + 1;
    }
    drawCirclePoints(x, y, x0, y0);
  }
  
  // Dibujar las horas
  strokeWeight(4);
  for (let i = 0; i < 12; i++) {
    let angle = map(i, 0, 12, 0, TWO_PI);
    let x1 = x + cos(angle) * 90;
    let y1 = y + sin(angle) * 90;
    let x2 = x + cos(angle) * 100;
    let y2 = y + sin(angle) * 100;
    line(x1, y1, x2, y2);
  }
  
  let hourAngle = map(time.hour % 12 + time.minute / 60, 0, 12, 0, TWO_PI) - HALF_PI;
  let minuteAngle = map(time.minute, 0, 60, 0, TWO_PI) - HALF_PI;
  let secondAngle = map(time.second, 0, 60, 0, TWO_PI) - HALF_PI;

  // Manecillas de hora
  drawHandDDA(x, y, 50, hourAngle, 10);
  // Manecillas de minutos
  drawHand(x, y, 70, minuteAngle, 5, color(255, 0, 0)); // Manecilla de minutos en rojo
  // Manecillas de segundos
  drawHand(x, y, 70, secondAngle, 2);
}

function drawClockWithBresenham(x, y, time) {
  fill(255);
  stroke(0);
  strokeWeight(2);
  
  // Dibujar el círculo utilizando la fórmula del punto medio para círculos
  let r = 100;
  let x0 = 0;
  let y0 = r;
  let p0 = 5 / 4 - r;
  drawCirclePoints(x, y, x0, y0);
  while (x0 < y0) {
    x0++;
    if (p0 < 0) {
      p0 += 2 * x0 + 1;
    } else {
      y0--;
      p0 += 2 * (x0 - y0) + 1;
    }
    drawCirclePoints(x, y, x0, y0);
  }
  
  // Dibujar las horas
  strokeWeight(4);
  for (let i = 0; i < 12; i++) {
    let angle = map(i, 0, 12, 0, TWO_PI);
    let x1 = x + cos(angle) * 90;
    let y1 = y + sin(angle) * 90;
    let x2 = x + cos(angle) * 100;
    let y2 = y + sin(angle) * 100;
    line(x1, y1, x2, y2);
  }
  
  let hourAngle = map(time.hour % 12 + time.minute / 60, 0, 12, 0, TWO_PI) - HALF_PI;
  let minuteAngle = map(time.minute, 0, 60, 0, TWO_PI) - HALF_PI;
  let secondAngle = map(time.second, 0, 60, 0, TWO_PI) - HALF_PI;

  // Manecillas de hora
  drawHandBresenham(x, y, 50, hourAngle, 10);
  // Manecillas de minutos
  drawHand(x, y, 70, minuteAngle, 5, color(255, 0, 0)); // Manecilla de minutos en rojo
  // Manecillas de segundos
  drawHand(x, y, 70, secondAngle, 2);
}

function drawHandPointSlope(x, y, length, angle, weight) {
  let newX = x + cos(angle) * length;
  let newY = y + sin(angle) * length;
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

function drawHand(x, y, length, angle, weight, color = 0) {
  let newX = x + cos(angle) * length;
  let newY = y + sin(angle) * length;
  stroke(color);
  strokeWeight(weight);
  line(x, y, newX, newY);
}

function drawCirclePoints(xc, yc, x, y) {
  point(xc + x, yc + y);
  point(xc - x, yc + y);
  point(xc + x, yc - y);
  point(xc - x, yc - y);
  point(xc + y, yc + x);
  point(xc - y, yc + x);
  point(xc + y, yc - x);
  point(xc - y, yc - x);
}

function updateTimes() {
  let newTime = timeInput.value();
  let [newHour, newMinute] = newTime.split(':');
  
  for (let i = 0; i < times.length; i++) {
    let timeZoneDifference = timeZones[i].difference - timeZones[selectedTimeZone].difference;
    let hour = (parseInt(newHour) + timeZoneDifference + 24) % 24;
    
    times[i].second = second();
    times[i].minute = parseInt(newMinute);
    times[i].hour = hour;
  }
}
