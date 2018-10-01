'use strict'

import { createStore } from 'redux'
import rootReducer from './reducers.js'

const initialState = {
    player1: {
        player: 'player1',
        title: 'Player 1',
        name: 'NAME 1',
        vehicle: {
            name: 'VEHICLE_NAME 1',
            speed: 0,
            cargo: 0
        },
        stats: {
            trips: 0,
            time: 0,
            score: 0
        }
    },
    player2: {
        player: 'player2',
        title: 'Player 2',
        name: 'NAME 2',
        vehicle: {
            name: 'VEHICLE_NAME 2',
            speed: 0,
            cargo: 0
        },
        stats: {
            trips: 0,
            time: 0,
            score: 0
        }
    },
    game: {
        gold:0,
        distance:0
    }
}

const store = createStore(rootReducer, initialState)

export default store