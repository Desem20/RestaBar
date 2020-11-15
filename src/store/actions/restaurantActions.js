//import firebase from '../../config/fbConfig'
export const createRestaurant = (Restaurant) => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    console.log("fir",firebase);
    const user_uid = getState().firebase.auth.uid;

    //const res_id = getState().firebase.profile.res_id;
    //console.log(getState);
    //add the data to firebase
    firebase.database().ref(`BusinessUsers/${user_uid}/res_id`).once('value').then(snapshot=>{
      return firebase.update(`Restaurants/${snapshot.val()}`,{
        name:Restaurant.name,
        address:Restaurant.address,
        email:Restaurant.email,
        description:Restaurant.description,
        phone:Restaurant.phone,
        website:Restaurant.website,
        startTime:Restaurant.startTime,
        endTime:Restaurant.endTime,
        images:Restaurant.images
      }).then(dispatch({ type: 'CREATE_RESTAURANT', payload:Restaurant}))
    })
  }   
}
export const currentRestaurant = () => {
  return (dispatch, getState, {getFirebase}) => {
    const user_uid = getState().firebase.auth.uid;

    const firebase = getFirebase();
    //const res_id = getState().firebase.profile.res_id;
    firebase.database().ref(`BusinessUsers/${user_uid}/res_id`).once('value').then(snapshot=>{
      return firebase.ref(`Restaurants/${snapshot.val()}`).on('value',snapshot =>{
        console.log('snapshottRes',snapshot.val())
        if(snapshot.val())
          dispatch({ type: 'CREATE_RESTAURANT', payload:snapshot.val()})
      }); 
    }) 
  }   
}

export const createRestaurantMenu = (Restaurant) => {
  return (dispatch, getState, {getFirebase}) => {
  const firebase = getFirebase();
   const user_uid = getState().firebase.auth.uid;
   firebase.database().ref(`BusinessUsers/${user_uid}/res_id`).once('value').then(snapshot=>{
    var res_id = snapshot.val();
    //const path = `platePhoto/${snapshot.val()}/`
    firebase.set(`Menu/${res_id}`,{Categories:Restaurant.Menu});
    console.log(Restaurant.Menu);
   })
  }   
}
export const currentRestaurantMenu = () => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    const user_uid = getState().firebase.auth.uid;
    firebase.database().ref(`BusinessUsers/${user_uid}/res_id`).once('value').then(snapshot=>{
      var res_id = snapshot.val();
      firebase.ref(`Menu/${res_id}/Categories`).on('value',snapshot =>{
        var value = snapshot.val();
        console.log('snapshot',value)  
        if(snapshot.val())
          dispatch({ type: 'CREATE_MENU', payload:value})
        })
    })   
  } 
}

export const createImg = (file,id) => {
  return (dispatch, getState, {getFirebase}) => {
    console.log(file);
    console.log('id',id);
    const firebase = getFirebase();
    const res_id = getState().firebase.profile.res_id;
    const path = `restaurantsLogo/${res_id}/logo`;
    return firebase.storage().ref(`platePhoto/${res_id}/${id}`).put(file).then(snap=>{
      return firebase.storage().ref(`platePhoto/${res_id}/${id}`).getDownloadURL().then(url=>{
        dispatch({ type: 'UPLOAD_PLATE_IMG', payload:url})
        return url;
      })
    })
  }
}

export const deleteImg = (id) => {
  return (dispatch, getState, {getFirebase}) => {
    console.log('id',id);
    const firebase = getFirebase();
    const res_id = getState().firebase.profile.res_id;
    return firebase.storage().ref(`platePhoto/${res_id}/${id}`).delete();
  }
}

export const uploadPhotos = (files) => {
  return (dispatch, getState, {getFirebase}) => {
    console.log('filesfiles',files);
    console.log('fileslength',files.length);
    const firebase = getFirebase();
    const res_id = getState().firebase.profile.res_id;
    const path = `restaurantsPhotos/${res_id}/photos`;
    var photosArr = [];var countFiles =0;
    files.forEach(file=>{
      var idKey= Math.random();

      return firebase.storage().ref(`${path}/${idKey}`).put(file).on('state_changed', 
      function progress(snapshot){
        var percentage =((100/files.length) * countFiles)+ ((snapshot.bytesTransferred / snapshot.totalBytes) * 100 /files.length);
        dispatch({ type: 'PERCENTAGE_PHOTOS', payload:percentage})
      },()=>{},()=>{
        return firebase.storage().ref(`${path}/${idKey}`).getDownloadURL().then(url=>{
          photosArr.push({img:url,key:idKey})
          countFiles++;
          if(files.length ===countFiles)
          {
            dispatch({ type: 'UPLOAD_PHOTOS', payload:photosArr})
            return photosArr;
          }
        })
      })
    })
    
    /*   console.log('logoexample',file.selectedFile);
      firebase.storage().ref(path).put(file.selectedFile).on('state_changed', 
      function progress(snapshot){
        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        dispatch({ type: 'UPLOAD_PHOTOS', payload:percentage})
      },

      function error(err){
      },

      function complete(){
      },
      
    );*/
  
  }  
 
}

export const uploadLogo = (file) => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    const res_id = getState().firebase.profile.res_id;
    const path = `restaurantsLogo/${res_id}/logo`;
    console.log('logoexample',file.selectedFile);
    return firebase.storage().ref(path).put(file.selectedFile).on('state_changed', 
      function progress(snapshot){
        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        dispatch({ type: 'UPLOAD_LOGO', payload:percentage})
      },

      function error(err){
      },

      function complete(){
      },
    );
  }   
}

export const uploadPlatePhoto = (file) => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    const res_id = getState().firebase.profile.res_id;
    const plate_id = getState().firebase.profile.res_id.plate_id;
    const path = `platePhoto/${res_id}/${plate_id}/logo`;
    return firebase.storage().ref(path).put(file.selectedFile).on('state_changed', 
      function progress(snapshot){
        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        dispatch({ type: 'UPLOAD_PLATE_PHOTO', payload:percentage})
      },

      function error(err){
      },

      function complete(){
      },
    );
  }   
}
export const createSeatMap = (SeatMap) => {
  return (dispatch, getState, {getFirebase}) => {
    console.log('actionCan',SeatMap.canvas);
    console.log('SeatMap',SeatMap);
    const firebase = getFirebase();
    //const res_id = getState().firebase.profile.res_id;

    const user_uid = getState().firebase.auth.uid;
    firebase.database().ref(`BusinessUsers/${user_uid}/res_id`).once('value').then(snapshot=>{
      const res_id = snapshot.val()
      const path = `restaurantsSeatMap/${res_id}/SeatMap`;
      const canvasJson = SeatMap.canvas.toJSON();
      console.log('canvasJson',SeatMap.canvas.toJSON());
      console.log('loadFromJSON',SeatMap.canvas.loadFromJSON(canvasJson))   
      firebase.storage().ref(path).putString(SeatMap.canvas.toDataURL(), 'data_url').
      then(firebase.set(`SeatMap/${res_id}`,{...SeatMap,canvas:canvasJson})).
      then(dispatch({ type: 'CREATE_SEATMAP', payload:{...SeatMap,canvas:canvasJson}})); 
    })  
  }   
}
export const currentSeatMap = () => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    //const res_id = getState().firebase.profile.res_id;
    const user_uid = getState().firebase.auth.uid;
    firebase.database().ref(`BusinessUsers/${user_uid}/res_id`).once('value').then(snapshot=>{
      const res_id = snapshot.val()
      firebase.ref(`SeatMap/${res_id}`).on('value',snapshot =>{
        console.log('snapshot',snapshot.val())
        if(snapshot.val())
          dispatch({ type: 'CREATE_SEATMAP', payload:snapshot.val()})
        }) 
    })  
  }   
}

/*
originall!
export const createRestaurantMenu = (Restaurant) => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    const res_id = getState().firebase.profile.res_id;
    console.log("mmenu",firebase.database().ref(`MenuBugsChecks/${res_id}`).val);
    console.log("ref",firebase.ref(`MenuBugsChecks/${res_id}`));

    console.log('res_id',res_id);
    //add the data to firebase
    console.log('pplates',Restaurant.plates);
    return firebase.set(`MenuBugsChecks/${res_id}`,{
      Categories:Restaurant.Menu,
    }).then(dispatch({ type: 'CREATE_MENU', payload:Restaurant.Menu}))
  }   
}
 Object.keys(value).forEach(categoryEl=>{ 
          var plates =value[categoryEl].plates;
          Object.keys(plates).forEach(platesEl=>{
            var plate = plates[platesEl];

            console.log('klate',plate)
            console.log('menuimg',plate.img)
            console.log('path',`platePhoto/${res_id}/${plate.id}`)
            firebase.storage().ref(`platePhoto/${res_id}/${plate.id}`).then(url=>{
                console.log(url);
                value ={...value,img:url}
                console.log('aftervalue',value);
              })
            })




*/
