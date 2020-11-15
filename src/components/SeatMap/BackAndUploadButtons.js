import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import BackIcon from '@material-ui/icons/ArrowBackSharp';
import UploadIcon from '@material-ui/icons/CloudUploadSharp';

const useStyles = makeStyles(theme => ({
    fab: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));


const BackButton = ({handleBackButton, handleUploadStorage}) => {
    const classes = useStyles();
    return (
        <div className="input-field center ">
            <Fab size="small" color="primary" aria-label="back" className={classes.fab}>
          <BackIcon onClick = {handleBackButton}/>
         </Fab>
         <Fab size="small" color="primary" aria-label="upload" className={classes.fab}>
          <UploadIcon onClick = {handleUploadStorage}/>
         </Fab>
        </div>
    )
}


export default BackButton;