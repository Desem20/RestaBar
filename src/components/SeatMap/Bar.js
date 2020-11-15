import React, { Component } from 'react'
import {fabric} from 'fabric';
import { connect } from 'react-redux'

const barFill = 'rgba(0, 93, 127, 0.7)'
const barStroke = '#003e54'
const barShadow = 'rgba(0, 0, 0, 0.4) 3px 3px 7px'
const barText = 'Bar'

class Bar  extends Component {

  AddBarToCanvas = () => {
    const o = this.addBar(0, 0, 180, 60)
    this.props.canvas.setActiveObject(o)
  }
  addBar = (left, top, width, height) =>{
    const o = new fabric.Rect({
        width: width,
        height: height,
        fill: barFill,
        stroke: barStroke,
        strokeWidth: 2,
        shadow: barShadow,
        originX: 'center',
        originY: 'center',
        Type: 'bar',
        id: this.props.generateId()
    })
    const t = new fabric.IText(barText, {
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
    })
    this.props.canvas.add(g)
    return g
}

  render() {
    return (
      <button className="btn btn-primary bar" onClick={this.AddBarToCanvas}>+ Bar</button>
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


export default connect(mapStateToProps ,mapDispatchToProps)(Bar)