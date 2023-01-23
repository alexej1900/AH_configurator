const initState = { prices: {}, individual: {} };

const apartPriceReducer = (state = initState, action) => {

    switch(action.type) {
        case 'CHANGE_PRICE': 
            return state = {...state,  prices: {...state.prices, [action.payload.key]: action.payload.price}}
        case 'CHANGE_INDIVIDUAL':
            return state = {...state, individual: {...state.individual, [action.payload.key]: action.payload.price}}   
        case 'SET_INIT_STATE': 
            return state = {...action.apartPrice} 
        case 'RESET_STATE': 
            return state = initState;
        default: 
            return state;
    }
}

export default apartPriceReducer;