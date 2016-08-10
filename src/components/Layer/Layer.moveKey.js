(function () {
  function drawPoly(ctx) {
    var i = 1;
    var n = arguments.length;

    var gradient = ctx.createLinearGradient(
      // X1
      Math.floor((arguments[1][0] + arguments[2][0]) / 2),
      // Y1
      Math.floor((arguments[1][1] + arguments[2][1]) / 2),
      // X2
      Math.floor((arguments[3][0] + arguments[4][0]) / 2),
      // Y2
      Math.floor((arguments[3][1] + arguments[4][1]) / 2)
    );

    gradient.addColorStop(0, blush(COLOR.cyan).alpha(0.3).rgba());
    gradient.addColorStop(1, blush(COLOR.cyan).alpha(0.0).rgba());

    ctx.beginPath();
    ctx.moveTo(arguments[1][0], arguments[1][1]);
    ctx.fillStyle = gradient;

    for (; i < n; i++) {
      ctx.lineTo(arguments[i][0], arguments[i][1]);
    }

    ctx.closePath();
    ctx.fill();
  }

  function drawLine(ctx, fromX, fromY, toX, toY) {
    var gradient = ctx.createLinearGradient(fromX, fromY, toX, toY);

    gradient.addColorStop(0, blush(COLOR.cyan).alpha(0.1).rgba());
    gradient.addColorStop(1, blush(COLOR.cyan).alpha(0.6).rgba());

    ctx.beginPath();
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 1;
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.closePath();
    ctx.stroke();
  }

  function keyHover(key, keyList) {
    var mousemove;
    var mouseup;

    var hoverPoints = [];

    var leftest;
    var rightest;

    keyList.forEach(function (key) {
      var angle = key.node.document.matrixRotation();
      var targetOffset = key.node.document.offset();
      var styles = key.node.document.styles();

      var pivot = [
        targetOffset.left + (targetOffset.width / 2),
        targetOffset.top + (targetOffset.height / 2)
      ];

      var left = pivot[0] - (parseInt(styles.width, 10) / 2);
      var right = pivot[0] + (parseInt(styles.width, 10) / 2);
      var top = pivot[1] - (parseInt(styles.height, 10) / 2);
      var bottom = pivot[1] + (parseInt(styles.height, 10) / 2);

      var points = [
        rotatePoint(pivot, [left, top], angle),
        rotatePoint(pivot, [right, top], angle),
        rotatePoint(pivot, [right, bottom], angle),
        rotatePoint(pivot, [left, bottom], angle)
      ];

      var opt = {
        key : key,
        points : points,
        offset : targetOffset
      };


      if (!leftest || opt.offset.left < leftest) {
        leftest = opt.offset.left;
      }

      if (!rightest || opt.offset.left > rightest) {
        rightest = opt.offset.left;
      }

      hoverPoints.push(opt);
    });

    hoverPoints = _.groupBy(hoverPoints, function (a) {
      // First quadrant
      var x = a.offset.left;
      var slice = 2;
      var section = (rightest - leftest) / slice;

      for (var i = 1; i <= slice; i++) {
        if (x <= leftest + (section * i)) {
          return Math.ceil(leftest + (section * i));
        }
      }
    });

    document.body.addEventListener('mousemove', mousemove = function (e) {
      var inside = [];
      var point = { x : e.pageX, y : e.pageY };

      for (var k in hoverPoints) {
        if (e.pageX < k) {
          // find row
          for (var i = 0, n = hoverPoints[k].length; i < n; i++) {
            hoverPoints[k][i].key.lightOff();
            // Test relative to bounding box first
            if (inRect(point, hoverPoints[k][i].offset)) {
              inside.push(hoverPoints[k][i]);
            }
          }
        }
      }

      key.keyTarget = false;

      // Only check if the point is inside the polygon when there are more
      // than 1 bounding box match
      if (inside.length > 1) {
        inside = inside.filter(function (x) {
          return inPoly(point, x.points);
        });
      }

      if (inside.length) {
        key.keyTarget = inside[0].key;
        inside[0].key.lightOn();
      }
    });

    document.body.addEventListener('mouseup', mouseup = function (e) {
      document.body.removeEventListener('mouseup', mouseup);
      document.body.removeEventListener('mousemove', mousemove);
    });
  }

  Layer.moveKey = function(key, keyList) {
    var angle;
    var clone;
    var keyOffset;
    var cloneOffset;
    var targetOffset;
    var pivot;

    var dragDecay = 0.98;

    var canvas = el('canvas', {
      class : 'key-drag-canvas',
      style : {
        position : 'absolute',
        left : 0,
        top : 0,
        zIndex : 1
      }
    });

    var ctx = canvas.node.getContext('2d');

    function drawLink(e) {
      // Top left corner
      drawLine(ctx,
        keyOffset[0].x,
        keyOffset[0].y,
        e.pageX - (cloneOffset.width / 2) + 1,
        e.pageY - (cloneOffset.height / 2) + 1
      );

      // Top right corner
      drawLine(ctx,
        keyOffset[1].x,
        keyOffset[1].y,
        e.pageX + (cloneOffset.width / 2) - 1,
        e.pageY - (cloneOffset.height / 2) + 1
      );

      // Bottom left corner
      drawLine(ctx,
        keyOffset[2].x,
        keyOffset[2].y,
        e.pageX - (cloneOffset.width / 2) + 1,
        e.pageY + (cloneOffset.height / 2) - 1
      );

      // Bottom right corner
      drawLine(ctx,
        keyOffset[3].x,
        keyOffset[3].y,
        e.pageX + (cloneOffset.width / 2) - 1,
        e.pageY + (cloneOffset.height / 2) - 1
      );

      drawPoly(ctx, [
        keyOffset[0].x, keyOffset[0].y,
      ], [
        keyOffset[1].x, keyOffset[1].y,
      ], [
        e.pageX + (cloneOffset.width / 2), e.pageY - (cloneOffset.height / 2),
      ], [
        e.pageX - (cloneOffset.width / 2), e.pageY - (cloneOffset.height / 2)
      ]);

      drawPoly(ctx, [
        keyOffset[0].x, keyOffset[0].y,
      ], [
        keyOffset[2].x, keyOffset[2].y,
      ], [
        e.pageX - (cloneOffset.width / 2), e.pageY + (cloneOffset.height / 2),
      ], [
        e.pageX - (cloneOffset.width / 2), e.pageY - (cloneOffset.height / 2)
      ]);

      drawPoly(ctx, [
        keyOffset[1].x, keyOffset[1].y,
      ], [
        keyOffset[3].x, keyOffset[3].y,
      ], [
        e.pageX + (cloneOffset.width / 2), e.pageY + (cloneOffset.height / 2),
      ], [
        e.pageX + (cloneOffset.width / 2), e.pageY - (cloneOffset.height / 2)
      ]);

      drawPoly(ctx, [
        keyOffset[2].x, keyOffset[2].y,
      ], [
        keyOffset[3].x, keyOffset[3].y,
      ], [
        e.pageX + (cloneOffset.width / 2), e.pageY + (cloneOffset.height / 2)
      ], [
        e.pageX - (cloneOffset.width / 2), e.pageY + (cloneOffset.height / 2),
      ]);
    }

    function drawClone(e) {
      var width = parseInt(e.target.styles().width, 10);
      var height = parseInt(e.target.styles().height, 10);

      var left = pivot[0] - (width / 2) + 1;
      var top = pivot[1] - (height / 2) + 1;
      var bottom = pivot[1] + (height / 2) - 1;
      var right = pivot[0] + (width / 2) - 1;

      keyOffset = [
        rotatePoint(pivot, [left, top], angle * -1),
        rotatePoint(pivot, [right, top], angle * -1),
        rotatePoint(pivot, [left, bottom], angle * -1),
        rotatePoint(pivot, [right, bottom], angle * -1)
      ];

      keyOffset.width = width - 2;
      keyOffset.height = height - 2;
      keyOffset.left = left + 2;
      keyOffset.right = right - 2;
      keyOffset.top = top + 2;
      keyOffset.bottom = bottom - 2;

      clone = key.clone();
      clone.addClass('key--dragging');

      canvas.node.width = window.innerWidth * 2;
      canvas.node.height = window.innerHeight * 2;
      canvas.node.style.width = window.innerWidth + 'px';
      canvas.node.style.height = window.innerHeight + 'px';

      ctx.scale(2, 2);

      clone.appendTo('body');
      canvas.appendTo('body');

      cloneOffset = clone.node.document.offset();
      clone.node.document.style.transform = 'translate(' + (e.pageX - (cloneOffset.width / 2)) + 'px, ' + (e.pageY - (cloneOffset.height / 2)) + 'px)';
      drawLink(e);
    }

    key.on('dragstart', function (e) {
      angle = e.target.matrixRotation();
      targetOffset = e.target.offset();

      pivot = [
        targetOffset.left + (targetOffset.width / 2),
        targetOffset.top + (targetOffset.height / 2)
      ];

      e.target.addClass('key--drag-source');
    });

    key.on('dragmove', function (e) {
      // Calculate the rotated distance around a pivot of 0 -- the starting point
      var distance = rotatePoint([0, 0], [e.distanceX, e.distanceY], angle);

      if (
        (Math.abs(e.distanceX) > 35 || Math.abs(e.distanceY) > 35)
        && !clone
      ) {
        anime({
          targets : key.node_cap.node,
          translateX : [
            (distance.x * Math.pow(dragDecay, Math.abs(distance.x))),
            0
          ],
          translateY : [
            (distance.y * Math.pow(dragDecay, Math.abs(distance.y))),
            0
          ],
          duration : 700,
          elasticity : 700
        });

        drawClone(e);
        keyHover(key, keyList);
      } else if (clone) {
        ctx.clearRect(0, 0, canvas.node.width, canvas.node.height);
        drawLink(e);
        clone.node.document.style.transform = 'translate(' + (e.pageX - (cloneOffset.width / 2)) + 'px, ' + (e.pageY - (cloneOffset.height / 2)) + 'px)';
      } else {
        key.node_cap.style.transform = 'translate(' + (distance.x * Math.pow(dragDecay, Math.abs(distance.x))) + 'px) translateY(' + (distance.y * Math.pow(dragDecay, Math.abs(distance.y))) + 'px)';
      }
    });

    key.on('dragend', function (e) {
      e.target.removeClass('key--drag-source');

      if (canvas) {
        canvas.remove();
      }

      if (clone) {
        clone.node.document.remove();
        clone = undefined;
      }

      if (key.keyTarget) {
        key.drop();
      }
    });
  };
}());
