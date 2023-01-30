
const initState = {style: 0, image: '', title: '', kitchenStyle: 0, kitchenImage: '', kitchenTitle: ''};

const apartStyle = (state = initState, action) => {
    switch(action.type) {
        case 'CHANGE_STYLE': 
            return state = {...state, style: action.payload, image: action.image, title: action.title}
        case 'CHANGE_KITCHEN_STYLE': 
            return state = {...state, kitchenStyle: action.payload, kitchenImage: action.kitchenImage, kitchenTitle: action.kitchenTitle}   
        case 'SET_STYLE_IMAGE': 
            return state = {...state, image: action.payload}
        case 'SET_INIT_STATE': 
            return state = {...action.apartStyle}
        case 'RESET_STATE': 
            return state = initState;
        default: 
            return state;
    }
}

export default apartStyle;
