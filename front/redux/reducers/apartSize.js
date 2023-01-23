const initState = {size: "large", price: 1200000, image: ''};

const apartSizeReducer = (state = initState, action) => {
    switch(action.type) {
        case 'CHANGE_SIZE': 
            return state = {size: action.payload, price: action.dataPrice, image: action.image}
        case 'SET_INIT_STATE': 
            return state = {...action.apartSize} 
        case 'RESET_STATE': 
            return state = initState;
        default: 
            return state;
    }
}

export default apartSizeReducer;