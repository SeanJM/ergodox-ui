(function () {
  function Component() {}

  function ComponentEvent(type, that) {
    var self = this;

    this.type = type;
    this.target = that;
    this.defaultPrevented = false;

    this.preventDefault = function () {
      self.defaultPrevented = true;
    };
  }

  Component.prototype.prepend = function () {
    var keys;

    for (var i = 0, n = arguments.length; i < n; i++) {
      if (typeof arguments[i].prependTo === 'function') {
        // It's [ Component | el ]
        arguments[i].prependTo(this.node.document);
      }
    }

    return this;
  };

  Component.prototype.append = function () {
    var keys;

    for (var i = 0, n = arguments.length; i < n; i++) {
      if (typeof arguments[i].appendTo === 'function') {
        if (!this.elements) {
          this.elements = [];
        }
        this.elements.push(arguments[i]);
        // It's [ Component | el ]
        arguments[i].appendTo(this.node.document);
      }
    }

    return this;
  };

  Component.prototype.prependTo = function (target) {
    var node = typeof target === 'string'
      ? document.querySelector(target)
      : undefined;

    this.node.document.prependTo(target);

    function triggerMount(p) {
      if (typeof p.trigger === 'function') {
        p.trigger('mount');
      }

      if (p.elements) {
        p.elements.forEach(triggerMount);
      }
    }

    if ((
      typeof this.trigger === 'function'
    ) && (
      typeof target === 'object'
      && el.isElement(target)
      && document.body.contains(target)
    ) || (
      node
      && el.isElement(node)
      && document.body.contains(node)
    )) {
      triggerMount(this);
    }

    return this;
  };

  Component.prototype.appendTo = function (target) {
    var node = typeof target === 'string'
      ? document.querySelector(target)
      : undefined;

    this.node.document.appendTo(target);

    function triggerMount(p) {
      if (typeof p.trigger === 'function') {
        p.trigger('mount');
      }

      if (p.elements) {
        p.elements.forEach(triggerMount);
      }
    }

    if ((
      typeof this.trigger === 'function'
    ) && (
      typeof target === 'object'
      && el.isElement(target)
      && document.body.contains(target)
    ) || (
      node
      && el.isElement(node)
      && document.body.contains(node)
    )) {
      triggerMount(this);
    }

    return this;
  };


  Component.prototype.addClass = function (className) {
    this.node.document.addClass(className);
  };

  Component.prototype.removeClass = function (className) {
    this.node.document.removeClass(className);
  };

  Component.prototype.on = function (name, callback) {
    var names = name.toLowerCase().split(',').filter(function (a) {
      return a.length;
    });

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

  Component.prototype.off = function (name, callback) {
    var names = _.filter(name.split(','), function (a) {
      return a.length;
    });
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

  Component.prototype.trigger = function (name, e) {
    var names = name.toLowerCase().split(',');

    if (typeof e === 'undefined') {
      e = new ComponentEvent(name, this);
    }

    if (typeof e.type === 'undefined') {
      e.type = name;
    }

    if (typeof e.target === 'undefined') {
      e.target = this;
    }

    if (typeof this._subscriber_ === 'undefined') {
      this._subscriber_ = {};
    }

    for (var i = 0, n = names.length; i < n; i++) {
      names[i] = names[i].trim();
      if (names[i].length) {
        if (typeof this._subscriber_[names[i]] === 'object') {
          for (var x = 0, y = this._subscriber_[names[i]].length; x < y; x++) {
            this._subscriber_[names[i]][x](e);
          }
        }
      }
    }

    return this;
  };

  Component.prototype.fadeOut = function () {
    this.node.document.fadeOut(arguments[0], arguments[1]);
  };

  Component.prototype.fadeIn = function () {
    this.node.document.fadeIn(arguments[0], arguments[1]);
  };

  Component.prototype.indexOf = function (a) {
    return this.elements
      ? this.elements.indexOf(a)
      : -1;
  };

  Component.extend = function (Constructor) {
    Constructor.prototype.addClass = Component.prototype.addClass;
    Constructor.prototype.append = Component.prototype.append;
    Constructor.prototype.appendTo = Component.prototype.appendTo;
    Constructor.prototype.fadeIn = Component.prototype.fadeIn;
    Constructor.prototype.fadeOut = Component.prototype.fadeOut;
    Constructor.prototype.indexOf = Component.prototype.indexOf;
    Constructor.prototype.name = Component.prototype.name;
    Constructor.prototype.off = Component.prototype.off;
    Constructor.prototype.on = Component.prototype.on;
    Constructor.prototype.removeClass = Component.prototype.removeClass;
    Constructor.prototype.trigger = Component.prototype.trigger;
  };

  window.Component = Component;
}());
