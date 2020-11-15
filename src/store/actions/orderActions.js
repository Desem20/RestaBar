/*export const createOrder = (order) => {
  return (dispatch, getState) => {
    // make async call to database
    dispPatch({ type: 'CREATE_ORDER', order });
  }
};*/
export const createOrder = () => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    const user_uid = getState().firebase.auth.uid;
    //const res_id = getState().firebase.profile.res_id;
    firebase.database().ref(`BusinessUsers/${user_uid}/res_id`).once('value').then(snapshot=>{
      console.log('createOrderres_id',snapshot.val());
      firebase.database().ref(`Orders/orders/${snapshot.val()}`).on('value',snapshot => {
        dispatch({type: 'CREATE_ORDER', payload: snapshot.val()});
      })
    })
    
  }
};