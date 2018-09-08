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
                    expect(Object.keys(res[Math.round(res.length * Math.random())]).length).to.equal(16)
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
})