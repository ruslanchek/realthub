webpackHotUpdate("static/development/pages/index.js",{

/***/ "./pages/index.tsx":
/*!*************************!*\
  !*** ./pages/index.tsx ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/taggedTemplateLiteral */ "./node_modules/.npmjs.eoadm.com/@babel/runtime-corejs2/7.4.5/node_modules/@babel/runtime-corejs2/helpers/esm/taggedTemplateLiteral.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/.npmjs.eoadm.com/@babel/runtime-corejs2/7.4.5/node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/asyncToGenerator */ "./node_modules/.npmjs.eoadm.com/@babel/runtime-corejs2/7.4.5/node_modules/@babel/runtime-corejs2/helpers/esm/asyncToGenerator.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/.npmjs.eoadm.com/react/16.8.6/node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _emotion_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @emotion/core */ "./node_modules/.npmjs.eoadm.com/@emotion/core/10.0.14_react@16.8.6/node_modules/@emotion/core/dist/core.browser.esm.js");



var _jsxFileName = "/Users/mikeburton/Projects/realthub/pages/index.tsx";


function _templateObject() {
  var data = Object(_babel_runtime_corejs2_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__["default"])(["\n\t\tbackground: red;\n\t"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

/** @jsx jsx */


var Page = function Page(_ref) {
  var userAgent = _ref.userAgent;
  return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_4__["jsx"])("main", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: this
  }, "Your user agent: ", Object(_emotion_core__WEBPACK_IMPORTED_MODULE_4__["jsx"])("span", {
    css: styles.test,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: this
  }, userAgent));
};

Page.getInitialProps =
/*#__PURE__*/
function () {
  var _ref3 = Object(_babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])(
  /*#__PURE__*/
  _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee(_ref2) {
    var req, userAgent;
    return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            req = _ref2.req;
            userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
            return _context.abrupt("return", {
              userAgent: userAgent
            });

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref3.apply(this, arguments);
  };
}();

/* harmony default export */ __webpack_exports__["default"] = (Page);
var styles = {
  test: Object(_emotion_core__WEBPACK_IMPORTED_MODULE_4__["css"])(_templateObject())
};

/***/ })

})
//# sourceMappingURL=index.js.dbd18400e89027a8a92d.hot-update.js.map