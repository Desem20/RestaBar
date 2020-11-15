import React from 'react';

const RestaurantName = (props) => {
    const { handleChange,val } = props;
    console.log(val);
    return (
        <div className="input-field">
            <i className="material-icons prefix">restaurant</i>
            <input type="text" id="name" onChange={handleChange} className="validate"  
            placeholder="Business Name"value={val}/>     
        </div>
    )
}

export default RestaurantName;