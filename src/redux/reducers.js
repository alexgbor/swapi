'use strict'

import {
    increaseScore,
    setName,
    setVehicle
} from './actions.js'

import { INCREASE_SCORE, SET_NAME, SET_VEHICLE, SET_GOLD, SET_DISTANCE, RESET_STATS, SET_TIME, SET_TRIPS } from './constants.js';
import { combineReducers } from 'redux';

const defaultPlayer = {
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
}

const playerReducer = (player = defaultPlayer, action) => {
    if (player.player === action.player) {
        const { score, trips, time } = player.stats
        switch (action.type) {
            case INCREASE_SCORE:
            return {
                ...player,
                stats: {
                    score: score+1,
                    trips,
                    time
                }
            }
            case SET_NAME:
            return { ...player, name: action.name }
            case SET_VEHICLE:
            return {
                ...player,
                vehicle: {
                    name: action.name,
                    cargo: action.cargo,
                    speed: action.speed
                }
            }
            case RESET_STATS:
            return {
                ...player,
                stats: {
                    trips: 0,
                    time: 0,
                    score: 0
                }
            }
            case SET_TIME:
                return {
                    ...player,
                    stats: {
                        score,
                        trips,
                        time: action.time
                    }
                }
            case SET_TRIPS:
                return {
                    ...player,
                    stats: {
                        score,
                        trips: action.trips,
                        time
                    }
                }
            default:
                return player
        }
    }
    return player
}

const defaultGame = {
    gold: 0,
    distance: 0
}

const gameReducer = (game = defaultGame, action) => {
    switch (action.type) {
        case SET_GOLD:
            return {
                ...game,
                gold:action.gold
            }
        case SET_DISTANCE:
            return {
                ...game,
                distance: action.distance
            }
        default:
            return game
    }
}

const rootReducer = combineReducers({
    player1: playerReducer,
    player2: playerReducer,
    game: gameReducer
})

export default rootReducer