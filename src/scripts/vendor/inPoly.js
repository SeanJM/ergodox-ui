// Ray casting algorithm
// point = { x : Number, y : Number }
// vert = [{ x : Number, y : Number }, ... ]

function inPoly(point, vert) {
  var i = 0,
      j = vert.length - 1,
      inside = false;

  for (; i < vert.length; j = i++) {
    if (
      ((vert[i].y > point.y) !== (vert[j].y > point.y))
      && (point.x < (vert[j].x - vert[i].x) * (point.y - vert[i].y) / (vert[j].y - vert[i].y) + vert[i].x)
    ) {
      inside = !inside;
    }
  }

  return inside;
}
