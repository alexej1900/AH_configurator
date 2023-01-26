const initState = {image: ''};

const apartSizeReducer = (state = initState, action) => {
    switch(action.type) {
        case 'CHANGE_SIZE': 
            return state = {price: action.price, image: action.image}
        case 'CHANGE_APARTDATA': 
            return state = {price: action.price, image: action.image, ...action.payload}
        case 'SET_INIT_STATE': 
            return state = {...action.apartSize} 
        case 'RESET_STATE': 
            return state = initState;
        default: 
            return state;
    }
}

export default apartSizeReducer;