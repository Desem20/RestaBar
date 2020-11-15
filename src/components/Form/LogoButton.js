import React, { Component } from 'react'
import { connect } from 'react-redux'
import { uploadLogo } from '../../store/actions/restaurantActions'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';


class LogoButton extends Component {
  state ={
    selectedFile: null,
    percentage:"0"
  }
  fileSelectedHandler = (event)=>
  {
    this.setState({selectedFile: event.target.files[0]});
    //console.log(this.state.selectedFile)
  }
  fileUploaderHandler = () =>{
    this.props.uploadLogo(this.state);
    //console.log('m', this.state.selectedFile);
  }
  //all the function render was changed
  render() {
    const { Percentage } = this.props;
    const fieldDisplay  = this.state.selectedFile === null ? "" : 
    <div className="center"><progress value={Percentage} max="100" id="uploaderPic" >0%</progress></div>
    return (
        <div className="center row">
           {fieldDisplay}
            <input type="file" id="fileButton" className="lighten-2 col l10" filename="upload" 
            onChange={this.fileSelectedHandler} />
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
    uploadLogo:(file) => dispatch(uploadLogo(file))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(LogoButton);

  /*  
  var uploader =document.getElementById('uploader');
  var fileButton =document.getElementById('fileButton');

  fileButton.addEventListener('change', function(e){
    var file = e.target.files[0];

    var storageRef = firebase.storage().ref('rest');
    var task=storageRef.put(file);
    task.on('state_change', 
      function progress(snapshot){
        var percentage = (snapshot.bytesTransferred / 
        snapshot.totalBytes) * 100;
        uploader.value = percentage;
      },

      function error(err){

      },

      function complete(){

      },
    );

  });*/