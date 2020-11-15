import React from 'react';

const BusinessDescription = (props) => {
    const { handleChange,val } = props;
    return (
        <div className="input-field " length="10">
            <i className="material-icons prefix">message</i>
            <textarea cols="20" wrap="hard" id="description" className="materialize-textarea validate " 
            placeholder="Business Description"value={val} onChange={handleChange} ></textarea >
           
        </div>
    )
}

export default BusinessDescription