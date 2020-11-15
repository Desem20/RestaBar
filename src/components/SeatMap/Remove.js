import React, { Component } from 'react'
import {fabric} from 'fabric';
import { connect } from 'react-redux'

class Remove  extends Component {

  RemoveFromCanvas = () => {
    console.log('lkj',this.props)
    const o = this.props.canvas.getActiveObject()
    if (o) {
      this.props.canvas.remove(o)
      this.props.canvas.discardActiveObject()
      this.props.canvas.renderAll()
    }
    this.props.removeTable(o.number);

  } 
  render() {
    return (
      <button className="btn btn-danger remove" onClick={this.RemoveFromCanvas}>Remove </button>
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


export default connect(mapStateToProps ,mapDispatchToProps)(Remove)