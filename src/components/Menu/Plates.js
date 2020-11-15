import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(theme => ({
    fab: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));

const Plates = ({plates, deletePlate, editPlate}) => {
    console.log('start-plates',plates);
    const classes = useStyles();

      const platesList = plates.length > 0 ? (
        plates.map(plate => {
          console.log('ppplate',plate);
          //var img = URL.createObjectURL(plate.img);
            return (
                <div className="collection-item" key={plate.id}>
                    <div className="input-field right ">
                    <Fab size="small" color="primary" aria-label="delete" className={classes.fab}>
                     <DeleteIcon onClick={() => {deletePlate(plate.id)}}/>
                        </Fab>
                     </div>     
                     <div className="input-field right ">
                     <Fab size="small" color="primary" aria-label="edit" className={classes.fab}>
                     <EditIcon onClick={(e) => {editPlate(e, plate.id)}}/>
                        </Fab>                 
                     </div>     
            <img className="left" src={plate.img} style={{width: '90px', height: '90px' ,marginRight: '10px'}} />{/*changed*/}
                     <h4>Plate: {plate.name}</h4>
                     <h6>Description: {plate.description}</h6>
                     <h6>{plate.price}$ </h6>
                </div>
            )
        })
    ): (
        <p className="center"> There are no plates!</p>
    )
    console.log('q',platesList);

    return(
        <div className="plates collection">
            {platesList}
        </div>
    )
}

export default Plates 