import React, { Component } from 'react'
import {fabric} from 'fabric';
import { connect } from 'react-redux'

import {tableFill,tableStroke,tableShadow}from './tableConstants'

class Rectangle  extends Component {
  AddRectangleToCanvas = () => {
    const o = this.addRect(0, 0, 60, 60)
    this.props.canvas.setActiveObject(o)
  }
  addRect =(left, top, width, height) =>{
    var number = this.props.number;

    const id = this.props.generateId()
    const o = new fabric.Rect({
        width: width,
        height: height,
        fill: tableFill,
        stroke: tableStroke,
        strokeWidth: 2,
        shadow: tableShadow,
        originX: 'center',
        originY: 'center',
        centeredRotation: true,
        snapAngle: 45,
        selectable: true
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
    this.props.canvas.add(g)
    this.props.addNumber();
    return g
}
  render() {
    return (
      <button className="btn btn-primary rectangle" onClick={this.AddRectangleToCanvas}>+ &#9647; Table</button>
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


export default connect(mapStateToProps ,mapDispatchToProps)(Rectangle)