"use strict";
exports.id = 107;
exports.ids = [107];
exports.modules = {

/***/ 4107:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ setVariables)
/* harmony export */ });
function setVariables(settings) {
    const variables = document.querySelector(':root');
    variables.style.setProperty('--color__primary', `${settings === null || settings === void 0 ? void 0 : settings.mainBrandColor}`);
    variables.style.setProperty('--color__primary_10', `${settings === null || settings === void 0 ? void 0 : settings.mainBrandColor}19`);
    variables.style.setProperty('--color__primary_30', `${settings === null || settings === void 0 ? void 0 : settings.mainBrandColor}4C`);
    variables.style.setProperty('--color__secondary', `${settings === null || settings === void 0 ? void 0 : settings.additionalBrandColor}`);
    variables.style.setProperty('--color__secondary_10', `${settings === null || settings === void 0 ? void 0 : settings.additionalBrandColor}19`);
    variables.style.setProperty('--color__secondary_20', `${settings === null || settings === void 0 ? void 0 : settings.additionalBrandColor}33`);
    variables.style.setProperty('--color__cta', `${settings === null || settings === void 0 ? void 0 : settings.colorSelected}`);
    variables.style.setProperty('--color__cta_10', `${settings === null || settings === void 0 ? void 0 : settings.colorSelected}19`);
    variables.style.setProperty('--color__cta_30', `${settings === null || settings === void 0 ? void 0 : settings.colorSelected}4C`);
    variables.style.setProperty('--color__cta_secondary', `${settings === null || settings === void 0 ? void 0 : settings.ctaSecondary}`);
    variables.style.setProperty('--header__bg_color', `${settings === null || settings === void 0 ? void 0 : settings.headerBackgroundColor}`);
    variables.style.setProperty('--header__bg_image', `'${settings === null || settings === void 0 ? void 0 : settings.headerBackgroundPicture}'`);
    variables.style.setProperty('--title__typo', `'${settings === null || settings === void 0 ? void 0 : settings.fontForTitles}'`);
    variables.style.setProperty('--description__typo', `'${settings === null || settings === void 0 ? void 0 : settings.fontForDescriptions}'`);
};


/***/ })

};
;