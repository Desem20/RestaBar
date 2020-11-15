import React, { Component } from 'react'
import Form from '../Form/Form';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Menu from '../Menu/Menu'
import SeatMap from '../SeatMap/SeatMap'

class RestaurantManger extends Component {
  state={
    Form:true,//showing Form page
    Menu:false,//showing Menu page
    SeatMap:false,//showing SeatMap page
  }
  changeComponent=(nameComponent) =>{
    var newState =this.state;
    newState.Form = 'Form' === nameComponent ? true: false
    newState.Menu = 'Menu' === nameComponent ? true: false
    newState.SeatMap = 'SeatMap' === nameComponent ? true: false
    this.setState({newState});
  }

  render() {
    const { auth,history } = this.props;
    if(!auth.uid) return <Redirect to='/SignIn' />  
    var showComponent;
    if(this.state.Form) {showComponent = <Form changeComponent={this.changeComponent.bind(this)}/>}
    else if(this.state.Menu){showComponent = <Menu changeComponent={this.changeComponent.bind(this)}/>}
    else if(this.state.SeatMap){showComponent = <SeatMap changeComponent={this.changeComponent.bind(this)}/>}
    console.log("showComponent",showComponent);
    console.log("f",<Form changeComponent={this.changeComponent.bind(this)}/>);
    return (
      <div>
      {showComponent}
      </div>
     //<Form changeComponent={this.changeComponent.bind(this)}/>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth:state.firebase.auth
  }
}
export default connect(mapStateToProps)(RestaurantManger);