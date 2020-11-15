const initState = {

}

const restaurantReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_RESTAURANT':
      return {...state, restaurant:action.payload }
    case 'UPLOAD_LOGO':
      console.log(action);
      return {...state, percentage:action.payload }
      case 'UPLOAD_PHOTOS':
        console.log(action);
        return {...state, images:action.payload }
      case 'PERCENTAGE_PHOTOS':
        console.log(action);
        return {...state, imagesPercentage: action.payload }
      case 'CREATE_MENU':
        return { ...state, menu:action.payload }
      case 'UPLOAD_PLATE_IMG':
        console.log(action.payload)
        return { ...state, currentImg:action.payload }
      case 'CREATE_SEATMAP':
        return {...state, seatMap:action.payload }
      case 'CLEAR_RESTAURANT':
        return initState
    default:
      return state;
  }
  
};

export default restaurantReducer;