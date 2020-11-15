import React from 'react';

const RestaurantUrl = (props) => {
    const { handleChange,val } = props;
    return (
        <div className="input-field">
            <i className="material-icons prefix">http</i>
            <input type="url" id="website" className="validate" value={val}
            placeholder="website url"onChange={handleChange} />          
        </div>
    )
}

export default RestaurantUrl;