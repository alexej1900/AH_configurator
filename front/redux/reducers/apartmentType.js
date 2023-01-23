const initState = { apartmenType: '', rooms: []};

const apartmentStates = (state = initState, action) => {
switch(action.type) {
  case 'ADD_APARTMENT': 
      return state = {...state, apartmenType: action.apartmenType, rooms: [...action.rooms]}
  case 'RESET_STATE': 
      return state = initState;
  default: 
      return state;
}
}

export default apartmentStates;
