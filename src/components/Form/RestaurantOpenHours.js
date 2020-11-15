import React from 'react';

const RestaurantOpenHours = (props) => {
    const { handleChange,startTime,endTime } = props;

    return (
         <div className="input-field">
            <i className="material-icons prefix">access_time</i>
            <input type="time" id="startTime" className="validate" onChange={handleChange} 
            placeholder="Start Time" value={startTime}/>
            <input type="time" id="endTime" className="validate" onChange={handleChange} 
            placeholder="End Time" value={endTime}/>

        </div>
    )
}

export default RestaurantOpenHours;