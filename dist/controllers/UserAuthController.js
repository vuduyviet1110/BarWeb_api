"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _require = require("../../dbsetup"),
  connection = _require.connection;
var jwt = require("jsonwebtoken");
var SinInController = /*#__PURE__*/function () {
  function SinInController() {
    _classCallCheck(this, SinInController);
  }
  return _createClass(SinInController, [{
    key: "Auth",
    value:
    // tạo ra bài viết mới
    function Auth(req, res, next) {
      var gmail = req.body.user_gmail;
      var password = req.body.user_password;
      if (gmail && password) {
        connection.query("SELECT * FROM users WHERE user_gmail = ? AND user_password = ?", [gmail, password], function (error, matched_users) {
          if (error) {
            throw error;
          }
          if (matched_users.length > 0) {
            //Lấy user_id của người dùng đầu tiên phù hợp
            var data = matched_users[0];
            var token = jwt.sign({
              user_id: data.user_id
            }, "mk");
            return res.json({
              msg: "Success",
              token: token,
              data: data
            });
          } else {
            res.send("Incorrect Username and/or Password!");
          }
          res.end();
        });
      } else {
        res.send("Please enter Username and Password!");
        res.end();
      }
    }
  }, {
    key: "private",
    value: function _private(req, res, next) {
      try {
        var token = req.params.token;
        var result = jwt.verify(token, "mk");
        res.send(result);
        if (result) {
          next();
        }
      } catch (error) {
        return res.redirect("/");
      }

      // Nếu xác thực thành công, tiếp tục sang middleware hoặc handler tiếp theo
    }

    // Handler trả về dữ liệu sau khi xác thực thành công
  }, {
    key: "welcome",
    value: function welcome(req, res, next) {
      res.json({
        message: "Welcome"
      });
    }
  }]);
}();
module.exports = new SinInController();