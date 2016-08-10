function rotatePoint(pivot, point, angle) {
  var radians = (Math.PI / 180) * angle;
  var cos = Math.cos(radians);
  var sin = Math.sin(radians);
  var cx = pivot[0];
  var cy = pivot[1];
  var x = point[0];
  var y = point[1];
  return {
    x : (cos * (x - cx)) + (sin * (y - cy)) + cx,
    y : (cos * (y - cy)) - (sin * (x - cx)) + cy
  };
}
