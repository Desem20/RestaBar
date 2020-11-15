import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import BackIcon from '@material-ui/icons/ArrowBackSharp';

const useStyles = makeStyles(theme => ({
    fab: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));


const BackButton = ({handleBackButton}) => {
    const classes = useStyles();
    return (
        <div className="input-field left ">
            <Fab size="small" color="primary" aria-label="back" className={classes.fab}>
          <BackIcon onClick = {handleBackButton}/>
         </Fab>
        </div>
    )
}


export default BackButton;