"use strict";
exports.id = 601;
exports.ids = [601];
exports.modules = {

/***/ 601:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gC": () => (/* binding */ headerSettings),
/* harmony export */   "pp": () => (/* binding */ mainSettings),
/* harmony export */   "wY": () => (/* binding */ introScreen),
/* harmony export */   "hX": () => (/* binding */ typePage),
/* harmony export */   "EX": () => (/* binding */ roomImages)
/* harmony export */ });
/* unused harmony exports RoomData, bathImages, kitchenImages, livingRoomImages, saveData */
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
    return gql`
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


/***/ })

};
;