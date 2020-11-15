import React, { Component } from 'react';
import {compose } from 'redux'
import {withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PlateName from './PlateName';
import Plates from './Plates';
import PlateDescription from './PlateDescription';
import PlatePrice from './PlatePrice';
import ButtonsMenu from './ButtonsMenu';
import BackButton from './BackButton';
import RadioButton from './radioButton'
import { createRestaurantMenu,currentRestaurantMenu,createImg, deleteImg } from '../../store/actions/restaurantActions'
import PlateCategory from './PlateCategory';
import Categories from './Categories'
import { functionDeclaration } from '@babel/types';
import { firebaseConnect } from 'react-redux-firebase'
import SeatMap from '../SeatMap/SeatMap'
import PlatePhoto from './PlatePhoto' //changed

var firebase = require('firebase/app');

const errorPlate = 'Plate Name must be at least 2 characters long!'
const errorDescription = 'Plate Description must be at least 2 characters long!'
const errorPrice = 'Price must be at least 1 numeric character long!'
const errorCategory = 'At least 1 Category must be chosen!'

class Menu extends Component {
   state= {
      other: '',
      edit:null,
      currentPlate: {id: null, name: '', description: '' , price: '', category:'', img:'' },
      currentPlateError: {name: '',description: '',price: '',category:''},
      Menu: this.props.menu ===undefined ? {} : this.props.menu ,
      currentImg: null
    }

    handleDoneButton = (e) =>{
      this.props.createRestaurantMenu(this.state);
      console.log(this.props);
      this.props.changeComponent('SeatMap')
    }
    componentWillMount(){
      console.log('componentWillMount()');
      this.props.currentRestaurantMenu();
    }
    componentDidUpdate(prevProps, prevState, snapshot)
    {
      console.log("componentDidUpdate()",this.state);
      console.log("componentDidUpdate()p",this.props.menu);
      if (this.props.menu !== prevProps.menu && this.props.menu) {
        this.setState({...this.state,Menu:this.props.menu})
      }
    }
   
    handleBackButton = () =>{
      this.props.changeComponent('Form')
    }

    handleChange = (e) => {
        var key = e.target.id
        var val = e.target.value
        console.log('tar',e.target.id);
        this.setState( prevState => ({
          ...prevState,
          currentPlate: {
            ...prevState.currentPlate,
            [key]:val  
          }
        }));
    }

    handleCategory = (e) => {
      e.preventDefault();
      var category = e.target.value ==='Other' ? '':e.target.value 
      this.setState({...this.state,currentPlate:{...this.state.currentPlate,category:category},
         other: e.target.value});
      console.log('target',  e.target.value);
      console.log('category2',  this.state.currentPlate);
    }

    handleChangeImg = (e) => {

      var val = e.target.files[0]
      var id = this.state.currentPlate.id;
      console.log('pictureeeeeee', this.state.currentPlate);
      console.log('this.state.currentPlate.img', this.state.currentPlate.img);
      this.setState({...this.state, currentPlate:{...this.state.currentPlate,img: val}})
      console.log('picccc', this.state.currentPlate);
        this.props.createImg(val,id).then((result)=>{
        this.setState({...this.state,currentPlate:{...this.state.currentPlate,img:this.props.currentImg},currentPlateError:{}})
        })
    }
      
    clearFields =() =>{
      this.setState({currentPlate: {id: null, name: '', description: '' , price: '' , category: '', img: ''}});
    }

    handleCancel = (e) => {
    e.preventDefault();
    this.setState({edit:null});
    this.clearFields();
    }

    fieldsFilled = ()=>{
      var currentError={};
      let fieldsfilled = true;
      if(this.state.currentPlate['name'].length < 2)
      {
        currentError = {...currentError,name:errorPlate}
        fieldsfilled = false;
      }
      if(this.state.currentPlate['description'].length < 2)
      {
        currentError = {...currentError,description:errorDescription}
        fieldsfilled = false;
      }
      if(this.state.currentPlate['price'].length < 1)
      {
        currentError = {...currentError,price:errorPrice}
        fieldsfilled = false;
      }
      if(this.state.currentPlate['category'].length < 1)
      {
        currentError = {...currentError,category:errorCategory}
        fieldsfilled = false;
      }

      //this.state.currentPlate['description']!=='' &&
      //this.state.currentPlate['price']!=='' &&
      //this.state.currentPlate['catrgory']!=='')
      console.log('currentError',currentError);

      this.setState({...this.state,currentPlateError:currentError })

      console.log('this.statecurrentError',this.state);

      return fieldsfilled;
    }

    handleAdd = (e) => {
      e.preventDefault();
      if(this.fieldsFilled())
      {
        var id = Math.random()
         this.props.createImg(this.state.currentPlate.img,id).then((result)=>{
          console.log('result-result-result',result);
          this.setState({...this.state,currentPlate:{...this.state.currentPlate,id,img:this.props.currentImg},currentPlateError:{}})
          this.addPlate(this.state.currentPlate); 
         })             
      }
    }


    handleSave = (e) => {
      e.preventDefault();
      var category = this.state.currentPlate.category;
      var id = this.state.currentPlate.id;
      /////////////////////this.props.createImg(this.state.currentPlate.img,id).then((result)=>{
      var value = this.state.currentPlate;
      delete value.category;
      //var plate = this.state.currentPlate; 
      //var value = {id:plate.id,name:plate.name,description: plate.description,price:plate.price}
      const plates = this.state.Menu[category].plates.map(plate => {
          return plate.id === id ? value : plate;
      });

      this.setState( prevState => ({
        ...prevState,
        edit:null,
        Menu:{
          ...prevState.Menu,
          [category]:{
            plates:plates
          }
        }
      }
      ));
      this.clearFields();
    }
       
    editPlate =(category)=>{
      var func =(e,id) => {
       e.preventDefault();
       const plateSelected = this.state.Menu[category].plates.filter(plate => {
       return plate.id === id
       });
       plateSelected[0].category = category;
       this.setState({edit:true,currentPlate: plateSelected[0]});
     } 
     return func;
   }

    deletePlate =(category)=>{
      var temp;
      var func = (id) => {

      const plates = this.state.Menu[category].plates.filter(plate => {
          return plate.id !== id
      });
      this.setState( prevState => ({
        ...prevState,
        Menu:{
          ...prevState.Menu,
          [category]:{
            plates:plates
          }
        }
      }
      ));
      this.props.deleteImg(id);
    }
    return func;
  }

  addPlate = (plate) => {
    //plate.id = Math.random()
    var category = plate.category;
    var value = plate;
    delete value.category;
    var existingPlates = this.state.Menu[category] === undefined ? 
    //[plate] : [...this.state.Menu[category].plates,plate]          
    [value] : [...this.state.Menu[category].plates,value]          
    this.setState({
        Menu:{ 
          ...this.state.Menu,        
          [category]:{
            plates:existingPlates
          }
        }
    })
    this.clearFields();
  }

  //changed
  updateImg = (e) =>{

    this.setState({...this.state, currentPlate:{...this.state.currentPlate,img: e}})
  }
  
  render()
  {      
    console.log('this.statethis.state',this.state);
    const showMenu = this.props.menu === undefined ? this.state.Menu : this.props.menu
    const fiedlDisplay = this.state.other === 'Other' ? 
    <PlateCategory val={this.state.currentPlate['category'] || ''} handleChange={this.handleChange.bind(this)}/>:""
      console.log('menu-state',this.state.currentPlate.category)
      console.log('this.state.Menu',this.state.Menu)
      return(            
          <section className="section container scrollspy " id="Menu">
            <div className="row">
            <h1 className= "center" style={{marginBottom: "30px"}}>Menu</h1>
                <div className="col s12 l8 offset-l2  grey lighten-4" style={{marginBottom: "50px"}}>
                  <form >
                    <h1>Menu</h1>
                    <Categories menu={this.state.Menu} deletePlate={this.deletePlate} editPlate={this.editPlate}/>        
                    <PlateName val={this.state.currentPlate['name'] || ''} handleChange={this.handleChange.bind(this)} error={this.state.currentPlateError.name}/>
                    <PlateDescription val={this.state.currentPlate['description'] || ''}handleChange={this.handleChange.bind(this)} error={this.state.currentPlateError.description}/>
                    <PlatePrice val={this.state.currentPlate['price'] || ''}handleChange={this.handleChange.bind(this)} error={this.state.currentPlateError.price}/>
                    <RadioButton category={this.state.currentPlate.category} handleCategory ={this.handleCategory.bind(this)} error={this.state.currentPlateError.category}/>
                    {fiedlDisplay}
                    <label style={{fontSize: '10px'}}>Picture:</label> {/*chang*/}
                    <PlatePhoto edit={this.state.edit} changeNameImg={this.updateImg.bind(this)} changeImg={this.handleChangeImg.bind(this)}/> {/*chang*/}
                    <ButtonsMenu edit={this.state.edit} handleAdd={this.handleAdd.bind(this)} handleDoneButton={this.handleDoneButton.bind(this)} 
                      handleSave={this.handleSave.bind(this)} handleCancel={this.handleCancel.bind(this)}/>
                    <BackButton handleBackButton={this.handleBackButton.bind(this)} />
                  </form>      
                </div>          
              </div> 
            </section>
            
      )
  }
}


const mapStateToProps = (state) => {
  console.log('mapStateToProps',state);
  return {
    menu: state.restaurant.menu,
    currentImg:state.restaurant.currentImg
  }
}

const mapDispatchToProps = (dispatch,ownProps ) => {
  console.log('ownProps',ownProps);
  return{
    createRestaurantMenu:(creds) => dispatch(createRestaurantMenu(creds)),
    currentRestaurantMenu:() => dispatch(currentRestaurantMenu()),
    createImg:(file,id) => dispatch(createImg(file,id)),
    deleteImg:(id) => dispatch(deleteImg(id)),
  }
}


export default compose(
  connect(mapStateToProps ,mapDispatchToProps),
  //firebaseConnect([
  //  'MenuBugsChecks' // sync /todos from firebase into redux
  //]),
  withRouter)(Menu)

  //                      <CheckBox handleCategory ={this.handleCategory.bind(this)}/>                     
       