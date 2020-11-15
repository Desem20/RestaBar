import React, { Component } from 'react'

class Finish  extends Component {

  state= this.props.restaurant === undefined ? {
    name:'',
    address:'',
    email:'',
    description:'',
    phone:'',
    website:'',
    startTime:'',
    endTime:''
  } :this.props.restaurant


  render() {
    console.log('s',this.state);
    console.log('h',this.props); 

    return (
      <div className="container ">
        <div className="row">
          <div className="col s12 l8 offset-l2  grey lighten-4">
            <h3> </h3>
            <label className="center" style={{marginTop:"100px", height: "60px" , fontSize: '40px'}}>Congratulations!!</label>
            <h4>You have finished to create you RestaBar.</h4>
            <h5>From now on, your customers can enjoy fast and efficient mobile direct order service.</h5>
            <h5 style={{marginBottom: "200px"}}>To handle existing orders, please press on "Order Status"</h5>
       
            <form>         
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default Finish
