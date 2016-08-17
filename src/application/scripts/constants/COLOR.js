(function () {
  var red = blush('#e04742');

  var COLOR = {
    red : red,
    blue : blush('#e04742').rotate(205).hex(),
    cyan : blush('#e04742').rotate(175).hex(),
    green : blush('#e04742').rotate(115).darken(0.2).hex()
  };

  window.COLOR = COLOR;
}());
