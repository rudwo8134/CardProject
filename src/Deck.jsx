import React, { Component } from 'react'
import Card from './Card'
import axios from 'axios'
import './deck.css'

const API_BASE_URL='https://deckofcardsapi.com/api/deck/'

export class Deck extends Component {
  constructor(props){
    super(props)
    this.state = {
      deck:null,
      drawn:[]
    }
  }
  async componentDidMount(){
    let deck = await axios.get(`${API_BASE_URL}/new/shuffle`)
    this.setState({deck: deck.data})
  }

  getCard = async() => {
    const id = this.state.deck.deck_id
    try{
      let cardUrl = `${API_BASE_URL}/${id}/draw/`
      let cardres = await axios.get(cardUrl)
      if(!cardres.data.success){
        alert('no card remainning')
        throw new Error()
      }
      let card = cardres.data.cards[0]
      this.setState(st =>({
        drawn:[
          ...st.drawn,
          {id:card.code, 
            image:card.image,
            name: `${card.suit} of ${card.value}`}
        ]
      })
       )
    }catch(err){
      console.log (err)
    }
  
  
  }

  render() {
    const cards = this.state.drawn.map(c =>(
      <Card key={c.id} name={c.name} image={c.image}></Card>
    ))

    return (
      <div>
        <h1 className='Deck-title'>Card Dealer</h1>
        <h2>*a little demo with React*</h2>
        <button onClick ={this.getCard}> Get Card</button>
        <h3>{this.state.drawn[this.state.drawn.length-1] && `You Got ${this.state.drawn[this.state.drawn.length-1].name}`} </h3>
        <div className="cardarea">
        {cards}
        </div>

      </div>
    )
  }
}

export default Deck
