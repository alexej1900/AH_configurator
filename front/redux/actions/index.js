// GENERAL ---------------------------------------------

export const changeMenuState = (action) => dispatch => {
  dispatch({
    type: 'TOGGLE_MENU',
    menuState: action
  });
};

export const changeLoadingState = (loading) => {
  return {
    type: 'TOGGLE_LOADING',
    loading,
  };
};

export const changeSidebarState = (action) => dispatch => {

  dispatch({
    type: 'TOGGLE_SIDEBAR',
    open: action
  });
};

export const changeActivePin = (action) => dispatch => {

  dispatch({
    type: 'TOGGLE_PIN',
    pin: action
  });
};

export const changeActiveMod = (activeMod) => {

  return {
    type: 'TOGGLE_ACTIVE_MOD',
    activeMod: activeMod,
  };
};

export const changeStyleVisibility = (showStyle) => {

  return {
    type: 'TOGGLE_SHOWSTYLE',
    showStyle: showStyle,
  };
};

export const changeRoomVisibility = (showRoom) => {

  return {
    type: 'TOGGLE_SHOWROOM',
    showRoom: showRoom,
  };
};

export const setBrandSettings = (logo, headerImage, headerBg) => {

  return {
    type: 'SET_SETTINGS',
    logo,
    headerImage,
    headerBg
  };
};

export const setSummaryVisibility = (summaryIsOpen) => {

  return {
    type: 'TOGGLE_SUMMARY',
    summaryIsOpen
  };
};

export const changeIsStyleRoomState = (isStylePageExist) => {
  
  return {
    type: 'TOGGLE_STYLEROOM_STATE',
    isStylePageExist
  };
};

export const setRooms = (rooms) => dispatch => {

  dispatch({
    type: 'SET_ROOMS',
    rooms,
  });
};

// APARTMENTTYPE ---------------------------------------------

export const addApartmentType = (apartmenType, rooms) => {
  
  return {
    type: 'ADD_APARTMENT',
    apartmenType,
    rooms
  };
};


// APARTSIZE ---------------------------------------------

export const changeApartSize = (price, image) => dispatch => {
  dispatch({
    type: 'CHANGE_SIZE',
    price,
    image
  });
};

export const changeApartData = (data, image, price) => dispatch => {

  console.log('dispatch', data)
  dispatch({
    type: 'CHANGE_APARTDATA',
    price,
    image,
    payload: data,
  });
};

// APARTSTYLE ---------------------------------------------

export const changeApartStyle = (apartStyleIndex, styleImage, styleTitle) => dispatch => {
  dispatch({
    type: 'CHANGE_STYLE',
    payload: apartStyleIndex,
    image: styleImage,
    title: styleTitle,
  });
};

export const changeKitchenStyle = (kitchenStyleIndex, styleImage, styleTitle) => dispatch => {
  dispatch({
    type: 'CHANGE_KITCHEN_STYLE',
    payload: kitchenStyleIndex,
    kitchenImage: styleImage,
    kitchenTitle: styleTitle,
  });
};

export const setStyleImage = (image) => dispatch => {
  dispatch({
    type: 'SET_STYLE_IMAGE',
    payload: image,
  });
};

export const setModification = (action) => dispatch => {
  dispatch({
    type: 'SET_MODIFICATION',
    payload: action
  });
};

export const changeApartPrice = (key, price) => {

  return {
    type: 'CHANGE_PRICE',
    payload: {key, price},
  };
};

export const changeApartIndividualPrice = (key, price) => {

  return {
    type: 'CHANGE_INDIVIDUAL',
    payload: {key, price},
  };
};

// ROOMS TYPES & OPTIONS --------------------------------

export const changeRoomType = (room, modName, index,  featuredImage, styleTitle, subtitle, description, additionalPrice, modGroupTitle, largeImage, mainStyle) => dispatch => {
  // console.log('dispatch', {room, modName, index,  featuredImage, styleTitle, subtitle, description, additionalPrice, modGroupTitle, largeImage, mainStyle})
  dispatch({
    type: 'CHANGE_ROOM_TYPE',
    roomName: room,
    image: largeImage,
    modName: modName,
    payload: {index,  featuredImage, styleTitle, subtitle, description, additionalPrice, modGroupTitle, mainStyle},
  });
};

export const changeRoomTypeOption = (room, modName, index, title, subtitle, price) => dispatch => {

  dispatch({
    type: 'CHANGE_ROOM_TYPE_OPTION',
    room: room,
    modName: modName,
    payload: {index, title, subtitle, price},
  });
};

export const changeRoomFormatIndividual = (room, modName, individual) => {

  return {
    type: 'CHANGE_ROOM_FORMAT_INDIVIDUAL',
    room: room,
    modName: modName,
    payload: individual
  }
}

// export const setNesessaryStyle = (room, modName, nesessaryStyle) => {

//   return {
//     type: 'SET_NESESSARY_STYLE',
//     room: room,
//     modName: modName,
//     payload: nesessaryStyle
//   }
// }

export const changeRoomImage = (room, image) => {

  return {
    type: 'CHANGE_ROOM_IMAGE',
    room: room,
    image: image
  }
}


export const setInitialState = (state) => dispatch => {
console.log('setInitialState', state)
  const generalStates = state.generalStates;
  const apartPrice = state.apartPrice;
  const apartSize  = state.apartSize;
  const apartStyle = state.apartStyle;
  const roomType = state.roomType;

  dispatch({
    type: 'SET_INIT_STATE',
    generalStates: generalStates,
    apartPrice: apartPrice,
    apartSize: apartSize,
    apartStyle: apartStyle,
    roomType: roomType,
  });
};

export const resetRoomTypeState = () => {

  return {
    type: 'RESET_ROOMTYPE_STATE'
  }
}

// FOR ALL REDUCERS ------------------------------

export const resetState = () => {

  return {
    type: 'RESET_STATE'
  }
}