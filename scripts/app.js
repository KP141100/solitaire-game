(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _Boot = _interopRequireDefault(require("./states/Boot.js"));
var _Preload = _interopRequireDefault(require("./states/Preload.js"));
var _Game = _interopRequireDefault(require("./states/Game.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var game = new Phaser.Game(720, 1280, Phaser.AUTO, "game");
game.state.add("Boot", _Boot["default"]);
game.state.add("Preload", _Preload["default"]);
game.state.add("Game", _Game["default"]);
game.state.start("Boot");

},{"./states/Boot.js":2,"./states/Game.js":3,"./states/Preload.js":4}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Boot = exports["default"] = /*#__PURE__*/function () {
  function Boot() {
    _classCallCheck(this, Boot);
  }
  return _createClass(Boot, [{
    key: "preload",
    value: function preload() {
      console.log("Boot -> preload");
      // Optionally load a loading bar or minimal assets
    }
  }, {
    key: "create",
    value: function create() {
      console.log("Boot -> create");
      this.state.start("Preload");
    }
  }]);
}();

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Game = exports["default"] = /*#__PURE__*/function () {
  function Game() {
    _classCallCheck(this, Game);
  }
  return _createClass(Game, [{
    key: "create",
    value: function create() {
      var _this = this;
      this.add.sprite(0, 0, "background").scale.setTo(0.72); // Background scaled slightly

      var centerX = this.world.centerX;

      // === 1. LOGO ===
      var logo = this.add.sprite(centerX - 130, 20, "logo");
      logo.scale.setTo(0.6);

      // === 2. SCORE UI ===
      var scorePanel = this.add.sprite(50, 100, "hudPanel");
      scorePanel.scale.setTo(0.6);
      var scoreText = this.add.text(0, 0, "95,000", {
        font: "24px Arial",
        fill: "#FFA500"
      });
      scoreText.anchor.set(0.5);
      scoreText.x = 50 + scorePanel.width * 0.6 / 2;
      scoreText.y = 100 + scorePanel.height * 0.6 / 2;

      // === 3. STREAK METER ===
      var streak = this.add.sprite(centerX + 150, 100, "hudStreak");
      streak.scale.setTo(0.6);

      // === 4. FAN CARDS BACKS ===
      var backs = [{
        x: centerX - 150,
        y: 350,
        angle: -15
      }, {
        x: centerX,
        y: 320,
        angle: 0
      }, {
        x: centerX + 150,
        y: 350,
        angle: 15
      }];
      backs.forEach(function (b) {
        var back = _this.add.sprite(b.x, b.y, "cardBack");
        back.anchor.set(0.5);
        back.angle = b.angle;
        back.scale.setTo(0.6);
      });

      // === 5. FAN CARDS FRONT ===
      var faces = [{
        key: "diamonds8",
        x: centerX - 150,
        y: 310,
        angle: -15
      }, {
        key: "heart7",
        x: centerX,
        y: 280,
        angle: 0
      }, {
        key: "clubs6",
        x: centerX + 150,
        y: 310,
        angle: 15
      }];
      faces.forEach(function (card) {
        var sprite = _this.add.sprite(card.x, card.y, card.key);
        sprite.anchor.set(0.5);
        sprite.angle = card.angle;
        sprite.scale.setTo(0.6);
        sprite.inputEnabled = true;
        sprite.input.useHandCursor = true;
        sprite.events.onInputDown.add(function () {
          return _this.checkMatch(sprite);
        }, _this);
      });

      // === 6. YELLOW OUTLINE ===
      var centerBox = this.add.graphics(0, 0);
      centerBox.lineStyle(4, 0xFFFF00);
      centerBox.drawRoundedRect(centerX - 60, 250, 120, 160, 10);

      // === 7. BOMB ICON ===
      var bomb = this.add.sprite(centerX - 25, 420, "000");
      bomb.scale.setTo(0.6);

      // === 8. TIMER ===
      this.counter = 10;
      this.timerText = this.add.text(centerX + 5, 435, this.counter.toString(), {
        font: "24px Arial",
        fill: "#00FF00"
      });
      this.timerText.anchor.set(0.5);
      this.game.time.events.loop(Phaser.Timer.SECOND, function () {
        _this.counter--;
        _this.timerText.text = _this.counter > 0 ? _this.counter.toString() : "💥";
      }, this);

      // === 9. HAND POINTER ===
      this.handFrameIndex = 0;
      this.hand = this.add.sprite(centerX - 200, 280, "h000");
      this.hand.anchor.set(0.5);
      this.hand.scale.setTo(0.6);
      this.game.time.events.loop(200, function () {
        _this.handFrameIndex = (_this.handFrameIndex + 1) % 11;
        var frameKey = "h".concat(_this.handFrameIndex.toString().padStart(3, '0'));
        _this.hand.loadTexture(frameKey);
      }, this);

      // === 10. ACTIVE CARD PANEL ===
      var panel = this.add.graphics(0, 0);
      panel.beginFill(0x4B0082, 1); // Purple background
      panel.drawRoundedRect(centerX - 80, 600, 160, 230, 20);
      panel.endFill();

      // === 11. ACTIVE CARD ===
      this.activeCard = this.add.sprite(centerX, 710, "heart7");
      this.activeCard.anchor.set(0.5);
      this.activeCard.scale.setTo(0.6);
    }
  }, {
    key: "checkMatch",
    value: function checkMatch(clickedCard) {
      var clickedValue = this.getCardValue(clickedCard.key);
      var activeValue = this.getCardValue(this.activeCard.key);
      if (Math.abs(clickedValue - activeValue) === 1) {
        this.activeCard.loadTexture(clickedCard.key);
        clickedCard.destroy();
      }
    }
  }, {
    key: "getCardValue",
    value: function getCardValue(key) {
      var map = {
        "2": 2,
        "3": 3,
        "5": 5,
        "6": 6,
        "7": 7,
        "8": 8,
        "A": 1
      };
      for (var val in map) {
        if (key.includes(val)) return map[val];
      }
      return 0;
    }
  }]);
}();

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Preload = exports["default"] = /*#__PURE__*/function () {
  function Preload() {
    _classCallCheck(this, Preload);
  }
  return _createClass(Preload, [{
    key: "preload",
    value: function preload() {
      console.log("Preload -> preload");
      // Background
      this.load.image("background", "Assets/bg.jpg");

      // Cards
      this.load.image("cardBack", "Assets/Card-Back.png");
      this.load.image("clubs5", "Assets/Clubs-5.png");
      this.load.image("clubs6", "Assets/Clubs-6.png");
      this.load.image("diamonds8", "Assets/Diamonds-8.png");
      this.load.image("diamondsA", "Assets/Diamonds-A.png");
      this.load.image("heart3", "Assets/Heart-3.png");
      this.load.image("heart7", "Assets/Heart-7.png");
      this.load.image("spades2", "Assets/Spades-2.png");
      this.load.image("wildCard", "Assets/Wild-Card.png");
      this.load.image("talon", "Assets/Talon.png");

      // bomb
      this.load.image("000", "Assets/bomb/000.png");
      this.load.image("001", "Assets/bomb/001.png");
      this.load.image("002", "Assets/bomb/002.png");

      // handframe
      this.load.image("h000", "Assets/hand-frame/000.png");
      this.load.image("h001", "Assets/hand-frame/001.png");
      this.load.image("h002", "Assets/hand-frame/002.png");
      this.load.image("h003", "Assets/hand-frame/003.png");
      this.load.image("h004", "Assets/hand-frame/004.png");
      this.load.image("h005", "Assets/hand-frame/005.png");
      this.load.image("h006", "Assets/hand-frame/006.png");
      this.load.image("h007", "Assets/hand-frame/007.png");
      this.load.image("h008", "Assets/hand-frame/008.png");
      this.load.image("h009", "Assets/hand-frame/009.png");
      this.load.image("h010", "Assets/hand-frame/010.png");
      // UI
      this.load.image("logo", "Assets/logo.png");
      this.load.image("hudPanel", "Assets/HUD-Panel.png");
      this.load.image("hudBlack", "Assets/HUD-Streakmeter_Black.png");
      this.load.image("hudBlank", "Assets/HUD-Streakmeter_Blank.png");
      this.load.image("hudRed", "Assets/HUD-Streakmeter_Red.png");
      this.load.image("hudStreak", "Assets/streak-hud.png");

      //Audio
      this.load.audio("bgMusic", "Assets/Game_music.mp3");
    }
  }, {
    key: "create",
    value: function create() {
      console.log("Preload -> create");
      this.state.start("Game");
    }
  }]);
}();

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvbWFpbi5qcyIsInNyYy9zdGF0ZXMvQm9vdC5qcyIsInNyYy9zdGF0ZXMvR2FtZS5qcyIsInNyYy9zdGF0ZXMvUHJlbG9hZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBQSxLQUFBLEdBQUEsc0JBQUEsQ0FBQSxPQUFBO0FBQ0EsSUFBQSxRQUFBLEdBQUEsc0JBQUEsQ0FBQSxPQUFBO0FBQ0EsSUFBQSxLQUFBLEdBQUEsc0JBQUEsQ0FBQSxPQUFBO0FBQW9DLFNBQUEsdUJBQUEsQ0FBQSxXQUFBLENBQUEsSUFBQSxDQUFBLENBQUEsVUFBQSxHQUFBLENBQUEsZ0JBQUEsQ0FBQTtBQUVwQyxJQUFNLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQztBQUU1RCxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsZ0JBQUksQ0FBQztBQUM1QixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsbUJBQU8sQ0FBQztBQUNsQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsZ0JBQUksQ0FBQztBQUU1QixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7Ozs7Ozs7Ozs7Ozs7OztJQ1ZILElBQUksR0FBQSxPQUFBO0VBQUEsU0FBQSxLQUFBO0lBQUEsZUFBQSxPQUFBLElBQUE7RUFBQTtFQUFBLE9BQUEsWUFBQSxDQUFBLElBQUE7SUFBQSxHQUFBO0lBQUEsS0FBQSxFQUN2QixTQUFBLE9BQU8sQ0FBQSxFQUFHO01BQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQztNQUM5QjtJQUNGO0VBQUM7SUFBQSxHQUFBO0lBQUEsS0FBQSxFQUVELFNBQUEsTUFB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RSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUM7O01BRTFEO01BQ0EsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLEVBQUUsRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDO01BQ3RELElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQzs7TUFFckI7TUFDQSxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUU7TUFDakIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUU7UUFDdEUsSUFBSSxFQUFFLFlBQVk7UUFDbEIsSUFBSSxFQUFFO01BQ1YsQ0FBQyxDQUFDO01BQ0YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztNQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLFlBQU07UUFDbEQsS0FBSSxDQUFDLE9BQU8sRUFBRTtRQUNkLEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLEtBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJO01BQzNFLENBQUMsRUFBRSxJQUFJLENBQUM7O01BRVI7TUFDQSxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUM7TUFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUM7TUFDdkQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztNQUN6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QkFBdUIsQ0FBQztJQUN2RDtFQUFDO0lBQUEsR0FBQTtJQUFBLEtBQUEsRUFFRCxTQUFBLE1BQU0sQ0FBQSxFQUFHO01BQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQztNQUNoQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDNUI7RUFBQztBQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IEJvb3QgZnJvbSBcIi4vc3RhdGVzL0Jvb3QuanNcIjtcclxuaW1wb3J0IFByZWxvYWQgZnJvbSBcIi4vc3RhdGVzL1ByZWxvYWQuanNcIjtcclxuaW1wb3J0IEdhbWUgZnJvbSBcIi4vc3RhdGVzL0dhbWUuanNcIjtcclxuXHJcbmNvbnN0IGdhbWUgPSBuZXcgUGhhc2VyLkdhbWUoNzIwLCAxMjgwLCBQaGFzZXIuQVVUTywgXCJnYW1lXCIpO1xyXG5cclxuZ2FtZS5zdGF0ZS5hZGQoXCJCb290XCIsIEJvb3QpO1xyXG5nYW1lLnN0YXRlLmFkZChcIlByZWxvYWRcIiwgUHJlbG9hZCk7XHJcbmdhbWUuc3RhdGUuYWRkKFwiR2FtZVwiLCBHYW1lKTtcclxuXHJcbmdhbWUuc3RhdGUuc3RhcnQoXCJCb290XCIpO1xyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBCb290IHtcclxuICBwcmVsb2FkKCkge1xyXG4gICAgY29uc29sZS5sb2coXCJCb290IC0+IHByZWxvYWRcIik7XHJcbiAgICAvLyBPcHRpb25hbGx5IGxvYWQgYSBsb2FkaW5nIGJhciBvciBtaW5pbWFsIGFzc2V0c1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlKCkge1xyXG4gICAgY29uc29sZS5sb2coXCJCb290IC0+IGNyZWF0ZVwiKTtcclxuICAgIHRoaXMuc3RhdGUuc3RhcnQoXCJQcmVsb2FkXCIpO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lIHtcclxuICAgIGNyZWF0ZSgpIHtcclxuICAgICAgICB0aGlzLmFkZC5zcHJpdGUoMCwgMCwgXCJiYWNrZ3JvdW5kXCIpLnNjYWxlLnNldFRvKDAuNzIpOyAvLyBCYWNrZ3JvdW5kIHNjYWxlZCBzbGlnaHRseVxyXG5cclxuICAgICAgICBjb25zdCBjZW50ZXJYID0gdGhpcy53b3JsZC5jZW50ZXJYO1xyXG5cclxuICAgICAgICAvLyA9PT0gMS4gTE9HTyA9PT1cclxuICAgICAgICBjb25zdCBsb2dvID0gdGhpcy5hZGQuc3ByaXRlKGNlbnRlclggLSAxMzAsIDIwLCBcImxvZ29cIik7XHJcbiAgICAgICAgbG9nby5zY2FsZS5zZXRUbygwLjYpO1xyXG5cclxuICAgICAgICAvLyA9PT0gMi4gU0NPUkUgVUkgPT09XHJcbiAgICAgICAgY29uc3Qgc2NvcmVQYW5lbCA9IHRoaXMuYWRkLnNwcml0ZSg1MCwgMTAwLCBcImh1ZFBhbmVsXCIpO1xyXG4gICAgICAgIHNjb3JlUGFuZWwuc2NhbGUuc2V0VG8oMC42KTtcclxuICAgICAgICBjb25zdCBzY29yZVRleHQgPSB0aGlzLmFkZC50ZXh0KDAsIDAsIFwiOTUsMDAwXCIsIHtcclxuICAgICAgICAgICAgZm9udDogXCIyNHB4IEFyaWFsXCIsXHJcbiAgICAgICAgICAgIGZpbGw6IFwiI0ZGQTUwMFwiXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc2NvcmVUZXh0LmFuY2hvci5zZXQoMC41KTtcclxuICAgICAgICBzY29yZVRleHQueCA9IDUwICsgKHNjb3JlUGFuZWwud2lkdGggKiAwLjYpIC8gMjtcclxuICAgICAgICBzY29yZVRleHQueSA9IDEwMCArIChzY29yZVBhbmVsLmhlaWdodCAqIDAuNikgLyAyO1xyXG5cclxuICAgICAgICAvLyA9PT0gMy4gU1RSRUFLIE1FVEVSID09PVxyXG4gICAgICAgIGNvbnN0IHN0cmVhayA9IHRoaXMuYWRkLnNwcml0ZShjZW50ZXJYICsgMTUwLCAxMDAsIFwiaHVkU3RyZWFrXCIpO1xyXG4gICAgICAgIHN0cmVhay5zY2FsZS5zZXRUbygwLjYpO1xyXG5cclxuICAgICAgICAvLyA9PT0gNC4gRkFOIENBUkRTIEJBQ0tTID09PVxyXG4gICAgICAgIGNvbnN0IGJhY2tzID0gW1xyXG4gICAgICAgICAgICB7IHg6IGNlbnRlclggLSAxNTAsIHk6IDM1MCwgYW5nbGU6IC0xNSB9LFxyXG4gICAgICAgICAgICB7IHg6IGNlbnRlclgsICAgICAgIHk6IDMyMCwgYW5nbGU6IDAgfSxcclxuICAgICAgICAgICAgeyB4OiBjZW50ZXJYICsgMTUwLCB5OiAzNTAsIGFuZ2xlOiAxNSB9XHJcbiAgICAgICAgXTtcclxuICAgICAgICBiYWNrcy5mb3JFYWNoKGIgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBiYWNrID0gdGhpcy5hZGQuc3ByaXRlKGIueCwgYi55LCBcImNhcmRCYWNrXCIpO1xyXG4gICAgICAgICAgICBiYWNrLmFuY2hvci5zZXQoMC41KTtcclxuICAgICAgICAgICAgYmFjay5hbmdsZSA9IGIuYW5nbGU7XHJcbiAgICAgICAgICAgIGJhY2suc2NhbGUuc2V0VG8oMC42KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gPT09IDUuIEZBTiBDQVJEUyBGUk9OVCA9PT1cclxuICAgICAgICBjb25zdCBmYWNlcyA9IFtcclxuICAgICAgICAgICAgeyBrZXk6IFwiZGlhbW9uZHM4XCIsIHg6IGNlbnRlclggLSAxNTAsIHk6IDMxMCwgYW5nbGU6IC0xNSB9LFxyXG4gICAgICAgICAgICB7IGtleTogXCJoZWFydDdcIiwgICAgeDogY2VudGVyWCwgICAgICAgeTogMjgwLCBhbmdsZTogMCB9LFxyXG4gICAgICAgICAgICB7IGtleTogXCJjbHViczZcIiwgICAgeDogY2VudGVyWCArIDE1MCwgeTogMzEwLCBhbmdsZTogMTUgfVxyXG4gICAgICAgIF07XHJcbiAgICAgICAgZmFjZXMuZm9yRWFjaChjYXJkID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc3ByaXRlID0gdGhpcy5hZGQuc3ByaXRlKGNhcmQueCwgY2FyZC55LCBjYXJkLmtleSk7XHJcbiAgICAgICAgICAgIHNwcml0ZS5hbmNob3Iuc2V0KDAuNSk7XHJcbiAgICAgICAgICAgIHNwcml0ZS5hbmdsZSA9IGNhcmQuYW5nbGU7XHJcbiAgICAgICAgICAgIHNwcml0ZS5zY2FsZS5zZXRUbygwLjYpO1xyXG4gICAgICAgICAgICBzcHJpdGUuaW5wdXRFbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgc3ByaXRlLmlucHV0LnVzZUhhbmRDdXJzb3IgPSB0cnVlO1xyXG4gICAgICAgICAgICBzcHJpdGUuZXZlbnRzLm9uSW5wdXREb3duLmFkZCgoKSA9PiB0aGlzLmNoZWNrTWF0Y2goc3ByaXRlKSwgdGhpcyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vID09PSA2LiBZRUxMT1cgT1VUTElORSA9PT1cclxuICAgICAgICBjb25zdCBjZW50ZXJCb3ggPSB0aGlzLmFkZC5ncmFwaGljcygwLCAwKTtcclxuICAgICAgICBjZW50ZXJCb3gubGluZVN0eWxlKDQsIDB4RkZGRjAwKTtcclxuICAgICAgICBjZW50ZXJCb3guZHJhd1JvdW5kZWRSZWN0KGNlbnRlclggLSA2MCwgMjUwLCAxMjAsIDE2MCwgMTApO1xyXG5cclxuICAgICAgICAvLyA9PT0gNy4gQk9NQiBJQ09OID09PVxyXG4gICAgICAgIGNvbnN0IGJvbWIgPSB0aGlzLmFkZC5zcHJpdGUoY2VudGVyWCAtIDI1LCA0MjAsIFwiMDAwXCIpO1xyXG4gICAgICAgIGJvbWIuc2NhbGUuc2V0VG8oMC42KTtcclxuXHJcbiAgICAgICAgLy8gPT09IDguIFRJTUVSID09PVxyXG4gICAgICAgIHRoaXMuY291bnRlciA9IDEwO1xyXG4gICAgICAgIHRoaXMudGltZXJUZXh0ID0gdGhpcy5hZGQudGV4dChjZW50ZXJYICsgNSwgNDM1LCB0aGlzLmNvdW50ZXIudG9TdHJpbmcoKSwge1xyXG4gICAgICAgICAgICBmb250OiBcIjI0cHggQXJpYWxcIixcclxuICAgICAgICAgICAgZmlsbDogXCIjMDBGRjAwXCJcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnRpbWVyVGV4dC5hbmNob3Iuc2V0KDAuNSk7XHJcbiAgICAgICAgdGhpcy5nYW1lLnRpbWUuZXZlbnRzLmxvb3AoUGhhc2VyLlRpbWVyLlNFQ09ORCwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNvdW50ZXItLTtcclxuICAgICAgICAgICAgdGhpcy50aW1lclRleHQudGV4dCA9IHRoaXMuY291bnRlciA+IDAgPyB0aGlzLmNvdW50ZXIudG9TdHJpbmcoKSA6IFwi8J+SpVwiO1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgICAgICAvLyA9PT0gOS4gSEFORCBQT0lOVEVSID09PVxyXG4gICAgICAgIHRoaXMuaGFuZEZyYW1lSW5kZXggPSAwO1xyXG4gICAgICAgIHRoaXMuaGFuZCA9IHRoaXMuYWRkLnNwcml0ZShjZW50ZXJYIC0gMjAwLCAyODAsIFwiaDAwMFwiKTtcclxuICAgICAgICB0aGlzLmhhbmQuYW5jaG9yLnNldCgwLjUpO1xyXG4gICAgICAgIHRoaXMuaGFuZC5zY2FsZS5zZXRUbygwLjYpO1xyXG4gICAgICAgIHRoaXMuZ2FtZS50aW1lLmV2ZW50cy5sb29wKDIwMCwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRGcmFtZUluZGV4ID0gKHRoaXMuaGFuZEZyYW1lSW5kZXggKyAxKSAlIDExO1xyXG4gICAgICAgICAgICBjb25zdCBmcmFtZUtleSA9IGBoJHt0aGlzLmhhbmRGcmFtZUluZGV4LnRvU3RyaW5nKCkucGFkU3RhcnQoMywgJzAnKX1gO1xyXG4gICAgICAgICAgICB0aGlzLmhhbmQubG9hZFRleHR1cmUoZnJhbWVLZXkpO1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgICAgICAvLyA9PT0gMTAuIEFDVElWRSBDQVJEIFBBTkVMID09PVxyXG4gICAgICAgIGNvbnN0IHBhbmVsID0gdGhpcy5hZGQuZ3JhcGhpY3MoMCwgMCk7XHJcbiAgICAgICAgcGFuZWwuYmVnaW5GaWxsKDB4NEIwMDgyLCAxKTsgLy8gUHVycGxlIGJhY2tncm91bmRcclxuICAgICAgICBwYW5lbC5kcmF3Um91bmRlZFJlY3QoY2VudGVyWCAtIDgwLCA2MDAsIDE2MCwgMjMwLCAyMCk7XHJcbiAgICAgICAgcGFuZWwuZW5kRmlsbCgpO1xyXG5cclxuICAgICAgICAvLyA9PT0gMTEuIEFDVElWRSBDQVJEID09PVxyXG4gICAgICAgIHRoaXMuYWN0aXZlQ2FyZCA9IHRoaXMuYWRkLnNwcml0ZShjZW50ZXJYLCA3MTAsIFwiaGVhcnQ3XCIpO1xyXG4gICAgICAgIHRoaXMuYWN0aXZlQ2FyZC5hbmNob3Iuc2V0KDAuNSk7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVDYXJkLnNjYWxlLnNldFRvKDAuNik7XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tNYXRjaChjbGlja2VkQ2FyZCkge1xyXG4gICAgICAgIGNvbnN0IGNsaWNrZWRWYWx1ZSA9IHRoaXMuZ2V0Q2FyZFZhbHVlKGNsaWNrZWRDYXJkLmtleSk7XHJcbiAgICAgICAgY29uc3QgYWN0aXZlVmFsdWUgPSB0aGlzLmdldENhcmRWYWx1ZSh0aGlzLmFjdGl2ZUNhcmQua2V5KTtcclxuXHJcbiAgICAgICAgaWYgKE1hdGguYWJzKGNsaWNrZWRWYWx1ZSAtIGFjdGl2ZVZhbHVlKSA9PT0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUNhcmQubG9hZFRleHR1cmUoY2xpY2tlZENhcmQua2V5KTtcclxuICAgICAgICAgICAgY2xpY2tlZENhcmQuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRDYXJkVmFsdWUoa2V5KSB7XHJcbiAgICAgICAgY29uc3QgbWFwID0ge1xyXG4gICAgICAgICAgICBcIjJcIjogMiwgXCIzXCI6IDMsIFwiNVwiOiA1LCBcIjZcIjogNiwgXCI3XCI6IDcsIFwiOFwiOiA4LCBcIkFcIjogMVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgZm9yIChsZXQgdmFsIGluIG1hcCkge1xyXG4gICAgICAgICAgICBpZiAoa2V5LmluY2x1ZGVzKHZhbCkpIHJldHVybiBtYXBbdmFsXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJlbG9hZHtcclxuICAgIHByZWxvYWQoKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlByZWxvYWQgLT4gcHJlbG9hZFwiKTtcclxuICAgICAgICAvLyBCYWNrZ3JvdW5kXHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKFwiYmFja2dyb3VuZFwiLCBcIkFzc2V0cy9iZy5qcGdcIik7XHJcblxyXG4gICAgICAgIC8vIENhcmRzXHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKFwiY2FyZEJhY2tcIiwgXCJBc3NldHMvQ2FyZC1CYWNrLnBuZ1wiKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoXCJjbHViczVcIixcIkFzc2V0cy9DbHVicy01LnBuZ1wiKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoXCJjbHViczZcIiwgXCJBc3NldHMvQ2x1YnMtNi5wbmdcIik7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKFwiZGlhbW9uZHM4XCIsIFwiQXNzZXRzL0RpYW1vbmRzLTgucG5nXCIpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZShcImRpYW1vbmRzQVwiLCBcIkFzc2V0cy9EaWFtb25kcy1BLnBuZ1wiKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoXCJoZWFydDNcIiwgXCJBc3NldHMvSGVhcnQtMy5wbmdcIik7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKFwiaGVhcnQ3XCIsIFwiQXNzZXRzL0hlYXJ0LTcucG5nXCIpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZShcInNwYWRlczJcIiwgXCJBc3NldHMvU3BhZGVzLTIucG5nXCIpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZShcIndpbGRDYXJkXCIsIFwiQXNzZXRzL1dpbGQtQ2FyZC5wbmdcIik7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKFwidGFsb25cIiwgXCJBc3NldHMvVGFsb24ucG5nXCIpO1xyXG5cclxuICAgICAgICAvLyBib21iXHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKFwiMDAwXCIsIFwiQXNzZXRzL2JvbWIvMDAwLnBuZ1wiKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoXCIwMDFcIiwgXCJBc3NldHMvYm9tYi8wMDEucG5nXCIpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZShcIjAwMlwiLCBcIkFzc2V0cy9ib21iLzAwMi5wbmdcIik7XHJcblxyXG4gICAgICAgIC8vIGhhbmRmcmFtZVxyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZShcImgwMDBcIiwgXCJBc3NldHMvaGFuZC1mcmFtZS8wMDAucG5nXCIpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZShcImgwMDFcIiwgXCJBc3NldHMvaGFuZC1mcmFtZS8wMDEucG5nXCIpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZShcImgwMDJcIiwgXCJBc3NldHMvaGFuZC1mcmFtZS8wMDIucG5nXCIpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZShcImgwMDNcIiwgXCJBc3NldHMvaGFuZC1mcmFtZS8wMDMucG5nXCIpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZShcImgwMDRcIiwgXCJBc3NldHMvaGFuZC1mcmFtZS8wMDQucG5nXCIpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZShcImgwMDVcIiwgXCJBc3NldHMvaGFuZC1mcmFtZS8wMDUucG5nXCIpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZShcImgwMDZcIiwgXCJBc3NldHMvaGFuZC1mcmFtZS8wMDYucG5nXCIpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZShcImgwMDdcIiwgXCJBc3NldHMvaGFuZC1mcmFtZS8wMDcucG5nXCIpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZShcImgwMDhcIiwgXCJBc3NldHMvaGFuZC1mcmFtZS8wMDgucG5nXCIpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZShcImgwMDlcIiwgXCJBc3NldHMvaGFuZC1mcmFtZS8wMDkucG5nXCIpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZShcImgwMTBcIiwgXCJBc3NldHMvaGFuZC1mcmFtZS8wMTAucG5nXCIpO1xyXG4gICAgICAgIC8vIFVJXHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKFwibG9nb1wiLCBcIkFzc2V0cy9sb2dvLnBuZ1wiKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoXCJodWRQYW5lbFwiLCBcIkFzc2V0cy9IVUQtUGFuZWwucG5nXCIpO1xyXG4gICAgICAgIHRoaXMubG9hZC5pbWFnZShcImh1ZEJsYWNrXCIsIFwiQXNzZXRzL0hVRC1TdHJlYWttZXRlcl9CbGFjay5wbmdcIik7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKFwiaHVkQmxhbmtcIiwgXCJBc3NldHMvSFVELVN0cmVha21ldGVyX0JsYW5rLnBuZ1wiKTtcclxuICAgICAgICB0aGlzLmxvYWQuaW1hZ2UoXCJodWRSZWRcIiwgXCJBc3NldHMvSFVELVN0cmVha21ldGVyX1JlZC5wbmdcIik7XHJcbiAgICAgICAgdGhpcy5sb2FkLmltYWdlKFwiaHVkU3RyZWFrXCIsIFwiQXNzZXRzL3N0cmVhay1odWQucG5nXCIpO1xyXG5cclxuICAgICAgICAvL0F1ZGlvXHJcbiAgICAgICAgdGhpcy5sb2FkLmF1ZGlvKFwiYmdNdXNpY1wiLCBcIkFzc2V0cy9HYW1lX211c2ljLm1wM1wiKTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGUoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJQcmVsb2FkIC0+IGNyZWF0ZVwiKTtcclxuICAgICAgICB0aGlzLnN0YXRlLnN0YXJ0KFwiR2FtZVwiKTtcclxuICAgIH1cclxufSJdfQ==
