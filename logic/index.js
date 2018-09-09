'use strict'

const axios = require('axios')

const logic = {

    url: 'https://swapi.co/api/people/?page=',

    results: [],

    // getAllPeople(url = this.url) {
    //     if (typeof url !== 'string' || !url.includes(this.url)) return Promise.reject('invalid url')

    //     return axios.get(url)
    //         .then(({ data }) => {
    //             if (!data) throw new Error('Something went wrong!')
    //             if (data.results) this.results = [...this.results, ...data.results]

    //             if (data.next) return this.getAllPeople(data.next)

    //             else return this.results
    //         })
    // }
    getAllPeople() {
        return Promise.all([1, 2, 3, 4, 5, 6, 7, 8, 9].map(ele => axios.get(`${this.url}${ele}`)))
            .then(res => {
                let people = res.map(page => page.data.results)
                return people.reduce((a, b) => [...a, ...b], [])
            })
    },

    filterPeopleWithVehicles(arr) {
        if (!Array.isArray(arr) || !arr.length) return Promise.reject('Input must be an array')
        return Promise.resolve().then(() => arr.filter(person => person.vehicles.lenth>0))
    }

}

module.exports = logic