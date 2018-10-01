'use strict'

import {
    INCREASE_SCORE,
    SET_NAME,
    SET_VEHICLE,
    RESET_STATS,
    SET_TIME,
    SET_TRIPS,
    SET_GOLD,
    SET_DISTANCE
} from './constants.js'

const increaseScore = player => ({ type: INCREASE_SCORE, player })
const setName = (player, name) => ({ type: SET_NAME, player, name })
const setVehicle = (player, name, cargo, speed) => ({ type: SET_VEHICLE, player, name, cargo, speed })
const resetStats = player => ({ type: RESET_STATS, player })
const setTime = (player, time) => ({ type: SET_TIME, player, time })
const setTrips = (player, trips) => ({ type: SET_TRIPS, player, trips })
const setGold = gold => ({ type: SET_GOLD, gold })
const setDistance = distance => ({ type: SET_DISTANCE, distance })

export {
    increaseScore,
    setName,
    setVehicle,
    resetStats,
    setTime,
    setTrips,
    setGold,
    setDistance
}