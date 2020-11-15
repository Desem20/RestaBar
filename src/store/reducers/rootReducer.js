import authReducer from './authReducer'
import orderReducer from './orderReducer'
import restaurantReducer from './restaurantReducer'
import { combineReducers } from 'redux'
import { firebaseReducer,isLoaded } from 'react-redux-firebase'

console.log('isLoaded',firebaseReducer)
const rootReducer = combineReducers({
  auth: authReducer,
  order: orderReducer,
  firebase: firebaseReducer,
  restaurant: restaurantReducer,
});

export default rootReducer;