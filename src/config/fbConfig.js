//import firebase from 'firebase/app'
//import 'firebase/firestore'
//import 'firebase/auth'
var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');
require('firebase/functions');
require('firebase/storage');


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB_WYCY2h3kRkwyCaW4PwuXfAvmVz0y5WM',
  authDomain: 'restabar-dc6df.firebaseapp.com',
  databaseURL: 'https://restabar-dc6df.firebaseio.com',
  projectId: 'restabar-dc6df',
  storageBucket: 'restabar-dc6df.appspot.com',
  messagingSenderId: '903851098197'
}
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 /* var functions = firebase.functions();
  const UploadOrder = functions.httpsCallable('UploadOrder');
  //const SeatIsEmpty = functions.httpsCallable('SeatIsEmpty');
  var json= {orders:{
    '-LnbUUCij9QpMLR-oJbb':{
      'QFiasRUugcYwbSFUGSt3WzkKB0X3':{
          '8-11-2019':{
            '11:17:00 PM':{
                3:{
                '-Lm1K3unCZ8K1K9NZtWD':{
                    plates:{
                      0:{
                        amount:1,
                        plate: "fish",
                        price: "100"
                      },
                      1:{
                        amount:2,
                        plate: "burger",
                        price: "50"
                      },             
                    },
                    additionalinfo:{
                      takeAway: true,
                      name:"Avik",
                      comments:"k"
                    }
                }
              }
            }
          }
        }
      }
    }
  }
  UploadOrder(json).then(result=>{
    console.log(result);
  }).catch(err=>{
    console.log('err',err);
  })
  
  var rateJson={'-LlLgsL8is7JdsAx-fe5':{
    rating:5
  }}
  console.log('rateJson',rateJson)
  const Rate = functions.httpsCallable('Rate');
  Rate(rateJson).then(result=>{
    console.log(result);
  }).catch(err=>{
    console.log('err',err);
  });

  console.log(functions)
  SeatIsEmpty({time:"1300"}).then(result=>{
    console.log(result);
  }).catch(err=>{
    console.log('err',err);
  });

 
  var jsonSeat = 
  {
    '-LlLgsL8is7JdsAx-fe5':{
      '8-13-2019':{
        4:{
          '09:46:00':'QFiasRUugcYwbSFUGSt3WzkKB0X2'
        }
      }
    }
  }            
  
  SeatIsEmpty(jsonSeat).then(result=>{
    console.log(result);
  }).catch(err=>{
    console.log('err',err);
  })
  /*SeatIsEmptyAndUploadOrder(json).then(result=>{
    console.log(result);
  }).catch(err=>{
    console.log('err',err);
  });*/
  //firebase.firestore().settings({ timestampsInSnapshots: true });
  export default firebase;