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
        rotatePoint(pivot, [ left, top ], angle),
        rotatePoint(pivot, [ right, top ], angle),
        rotatePoint(pivot, [ right, bottom ], angle),
        rotatePoint(pivot, [ left, bottom ], angle)
      ];

      var opt = {
        key : key,
        points : points,
        offset : targetOffset,
        angle : angle,
        pivot : pivot,
        rotatedOffset : {
          left : left,
          top : top,
          right : right,
          bottom : bottom,
        }
      };

      if (!leftest || opt.offset.left < leftest) {
        leftest = opt.offset.left;
      }

      if (!rightest || opt.offset.right > rightest) {
        rightest = opt.offset.right;
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
      var point;
      var hObj;

      key.dropTarget = false;

      for (var k in hoverPoints) {
        if (e.pageX < k) {
          // find row
          for (var i = 0, n = hoverPoints[k].length; i < n; i++) {
            hObj = hoverPoints[k][i];
            point = rotatePoint(hObj.pivot, [ e.pageX, e.pageY ], hObj.angle);
            hObj.key.lightOff();

            if (inRect(point, hObj.rotatedOffset)) {
              key.dropTarget = hObj.key;
              hObj.key.lightOn();
            }
          }
        }
      }
    });

    document.body.addEventListener('mouseup', mouseup = function (e) {
      document.body.removeEventListener('mouseup', mouseup);
      document.body.removeEventListener('mousemove', mousemove);
    });
  }

  function drawLink(ctx, keyOffset, cloneOffset, e) {
    var pageX = e.detail.pageX;
    var pageY = e.detail.pageY;

    // Top left corner
    drawLine(ctx,
      keyOffset[0].x,
      keyOffset[0].y,
      pageX - (cloneOffset.width / 2) + 1,
      pageY - (cloneOffset.height / 2) + 1
    );

    // Top right corner
    drawLine(ctx,
      keyOffset[1].x,
      keyOffset[1].y,
      pageX + (cloneOffset.width / 2) - 1,
      pageY - (cloneOffset.height / 2) + 1
    );

    // Bottom left corner
    drawLine(ctx,
      keyOffset[2].x,
      keyOffset[2].y,
      pageX - (cloneOffset.width / 2) + 1,
      pageY + (cloneOffset.height / 2) - 1
    );

    // Bottom right corner
    drawLine(ctx,
      keyOffset[3].x,
      keyOffset[3].y,
      pageX + (cloneOffset.width / 2) - 1,
      pageY + (cloneOffset.height / 2) - 1
    );

    drawPoly(ctx, [
      keyOffset[0].x, keyOffset[0].y,
    ], [
      keyOffset[1].x, keyOffset[1].y,
    ], [
      pageX + (cloneOffset.width / 2), pageY - (cloneOffset.height / 2),
    ], [
      pageX - (cloneOffset.width / 2), pageY - (cloneOffset.height / 2)
    ]);

    drawPoly(ctx, [
      keyOffset[0].x, keyOffset[0].y,
    ], [
      keyOffset[2].x, keyOffset[2].y,
    ], [
      pageX - (cloneOffset.width / 2), pageY + (cloneOffset.height / 2),
    ], [
      pageX - (cloneOffset.width / 2), pageY - (cloneOffset.height / 2)
    ]);

    drawPoly(ctx, [
      keyOffset[1].x, keyOffset[1].y,
    ], [
      keyOffset[3].x, keyOffset[3].y,
    ], [
      pageX + (cloneOffset.width / 2), pageY + (cloneOffset.height / 2),
    ], [
      pageX + (cloneOffset.width / 2), pageY - (cloneOffset.height / 2)
    ]);

    drawPoly(ctx, [
      keyOffset[2].x, keyOffset[2].y,
    ], [
      keyOffset[3].x, keyOffset[3].y,
    ], [
      pageX + (cloneOffset.width / 2), pageY + (cloneOffset.height / 2)
    ], [
      pageX - (cloneOffset.width / 2), pageY + (cloneOffset.height / 2),
    ]);
  }

  /*
    opt = {
      key : [ Constructor Key ],
      keyList : [ list of Constructor Key ],
      onDone : [ Function ]
    }
  */

  function setDragKey(key, keyList) {
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

    function drawClone(e) {
      var styles = key.node.document.styles();
      var width = parseInt(styles.width, 10);
      var height = parseInt(styles.height, 10);

      var left = pivot[0] - (width / 2) + 1;
      var top = pivot[1] - (height / 2) + 1;
      var bottom = pivot[1] + (height / 2) - 1;
      var right = pivot[0] + (width / 2) - 1;

      keyOffset = [
        rotatePoint(pivot, [ left, top ], angle * -1),
        rotatePoint(pivot, [ right, top ], angle * -1),
        rotatePoint(pivot, [ left, bottom ], angle * -1),
        rotatePoint(pivot, [ right, bottom ], angle * -1)
      ];

      keyOffset.width = width - 2;
      keyOffset.height = height - 2;
      keyOffset.left = left + 2;
      keyOffset.right = right - 2;
      keyOffset.top = top + 2;
      keyOffset.bottom = bottom - 2;

      clone = key.clone();

      clone.removeClass('key--giant');
      clone.removeClass('key--tall');
      clone.addClass('key--dragging');

      clone.node.document.style.position = 'absolute';
      clone.node.document.style.zIndex = 2;
      clone.node.document.style.left = '0';
      clone.node.document.style.top = '0';

      canvas.node.width = window.innerWidth * 2;
      canvas.node.height = window.innerHeight * 2;
      canvas.node.style.width = window.innerWidth + 'px';
      canvas.node.style.height = window.innerHeight + 'px';

      ctx.scale(2, 2);

      clone.appendTo('body');
      canvas.appendTo('body');

      cloneOffset = clone.node.document.offset();
      clone.node.document.style.transform = 'translate(' +
        (e.detail.pageX - (cloneOffset.width / 2)) + 'px, ' +
        (e.detail.pageY - (cloneOffset.height / 2)) + 'px' +
      ')';
      drawLink(ctx, keyOffset, cloneOffset, e);
    }

    function dragstart(e) {
      angle = key.node.document.matrixRotation();
      targetOffset = key.node.document.offset();

      pivot = [
        targetOffset.left + (targetOffset.width / 2),
        targetOffset.top + (targetOffset.height / 2)
      ];

      key.addClass('key--drag-source');
    }

    function dragmove(e) {
      // Calculate the rotated distance around a pivot of 0 -- the starting point
      var distance = rotatePoint(
        [ 0, 0 ],
        [ e.detail.distanceX, e.detail.distanceY ],
        angle
      );

      if (
        (Math.abs(e.detail.distanceX) > 35 || Math.abs(e.detail.distanceY) > 35)
        && !clone
      ) {
        anime({
          targets : key.node.cap.node,
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
        drawLink(ctx, keyOffset, cloneOffset, e);

        clone.node.document.style.transform = 'translate(' +
          (e.detail.pageX - (cloneOffset.width / 2)) + 'px, ' +
          (e.detail.pageY - (cloneOffset.height / 2)) + 'px' +
        ')';

      } else {
        key.node.cap.style.transform = '' +
        'translate(' +
          (distance.x * Math.pow(dragDecay, Math.abs(distance.x))) + 'px' +
        ')' +
        'translateY(' +
          (distance.y * Math.pow(dragDecay, Math.abs(distance.y))) + 'px' +
        ')';
      }
    }

    function dragend(e) {
      key.removeClass('key--drag-source');

      if (canvas) {
        canvas.remove();
      }

      if (clone) {
        clone.node.document.remove();
        clone = undefined;
      }

      dropKey(key, {
        x : e.detail.pageX,
        y : e.detail.pageY
      });
    }

    key.off('dragstart, dragmove, dragend');

    key.on('dragstart', function (e) {
      if (!key.isLocked) {
        dragstart(e);
      }
    });

    key.on('dragmove', function (e) {
      if (!key.isLocked) {
        dragmove(e);
      }
    });

    key.on('dragend', function (e) {
      if (!key.isLocked) {
        dragend(e);
      }
    });
  }

  window.setDragKey = setDragKey;
}());
