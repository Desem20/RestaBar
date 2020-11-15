import React, { Component } from 'react'
//recives title, image and description
class Plate extends Component {
  render() {
    return (
     <div className="container">
        <div className="row">
          <div className="col s12 l6">
            <div className="card medium">
              <div class="card-image">
                <img src="img/curry.jpg" className="Rice"alt="" />
              </div>
              <div className="card-content">
                <span className="card-title">Curry</span>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean quis aliquam orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
              </div>                       
            </div>
          </div>
        </div>
      </div>
    )
    }
}

export default Plate;