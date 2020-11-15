const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello, ninjas!");
 });
 
 exports.DefaultRate = functions.database.ref('Restaurants/{res_id}')
 .onCreate((snapshot, context) => {
   // Grab the current value of what was written to the Realtime Database.
   return snapshot.ref.update({rating:3}).then(()=>{
    return {
      message:'succeed'
    }
  }).catch(err=>{
    return err
  })
 });
 
exports.Rate = functions.https.onCall((data, context) =>{
  var res_id =Object.keys(data)[0];
  var rating = data[res_id];
  var sum =0;var count =0;var avg = 0;
  var path = `Rating/${res_id}`;
  
  admin.database().ref(path).push(rating);
  return admin.database().ref(path).once('value').then(snapshot =>{
    var ratings = snapshot.val();
    Object.keys(ratings).forEach(ratingKeyEl=>{
      sum +=ratings[ratingKeyEl].rating;
      count++;
    })
    avg = Math.round(sum/count);
    return admin.database().ref(`Restaurants/${res_id}`).update({rating:avg}).then(()=>{
      return {
        message:'succeed'
      }
    }).catch(err=>{
      return err
    })
  })
})

exports.AddBuisnessUserType = functions.https.onCall((data, context) =>{
  return admin.auth().getUserByEmail(data.email).then(user => {
    return admin.auth().setCustomUserClaims(user.uid,{
      BuisnessUser: true
    });
  }).then(()=> {
    return {
      message: `Success! ${data.email} has been made a BuisnessUser`
    }
  }).catch(err => {
    return err;
  })
})

ExistElements = (dbTable,res_id,date,table)=>{
  if(dbTable)
  {
    var res_idExist = dbTable[res_id];
    if(res_idExist)
    {
      var existDate =(res_idExist[date]);
      if(existDate)
      {
        var existTable = (existDate[table]);
        if(existTable)
        {
          return true;
        }
      }
    }
  }
  
  return false;
}
exports.SeatIsEmpty = functions.https.onCall((data, context) =>{ 
    var empty = true; var res_id = Object.keys(data)[0];
    var date = Object.keys(data[res_id])[0];
    var table =Object.keys((data[res_id])[date])[0];
    var time = Object.keys(((data[res_id])[date])[table])[0];
    var user = ((((data[res_id])[date])[table])[time]);
    var hour = parseInt(time.slice(0, 2)); var minutes = parseInt(time.slice(3, 5));
    var dbhour; var dbminutes;

    return admin.database().ref(`SaveTable`).once('value').then(snapshot =>{
      var dbTable = snapshot.val();
      if(ExistElements(dbTable,res_id,date,table))
      {
        var Times = Object.keys(((dbTable[res_id])[date])[table]);
        for (let dbTimeEl of Times)
        {
          dbhour = parseInt(dbTimeEl.slice(0, 2));
          dbminutes = parseInt(dbTimeEl.slice(3, 5))
          if(Math.abs(hour - dbhour) < 2)
          {
            empty = !((hour < dbhour && minutes > dbminutes) || 
            (hour > dbhour && dbminutes > minutes) || (hour === dbhour))
          }
          if(!empty)
          {
            break;
          }
        }
      } 
  
      if(empty){
        return admin.database().ref(`SaveTable/${res_id}/${date}/${table}/${time}`).set(user).then(()=>{
          return {
            message:'succeed'
          }
        });
      }
      else{
        return {
          message:'failed'
        }
      }    
    })
})

reOrderDataAndCheckTable = (RequestData) =>{
  var readyOrders=[],additionalInfo={takeAway:false},orders_ids={},user_ids={};
  var customOrder ={plates:[],additionalInfo:{}};
  //var takeAway
  Object.keys(RequestData.orders).forEach(res_idEl=>{
    var user_id = RequestData.orders[res_idEl];
    Object.keys(user_id).forEach(user_uidEl=>{
      var date = user_id[user_uidEl];
      Object.keys(date).forEach(dateEl=>{
        additionalInfo['date'] = dateEl
        var time = date[dateEl]
        Object.keys(time).forEach(timeEl=>{
          additionalInfo['time'] = timeEl;
          var tableNumber= time[timeEl]
          Object.keys(tableNumber).forEach(tableNumberEl=>{
            //if tableNumberEl
            if(tableNumberEl ==='takeAway'){
              additionalInfo['tableNumber'] = 'takeAway';
              additionalInfo['takeAway'] = true;

            }
            else{
              additionalInfo['tableNumber'] = tableNumberEl;
            }
            
            var order_id = tableNumber[tableNumberEl];
            Object.keys(order_id).forEach(order_idEl=>{
              var orderDetails = order_id[order_idEl];
              Object.keys(orderDetails).forEach(orderDetailsEl=>{
                if(orderDetailsEl ==='plates')
                {
                  var plates = orderDetails[orderDetailsEl];
                  Object.keys(plates).forEach(platesEl=>{
                    customOrder.plates.push(plates[platesEl]);
                  })
                }
                else{
                  var existingInfo = orderDetails[orderDetailsEl];
                  customOrder.additionalInfo ={...existingInfo,...additionalInfo} 
                }
              })
              orders_ids[order_idEl]=customOrder;
              customOrder ={plates:[],additionalInfo:{}};
            })
          })
        })
      })
      user_ids[user_uidEl] = orders_ids
    })
    readyOrders[res_idEl] =user_ids;
  })
  return  readyOrders; 
}
exports.UploadOrder = functions.https.onCall((RequestData, context) =>{
    
  var readyOrders = reOrderDataAndCheckTable(RequestData);

  var res_id = Object.keys(RequestData.orders)[0];var user_id = Object.keys(RequestData.orders[res_id])[0];
  var date = Object.keys(RequestData.orders[res_id][user_id])[0];var time =  Object.keys(RequestData.orders[res_id][user_id][date])[0];
  var tableNumber = Object.keys(RequestData.orders[res_id][user_id][date][time])[0];
  var order_id =Object.keys(RequestData.orders[res_id][user_id][date][time][tableNumber])[0];
  //if context.uid === user_uid then... if not return invaliduser
  return admin.database().ref(`Orders/orders/${res_id}/${user_id}`).update({
    [order_id]:(readyOrders[res_id])[user_id][order_id]
  }).then(()=>{
      return {
        message:'succeed',
      }
  }).catch(()=>{
    return {
      message:'failed'
    }
  })
})

exports.DeleteTable = functions.https.onCall((data, context) =>{
    const uid = context.auth.uid;
    var res_id = Object.keys(data)[0];
    var date = Object.keys(data[res_id])[0];
    var table =Object.keys((data[res_id])[date])[0];
    var time = Object.keys(((data[res_id])[date])[table])[0];
    //var user = ((((data[res_id])[date])[table])[time]);
    var dbRef = admin.database().ref(`SaveTable/${res_id}/${date}/${table}/${time}`);
    return dbRef.once('value').then(snapshot =>{
      var savedTableUserId = snapshot.val();
      if(savedTableUserId ===uid)
      {
        return dbRef.remove().then(()=> {
          return {
            message:'succeed',
          }
        }).catch(()=>{
          return {
            message:'failed',
          }
        });
      }
      else{
        return {
          message:'failed'
        }
      }
    })
})

/*var customOrder ={orders:[],additionalInfo:{}};
    Object.keys(RequestData.orders).forEach(res_idEl=>{
      var res_id = RequestData[res_idEl];
      Object.keys(res_id).forEach(user_uidEl=>{
        var user_uid = res_id[user_uidEl];
        Object.keys(user_uid).forEach(dateEl=>{
          var date = user_uid[dateEl];
          Object.keys(date).forEach(order_idEl=>{
            var order_id = date[order_idEl];
            Object.keys(order_id).forEach(orderDetailsEl=>{
              var orderDetails = order_id[orderDetailsEl];     
              if(orderDetailsEl === order)
              {
                Object.keys(orderDetails).forEach(plateEl=>{
                  var plate = orderDetails[plateEl];
                  customOrder.orders.push(plate)
                });       
              }
            })
          })
        })
      })
    })*/

        /*Object.keys(data.saveTableAsafTest).forEach(res_idEl=>{
      var res_id = data.saveTableAsafTest[res_idEl];
      Object.keys(res_id).forEach(dateEl=>{
        var time = res_id[dateEl];
        Object.keys(time).forEach(timeEl=>{
          var table = time[timeEl];
          Object.keys(table).forEach(tableEl=>{

          });
        });
      });
    });
    var time = snapshot.val();
    console.log('time',time)
    console.log('data',data)
    if(data.time === time)
    {
      return  {resul:true,timedatabase:'',timeargument:data.time}
    }
    else {
      return {resul:false,timedatabase:'',timeargument:data.time};
    }
  },(errorObject)=> {console.log("The read failed: " + errorObject.code);});
  
  
  
  
  
  
   admin.database().ref(path).on('value',result=>{
            checkResult = result.val();
            if(!checkResult){
              admin.database().ref(`OrdersYanCheck1/${path}`).set({checkResult});
              //admin.database().ref(`OrdersYanCheck1`).set({checkResult});
            }
            else{
              admin.database().ref(`OrdersYanCheck1/`).set({caught:true});
            }
          })
          tables.push(table);
  
  
                if(hour < dbhour && minutes > dbminutes){
                empty = false; 
              }
              else if(hour > dbhour && dbminutes > minutes){
                empty = false;
              }
              else if(hour === dbhour){
                empty = false;
              }
    
    });
  
  */