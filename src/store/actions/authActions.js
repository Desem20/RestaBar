export const signIn = (credentials) => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    
    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then(() => {
      dispatch({ type: 'LOGIN_SUCCESS' });
    }).catch((err) => {
      dispatch({ type: 'LOGIN_ERROR', err });
    });
  }
}

export const signOut = () => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();

    firebase.auth().signOut().then(() => {
      dispatch({ type: 'SIGNOUT_SUCCESS' })
      dispatch({type:'CLEAR_RESTAURANT'})
      dispatch({type:'CLEAR_ORDER'})
      
    });
  }
}

export const signUp = (newUser) => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    const res_id = firebase.database().ref('restaurants').push().key;
    console.log(res_id)
    firebase.auth().createUserWithEmailAndPassword(
      newUser.email,
      newUser.password
    ).then((resp) => {
      return firebase.set(`BusinessUsers/${resp.user.uid}`,
      {FirstName:newUser.FirstName,LastName:newUser.LastName,
        initials: newUser.FirstName[0] + newUser.LastName[0],
        res_id:res_id
      })    
    })
    .then(() => {dispatch({ type: 'SIGNUP_SUCCESS' })
    }).catch(err => { dispatch({type: 'SIGNUP_ERROR', err })
    })
  }
}