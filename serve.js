const express = require('express')
const app = express()
const graphqHTTP = require('express-graphql')

const schema = require('./schema')

app.use('/graphql', graphqHTTP({
  schema,
  graphiql: true
}))


app.listen(4000)
console.log('Listening ...')