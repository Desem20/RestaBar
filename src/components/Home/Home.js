import React, { Component } from 'react'
import meetRestaBar from '../../meetRestaBar.png'
import restaurateurs from '../../restaurateurs.png'
import customers from '../../customers.png'

class Home extends Component {
render(){
  return(
    <div className="Home">
      <img src={meetRestaBar} alt="meet restabar" style={{width:'600px', height:'100px', marginLeft: 350 }} />
       <img src={restaurateurs} alt="restaurateurs" style={{width:'350px', height:'500px', marginTop: 15, marginLeft: 300}} />
       <img src={customers} alt="customers" style={{width:'350px', height:'500px', marginTop: 15, marginLeft: 100}} />
     </div>
  );
}
}
export default Home;