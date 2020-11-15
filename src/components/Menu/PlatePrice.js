import React from 'react';

const PlatePrice = (props) => {
    const { handleChange,val,error } = props;
    return (
        <div className="input-field">
            <i className="material-icons prefix">attach_money</i>
            <input type="number"  value= {val} id="price" pattern="[0-9]{4}" onChange={handleChange}  //required
            />
            <label htmlFor="price">Price</label>    
            <span className='error red'>{error}</span>
     
        </div>
    )
}

export default PlatePrice;