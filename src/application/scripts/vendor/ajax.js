(function () {
  var MATCH_DOMAIN = /^(http(s|):\/\/|)(www\.|)/;

  var MIME_TYPES = {
    json : 'application/json; charset=utf-8',
    urlencoded : 'application/x-www-form-urlencoded; charset=utf-8',
    text : 'text/plain'
  };

  var PREPROCESS = {
    json : function (data) {
      return JSON.stringify(data);
    },

    urlencoded : function (data) {
      // http://stackoverflow.com/questions/1714786/querystring-encoding-of-a-javascript-object
      var str = [];
      for (var p in data) {
        if (data.hasOwnProperty(p)) {
          str.push(encodeURIComponent(p) + '=' + encodeURIComponent(data[p]));
        }
      }
      return str.join('&');
    },

    text : function (data) {
      return data;
    },
  };

  function parseReponse (message) {
    var wrapped;
    try {
      return JSON.parse(message);
    } catch (e) {
      try {
        // http://stackoverflow.com/questions/8648892/convert-url-parameters-to-a-javascript-object
        wrapped = '{"' + URIString.replace(/&/g, '","').replace(/=/g,'":"') + '"}';
        return JSON.parse(wrapped, function (key, value) {
          return key === "" ? value : decodeURIComponent(value);
        });
      } catch (e) {
        return message;
      }
    }
  }

  function clearQueue (self) {
    while (self.method.queue.length) {
      clearTimeout(self.method.queue[0]);
      self.method.queue.shift();
    }
  }

  function whileMethod (method, arg) {
    while (method.length) {
      method[0](arg);
      method.shift();
    }
  }

  function error (self, data) {
    self.method.then = [];
    self.method.warning = [];
    clearQueue(self);
    whileMethod(self.method.catch, data);
  }

  function warning (self, data) {
    for (var i = 0, n = self.method.warning.length; i < n; i++) {
      self.method.warning[i](data);
    }
  }

  function success (self, message) {
    self.method.catch = [];
    self.method.warning = [];
    clearQueue(self);
    whileMethod(self.method.then, parseReponse(message));
  }

  function request (self) {
    var xhr;

    // Is IE 8> and the request is going cross domain
    if (typeof XDomainRequest === 'function' && self.isCors) {
      xhr = new XDomainRequest();

      xhr.onload = function () {
        success(self, xhr.responseText);
      };

      xhr.onerror = function () {
        error(self, { message : 404 });
      };
    } else {
      xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (this.readyState === 4) {
          if (this.status === 200) {
            success(self, this.responseText);
          } else {
            error(self, { message : this.status });
          }
        }
      };
    }

    if (typeof self.headers === 'object') {
      for (var k in self.headers) {
        req.setRequestHeader(k, self.headers[k]);
      }
    }

    try {
      xhr.open(self.type, self.url, true);
      if (xhr instanceof XMLHttpRequest) {
        xhr.setRequestHeader("Content-type", MIME_TYPES[self.dataType]);
      }
      xhr.send(PREPROCESS[self.dataType](self.data));
    } catch (err) {
      // Delay is added because on IE 9, the error will throw before
      // the prototypes get a chance to fill the 'this.method'
      setTimeout(function () { error(self, err); }, 0);
    }
  }

  function Ajax (opt) {
    var self = this;

    this.method = {
      then : [],
      catch : [],
      warning : [],
      queue : []
    };

    this.destDomain = opt.url.replace(MATCH_DOMAIN, '');
    this.srcDomain = window.location.href.replace(MATCH_DOMAIN, '');
    this.isCors = this.destDomain !== this.srcDomain;

    this.url = opt.url;
    this.data = opt.data;
    this.type = opt.type.toUpperCase();
    this.dataType = opt.dataType || 'text';
    this.headers = opt.headers;
    this.isCors = this.isCors;

    this.method.queue.push(setTimeout(function () {
      warning(self, { message : 'delay', seconds : 10 });
    }, 10000));

    this.method.queue.push(setTimeout(function () {
      warning(self, { message : 'delay', seconds : 20 });
    }, 20000));

    this.method.queue.push(setTimeout(function () {
      error(self, { message : 'timeout', seconds : 30 });
    }, 30000));

    request(this);
  }

  Ajax.prototype.then = function (callback) {
    this.method.then.push(callback);
    return this;
  };

  Ajax.prototype.catch = function (callback) {
    this.method.catch.push(callback);
    return this;
  };

  Ajax.prototype.warning = function (callback) {
    this.method.warning.push(callback);
    return this;
  };

  // Export to the global object
  window.ajax = function (opt) {
    return new Ajax(opt);
  };

  window.ajax.get = function(opt) {
    opt = typeof opt === 'string' ? { url : opt } : opt;
    return new Ajax(Object.assign({ type : 'get' }, opt));
  };

  window.ajax.post = function(opt) {
    opt = typeof opt === 'string' ? { url : opt } : opt;
    return new Ajax(Object.assign({ type : 'post'}, opt));
  };
}());
