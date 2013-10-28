(function(root, factory) {
    if(typeof exports === 'object') {
        module.exports = factory(require('umodel'));
    }
    else if(typeof define === 'function' && define.amd) {
        define('tyler', ['umodel'], factory);
    }
    else {
        root.tyler = factory(root.umodel);
    }
}(this, function(umodel) {
var tyler, _,
  __slice = [].slice,
  __hasProp = {}.hasOwnProperty,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

_ = {
  extend: function() {
    var key, obj, other, others, _i, _len;
    obj = arguments[0], others = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    if (obj && others) {
      for (_i = 0, _len = others.length; _i < _len; _i++) {
        other = others[_i];
        for (key in other) {
          if (!__hasProp.call(other, key)) continue;
          obj[key] = other[key];
        }
      }
    }
    return obj;
  },
  sortBy: function(array, property) {
    var fn, number, _alpha, _numeric;
    if (array[0][property] == null) {
      array[0][property] = 1;
    }
    number = typeof array[0][property] === 'number';
    _alpha = function(property) {
      return function(a, b) {
        return a[property].localeCompare(b[property]);
      };
    };
    _numeric = function(property) {
      return function(a, b) {
        return a[property] < b[property];
      };
    };
    fn = (number ? _numeric : _alpha)(property);
    return array.sort(fn);
  },
  template: function(template, data) {
    if (data == null) {
      data = {};
    }
    return template.call(data);
  },
  one: function(collection) {
    var id;
    for (id in collection) {
      return id;
    }
  }
};

tyler = (function() {
  tyler.prototype.options = {
    columns: 2,
    offsetX: 0,
    offsetY: 0,
    templateWrap: function() {
      return "<div class=\"" + this.classNames.tile + "\" style=\"left:" + this.x + "px;top:" + this.y + "px\">\n	<div class=\"tile-inner\">\n		" + this.front + "\n		" + this.back + "\n	</div>\n</div>";
    },
    templateFront: function() {
      return "<div class=\"tile-front\" style=\"background-image:url(" + this.pic + ")\">\n	<span class=\"name\">" + this.name + "</span>\n</div>";
    },
    templateBack: function() {
      return "<div class=\"tile-back\"></div>";
    },
    classNames: {
      tile: 'tile',
      tileFlipped: 'flipped'
    },
    animation: {
      duration: 500,
      fn: 'ease-out'
    }
  };

  function tyler(data, element, options) {
    this.element = element != null ? element : document.body;
    this.move = __bind(this.move, this);
    this.click = __bind(this.click, this);
    _.extend(this.options, options);
    this.model = new umodel({
      events: {},
      moving: false,
      size: 0
    });
    this.setCSS();
    if (data) {
      this.data(data);
    }
    this.addEventListeners();
  }

  tyler.prototype.on = function(event, handler) {
    var events, key;
    key = "events/" + event;
    if (this.model.get(key) === void 0) {
      this.model.set(key, []);
    }
    events = this.model.get(key);
    return events.push(handler);
  };

  tyler.prototype.addEventListeners = function() {
    document.addEventListener('click', this.click);
    document.addEventListener('touchend', this.click);
    return document.addEventListener('touchmove', this.move);
  };

  tyler.prototype.data = function(data) {
    var layout;
    layout = this.layout(data);
    if (layout) {
      return this.render(layout);
    }
  };

  tyler.prototype.click = function(event) {
    var events, fn, tile, _i, _len, _results;
    if (this.model.get('moving')) {
      event.preventDefault();
      return this.model.set('moving', false);
    } else {
      tile = this.getTile(event);
      if (tile) {
        tile.classList.toggle(this.options.classNames.tileFlipped);
        events = this.model.get('events/click');
        if (events && events[0]) {
          _results = [];
          for (_i = 0, _len = events.length; _i < _len; _i++) {
            fn = events[_i];
            _results.push(fn.call(this, tile, event));
          }
          return _results;
        }
      }
    }
  };

  tyler.prototype.move = function(event) {
    return this.model.set('moving', true);
  };

  tyler.prototype.getTile = function(event) {
    var target;
    target = event.target;
    while (target !== document) {
      if (this.isTile(target)) {
        return target;
      }
      target = target.parentNode;
    }
  };

  tyler.prototype.isTile = function(element) {
    return element.classList.contains(this.options.classNames.tile);
  };

  tyler.prototype.setCSS = function() {
    var height, rule, sheet, size, width;
    height = this.element.offsetHeight;
    width = this.element.offsetWidth;
    size = width / this.options.columns;
    rule = "." + this.options.classNames.tile + " {\n	height: " + size + "px;\n	width: " + size + "px;\n	-webkit-transition: all " + this.options.animation.duration + "ms " + this.options.animation.fn + "\n}";
    sheet = document.styleSheets[0];
    sheet.insertRule(rule, sheet.cssRules.length);
    return this.model.set('size', size);
  };

  tyler.prototype.layout = function(data) {
    var datum, n, size, tile, _i, _len, _results;
    if (!data || typeof _.one(data) === 'undefined') {
      return;
    }
    _.sortBy(data, 'weight');
    size = this.model.get('size');
    _results = [];
    for (n = _i = 0, _len = data.length; _i < _len; n = ++_i) {
      tile = data[n];
      datum = {
        x: size * (n % 2) + this.options.offsetX,
        y: size * Math.floor(n / this.options.columns) + this.options.offsetY
      };
      _results.push(_.extend(tile, datum));
    }
    return _results;
  };

  tyler.prototype.render = function(layout) {
    var back, front, html, item, _i, _len;
    if (layout.length) {
      html = '';
      for (_i = 0, _len = layout.length; _i < _len; _i++) {
        item = layout[_i];
        front = _.template(this.options.templateFront, item);
        back = _.template(this.options.templateBack, item);
        html += _.template(this.options.templateWrap, _.extend(item, this.options, {
          front: front,
          back: back
        }));
      }
      return this.element.innerHTML = html;
    }
  };

  return tyler;

})();

    return tyler;
}));
