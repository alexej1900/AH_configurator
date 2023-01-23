"use strict";
(() => {
var exports = {};
exports.id = 921;
exports.ids = [921];
exports.modules = {

/***/ 9114:
/***/ ((module) => {

module.exports = require("@apollo/client");

/***/ }),

/***/ 3167:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getSettings)
/* harmony export */ });
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9114);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_apollo_client__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _gql_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(601);


async function getSettings() {
    var ref;
    const settings = await ((ref = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_0__.useQuery)(_gql_index__WEBPACK_IMPORTED_MODULE_1__/* .mainSettings */ .pp).data) === null || ref === void 0 ? void 0 : ref.globalSets[0].settings[0]);
    return settings;
};


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [601], () => (__webpack_exec__(3167)));
module.exports = __webpack_exports__;

})();