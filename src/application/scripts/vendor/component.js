(function () {
  function Component() {
    this.node = {
      document : el('div')
    };
  }

  function triggerMount(p) {
    if (typeof p.trigger === 'function') {
      p.trigger('mount');
    }

    if (p.elements) {
      p.elements.forEach(triggerMount);
    }
  }

  function Target(self, target) {
    this.self = self;
    this.target = target;
    if (typeof self.elements === 'undefined') {
      self.elements = [];
    }
  }

  function column(start, end) {
    var padding = 5;
    var b = padding / 2;
    var center = Math.floor(end / 2);
    var left;
    var right;

    if (start === 1) {
      left = 0;
    } else if (start === end) {
      right = 0;
    }

    if (end === 2) {
      if (start === 1) {
        right = b;
      } else {
        left  = b;
      }
    } else if (end === 3) {
      if (start === 1) {
        right = b;
      } else if (start === 2) {
        right = b * (end - start);
        left  = b * (end - start);
      } else {
        left = b;
      }
    } else {
      if (start === 1) {
        // start
        right = b * (end - 1);
      } else if (start === end) {
        // end
        left  = b * start;
      } else if (start === center && end % 2 !== 0) {
        // center
        left = b * start;
        right = b * start;
      } else {
        left  = b * start;
        right = b * (end - start);
      }
    }

    return {
      left : left,
      right : right
    };
  }

  Component.prototype.addClass = function (className) {
    this.node.document.addClass(className);
    return this;
  };

  /*
    Component.prototype.append({
      list : [ Component | el ]
    });

    Component.prototype.append(
      [ Component | el ],
      [ Component | el ]
    );
  */

  Component.prototype.append = function () {
    var a = [];
    var i = 0;
    var n = arguments.length;
    var target = Component.prototype.target.call(this, this.node.document);

    for (; i < n; i++) {
      a.push(arguments[i]);
    }

    target.append(a);

    return this;
  };

  Component.prototype.appendTo = function (target) {
    var node;

    if (typeof target === 'string') {
      node = document.querySelector(target);
    } else if (target && el.isElement(target)) {
      node = target;
    } else if (target && el.isElement(target.node)) {
      node = target.node;
    } else {
      throw 'error \'Component.prototype.appendTo\', invalid target \'' + Object.prototype.toString.call(target) + '\'';
    }

    this.node.document.appendTo(target);

    if (
      typeof this.trigger === 'function'
      && node
      && document.body.contains(node)
    ) {
      triggerMount(this);
    }

    return this;
  };

  Component.prototype.checkPrototypeName = function (name) {
    for (var k in this.prototype) {
      if (name === k) {
        throw 'Invalid prototype name: \'' + name + '\', it\'s already taken.';
      }
    }
  };

  Component.prototype.column = function () {
    var isArray = Array.isArray(arguments[0]);

    var start = isArray ? arguments[0][0] : arguments[0];
    var end = isArray ? arguments[0][1] : arguments[1];

    var width = (
      (
        isArray
          ? arguments[0][2]
          : arguments[2]
      ) || 100 / end
    );

    var res = column(start, end);

    this.node.document.style.paddingLeft = res.left + 'px';
    this.node.document.style.paddingRight = res.right + 'px';
    this.node.document.style.width = width  + '%';

    return this;
  };

  Component.prototype.indexOf = function (a) {
    return this.elements.indexOf(a);
  };

  Component.prototype.off = function (name, callback) {
    var names = name.split(',')
      .filter(a => a.length)
      .map(a => a.toLowerCase());

    var i = 0;
    var n = names.length;
    var indexOf;
    var x;

    for (; i < n; i++) {
      x = names[i].trim();

      if (typeof this._subscriber_[x] === 'undefined') {
        throw 'There are no subscribers for \'' + x + '\'';
      }

      indexOf = this._subscriber_[x].indexOf(callback);

      if (indexOf !== -1) {
        this._subscriber_[x].slice(indexOf, 1);
      }
    }

    return this;
  };

  Component.prototype.on = function (name, callback) {
    var names = name.split(',')
      .filter(a => a.length)
      .map(a => a.toLowerCase());

    var i = 0;
    var n = names.length;
    var x;

    if (typeof this._subscriber_ === 'undefined') {
      this._subscriber_ = {};
    }

    for (; i < n; i++) {
      x = names[i].trim();

      if (typeof this._subscriber_[x] === 'undefined') {
        this._subscriber_[x] = [];
      }

      if (this._subscriber_[x].indexOf(callback) === -1) {
        this._subscriber_[x].push(callback);
      }
    }

    return this;
  };

  Component.prototype.removeClass = function (className) {
    this.node.document.removeClass(className);
    return this;
  };

  Component.prototype.spinnerStart = function () {
    if (typeof this._spinner_ === 'undefined') {
      this._spinner_ = Spinner.new();
      this._spinner_ = this._spinner_.start();
      this._spinner_.centerTo(this.node.document);
    }
  };

  Component.prototype.spinnerStop = function () {
    if (typeof this._spinner_ === 'object') {
      this._spinner_.stop();
      this._spinner_ = undefined;
    }
  };

  Component.prototype.style = function () {
    var i = 0;
    var n = arguments.length;

    for (; i < n; i++) {
      if (typeof arguments[i] === 'object') {
        for (var k in arguments[i]) {
          if (arguments[i].hasOwnProperty(k)) {
            this.node.document.node.style[k] = arguments[i][k];
          }
        }
      } else if (typeof arguments[i] === 'string' && typeof arguments[i + 1] !== 'object') {
        this.node.document.style[arguments[i]] = arguments[i + 1];
        i++;
      }
    }

    return this;
  };

  Target.prototype.appendItem = function (item) {
    this.self.elements.push(item);
    if (
      item.name
      && typeof this.self[item.name] === 'undefined'
    ) {
      this.self[item.name] = item;
    }
    this.target.append(item);
  };

  Target.prototype.appendEach = function (list) {
    var i = 0;
    var n = list.length;

    for (; i < n; i++) {
      if (Array.isArray(list[i])) {
        this.appendEach(list[i]);
      } else {
        this.appendItem(list[i]);
      }
    }
  };

  Target.prototype.append = function () {
    var a = [];
    var i = 0;
    var n = arguments.length;

    for (; i < n; i++) {
      a.push(arguments[i]);
    }

    this.appendEach(a);
  };

  Component.prototype.target = function (target) {
    return new Target(this, target);
  };

  Component.prototype.trigger = function (name, e) {
    var names = name.split(',')
      .filter(a => a.length)
      .map(a => a.toLowerCase());
      
    var i = 0;
    var n = names.length;
    var index;
    var x;
    var j;
    var k;

    if (typeof e === 'undefined') {
      e = {
        type : name,
        target : this
      };
    } else if (typeof e.type === 'undefined') {
      e.type = name;
      e.target = this;
    }

    if (typeof this._subscriber_ === 'undefined') {
      this._subscriber_ = {};
    }

    for (; i < n; i++) {
      x = names[i].trim();

      if (typeof this._subscriber_[x] === 'object') {
        for (j = 0, k = this._subscriber_[x].length; j < k; j++) {
          this._subscriber_[x][j](e);
        }
      }
    }

    return this;
  };

  Component.prototype.attr = function (property, value) {
    if (typeof value == 'undefined') {
      return this.node.document.attr(property);
    }
    this.node.document.attr(property, value);
  };

  Component.extend = function (Constructor) {
    if (!Constructor.prototype.addClass)
      Constructor.prototype.addClass = Component.prototype.addClass;
    if (!Constructor.prototype.append)
      Constructor.prototype.append = Component.prototype.append;
    if (!Constructor.prototype.appendTo)
      Constructor.prototype.appendTo = Component.prototype.appendTo;
    if (!Constructor.prototype.attr)
      Constructor.prototype.attr = Component.prototype.attr;
    if (!Constructor.prototype.checkPrototypeName)
      Constructor.prototype.checkPrototypeName = Component.prototype.checkPrototypeName;
    if (!Constructor.prototype.column)
      Constructor.prototype.column = Component.prototype.column;
    if (!Constructor.prototype.indexOf)
      Constructor.prototype.indexOf = Component.prototype.indexOf;
    if (!Constructor.prototype.off)
      Constructor.prototype.off = Component.prototype.off;
    if (!Constructor.prototype.on)
      Constructor.prototype.on = Component.prototype.on;
    if (!Constructor.prototype.removeClass)
      Constructor.prototype.removeClass = Component.prototype.removeClass;
    if (!Constructor.prototype.spinnerStart)
      Constructor.prototype.spinnerStart = Component.prototype.spinnerStart;
    if (!Constructor.prototype.spinnerStop)
      Constructor.prototype.spinnerStop = Component.prototype.spinnerStop;
    if (!Constructor.prototype.style)
      Constructor.prototype.style = Component.prototype.style;
    if (!Constructor.prototype.target)
      Constructor.prototype.target = Component.prototype.target;
    if (!Constructor.prototype.trigger)
      Constructor.prototype.trigger = Component.prototype.trigger;
  };

  if (typeof window === 'object') {
    window.Component = Component;
  } else if (typeof module === 'object' && module.exports) {
    module.exports = Component;
  }
}());
