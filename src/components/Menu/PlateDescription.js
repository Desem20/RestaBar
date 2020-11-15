import React from 'react';

const PlateDescrption = (props) => {
    const { handleChange,val,error } = props;
    return (
        <div className="input-field">
            <i className="material-icons prefix">message</i>
            <textarea id="description"  value= {val} className="materialize-textarea " onChange={handleChange} //required
            ></textarea >
            <label htmlFor="description">Plate Description</label>
            <span className=' red error'>{error}</span>

        </div>
    )
}

export default PlateDescrption;