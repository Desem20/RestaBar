import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import NextIcon from '@material-ui/icons/ArrowForwardSharp';

const useStyles = makeStyles(theme => ({
    fab: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));


const SubmitButton = ({handleSubmit}) => {
    const classes = useStyles();
    return (
        <div className="input-field right ">
            <Fab size="small" color="primary" aria-label="next" className={classes.fab}>
          <NextIcon onClick= {handleSubmit}/>
         </Fab>
        </div>
    )
}


export default SubmitButton;