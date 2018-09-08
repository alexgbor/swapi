'use strict'

const axios = require('axios')

const logic = {

    url: 'http://swapi.co/api/people/?page=',
    
    results: [],
    
    getAllPeople(url = this.url) {
        return axios.get(url)
            .then(({ data }) => {
                if (!data) throw new Error('Something went wrong!')
                if (data.results) this.results = [...this.results, ...data.results]

                if (data.next) return this.getAllPeople(data.next)
                else return this.results
            })
    }

}

module.exports = logic