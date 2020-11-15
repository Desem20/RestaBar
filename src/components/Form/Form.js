import React, { Component } from 'react'
import { createRestaurant,currentRestaurant } from '../../store/actions/restaurantActions'
import { connect } from 'react-redux'
import {compose } from 'redux'
import RestaurantName from './RestaurantName'
import RestaurantAddress from './RestaurantAddress'
import RestaurantEmail from './RestaurantEmail'
import BusinessDescription from './BusinessDescription'
import SubmitButton from './SubmitButton'
import RestaurantPhone from './RestaurantPhone'
import RestaurantUrl from './RestaurantUrl';
import RestaurantOpenHours from './RestaurantOpenHours'
import LogoButton from './LogoButton'
import PhotosButton from './PhotosButton'
import { withRouter } from 'react-router-dom'

class Form  extends Component {

  state= this.props.restaurant === undefined ? {
    name:'',
    address:'',
    email:'',
    description:'',
    phone:'',
    website:'',
    startTime:'',
    endTime:'',
    images:[]
  } :this.props.restaurant

  componentWillMount(){
    this.props.currentRestaurant();
  }
  componentDidUpdate(prevProps, prevState, snapshot)
  {
    if (this.props.restaurant !== prevProps.restaurant && this.props.restaurant) {
      console.log('formprops',this.props)
      let Restaurant = this.props.restaurant;
      this.setState({name:Restaurant.name,
      address:Restaurant.address,
      email:Restaurant.email,
      description:Restaurant.description,
      phone:Restaurant.phone,
      website:Restaurant.website,
      startTime:Restaurant.startTime,
      endTime:Restaurant.endTime,
      images:Restaurant.images
      });
    }
  }

  handleChange = (e) => {
    this.setState({
        [e.target.id]: e.target.value
    })
  }
  handleImages = (images)=>{
    console.log('imagesUntilHere',images);
    this.setState({...this.state,images})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createRestaurant(this.state);
    console.log(this.props);
    console.log(this.props.firebase);
    this.props.changeComponent('Menu');
   }

  render() {
    console.log('s',this.state);
    console.log('h',this.props); 

    return (
      <div className="container ">
        <div className="row">
        <h1 className= "center" style={{marginBottom: "30px"}}>Create Your RestaBar</h1>
          <div className="col s12 l8 offset-l2  grey lighten-4">
            <h3></h3>
            <form style={{marginBottom: "20px"}}>
              <RestaurantName handleChange={this.handleChange.bind(this)} val={this.state.name} />
              <RestaurantAddress handleChange={this.handleChange.bind(this)} val={this.state.address}/>
              <RestaurantEmail handleChange={this.handleChange.bind(this)} val={this.state.email}/>
              <BusinessDescription handleChange={this.handleChange.bind(this)} val={this.state.description}/>
              <RestaurantPhone  handleChange={this.handleChange.bind(this)} val={this.state.phone}/>
              <RestaurantUrl handleChange={this.handleChange.bind(this)} val={this.state.website}/>
              <label style={{fontSize: '10px'}}>Restaurant Hours:</label>{/*chang*/}
              <RestaurantOpenHours handleChange={this.handleChange.bind(this)}
              startTime={this.state.startTime} endTime={this.state.endTime}/>        
               <label style={{fontSize: '10px'}}>Restaurant Logo:</label> {/*chang*/}
              <LogoButton />
              <label style={{fontSize: '10px'}}>Restaurant Photos:</label> {/*chang*/}
              <PhotosButton handleImages={this.handleImages.bind(this)}/>
              <SubmitButton handleSubmit={this.handleSubmit.bind(this)} />              
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    restaurant: state.restaurant.restaurant
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    createRestaurant:(creds) => dispatch(createRestaurant(creds)),
    currentRestaurant:() => dispatch(currentRestaurant()),
  }
}


export default compose(
  connect(mapStateToProps ,mapDispatchToProps),
  withRouter)(Form)