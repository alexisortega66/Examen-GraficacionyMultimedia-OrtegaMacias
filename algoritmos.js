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
  