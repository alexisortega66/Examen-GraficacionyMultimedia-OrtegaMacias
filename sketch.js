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
function setup() {
    createCanvas(800, 300);
  }
  
  function draw() {
    background(255);
    
    drawClocksOnly(150, 150);
    drawClocksOnly(400, 150);
    drawClocksOnly(650, 150);
  }
  
  function drawClocksOnly(x, y) {
    let radius = 100;
    let xc = x;
    let yc = y;
    let p = 1 - radius;
    let xCircle = 0;
    let yCircle = radius;
  
    point(xc + xCircle, yc + yCircle);
    point(xc - xCircle, yc + yCircle);
    point(xc + xCircle, yc - yCircle);
    point(xc - xCircle, yc - yCircle);
    point(xc + yCircle, yc + xCircle);
    point(xc - yCircle, yc + xCircle);
    point(xc + yCircle, yc - xCircle);
    point(xc - yCircle, yc - xCircle);
    
    while (xCircle < yCircle) {
      xCircle++;
      if (p < 0) {
        p += 2 * xCircle + 1;
      } else {
        yCircle--;
        p += 2 * (xCircle - yCircle) + 1;
      }
      point(xc + xCircle, yc + yCircle);
      point(xc - xCircle, yc + yCircle);
      point(xc + xCircle, yc - yCircle);
      point(xc - xCircle, yc - yCircle);
      point(xc + yCircle, yc + xCircle);
      point(xc - yCircle, yc + xCircle);
      point(xc + yCircle, yc - xCircle);
      point(xc - yCircle, yc - xCircle);
    }
  }
  