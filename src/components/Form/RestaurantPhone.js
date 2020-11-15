import React from 'react';

const RestaurantPhone = (props) => {
    const { handleChange,val } = props;

    return (
         <div className="input-field">
            <i className="material-icons prefix">phone</i>
            <input type="tel" id="phone" className="validate" pattern="[0-9]{10}" 
            placeholder="phone" value={val} onChange={handleChange}  />
        </div>
    )
}

export default RestaurantPhone;