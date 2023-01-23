"use strict";
(() => {
var exports = {};
exports.id = 488;
exports.ids = [488];
exports.modules = {

/***/ 9114:
/***/ ((module) => {

module.exports = require("@apollo/client");

/***/ }),

/***/ 9535:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ checkIsStylePageExist)
/* harmony export */ });
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9114);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_apollo_client__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _gql_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(601);


async function checkIsStylePageExist() {
    var ref;
    const { data  } = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_0__.useQuery)(_gql_index__WEBPACK_IMPORTED_MODULE_1__/* .typePage */ .hX);
    const isStylePageExist = (data === null || data === void 0 ? void 0 : (ref = data.entry) === null || ref === void 0 ? void 0 : ref.styles.length) > 0;
    return isStylePageExist;
};


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [601], () => (__webpack_exec__(9535)));
module.exports = __webpack_exports__;

})();