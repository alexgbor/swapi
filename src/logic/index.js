'use strict'

const axios = require('axios')

const logic = {

    url: 'https://swapi.co/api/people/?page=',
    people:[],

    getAllPeople() {
        return axios.get(`${this.url}1`)
            .then(res => {
                const count = res.data.count
                const maxPage = Math.ceil(count / res.data.results.length)
                const dummyArray = new Array(maxPage).fill('')
                return Promise.all(dummyArray.map((e, i) => axios.get(`${this.url}${i + 1}`)))
                    .then(res => {
                        let people = res.map(page => page.data.results)
                        return people.reduce((a, b) => [...a, ...b], [])
                    })
            })
    },

    filterPeopleWithVehicles(arr) {
        if (!Array.isArray(arr) || !arr.length) return Promise.reject('Input must be an array')
        return Promise.resolve().then(() => arr.filter(person => person.vehicles.length > 0))
    },

    getVehicleStats(vehicleUrl) {
        return axios.get(vehicleUrl)
            .then(({ data }) => {
                return {
                    name: data.name,
                    cargo_capacity: parseInt(data.cargo_capacity),
                    max_atmosphering_speed: parseInt(data.max_atmosphering_speed)
                }
            })
    },

    calculateStats(max_atmosphering_speed, cargo_capacity, gold, distance) {

        if (!max_atmosphering_speed || !cargo_capacity) return { numberOfTrips: Number.POSITIVE_INFINITY, totalTime: Number.POSITIVE_INFINITY }

        const cargo = parseInt(cargo_capacity)
        const maxSpeed = parseInt(max_atmosphering_speed)
        const numberOfTrips = 2 * Math.ceil(gold / cargo) - 1
        const totalDistance = distance * numberOfTrips
        const time = Math.round(totalDistance / maxSpeed)
        const cargoTime = numberOfTrips + 1
        const totalTime = time + cargoTime

        return { numberOfTrips, totalTime }

    },

    whoWins(max_atmosphering_speed1, cargo_capacity1, max_atmosphering_speed2, cargo_capacity2, gold, distance) {
        const stats1 = this.calculateStats(max_atmosphering_speed1, cargo_capacity1, gold, distance)
        const stats2 = this.calculateStats(max_atmosphering_speed2, cargo_capacity2, gold, distance)

        const diff = stats1.totalTime - stats2.totalTime

        if (diff > 0) return { winner: { name: 'player2', time: stats2.totalTime, trips: stats2.numberOfTrips }, loser: { name: 'player1', time: stats1.totalTime, trips: stats1.numberOfTrips } }
        if (diff < 0) return { winner: { name: 'player1', time: stats1.totalTime, trips: stats1.numberOfTrips }, loser: { name: 'player2', time: stats2.totalTime, trips: stats2.numberOfTrips } }
        return null
    }


}

module.exports = logic