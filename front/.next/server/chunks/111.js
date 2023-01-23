"use strict";
exports.id = 111;
exports.ids = [111];
exports.modules = {

/***/ 3182:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gC": () => (/* binding */ headerSettings),
/* harmony export */   "pp": () => (/* binding */ mainSettings),
/* harmony export */   "wY": () => (/* binding */ introScreen),
/* harmony export */   "hX": () => (/* binding */ typePage),
/* harmony export */   "ZV": () => (/* binding */ RoomData),
/* harmony export */   "EX": () => (/* binding */ roomImages),
/* harmony export */   "OH": () => (/* binding */ saveData)
/* harmony export */ });
/* unused harmony exports bathImages, kitchenImages, livingRoomImages */
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9114);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_apollo_client__WEBPACK_IMPORTED_MODULE_0__);

const headerSettings = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
query MyQuery {
  entries {
    ... on rooms_default_Entry {
      id
      title
    }
  }
}`;
const mainSettings = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
query MyQuery {
  globalSets(handle: "settings") {
    ... on settings_GlobalSet {
      id
      name
      settings {
        ... on settings_BlockType {
          id
          brandLogo {
            url
          }
          headerBackgroundColor
          headerBackgroundPicture {
            url
          }
          welcomePageBg
          additionalBrandColor
          mainBrandColor
          colorSelected
          ctaSecondary
          fontForTitles
          fontForDescriptions
        }
      }
    }
  }
}
`;
const introScreen = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
query MyQuery {
  globalSets(handle: "welcomeScreen") {
    ... on welcomeScreen_GlobalSet {
      handle
      welcomeScreen {
        ... on welcomeScreen_BlockType {
          bigApartmentPrice
          bigRoomTitle
          paragraph
          bigRoomImage {
            width
            url
            height
          }
          introText
          smallApartmentPrice
          smallRoomTitle
          smallRoomImage {
            height
            width
            url
          }
          apartmentType {
            ... on apartmentType_apartmentType_BlockType {
              id
              apartmentPrice
              apartmentTitle
              apartmentImage {
                url
                width
                height
              }
              apartmentRooms {
                ... on apartmentRooms_BlockType {
                  id
                  roomType
                }
              }
            }
          }
        }
      }
    }
  }
}
`;
const typePage = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
query TypePage {
  entry(slug: "type") {
    ... on pages_default_Entry {
      styles {
        ... on styles_BlockType {
          styleTitle
          id
          description
          image {
            url
            height
            width
          }
        }
      }
    }
  }
}`;
const RoomData = (slug)=>{
    return _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
  query RoomData {
    entry(slug: "${slug}") {
      ... on rooms_default_Entry {
        title
        roomStyles {
          ... on roomStyles_BlockType {
            id
            roomStyleExamples {
              ... on roomStyleExamples_styleBlock_BlockType {
                id
                styleName
                styleDefaultImage {
                  url
                }
              }
            }
          }
        }
        mods {
          ... on mods_BlockType {
            modificationsTypes {
              ... on modificationsTypes_modificationExample_BlockType {
                modificationName
                modificationItemExample {
                  ... on modificationItemExample_BlockType {
                    id
                    modificationTitle
                    modificationStyle
                    modificationImage {
                      url
                      width
                      height
                    }
                    recommendedModification
                    modsAdditionalPrice
                  }
                }
                modificationPin {
                  ... on modificationPin_BlockType {
                    id
                    positionX
                    positionY
                  }
                }
                modificationVisibility
                individualSolution {
                  ... on individualSolution_BlockType {
                    id
                    individualSolutionPrice
                    enableIndividualSolution
                  }
                }
                optionsList {
                  optionsPrice
                  optionsSubtitle
                  optionsTitle
                }
              }
              ... on modificationsTypes_modificationGroup_BlockType {
                id
                modificationVisibility
                individualSolution {
                  ... on individualSolution_BlockType {
                    id
                    enableIndividualSolution
                    individualSolutionPrice
                  }
                }
                modificationGroupBlock {
                  ... on modificationGroupBlock_BlockType {
                    id
                    modGroupName
                    modificationExamples {
                      ... on modificationExamples_modificationExamplesBlock_BlockType {
                        id
                        modificationImage {
                          height
                          url
                          width
                        }
                        modificationStyle
                        modificationTitle
                        recommendedModification
                      }
                    }
                    optionsList {
                      optionsPrice
                      optionsSubtitle
                      optionsTitle
                    }
                    modsAdditionalPrice
                  }
                }
                modificationName
                modificationPin {
                  ... on modificationPin_BlockType {
                    id
                    positionX
                    positionY
                  }
                }
              }
            }
          }
        }
      }
    }
  } `;
};
const roomImages = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
query MyQuery {
  assets {
    ... on uploads_Asset {
      url
      title
    }
  }
}`;
const bathImages = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
query MyQuery {
  assets {
    ... on bathImages_Asset {
      id
      url
      title
    }
  }
}`;
const kitchenImages = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
query MyQuery {
  assets {
    ... on kitchenImages_Asset {
      url
      title
    }
  }
}`;
const livingRoomImages = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
query MyQuery {
  assets {
    ... on livingRoomImages_Asset {
      url
      title
    }
  }
}`;
const saveData = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
mutation save_users_default_Entry($resultName: String, $userEmail: String, $userPhone: String, $userData: String, $authorId: ID) {
  save_users_default_Entry(
      title: $resultName, 
      userEmail: $userEmail, 
      userPhone: $userPhone, 
      userData: $userData,
      authorId: $authorId,
    ) {
    userEmail
    userPhone
    userData
    title
  }
}`;


/***/ }),

/***/ 1131:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bT": () => (/* binding */ changeMenuState),
/* harmony export */   "m3": () => (/* binding */ changeSidebarState),
/* harmony export */   "TQ": () => (/* binding */ changeActivePin),
/* harmony export */   "f7": () => (/* binding */ changeActiveMod),
/* harmony export */   "Xi": () => (/* binding */ changeStyleVisibility),
/* harmony export */   "s6": () => (/* binding */ changeRoomVisibility),
/* harmony export */   "bw": () => (/* binding */ setBrandSettings),
/* harmony export */   "N3": () => (/* binding */ setSummaryVisibility),
/* harmony export */   "kK": () => (/* binding */ changeIsStyleRoomState),
/* harmony export */   "Ff": () => (/* binding */ changeApartSize),
/* harmony export */   "_I": () => (/* binding */ changeApartStyle),
/* harmony export */   "c6": () => (/* binding */ changeApartPrice),
/* harmony export */   "ny": () => (/* binding */ changeApartIndividualPrice),
/* harmony export */   "YF": () => (/* binding */ changeRoomType),
/* harmony export */   "$e": () => (/* binding */ changeRoomTypeOption),
/* harmony export */   "x$": () => (/* binding */ changeRoomFormatIndividual),
/* harmony export */   "Vm": () => (/* binding */ changeRoomImage),
/* harmony export */   "KY": () => (/* binding */ setInitialState),
/* harmony export */   "oA": () => (/* binding */ resetState)
/* harmony export */ });
/* unused harmony exports addApartmentType, setModification */
// GENERAL ---------------------------------------------
const changeMenuState = (action)=>(dispatch)=>{
        dispatch({
            type: 'TOGGLE_MENU',
            menuState: action
        });
    }
;
const changeSidebarState = (action)=>(dispatch)=>{
        dispatch({
            type: 'TOGGLE_SIDEBAR',
            open: action
        });
    }
;
const changeActivePin = (action)=>(dispatch)=>{
        dispatch({
            type: 'TOGGLE_PIN',
            pin: action
        });
    }
;
const changeActiveMod = (activeMod)=>{
    return {
        type: 'TOGGLE_ACTIVE_MOD',
        activeMod: activeMod
    };
};
const changeStyleVisibility = (showStyle)=>{
    return {
        type: 'TOGGLE_SHOWSTYLE',
        showStyle: showStyle
    };
};
const changeRoomVisibility = (showRoom)=>{
    return {
        type: 'TOGGLE_SHOWROOM',
        showRoom: showRoom
    };
};
const setBrandSettings = (logo, headerImage, headerBg)=>{
    return {
        type: 'SET_SETTINGS',
        logo,
        headerImage,
        headerBg
    };
};
const setSummaryVisibility = (summaryIsOpen)=>{
    return {
        type: 'TOGGLE_SUMMARY',
        summaryIsOpen
    };
};
const changeIsStyleRoomState = (isStylePageExist)=>{
    return {
        type: 'TOGGLE_STYLEROOM_STATE',
        isStylePageExist
    };
};
// APARTMENTTYPE ---------------------------------------------
const addApartmentType = (apartmenType, rooms)=>{
    return {
        type: 'ADD_APARTMENT',
        apartmenType,
        rooms
    };
};
// APARTSIZE ---------------------------------------------
const changeApartSize = (size, price, image)=>(dispatch)=>{
        dispatch({
            type: 'CHANGE_SIZE',
            payload: size,
            dataPrice: price,
            image: image
        });
    }
;
// APARTSTYLE ---------------------------------------------
const changeApartStyle = (apartStyleIndex, styleImage, styleTitle)=>(dispatch)=>{
        dispatch({
            type: 'CHANGE_STYLE',
            payload: apartStyleIndex,
            image: styleImage,
            title: styleTitle
        });
    }
;
const setModification = (action)=>(dispatch)=>{
        dispatch({
            type: 'SET_MODIFICATION',
            payload: action
        });
    }
;
const changeApartPrice = (key, price)=>{
    return {
        type: 'CHANGE_PRICE',
        payload: {
            key,
            price
        }
    };
};
const changeApartIndividualPrice = (key, price)=>{
    return {
        type: 'CHANGE_INDIVIDUAL',
        payload: {
            key,
            price
        }
    };
};
// ROOMS TYPES & OPTIONS --------------------------------
const changeRoomType = (room, modName, index, featuredImage, styleTitle, subtitle, modGroupTitle, largeImage)=>(dispatch)=>{
        dispatch({
            type: 'CHANGE_ROOM_TYPE',
            roomName: room,
            image: largeImage,
            modName: modName,
            payload: {
                index,
                featuredImage,
                styleTitle,
                subtitle,
                modGroupTitle
            }
        });
    }
;
const changeRoomTypeOption = (room, modName, index, title, subtitle, price)=>(dispatch)=>{
        dispatch({
            type: 'CHANGE_ROOM_TYPE_OPTION',
            room: room,
            modName: modName,
            payload: {
                index,
                title,
                subtitle,
                price
            }
        });
    }
;
const changeRoomFormatIndividual = (room, modName, individual)=>{
    return {
        type: 'CHANGE_ROOM_FORMAT_INDIVIDUAL',
        room: room,
        modName: modName,
        payload: individual
    };
};
const changeRoomImage = (room, image)=>{
    return {
        type: 'CHANGE_ROOM_IMAGE',
        room: room,
        image: image
    };
};
const setInitialState = (state)=>(dispatch)=>{
        console.log('setInitialState', state);
        const generalStates = state.generalStates;
        const apartPrice = state.apartPrice;
        const apartSize = state.apartSize;
        const apartStyle = state.apartStyle;
        const roomType = state.roomType;
        dispatch({
            type: 'SET_INIT_STATE',
            generalStates: generalStates,
            apartPrice: apartPrice,
            apartSize: apartSize,
            apartStyle: apartStyle,
            roomType: roomType
        });
    }
;
// FOR ALL REDUCERS ------------------------------
const resetState = ()=>{
    return {
        type: 'RESET_STATE'
    };
};


/***/ })

};
;