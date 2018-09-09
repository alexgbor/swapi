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

        false && it('should fail on non-string url', () =>
            logic.getAllPeople(123)
                .catch(err => err)
                .then(message => {
                    expect(message).to.exist
                    expect(message).to.equal('invalid url')
                })
        )

        false && it('should fail on different url', () =>
            logic.getAllPeople('http://google.es')
                .catch(err => err)
                .then(message => {
                    expect(message).to.exist
                    expect(message).to.equal('invalid url')
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

        it('should fail on no array as input',() => 
                logic.filterPeopleWithVehicles()
                .catch(err => err)
                .then(message => {
                    expect(message).to.exist
                    expect(message).to.equal('Input must be an array')
                })
        )

        it('should fail on empty array as input',() => 
                logic.filterPeopleWithVehicles([])
                .catch(err => err)
                .then(message => {
                    expect(message).to.exist
                    expect(message).to.equal('Input must be an array')
                })
        )
    })


})