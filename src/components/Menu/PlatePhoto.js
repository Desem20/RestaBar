import React, { Component } from 'react'
import { connect } from 'react-redux'
import { uploadPlatePhoto } from '../../store/actions/restaurantActions'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Fab from '@material-ui/core/Fab';

class PlatePhoto extends Component {
  state ={
    selectedFile: null,
    percentage:"0",
    uploaded: null
  }
  fileSelectedHandler = (event)=>
  {
    this.setState({selectedFile: event.target.files[0].name});
    if(this.props.edit===true)
    {
      this.props.changeImg(event);
    }
    else{
    this.props.changeNameImg(event.target.files[0]);
    }
    event.target.value=null;
    this.setState({uploaded:null});
  }


  fileUploaderHandler = () =>{
    this.setState({selectedFile:null});
    this.setState({uploaded:"Uploaded"});

  }
  
  render() {
    const { Percentage } = this.props;
    const labelDisplay = this.state.uploaded !== null ? this.state.uploaded : this.state.selectedFile;
    console.log('labelll',  this.state.selectedFile);
    const fieldDisplay  = this.state.selectedFile === null ? "" :
    <div className="center"><progress value={Percentage} max="100" id="uploaderPic" >0%</progress></div>

    return (
        <div className="center row">          
            {fieldDisplay}
            <input type="file" id="uploadPicButton" className=" lighten-2 col" filename="uploadPic" 
            onChange={this.fileSelectedHandler} required />
            {labelDisplay}
            <Fab size="small" color="primary" aria-label="upload" className="left">
              <CloudUploadIcon  onClick={this.fileUploaderHandler}/>
            </Fab>
        </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    Percentage:state.restaurant.percentage
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    uploadPlatePhoto:(file) => dispatch(uploadPlatePhoto(file))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(PlatePhoto);
