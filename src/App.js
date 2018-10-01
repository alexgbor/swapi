'use strict'

import React, { Component } from 'react'
import { withRouter, Route, Redirect, Switch } from 'react-router-dom'
import { Landing, Error404, Game } from './components/index.js'


import store from './redux/store.js'
import {
    setName,
    setVehicle,
    setGold,
    setDistance
} from './redux/actions.js'

import './App.css'

import logic from './logic/index.js'

class App extends Component {
    componentDidMount() {
        return logic.getAllPeople()
            .then(res => logic.filterPeopleWithVehicles(res))
            .then(res => {
                logic.people = res
                return this.setUpGame()
            })
            .then(() => this.props.history.push('/game'))
            .catch(console.error)
    }

    setUpGame() {
        const res = logic.people
        const random1 = Math.floor(Math.random() * res.length)
        let random2 = Math.floor(Math.random() * res.length)
        while (random2 === random1) {
            random2 = Math.floor(Math.random() * res.length)
        }
        const player1 = res[random1]
        const player2 = res[random2]

        const vehicle1 = player1.vehicles[player1.vehicles.length * Math.floor(Math.random())]
        const vehicle2 = player2.vehicles[player2.vehicles.length * Math.floor(Math.random())]

        return Promise.all([logic.getVehicleStats(vehicle1), logic.getVehicleStats(vehicle2)])
            .then(res => {
                store.dispatch(setVehicle('player1', res[0].name, res[0].cargo_capacity, res[0].max_atmosphering_speed))
                store.dispatch(setVehicle('player2', res[1].name, res[1].cargo_capacity, res[1].max_atmosphering_speed))
                store.dispatch(setName('player1', player1.name))
                store.dispatch(setName('player2', player2.name))
                store.dispatch(setGold(Math.round(100 + 9899 * Math.random())))
                store.dispatch(setDistance(Math.round(1000 + 98999 * Math.random())))
            })
    }



    render() {
        return (
            <div className='app'>
                <Switch>
                    <Route exact path='/' render={() => <Landing />} />
                    <Route path='/game' render={() => <Game setUp={this.setUpGame} /> } />
                    <Route path='/' render={() => <Error404 />} />
                </Switch>
            </div>
        )
    }
}

export default withRouter(App)