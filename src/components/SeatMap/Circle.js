import React, { Component } from 'react'
import {fabric} from 'fabric';
import { connect } from 'react-redux'

import {tableFill,tableStroke,tableShadow}from './tableConstants'

class Circle  extends Component {

  AddCircleToCanvas = () => {
    const o = this.addCircle(0, 0, 30)
    this.props.canvas.setActiveObject(o)
  } 
  addCircle =(left, top, radius) => {
    var number = this.props.number;
    const id = this.props.generateId()
    const o = new fabric.Circle({
        radius: radius,
        fill: tableFill,
        stroke: tableStroke,
        strokeWidth: 2,
        shadow: tableShadow,
        originX: 'center',
        originY: 'center',
        centeredRotation: true
    })
    const t = new fabric.IText(number.toString(), {
        fontFamily: 'Calibri',
        fontSize: 14,
        fill: '#fff',
        textAlign: 'center',
        originX: 'center',
        originY: 'center'
    })
    const g = new fabric.Group([o, t], {
        left: left,
        top: top,
        centeredRotation: true,
        snapAngle: 45,
        selectable: true,
        id: id,
        Type:'table',
        number: number
    })
    this.props.canvas.add(g);
    this.props.addNumber();
    return g
}



  render() {
    return (
      <button className="btn btn-primary circle" onClick={this.AddCircleToCanvas}>+ &#9711; Table</button>
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


export default connect(mapStateToProps ,mapDispatchToProps)(Circle)