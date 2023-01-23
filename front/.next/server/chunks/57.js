exports.id = 57;
exports.ids = [57];
exports.modules = {

/***/ 7105:
/***/ ((module) => {

// Exports
module.exports = {
	"card": "card_card__1OxAK",
	"styleCard": "card_styleCard__2vTwY",
	"card__title": "card_card__title__2XreZ",
	"active": "card_active__3fMdA",
	"card__wrapper": "card_card__wrapper__31HwC",
	"img__wrapper": "card_img__wrapper__2Qzul",
	"rec": "card_rec__25NQF",
	"card__edit": "card_card__edit__17eDu",
	"card__image": "card_card__image__YQ7lR",
	"row": "card_row__oomRM",
	"card__description": "card_card__description__3YPqS",
	"small": "card_small__39Pw4",
	"image__wrapper": "card_image__wrapper__2JXpA",
	"text__wrapper": "card_text__wrapper__11B2O",
	"collapsed": "card_collapsed__1K--t",
	"final": "card_final__1uJb4"
};


/***/ }),

/***/ 982:
/***/ ((module) => {

// Exports
module.exports = {
	"radio": "optionsList_radio__29692",
	"option__input": "optionsList_option__input__3zqtY",
	"active": "optionsList_active__fHz7v",
	"option__size": "optionsList_option__size__3fAge",
	"option__description": "optionsList_option__description__IiI-y",
	"option__price": "optionsList_option__price__aBpkV",
	"final": "optionsList_final__1-3nh",
	"optionWrapper": "optionsList_optionWrapper__1qZF5",
	"collapsed": "optionsList_collapsed__2oaSw",
	"optionHeader": "optionsList_optionHeader__1EGDw",
	"optionTitle": "optionsList_optionTitle__1ozj3",
	"optionsList": "optionsList_optionsList__2JMev",
	"arrow": "optionsList_arrow__10e3m",
	"rotate": "optionsList_rotate__3L5bc",
	"toggle": "optionsList_toggle__1NAS0"
};


/***/ }),

/***/ 9112:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Card)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5675);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _redux_actions_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1131);
/* harmony import */ var _card_module_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7105);
/* harmony import */ var _card_module_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_card_module_scss__WEBPACK_IMPORTED_MODULE_4__);





function Card({ title , url , type , image , recommended , subtitle , selectCard , active , checked , collapsed , final ,  }) {
    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useDispatch)();
    const cardClickHandler = ()=>{
        selectCard();
        checked && checked();
    };
    const styleCardClickHandler = ()=>{
        dispatch((0,_redux_actions_index__WEBPACK_IMPORTED_MODULE_3__/* .changeStyleVisibility */ .Xi)(false));
        selectCard();
        checked && checked();
    };
    const CardType = ()=>{
        if (type === 'small') {
            return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: `${(_card_module_scss__WEBPACK_IMPORTED_MODULE_4___default().card)} ${(_card_module_scss__WEBPACK_IMPORTED_MODULE_4___default().small)} ${active && (_card_module_scss__WEBPACK_IMPORTED_MODULE_4___default().active)} ${collapsed && (_card_module_scss__WEBPACK_IMPORTED_MODULE_4___default().collapsed)} ${recommended ? (_card_module_scss__WEBPACK_IMPORTED_MODULE_4___default().recommended) : ''} ${final && (_card_module_scss__WEBPACK_IMPORTED_MODULE_4___default().final)}`,
                onClick: cardClickHandler,
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: `row`,
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: `${(_card_module_scss__WEBPACK_IMPORTED_MODULE_4___default().image__wrapper)}`,
                            style: {
                                background: `${image.background}`
                            },
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_image__WEBPACK_IMPORTED_MODULE_1__["default"], {
                                    classes: (_card_module_scss__WEBPACK_IMPORTED_MODULE_4___default().card__image),
                                    src: image.url,
                                    width: image.width,
                                    height: image.height,
                                    layout: image.layout,
                                    background: image.background
                                }),
                                recommended && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                    className: (_card_module_scss__WEBPACK_IMPORTED_MODULE_4___default().rec),
                                    children: " Empfehlung "
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: `${(_card_module_scss__WEBPACK_IMPORTED_MODULE_4___default().text__wrapper)}`,
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h5", {
                                    className: (_card_module_scss__WEBPACK_IMPORTED_MODULE_4___default().card__title),
                                    children: title
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                    className: (_card_module_scss__WEBPACK_IMPORTED_MODULE_4___default().card__description),
                                    children: subtitle
                                })
                            ]
                        })
                    ]
                })
            }));
        } else {
            return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: `${(_card_module_scss__WEBPACK_IMPORTED_MODULE_4___default().card)} ${(_card_module_scss__WEBPACK_IMPORTED_MODULE_4___default().styleCard)} ${active && (_card_module_scss__WEBPACK_IMPORTED_MODULE_4___default().active)}`,
                onClick: styleCardClickHandler,
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: (_card_module_scss__WEBPACK_IMPORTED_MODULE_4___default().card__title),
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                            children: title
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: (_card_module_scss__WEBPACK_IMPORTED_MODULE_4___default().img__wrapper),
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_image__WEBPACK_IMPORTED_MODULE_1__["default"], {
                            src: url[0].url,
                            width: "312",
                            height: "180"
                        })
                    })
                ]
            }));
        }
    };
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(CardType, {
    }));
};


/***/ }),

/***/ 4294:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ OptionItem)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9839);
/* harmony import */ var _optionsList_module_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(982);
/* harmony import */ var _optionsList_module_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_optionsList_module_scss__WEBPACK_IMPORTED_MODULE_1__);



function OptionItem({ data , index , activeOption , modificationName , changeOption , final  }) {
    const { optionsTitle , optionsPrice , optionsSubtitle  } = data;
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: `${(_optionsList_module_scss__WEBPACK_IMPORTED_MODULE_1___default().radio)}  ${final && (_optionsList_module_scss__WEBPACK_IMPORTED_MODULE_1___default().final)}`,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "row",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: `col-2 ${(_optionsList_module_scss__WEBPACK_IMPORTED_MODULE_1___default().option__input)}`,
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                        type: "radio",
                        id: index,
                        name: modificationName,
                        onChange: ()=>changeOption(index, optionsTitle, optionsSubtitle, (0,_utils_utilities__WEBPACK_IMPORTED_MODULE_2__/* .formatNumber */ .u)(optionsPrice) !== 'NaN' ? optionsPrice : 0)
                        ,
                        checked: activeOption === index
                    })
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: `col-6 ${(_optionsList_module_scss__WEBPACK_IMPORTED_MODULE_1___default().option__description)}`,
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                            htmlFor: index,
                            className: (_optionsList_module_scss__WEBPACK_IMPORTED_MODULE_1___default().option__size),
                            children: optionsTitle
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h5", {
                            children: [
                                " ",
                                optionsSubtitle,
                                " "
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: `col-4 ${(_optionsList_module_scss__WEBPACK_IMPORTED_MODULE_1___default().option__price)}`,
                    children: optionsPrice && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        className: (_optionsList_module_scss__WEBPACK_IMPORTED_MODULE_1___default().price),
                        children: (0,_utils_utilities__WEBPACK_IMPORTED_MODULE_2__/* .formatNumber */ .u)(optionsPrice) !== 'NaN' ? `CHF + ${(0,_utils_utilities__WEBPACK_IMPORTED_MODULE_2__/* .formatNumber */ .u)(optionsPrice)}` : optionsPrice
                    })
                })
            ]
        })
    }));
};


/***/ }),

/***/ 1135:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ getPrices)
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


/***/ }),

/***/ 1573:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ checkObjIsEmpty)
/* harmony export */ });
function checkObjIsEmpty(obj) {
    for(let key in obj){
        return false;
    }
    return true;
};


/***/ }),

/***/ 9839:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "u": () => (/* binding */ formatNumber)
/* harmony export */ });
const formatNumber = (number)=>{
    return new Intl.NumberFormat('de-CH').format(number);
};


/***/ })

};
;