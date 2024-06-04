"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var sendMail = require("../utils/sendMail");
var _require = require("../../dbsetup"),
  getUserByEmail = _require.getUserByEmail;
var ResetPasswordController = /*#__PURE__*/function () {
  function ResetPasswordController() {
    _classCallCheck(this, ResetPasswordController);
  }
  return _createClass(ResetPasswordController, [{
    key: "create",
    value: function create(req, res, next) {
      var user_gmail = req.body.user_gmail;
      getUserByEmail(user_gmail).then(function (matched_user) {
        if (matched_user) {
          sendMail({
            email: user_gmail,
            subject: "Review Your Password",
            html: "\n              <div style=\"color:red\">Note: You need to review your user name. We suggest that you need to change your password in order to save your account</div>\n              <ul>\n                <li>User Name: ".concat(matched_user.user_name, "</li>\n                <li>Password: ").concat(matched_user.user_password, "</li>\n              </ul>\n            ")
          });
          return res.send("We have sent information via your email. Please check your email to see your username and password.");
        } else {
          res.send("No email existed");
        }
      })["catch"](function (error) {
        console.error(error);
        return res.send("An error occurred");
      });
    }
  }]);
}();
module.exports = new ResetPasswordController();