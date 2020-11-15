import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function CheckboxLabels({handleCategory}) {
  const [state, setState] = React.useState({
    Starters: null,
    Mains: null,
    Desrets: null,
    Other: null
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
    if(event.target.checked){
    handleCategory(event);
    console.log('category',  event.target.value);
    }
  }

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox 
          checked={state.checkedStarters} 
          onChange={handleChange('Starters')} 
          value="Starters" />
        }
        label="Starters"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={state.checkedMains}
            onChange={handleChange('Mains')}
            value="Mains"
          />
        }
        label="Mains"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={state.checkedDesrets}
            onChange={handleChange('Desrets')}
            value="Desrets"
          />
        }
        label="Deserts"
      /> 
      <FormControlLabel
        control={
          <Checkbox
            checked={state.checkedOther}
            onChange={handleChange('Other')}
            value="Other"
          />
        }
        label="Other"
      /> 
    </FormGroup>
  );
}