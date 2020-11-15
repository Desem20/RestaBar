import React, { Component } from 'react'
import { connect } from 'react-redux'
import { uploadPhotos } from '../../store/actions/restaurantActions'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Fab from '@material-ui/core/Fab';


class PhotosButton extends Component {
  state ={
    files: [],
    selectedFile: null,
    percentage:"0"
  }
  fileSelectedHandler = (event)=>
  {
    this.setState({ files: [...this.state.files, ...event.target.files] },()=>{
      console.log("files",this.state.files)
    })
    //console.log(this.state.selectedFile)
  }

  componentDidUpdate(prevProps, prevState, snapshot)
  {
    if (this.props.images !== prevProps.images && this.props.images) {
      console.log('this.props.images', this.props.images);
      this.props.handleImages(this.props.images);
      };
  }

  fileUploaderHandler = () =>{
    console.log('this.statefiles', this.state);
    this.props.uploadPhotos(this.state.files);
    
  }
  //all the function render was changed
  render() {
    const { Percentage } = this.props;
    const fieldDisplay  = this.state.selectedFile === null ? "" : 
    <div className="center"><progress value={Percentage} max="100" id="uploaderPic" >0%</progress></div>
    return (
        <div className="center row">
           {fieldDisplay}
            <input type="file" multiple  id="images" className="lighten-2 col l10" filename="upload" 
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
    images:state.restaurant.images,
    Percentage:state.restaurant.imagesPercentage
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    uploadPhotos:(files) => dispatch(uploadPhotos(files))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(PhotosButton);