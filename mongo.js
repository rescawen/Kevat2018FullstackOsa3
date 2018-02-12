const mongoose = require('mongoose')

// korvaa url oman tietokantasi urlilla. ethän laita salasanaa Gothubiin!
const url = 'mongodb://wenlei:123456@ds233238.mlab.com:33238/fullstackdb'

mongoose.connect(url)

const Person = mongoose.model('Person', {
    name: String,
    number: Number,
    id: Number
})

const person = new Person({
    name: 'Tom',
    number: 040-123213,
    id: 50
})

person
    .save()
    .then(response => {
        console.log('person saved!')
        mongoose.connection.close()
    })

Person
    .find({})
    .then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })