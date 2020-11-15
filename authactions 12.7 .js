export const signIn = (credentials) => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then((resp)=> {
      resp.user.getIdTokenResult().then(idTokenResult => {
        console.log('rees' + resp);
        console.log('bu' + idTokenResult.claims.BusinessUser);
         if(idTokenResult.claims.BusinessUser)
         {
          dispatch({ type: 'LOGIN_SUCCESS' });
         }
         else
         {
          dispatch({ type: 'LOGIN_ERROR', err:'Not a BusinessUser' });
         }
      })
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
    });
  }
}

export const signUp = (newUser) => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
////////////
    const AddBusinessType = firebase.functions().httpsCallable('AddBuisnessUserType');
////////////
    firebase.auth().createUserWithEmailAndPassword(
      newUser.email,
      newUser.password
    ).then((resp) => {
      return firebase.set(`BusinessUsers/${resp.user.uid}`,
      {FirstName:newUser.FirstName,LastName:newUser.LastName,
        initials: newUser.FirstName[0] + newUser.LastName[0]
      })    
    }).then(() =>{
      AddBusinessType({ email: newUser.email }).then(result => {
        console.log( 'k' + result);
      });
    })
    .then(() => {dispatch({ type: 'SIGNUP_SUCCESS' })
    }).catch(err => { dispatch({type: 'SIGNUP_ERROR', err })
    });
  }
}

