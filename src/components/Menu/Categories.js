import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Plates from './Plates'

const useStyles = makeStyles(theme => ({
    fab: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));

const Categories = ({menu, deletePlate, editPlate}) => {
    //console.log('start-plates',plates);
    const classes = useStyles();
    var keys = Object.keys(menu);
    console.log('Beforekkkkeeeyyy',keys)

      const CategoriesList = keys.length > 0 ? (
        keys.map(key => {
          var categoryTitle = menu[key].plates.length > 0
          console.log('kkkkkk',menu[key])
            return (
              menu[key].plates.length > 0 ?
              <div className="collection-item" key={Math.random()}>
                <h3>{key}</h3>
                <Plates plates={menu[key].plates} deletePlate={deletePlate(key)} editPlate={editPlate(key)}/>        
              </div>
              :<div key={Math.random()}></div>        
            )
        })
    ): (
        <p className="center"> There are no categories!</p>
    )
    console.log('kkkkeeeyyy',keys)
    console.log('cl',CategoriesList)

    return(
        <div className="category collection">
            {CategoriesList}
        </div>
    )
}

export default Categories 