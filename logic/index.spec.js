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
                    expect(Object.keys(res[Math.round(res.length*Math.random())]).length).to.equal(16)
                })
        )
    })
})