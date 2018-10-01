'use strict'

const logic = require('.')

const { expect } = require('chai')


describe('business logic', () => {


    describe('getAllPeople', () => {

        it('should succeed', () =>
            logic.getAllPeople()
                .then(res => {
                    expect(res).to.exist
                    expect(res.length).not.to.equal(0)
                    res.forEach(ele => expect(Object.keys(ele).length).to.equal(16))
                })
        )


    })

    describe('filterPeopleWithVehicles', () => {
        it('should retrieve people with vehicles', () =>
            logic.getAllPeople()
                .then(res => logic.filterPeopleWithVehicles(res))
                .then(res => {
                    expect(res).to.exist
                    res.forEach(person => {
                        expect(person.vehicles.length).not.to.equal(0)
                    })
                })
        )

        it('should fail on no array as input', () =>
            logic.filterPeopleWithVehicles()
                .catch(err => err)
                .then(message => {
                    expect(message).to.exist
                    expect(message).to.equal('Input must be an array')
                })
        )

        it('should fail on empty array as input', () =>
            logic.filterPeopleWithVehicles([])
                .catch(err => err)
                .then(message => {
                    expect(message).to.exist
                    expect(message).to.equal('Input must be an array')
                })
        )
    })

    describe('get vehicle data', () => {
        it('should succeed on correct url', () =>
            logic.getVehicleStats('https://swapi.co/api/vehicles/14')
                .then(({ name, cargo_capacity, max_atmosphering_speed }) => {
                    expect(name).to.equal('Snowspeeder')
                    expect(cargo_capacity).to.equal(10)
                    expect(max_atmosphering_speed).to.equal(650)
                })
        )
    })

    describe('calculate stats', () => {
        it('should succeed on correct values', () => {
            const stats = logic.calculateStats(650, 10, '2483', '55000')
            logic.calculateStats(650, 10, '2483', '55000')
            const { numberOfTrips, totalTime } = stats

            expect(totalTime).to.exist
            expect(totalTime).to.equal(42552)
            expect(numberOfTrips).to.exist
            expect(numberOfTrips).to.equal(497)

        }
        )
        it('should succeed on empty values', () => {
            const stats = logic.calculateStats(undefined, undefined, '2483', '55000')
            const { numberOfTrips, totalTime } = stats
            expect(totalTime).to.exist
            expect(totalTime).to.equal(Number.POSITIVE_INFINITY)
            expect(numberOfTrips).to.exist
            expect(numberOfTrips).to.equal(Number.POSITIVE_INFINITY)
        }
        )
    })

    describe('who wins', () => {
        it('should return a draw', () => {
            const result = logic.whoWins(650, 10, 650, 10, '2483', '55000')

            expect(result).to.be.null
        })
    })
})