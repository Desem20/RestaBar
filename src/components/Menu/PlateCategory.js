import React from 'react';

const PlateCategory = (props) => {
    const { handleChange,val } = props;
    return (
        <div className="input-field">
            <i className="material-icons prefix">category</i>
            <textarea id="category"  value= {val} className="materialize-textarea validate " onChange={handleChange} //required
            ></textarea >
            <label htmlFor="category">Plate Category</label>
        </div>
    )
}

export default PlateCategory;