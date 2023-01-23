"use strict";
(() => {
var exports = {};
exports.id = 897;
exports.ids = [897];
exports.modules = {

/***/ 6022:
/***/ ((module) => {

module.exports = require("react-redux");

/***/ }),

/***/ 4061:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getPrices)
/* harmony export */ });
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_0__);

function getPrices() {
    const optionPrices = (0,react_redux__WEBPACK_IMPORTED_MODULE_0__.useSelector)((state)=>state.apartPrice.prices
    );
    const individualPrices = (0,react_redux__WEBPACK_IMPORTED_MODULE_0__.useSelector)((state)=>state.apartPrice.individual
    );
    const OptionsPrice = Object.values(optionPrices).reduce((oldPrice, newPrice)=>oldPrice + newPrice
    , 0);
    const IndividualPrice = Object.values(individualPrices).reduce((oldPrice, newPrice)=>oldPrice + newPrice
    , 0);
    return {
        OptionsPrice,
        IndividualPrice
    };
};


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(4061));
module.exports = __webpack_exports__;

})();