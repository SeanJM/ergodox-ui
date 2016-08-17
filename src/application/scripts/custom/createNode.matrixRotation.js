el.fn('matrixRotation', function () {
  var matrix = this.styles().transform;

  var parent = this.parentsUntil(function (p) {
    return /^matrix/.test(window.getComputedStyle(p).transform);
  });

  matrix = /matrix/.test(matrix) && !parent
    ? matrix
    : parent
      ? parent.styles().transform
      : false;

  return matrix
    ? Math.round(
      Math.asin(matrix.split('(')[1].split(')')[0].split(',').map(Number)[1]) * (180 / Math.PI)
    )
    : 0;
});
