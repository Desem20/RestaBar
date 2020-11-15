import React, { Component } from 'react'
import AboutImage from '../../About.png'

class About extends Component {
render(){
  return(
    <div className="About">
      <img src={AboutImage} alt="who are we" style={{width:'800px', height:'600px', marginLeft: 250 }} />
    </div>
  );
}
}
export default About;