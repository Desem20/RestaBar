import React from 'react';

const RestaurantEmail = (props) => {
    const { handleChange,val } = props;
    return (
        <div className="input-field">
            <i className="material-icons prefix">email</i>
            <input type="email" id="email" className="validate" onChange={handleChange} 
            placeholder="Email"value={val}/>          
        </div>
    )
}

export default RestaurantEmail;