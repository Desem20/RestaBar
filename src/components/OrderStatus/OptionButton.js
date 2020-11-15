import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import OptionIcon from '@material-ui/icons/DehazeSharp';

const useStyles = makeStyles(theme => ({
    fab: {
      margin: theme.spacing(0),
    },
    extendedIcon: {
      marginRight: theme.spacing(0),
    },
  }));


const OptionButton = () => {
    const classes = useStyles();
    return (
        <div className="input-field left ">
            <Fab size="small" color="primary" aria-label="option" className={classes.fab}>
          <OptionIcon />
         </Fab>
        </div>
    )
}


export default OptionButton;