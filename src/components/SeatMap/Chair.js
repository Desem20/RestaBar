import React, { Component } from 'react'
import {fabric} from 'fabric';
import { connect } from 'react-redux'

const chairFill = 'rgba(67, 42, 4, 0.7)'
const chairStroke = '#32230b'
const chairShadow = 'rgba(0, 0, 0, 0.4) 3px 3px 7px'
class Chair  extends Component {

  AddChairToCanvas = () => {
    const o =this.addChair(0, 0)
    this.props.canvas.setActiveObject(o)
  }

  addChair=(left, top, width, height) =>{
    const o = new fabric.Rect({
        left: left,
        top: top,
        width: 30,
        height: 30,
        fill: chairFill,
        stroke: chairStroke,
        strokeWidth: 2,
        shadow: chairShadow,
        originX: 'left',
        originY: 'top',
        centeredRotation: true,
        snapAngle: 45,
        selectable: true,
        Type:'chair',
        id: this.props.generateId()
    })
    
    console.log(this.props.canvas);

    this.props.canvas.add(o)
    return o
}
  render() {
    return (
      <button className="btn btn-primary chair"onClick={this.AddChairToCanvas}>+ Chair</button>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    
  }
}


export default connect(mapStateToProps ,mapDispatchToProps)(Chair)