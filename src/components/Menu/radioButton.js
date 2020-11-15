import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
//all the function was changed
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(0),
  },
  group: {
    margin: theme.spacing(0, 0),
  },
}));

export default function RadioButtonsGroup({handleCategory,category,error}) {
  console.log('categorycaty',category);
  const classes = useStyles();
  const [value, setValue] = React.useState({
    Starters: null,
    Mains: null,
    Desserts: null,
    Other: null
  });

  function handleChange(event) {
    setValue(event.target.value);
    if(event.target.checked){
    handleCategory(event);
    console.log('c',  event.target.value);
    }
  }

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
      <RadioGroup row
          className={classes.group}
          value={`${category}`}
          onChange={handleChange}
        >
          <FormControlLabel value="Starters" control={<Radio />} label="Starters" />
          <FormControlLabel value="Mains" control={<Radio />} label="Mains" />
          <FormControlLabel value="Desserts" control={<Radio />} label="Desserts" />
          <FormControlLabel value="Other" control={<Radio />} label="Other" />

        </RadioGroup>
      </FormControl>
      <span className='error red'>{error}</span>
    </div>
  );
}