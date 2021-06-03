import React, { Component } from 'react'
import './Card.css'

export class Card extends Component {
  constructor(props){
    super(props)
    let angle = Math.random() *90 -45;
    let x =Math.random() *40 -20;
    let y =Math.random() *40 -20
    this._tansfrom = `translate(${x}px, ${y}px) rotate(${angle}deg)` 
  }
  render() {
    // transform
   
    return (
      <img style={{transform:this._tansfrom}} className='Card' src={this.props.image} alt={this.props.name}/>
    )
  }
}

export default Card
