import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createOrder } from '../../store/actions/orderActions'
import { Redirect } from 'react-router-dom'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FormOrderStatus from './FormOrderStatus';
import StatusOption from './StatusOption'
var firstTime = true;
class OrderStatus extends Component {
  state={
    orders: [{orderDescription:"",name:"",dateAndTime:"",tablenumber:null,order_id:""}]
  }
  componentWillMount(){
    this.props.createOrder();
  }
  componentDidMount(){
    if(this.props.orders ){
      this.destruct(this.props.orders);
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot){
    console.log('componentDidUpdateorder');
    if (this.props.orders !== prevProps.orders && this.props.orders) { //delete maybe prevProps.orders
      this.destruct(this.props.orders);
    }
  }

  destruct = (RestaurantOrder)=>{
    var newFormatOrders=[];
    var currentOrder={orderDescription:"",name:"",dateAndTime:"",tableNumber:"",order_id:"",
    comments:""};
    Object.keys(RestaurantOrder).forEach(userEl=>{
      var order_id = RestaurantOrder[userEl];
      Object.keys(order_id).forEach(order_idEl=>{
        var orderDetails = order_id[order_idEl]
        Object.keys(orderDetails).forEach(orderDetailsEl=>{
          if(orderDetailsEl ==='plates')
          {          
            var plates = orderDetails[orderDetailsEl];
            Object.keys(plates).forEach(platesEl=>{
              var plate = plates[platesEl]
              currentOrder.orderDescription+=`${plate.amount} ${plate.plate}`
              //console.log('orderDescription',currentOrder.orderDescription);
            })
          }
          else{
            var additionalInfo = orderDetails[orderDetailsEl]
            //console.log('additionalInfo',additionalInfo);
            currentOrder.name =additionalInfo.name; currentOrder.dateAndTime=additionalInfo.date+" "+additionalInfo.time ;
            currentOrder.tableNumber =additionalInfo.tableNumber;currentOrder.comments = additionalInfo.comments
            currentOrder.order_id =order_idEl;
            //console.log('currentOrder',currentOrder);
          }
        })  
        //console.log('currentOrderRR',currentOrder);
        newFormatOrders.push(currentOrder);
        currentOrder={orderDescription:"",name:"",dateAndTime:"",tableNumber:"",order_id:"",comments:""};
        //this.setState({orders:[...this.state.orders,currentOrder]})
        //currentOrder.orderDescription ="";
      })
    })
    //console.log('newFormatOrders',newFormatOrders);

    this.setState({...this.state,orders:newFormatOrders})
    //console.log(this.state);
  }
  render() { 
    const {orders ,auth } = this.props;
    console.log(this.state);
    console.log('this.props.orders',this.props.orders);
    if(!auth.uid) return <Redirect to='/SignIn' />
    return ( 
      <div>
         <section className="section container scrollspy " id="OrdersStatus">
                <div className="s1200 m5 l10">
                  <form >
                    <h1 className= "center">Orders Status</h1>
                    <FormOrderStatus orders={this.state.orders}></FormOrderStatus>
                  </form>
                </div>
           </section>
        
        
       
      </div>     
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth:state.firebase.auth,
    orders:state.order.orders
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    createOrder:() => dispatch(createOrder())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderStatus)

