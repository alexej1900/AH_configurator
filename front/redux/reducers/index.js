import generalStatesReducer from './general';
import apartSizeReducer from './apartSize';
import apartStyleReducer from './apartStyle';
import apartPriceReducer from './apartPrice';
import roomTypeReducer from './roomType';
import apartmentStatesReducer from './apartmentType';

import {combineReducers} from 'redux';

const rootReducers = combineReducers({
    generalStates: generalStatesReducer,
    apartSize: apartSizeReducer,
    apartStyle: apartStyleReducer,
    apartPrice: apartPriceReducer,
    roomType: roomTypeReducer,
    apartmentStates: apartmentStatesReducer,
})

export default rootReducers;