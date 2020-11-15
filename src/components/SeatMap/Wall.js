import React, { Component } from 'react'
import {fabric} from 'fabric';
import { connect } from 'react-redux'
const wallFill = 'rgba(136, 136, 136, 0.7)'
const wallStroke = '#686868'
const wallShadow = 'rgba(0, 0, 0, 0.4) 5px 5px 20px'

class Wall extends Component {

  AddWallToCanvas = () => {
    const o = this.addWall(0, 0, 60, 180)
    this.props.canvas.setActiveObject(o)
  }

  addWall = (left, top, width, height) =>{
    const o = new fabric.Rect({
        left: left,
        top: top,
        width: width,
        height: height,
        fill: wallFill,
        stroke: wallStroke,
        strokeWidth: 2,
        shadow: wallShadow,
        originX: 'left',
        originY: 'top',
        centeredRotation: true,
        snapAngle: 45,
        selectable: true,
        id: this.props.generateId()
    })
    this.props.canvas.add(o)
    return o
}
  render() {
    return (
      <button className="btn btn-default wall" onClick={this.AddWallToCanvas}>+ Wall</button>
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

export default connect(mapStateToProps ,mapDispatchToProps)(Wall)