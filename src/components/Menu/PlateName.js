import React from 'react';

const PlateName = (props) => {
    const { handleChange,val,error } = props;
    console.log('perror',error);
    return (
        <div className="input-field">
            <i className="material-icons prefix">restaurant</i>
            <label htmlFor="name">Plate Name</label>
            <input type="text" id="name" onChange={handleChange} value= {val} 
            placeholder="" />     
            <span className='error red'>{error}</span>
        </div>
    )
}

export default PlateName;