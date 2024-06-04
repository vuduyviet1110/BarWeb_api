"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _require = require("../../dbsetup"),
  connection = _require.connection,
  UpdatePassword = _require.UpdatePassword;
var ContentController = /*#__PURE__*/function () {
  function ContentController() {
    _classCallCheck(this, ContentController);
  }
  return _createClass(ContentController, [{
    key: "changePassword",
    value:
    // hiển thị bài viết
    function changePassword(req, res, next) {
      var _req$body = req.body,
        user_password = _req$body.user_password,
        user_id = _req$body.user_id;
      if (user_password && user_id) {
        connection.query("SELECT * FROM users WHERE user_id= ?", [user_id], function (error, matched_users) {
          if (error) {
            throw error;
          }
          if (matched_users.length > 0) {
            //Lấy user_id của người dùng đầu tiên phù hợp
            UpdatePassword(matched_users[0].user_id, user_password).then(function (result) {
              // newUser là  kết quả xử lý của hàm setUserData
              if (result) {
                res.json(matched_users);
              } else {
                res.send("Update Password faild!");
              }
            })["catch"](function (err) {
              console.error(err);
              res.send("Internal Server Error");
            });
          } else {
            res.send("Can not find matched users");
          }
        });
      } else {
        res.send("Please enter Username and Password!");
        res.end();
      }
      // Xử lý logic thay đổi mật khẩu ở đây
    }
  }]);
}();
module.exports = new ContentController();