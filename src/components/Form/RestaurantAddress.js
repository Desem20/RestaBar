import React from 'react';

const RestaurantAddress = (props) => {
    const { handleChange,val } = props;

    return (
         <div className="input-field">
            <i className="material-icons prefix">map</i>
            <input type="text" id="address" className="validate" onChange={handleChange}
            placeholder="Address" value={val}/>
        </div>
    )
}

export default RestaurantAddress;