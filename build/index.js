'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Accordion = function () {
  function Accordion() {
    _classCallCheck(this, Accordion);

    // constructor
    this.el = null;
    this.isMobile = null;
    this.accWidth = 650;
    this.prevAcc = document.querySelector('.third');
    this.isActiveTab = null;
    this.headerBg = document.querySelector('.bg');
    this.buttons = document.querySelectorAll('.accordion');
    this.panels = document.querySelectorAll('.panel');
  }

  _createClass(Accordion, [{
    key: 'init',
    value: function init(e) {
      // initialize
      this.el = e.target;
      this.isActiveTab = this.el.classList.contains('active');
      this.isMobile = window.innerWidth < 768;
      if (this.isMobile) {
        // if mobile
        this.animateMobile();
      } else {
        // if desktop
        this.prevAcc.classList.remove('active');
        this.el.classList.add('active');
        this.animate();
      }
    }
  }, {
    key: 'animateMobile',
    value: function animateMobile() {
      var _this = this;

      var panels = [].concat(_toConsumableArray(this.panels));
      var id = this.el.getAttribute('data-id');
      panels.forEach(function (panel, ind) {
        if (id == ind && !_this.isActiveTab) {
          panel.style.maxHeight = panel.scrollHeight + "px";
          _this.buttons[ind].classList.add('active');
        } else {
          panel.style.maxHeight = "0px";
          _this.buttons[ind].classList.remove('active');
          console.log('adding', ind, _this.el);
        }
      });
    }
  }, {
    key: 'animate',
    value: function animate() {
      this.moveBg();
      this.moveContent();
    }
  }, {
    key: 'moveBg',
    value: function moveBg() {
      this.headerBg.style.left = this.el.offsetLeft + 'px';
      this.prevAcc.style.color = 'black';
      this.el.style.color = 'white';
      this.prevAcc = this.el;
    }
  }, {
    key: 'moveContent',
    value: function moveContent() {
      var _this2 = this;

      var id = this.el.getAttribute('data-id');
      var spots = [];
      switch (id) {
        case "0":
          spots = ['0px', this.accWidth + 'px', this.accWidth + 'px'];
          break;
        case "2":
          spots = ['-' + this.accWidth + 'px', '-' + this.accWidth + 'px', '0px'];
          break;
        default:
          spots = ['-' + this.accWidth + 'px', '0px', this.accWidth + 'px'];
      }
      spots.forEach(function (spot, ind) {
        _this2.panels[ind].style.left = spot;
        if (id == ind && !_this2.isActiveTab) {
          _this2.buttons[ind].classList.add('active');
        } else {
          _this2.buttons[ind].classList.remove('active');
        }
      });
    }
  }]);

  return Accordion;
}();

var accordion = new Accordion();
var acc = [].concat(_toConsumableArray(document.querySelectorAll(".accordion")));
acc.forEach(function (item) {
  return item.addEventListener('click', function (e) {
    return accordion.init(e);
  });
});

// Window Resize adjustments
var ipadSize = 768;
document.querySelector('button.accordion.active + .panel').style.maxHeight = '100%';
var accordions = [].concat(_toConsumableArray(document.querySelectorAll('.accordion')));
var panels = [].concat(_toConsumableArray(document.querySelectorAll('.panel')));

function windowResize() {
  console.log('window.innerWidth', window.innerWidth);
  if (window.innerWidth >= ipadSize) {
    // if desktop apply animations
    document.querySelector('.bg').style.left = document.querySelector('.active').offsetLeft + 'px';
    accordions.forEach(function (accordion, ind) {
      accordion.style.color = accordion.classList.contains('active') ? 'white' : "black";
      panels[ind].style.left = accordion.classList.contains('active') ? '0px' : "-650px";
    });
  } else {
    // if mobile apply animations
    accordions.forEach(function (item, ind) {
      panels[ind].style.maxHeight = item.classList.contains('active') ? '100%' : '0px';
    });
  }
}
// Addedd debounce to improve performance
var debounce = void 0;
window.onresize = function () {
  clearTimeout(debounce);
  debounce = setTimeout(windowResize, 500);
};