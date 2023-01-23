const initState = {
    open: true, 
    menu: false, 
    loading: false,
    logo: '',
    headerImage: false,
    headerBg: false,
    pin: false,
    summaryIsOpen: false,
    showStyle: true,
    showRoom: true,
    isStylePageExist: false,
    rooms: [],
}

const generalStates = (state = initState, action) => {
    switch(action.type) {
        case 'TOGGLE_SIDEBAR': 
            return state = {...state, open: action.open}
        case 'TOGGLE_MENU': 
            return state = {...state, menu: action.menuState}
        case 'TOGGLE_LOADING': 
            return state = {...state, loading: action.loading}
        case 'TOGGLE_PIN': 
            return state = {...state, pin: action.pin}
        case 'TOGGLE_ACTIVE_MOD': 
            return state = {...state, activeMod: action.activeMod}
        case 'SET_SETTINGS': 
            return state = {...state, logo: action.logo, headerImage: action.headerImage, headerBg: action.headerBg}
        case 'TOGGLE_SUMMARY': 
            return state = {...state, summaryIsOpen: action.summaryIsOpen}
        case 'TOGGLE_SHOWSTYLE': 
            return state = {...state, showStyle: action.showStyle}
        case 'TOGGLE_SHOWROOM': 
            return state = {...state, showRoom: action.showRoom}
        case 'TOGGLE_STYLEROOM_STATE': 
            return state = {...state, isStylePageExist: action.isStylePageExist}
        case 'SET_ROOMS': 
            return state = {...state, rooms: action.rooms}
        case 'SET_INIT_STATE': 
            return state = {...action.generalStates}
        case 'RESET_STATE': 
            return state = initState;
        default: 
            return state;
    }
}

export default generalStates;
