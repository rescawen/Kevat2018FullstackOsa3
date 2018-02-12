const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
app.use(express.static('build'))
app.use(cors())
app.use(morgan('tiny'))

app.use(bodyParser.json())

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Martti Tienari",
        number: "040-123456",
        id: 2
    },
    {
        name: "Arto Järvinen",
        number: "040-123456",
        id: 3
    },
    {
        name: "Lea Kutvonen",
        number: "040-123456",
        id: 4
    }
]

const generateId = () => {
    const maxId = persons.length > 0 ? persons.map(n => n.id).sort().reverse()[0] : 1
    return maxId + 1
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (body.name === undefined) {
        return response.status(400).json({ error: 'name missing' })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    persons = persons.concat(person)

    response.json(person)
})

app.get('/', (req, res) => {
    res.send('<h1>hallo</h1>')
})

app.get('/info', (req, res) => {

    const personAmount = persons.length
    const now = new Date()
    const info = `
    <div>
        <p>puhelinluettelossa ` + personAmount + ` henkilön tiedot</p>
        <p>` + now + `</p>
    </div>`
    res.send(info)
    
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})