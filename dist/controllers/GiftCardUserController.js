"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _require = require("../../dbsetup"),
  getGiftCardOrderByUser = _require.getGiftCardOrderByUser,
  setCardData = _require.setCardData;
var GiftCardUserController = /*#__PURE__*/function () {
  function GiftCardUserController() {
    _classCallCheck(this, GiftCardUserController);
  }
  return _createClass(GiftCardUserController, [{
    key: "showUserOrder",
    value:
    // show order
    function showUserOrder(req, res) {
      var id = req.params.id;
      getGiftCardOrderByUser(id).then(function (order) {
        res.send(order);
      })["catch"](function (error) {
        res.status(500).json({
          error: "An error occurred"
        });
      });
    }

    // create an order
  }, {
    key: "create",
    value: function create(req, res) {
      try {
        var _req$body = req.body,
          user_amount = _req$body.user_amount,
          user_id = _req$body.user_id,
          receiver_name = _req$body.receiver_name,
          receiver_mail = _req$body.receiver_mail,
          receiver_phone = _req$body.receiver_phone,
          receiver_address = _req$body.receiver_address,
          receiver_message = _req$body.receiver_message;
        var card_status_id = 1;
        setCardData(card_status_id, user_id, receiver_name, receiver_mail, receiver_phone, receiver_address, receiver_message, user_amount).then(function () {
          res.send("Order success");
        })["catch"](function (error) {
          console.error(error);
          res.status(500).send("An error occurred");
        });
      } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
      }
    }
  }]);
}();
module.exports = new GiftCardUserController();