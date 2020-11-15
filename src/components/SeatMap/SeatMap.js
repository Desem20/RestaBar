import React, { Component } from 'react'
import {compose } from 'redux'
import {withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {fabric} from 'fabric';
import firebase from '../../config/fbConfig'
import Rectangle from './Rectangle'
import Circle from './Circle'
import Triangle from './Triangle'
import Bar from './Bar'
import Chair from './Chair'
import Remove from './Remove'
import Wall from './Wall'
import BackAndUploadButtons from './BackAndUploadButtons';
import {createSeatMap,currentSeatMap} from '../../store/actions/restaurantActions'
import Finish from '../../components/DoneProgress/Finish'

var canvas
const grid = 30
const backgroundColor = '#f8f8f8'
const lineStroke = '#ebebeb'
class SeatMap extends Component {
state ={
    width:this.props.seatMap ===undefined ? 302 : this.props.seatMap.width,
    height:this.props.seatMap ===undefined ? 812 : this.props.seatMap.height,
    canvas:'',
    number:0,
    tables:[]
} 
generateId = () =>{
    return Math.random().toString(36).substr(2, 8)
}

addNumber =() =>{
    var number = this.state.number;
    var tables = this.state.tables;
    console.log(this.state);
    console.log(tables);
    tables.push(number);
    number++;
    this.setState({...this.state,number,tables});
    console.log(this.state);
}
removeTable = (number)=>{
    console.log('removeTablenumber',number)
    var newTables = this.state.tables.filter(table=>{
        return table !== number
    });
    console.log('newTables',newTables)
    this.setState({...this.state,tables:newTables});
}

componentDidUpdate(prevProps, prevState, snapshot)
{
  console.log("componentDidUpdate()",this.state);
  console.log("componentDidUpdate()p",this.props.seatMap);
  if (this.props.seatMap !== prevProps.seatMap && this.props.seatMap) {
    var seatMap =this.props.seatMap;
    this.setState({...this.state,width:seatMap.width,height:seatMap.height},()=>{
        this.initCanvas();
        canvas = new fabric.Canvas('canvas')
        canvas.backgroundColor = backgroundColor  
        this.initOnObserve();
        canvas.loadFromJSON(seatMap.canvas)
        this.setState({...this.state,canvas,number:seatMap.number,tables:seatMap.tables})
    }) 
  }
  console.log('afterstate',this.state)
}

componentWillMount(){
    console.log('componentWillMount()');
    this.props.currentSeatMap();   
}
componentDidMount(){
    console.log('componentDidMount()');
    if (!this.props.seatMap){
        canvas = new fabric.Canvas('canvas')
        canvas.backgroundColor = backgroundColor  
        console.log('dcs',canvas);
        console.log('dcsdddd',this.props);
        //this.addSquares();
        this.initOnObserve();
        this.setState({...this.state,canvas})
    }
    else if (this.props.seatMap) {
        canvas = new fabric.Canvas('canvas')
        var seatMap =this.props.seatMap;
        canvas.loadFromJSON(seatMap.canvas)  
        this.setState({...this.state,canvas,number:seatMap.number,tables:seatMap.tables})
    }
}


addSquares = () =>{
    for (let i = 0; i < (canvas.height / grid); i++) {
        const lineX = new fabric.Line([ 0, i * grid, canvas.height, i * grid], {
        stroke: lineStroke,
        selectable: false,
        type: 'line'
        })
        const lineY = new fabric.Line([ i * grid, 0, i * grid, canvas.height], {
        stroke: lineStroke,
        selectable: false,
        type: 'line'
        })
        this.sendLinesToBack()
        canvas.add(lineX)
        canvas.add(lineY)
    }
}
sendLinesToBack= () =>{
    canvas.getObjects().map(o => {
        if (o.type === 'line') {
        canvas.sendToBack(o)
        }
    })
}
snapToGrid= (target) => {
    target.set({
        left: Math.round(target.left / (grid / 2)) * grid / 2,
        top: Math.round(target.top / (grid / 2)) * grid / 2
    })
}
checkBoudningBox = (e)=> {
    console.log('lllll');
    const obj = e.target

    if (!obj) {
        return
    }
    obj.setCoords()

    const objBoundingBox = obj.getBoundingRect()
    if (objBoundingBox.top < 0) {
        obj.set('top', 0)
        obj.setCoords()
    }
    if (objBoundingBox.left > canvas.width - objBoundingBox.width) {
        obj.set('left', canvas.width - objBoundingBox.width)
        obj.setCoords()
    }
    if (objBoundingBox.top > canvas.height - objBoundingBox.height) {
        obj.set('top', canvas.height - objBoundingBox.height)
        obj.setCoords()
    }
    if (objBoundingBox.left < 0) {
        obj.set('left', 0)
        obj.setCoords()
    }
}

initOnObserve = () =>{
    canvas.on('object:moving', (e) => {
        this.snapToGrid(e.target)
    })

    canvas.on('object:scaling', (e) => {
        if (e.target.scaleX > 5) {
        e.target.scaleX = 5
        }
        if (e.target.scaleY > 5) {
        e.target.scaleY = 5
        }
        if (!e.target.strokeWidthUnscaled && e.target.strokeWidth) {
        e.target.strokeWidthUnscaled = e.target.strokeWidth
        }
        if (e.target.strokeWidthUnscaled) {
        e.target.strokeWidth = e.target.strokeWidthUnscaled / e.target.scaleX
        if (e.target.strokeWidth === e.target.strokeWidthUnscaled) {
            e.target.strokeWidth = e.target.strokeWidthUnscaled / e.target.scaleY
        }
        }
    })

    canvas.on('object:modified', (e) =>{
        e.target.scaleX = e.target.scaleX >= 0.25 ? (Math.round(e.target.scaleX * 2) / 2) : 0.5
        e.target.scaleY = e.target.scaleY >= 0.25 ? (Math.round(e.target.scaleY * 2) / 2) : 0.5
        this.snapToGrid(e.target)
        if (e.target.Type === 'table') {
        canvas.bringToFront(e.target)
        }
        else {
        canvas.sendToBack(e.target)
        }
        this.sendLinesToBack()
    })

    canvas.observe('object:moving', (e) =>{
        this.checkBoudningBox(e)
    })
    canvas.observe('object:rotating', (e) => {
        this.checkBoudningBox(e)
    })
    canvas.observe('object:scaling', (e) =>{
        this.checkBoudningBox(e)
    })
}  

handleBackButton = () =>{
    this.props.changeComponent('Menu')
  }

handleUploadStorage = () =>{
    this.props.createSeatMap({...this.state});
   this.props.history.push('/Finish') 
}

initCanvas =() => {
    if (canvas) {
        canvas.clear()
        canvas.dispose()
        canvas.remove();
    }
}
HeightAndWidth = (e)=>{
    var num= parseInt(e.target.value,"10");
    this.setState({...this.state,[e.target.id]: num});
    console.log('widthhh',e.target.value);
    console.log('wid',this.state);
}
CanvasSizeChanged =(e) =>{
    this.initCanvas();
    this.componentDidMount();
}


render()
{  console.log(this.props.seatMap);

    return (
    <div id="SeatMap">
        <div className="container-fluid text-center">  
        <h1 className= "center" style={{marginBottom: "30px"}}>Seat Map</h1> 
   
            <div className="form-group">
            <div className="row">
            <div className="col-sm-2 col-sm-offset-3 form-group">
                <label>Width (px)</label>
                <input type="number" id="width" className="form-control" 
                onChange={this.HeightAndWidth} value={this.state.width} />
            </div>
            <div className="col-sm-2 form-group">
                <label>Height (px)</label>
                <input type="number" id="height" className="form-control"
                onChange={this.HeightAndWidth} value={this.state.height} />
            </div>
            <div className="col-sm-2 form-group">
                <label>&nbsp;</label>
                <br />
                <button className="btn btn-primary" onClick={this.CanvasSizeChanged}>Save</button>
            </div>
            </div>
            <div className="btn-group">
                <Rectangle canvas={this.state.canvas} number={this.state.number} addNumber={this.addNumber.bind(this)} generateId={this.generateId}/>
                <Circle canvas={this.state.canvas} number={this.state.number} addNumber={this.addNumber.bind(this)} generateId={this.generateId}/>
                <Triangle canvas={this.state.canvas} number={this.state.number} addNumber={this.addNumber.bind(this)} generateId={this.generateId}/>
                <Chair canvas={this.state.canvas} generateId={this.generateId}/>
                <Bar canvas={this.state.canvas} generateId={this.generateId}/>
                <Wall canvas={this.state.canvas} generateId={this.generateId} />
                <Remove canvas={this.state.canvas} removeTable={this.removeTable.bind(this)}/>
            </div>
         
        </div>                       
            <canvas id="canvas" width={this.state.width} height={this.state.height}></canvas>
            <BackAndUploadButtons handleBackButton={this.handleBackButton.bind(this)} handleUploadStorage={this.handleUploadStorage.bind(this)} />
        </div>      
    </div>
    )
}
}
const mapStateToProps = (state) => {
    return {
      seatMap: state.restaurant.seatMap
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return{
        createSeatMap:(creds) => dispatch(createSeatMap(creds)),
        currentSeatMap:() => dispatch(currentSeatMap()),
    }
  }

  export default compose(
    connect(mapStateToProps ,mapDispatchToProps),
    withRouter)(SeatMap)