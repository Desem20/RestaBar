import React, { Component } from 'react'
import {fabric} from 'fabric';
import { connect } from 'react-redux'
import {tableFill,tableStroke,tableShadow}from './tableConstants'

class Triangle  extends Component {

  AddTriangleToCanvas = () => {
    const o = this.addTriangle(0, 0, 30)
    this.props.canvas.setActiveObject(o)
}
addTriangle=(left, top, radius)=> {
  var number = this.props.number;
  const id = this.props.generateId()
  const o = new fabric.Triangle({
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
  this.props.canvas.add(g)
  this.props.addNumber();
  return g
}
  render() {
    return (
      <button className="btn btn-primary triangle" onClick={this.AddTriangleToCanvas}>+ &#9651; Table</button>
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


export default connect(mapStateToProps ,mapDispatchToProps)(Triangle)