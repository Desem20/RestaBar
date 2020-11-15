const initState = {
  /*orders:[
    {Amount: 1, price:37, plate:"Fish and Chips"},
    {Amount: 2, price:22, plate:"Steak and Chips"},
    {Amount: 3, price:22, plate:"Fresh Water"}
  ]*/
}

const orderReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_ORDER':
      //console.log('create order', action.payload);
      //console.log(state);
      return {...state, orders:action.payload }
    case 'CLEAR_ORDER':
      return initState
    default:
      return state;
  }
  
};

export default orderReducer;