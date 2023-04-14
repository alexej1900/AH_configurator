import { gql } from '@apollo/client';

export const mainSettings = gql`
query MyQuery {
  entries {
    ... on rooms_default_Entry {
      title
      slug
    }
  }
  globalSets(handle: "settings") {
    ... on settings_GlobalSet {
      name
      settings {
        ... on settings_BlockType {
          brandLogo {
            url
            height
            width
          }
          headerBackgroundColor
          headerBackgroundPicture {
            url
            height
            width
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
}`;


// export const apartmentList = gql`
// query MyQuery {
//   globalSets(handle: "apartmentList") {
//     ... on apartmentList_GlobalSet {
//       id
//       name
//       apartmentList {
//         ... on apartmentList_BlockType {
//           id
//           apartmentId
//           areaBath
//           areaBath2
//           areaCorridor
//           areaGeneral
//           areaKitchen
//           areaKitchenFurniture
//           basePrice
//           apartmentImage {
//             url
//             width
//             height
//           }
//         }
//       }
//     }
//   }
// }
// `;


export const apartmentItem = gql`
query MyQuery($id: [String], $var: [String]) {
  entry(title: $id) {
    ... on dataList_dataList_Entry {
      dataList {
        ... on dataList_BlockType {
          apartmentId
          basePrice
          generalArea
          floor
          apartmentImage {
            url
            width
            height
          }
          additionalLivingRoomPrice
          additionalClosetPrice
          additionRoomCloset
          additionCorridorCloset
          bath1FurniturePrice
          bath1Lavabo2Price
          bath1MirrorClosetPrice
          bath1PlatePrice
          bath1ShiftDoorPrice
          bedroomClosetPrice
          buildingsName
          dusheFurniture2Price
          dusheFurniture3Price
          dusheFurniture4Price
          dusheMirrorClosetPrice
          dushePlatePrice
          kitchen1Opt2Price
          kitchen1Opt3Price
          kitchen2Back2Price
          kitchen2Front2Price
          kitchen2Front3Price
          kitchen2Price
          livingRoomDoorPrice
          livingRoomOpt2Price
          livingRoomOpt3Price
          roomsCount
          additionalCloset
          additionalSleeproomCloset
          boden
          boden2
          boden3
          weissputz
          weissputz2
          front
          ruckwand
          arbeitsplatte
          arbeitsplatte2
          wasserhahn
          wasserhahn2
          wasserhahn3
          badewanne
          platten
          platten2
          spiegel
          einlavabo
          zweilavabo
          badezimmermobel
          badezimmermobel2
          badezimmermobel3
          schiebetur
          schiebetur2
          badeboden
          dusche
          duscheplatten
          duscheplatten2
          duschespiegel
          duscheeinlavabo
          duschezweilavabo
          duschemobel
          duschemobel2
          duschemobel3
          duscheschibetur
          duscheschibetur2
          duscheboden
          einbauschrank
          schlafzimmerschrank
          schlafzimmerschrank2
          gangschrank
          gangschrank2
          weiterzimmerschrank
          weiterzimmerschrank2
          flurschrank
          flurschrank2
        }
      }
    }
  }
  asset(title: $var) {
    ... on uploads_Asset {
      height
      width
      url
    }
  }
}
`;

export const apartmentVariatImage = gql`
query MyQuery($var: [String]) {
  asset(title: $var) {
    ... on uploads_Asset {
      height
      width
      url
    }
  }
}
`;


export const typePage = gql `
query TypePage {
  entry(slug: "type") {
    ... on pages_default_Entry {
      styles {
        ... on styles_BlockType {
          styleTitle
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

export const kitchenTypePage = gql `
query TypePage {
  entry(slug: "kitchen-type") {
    ... on pages_default_Entry {
      styles {
        ... on styles_BlockType {
          styleTitle
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

export const RoomData = (slug) => {
  return gql`
  query RoomData {
    entry(slug: "${slug}") {
      ... on rooms_default_Entry {
        title
        roomStyles {
          ... on roomStyles_BlockType {
            roomStyleExamples {
              ... on roomStyleExamples_styleBlock_BlockType {
                styleName
                styleDefaultImage {
                  url
                  height
                  width
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
                modificationIndex
                modificationDescription
                modificationMainStyle
                modificationItemExample {
                  ... on modificationItemExample_BlockType {
                    modificationTitle
                    modificationStyle
                    modificationDescr
                    modificationImage {
                      url
                      width
                      height
                    }
                    recommendedModification
                    modsAdditionalPrice
                    mainStyle
                    setDisabling {
                      disableIf
                      value
                    }
                  }
                }
                modificationPin {
                  ... on modificationPin_BlockType {
                    positionX
                    positionY
                  }
                }
                modificationVisibility
                individualSolution {
                  ... on individualSolution_BlockType {
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
                modificationVisibility
                individualSolution {
                  ... on individualSolution_BlockType {
                    enableIndividualSolution
                    individualSolutionPrice
                  }
                }
                modificationGroupBlock {
                  ... on modificationGroupBlock_BlockType {
                    modGroupName
                    modificationExamples {
                      ... on modificationExamples_modificationExamplesBlock_BlockType {
                        modificationImage {
                          height
                          url
                          width
                        }
                        modificationStyle
                        modificationTitle
                        modificationDescr
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
                modificationDescription
                modificationPin {
                  ... on modificationPin_BlockType {
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
  } `
};

export const roomImages = gql`
query MyQuery {
  assets {
    ... on uploads_Asset {
      url
      height
      width
      title
    }
  }
}`;

export const bathImages = gql`
query MyQuery {
  assets {
    ... on bathImages_Asset {
      url
      title
    }
  }
}`;

export const saveData = gql`
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
