const roomType = (state = {}, action) => {

  switch(action.type) {
    case 'CHANGE_ROOM_TYPE':
      // const modGroup = state[`${action.roomName}`]?.modifications[`${action.modName}`]?.modGroupTitle ? state[`${action.roomName}`]?.modifications[`${action.modName}`]?.modGroupTitle : null;
      // const newModGroup = action.payload.modGroupTitle &&  action.payload.modGroupTitle;
      // const options = modGroup === newModGroup && state[`${action.roomName}`].modifications[`${action.modName}`]?.option; 

      return state = {...state, [`${action.roomName}`] : {
          image: action.image, 
          modifications:  {...state[`${action.roomName}`]?.modifications, [`${action.modName}`]: {...action.payload
            // , option: options  decomment in case modifications groups
          }} 
        }   
      }

    // case 'SET_NESESSARY_STYLE':
    //   return state ={...state, [`${action.room}`]: {...state[`${action.room}`], modifications:  {...state[`${action.room}`].modifications, [`${action.modName}`]: {... state[`${action.room}`].modifications[`${action.modName}`],  nesessaryStyle: action.payload} }} }

    case 'CHANGE_ROOM_TYPE_OPTION': 
      return state = {...state,  [`${action.room}`]: {...state[`${action.room}`], modifications:  {...state[`${action.room}`].modifications, [`${action.modName}`]: {... state[`${action.room}`].modifications[`${action.modName}`],  option : action.payload} }} }

    case 'CHANGE_ROOM_FORMAT_INDIVIDUAL':
      const modifications = action.modName;

      return state ={...state, [`${action.room}`]: {...state[`${action.room}`], modifications:  {...state[`${action.room}`].modifications, [`${action.modName}`]: {... state[`${action.room}`].modifications[`${action.modName}`],  individualFormat: action.payload} }} }

    case 'CHANGE_ROOM_IMAGE':
      return state ={...state, [`${action.room}`]: {...state[`${action.room}`], image: action.image}}

    case 'SET_INIT_STATE': 
      return state = {...action.roomType}

    case 'RESET_ROOMTYPE_STATE': 
      return state = {}

    case 'RESET_STATE': 
      return state = {}
    
    default: 
      return state;   

  }
}

export default roomType;
