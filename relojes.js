function drawClock(x, y, time, algorithm) {
    let r = 100;
    let xc = x;
    let yc = y;
    let x1 = 0;
    let y1 = r;
    let p = 1 - r;
  
    stroke(0);
    strokeWeight(2);
    while (x1 <= y1) {
      point(xc + x1, yc + y1);
      point(xc - x1, yc + y1);
      point(xc + x1, yc - y1);
      point(xc - x1, yc - y1);
      point(xc + y1, yc + x1);
      point(xc - y1, yc + x1);
      point(xc + y1, yc - x1);
      point(xc - y1, yc - x1);
  
      x1++;
  
      if (p < 0)
        p = p + 2 * x1 + 1;
      else {
        y1--;
        p = p + 2 * (x1 - y1) + 1;
      }
    }
    
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
  
    drawHand(x, y, 50, hourAngle, 10);
    drawHand(x, y, 70, minuteAngle, 5);
    drawHand(x, y, 70, secondAngle, 2);
  }
  