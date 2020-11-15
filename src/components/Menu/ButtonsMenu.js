import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import SvgIcon from '@material-ui/core/SvgIcon';//saveEdit
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles(theme => ({
    fab: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));

const ButtonsMenu = ({edit, handleAdd, handleDoneButton, handleSave, handleCancel}) => {
    const classes = useStyles();
    const buttonDisplay = edit === true?
    <div>
       <Fab size="small" color="primary" aria-label="cancel" className={classes.fab}>
      <CancelIcon onClick={handleCancel}/>
      </Fab>
      <Fab size="small" color="primary" aria-label="add" className={classes.fab}>
      <AddIcon onClick={handleSave}/> 
      </Fab>     
      </div>     
    :
    <Fab size="small" color="primary" aria-label="add" className={classes.fab}>
    <AddIcon onClick={handleAdd}/>
    </Fab>
    console.log('lala', buttonDisplay);
    return (
        <div className="input-field center ">
              {buttonDisplay}            
             <Fab size="small" color="primary" aria-label="save" className={classes.fab}>
             <SaveIcon  onClick={handleDoneButton}/>
             </Fab>
        </div>
    )
}

export default ButtonsMenu;