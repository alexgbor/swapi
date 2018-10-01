'use strict'

import React, { Component } from 'react'

import { connect } from 'react-redux'
import { withRouter, Route } from 'react-router-dom'

import space from '../../assets/space.png'
import gold from '../../assets/gold.png'
import distance from '../../assets/distance.png'

import logic from '../../logic/index.js'

import store from '../../redux/store.js'
import { increaseScore, setTime, setTrips } from '../../redux/actions'

import { Stats } from '../index.js'

import './style.css'

class Game extends Component {

    play() {
        const { speed: speed1, cargo: cargo1 } = this.props.player1.vehicle
        const { speed: speed2, cargo: cargo2 } = this.props.player2.vehicle
        const results = logic.whoWins(speed1, cargo1, speed2, cargo2, this.props.game.gold, this.props.game.distance)
        if (results) {
            store.dispatch(increaseScore(results.winner.name))
            store.dispatch(setTime(results.winner.name, results.winner.time))
            store.dispatch(setTime(results.loser.name, results.loser.time))
            store.dispatch(setTrips(results.winner.name, results.winner.trips))
            store.dispatch(setTrips(results.loser.name, results.loser.trips))
        }
    }

    render() {
        return (
            <div className='game'>

                <div className='board'>

                    <div className='player1'>
                        <div className='player1-info'>
                            <h3>Player 1</h3>
                            <h4>{this.props.player1.name}</h4>
                        </div>
                        <div className='player1-vehicle'>
                            <img src={space} alt='space' />
                            <h3>{this.props.player1.vehicle.name}</h3>
                        </div>
                        <Route exact path='/game/stats' render={() => <Stats player='player1' />} />
                    </div>

                    <div className='state'>
                        <h3>VS</h3>
                        <div className='score'>
                            <h1>{this.props.player1.stats.score}</h1>
                            <h1>-</h1>
                            <h1>{this.props.player2.stats.score}</h1>
                        </div>
                        <div className='gold'>
                            <img src={gold} alt='gold' />
                            <h2>{this.props.game.gold} kg</h2>
                        </div>
                        <div className='distance'>
                            <img src={distance} alt='distance' />
                            <h2>{this.props.game.distance} km</h2>
                        </div>
                    </div>

                    <div className='player2'>
                        <div className='player2-info'>
                            <h3>Player 2</h3>
                            <h4>{this.props.player2.name}</h4>
                        </div>
                        <div className='player2-vehicle'>
                            <img src={space} alt='space' />
                            <h3>{this.props.player2.vehicle.name}</h3>
                        </div>
                        <Route exact path='/game/stats' render={() => <Stats player='player2' />} />

                    </div>

                </div>

                <Route exact path='/game' render={() => <button className='play-button' onClick={() => { this.play(); this.props.history.push('/game/stats') }}>PLAY</button>} />
                <Route exact path='/game/stats' render={() => <button className='next-game-button' onClick={() => { this.props.setUp(); this.props.history.push('/game') }}>NEXT GAME</button>} />
            </div>
        )
    }

}

const mapStateToProps = state => ({ player1: state.player1, player2: state.player2, game: state.game })

export default withRouter(connect(mapStateToProps)(Game))