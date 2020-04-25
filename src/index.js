require('custom-env').env(true)
const express = require('express')
require('express-async-errors')
const morganBody = require('morgan-body')
const cors = require('cors')
const bodyParser = require('body-parser')
const knex = require('knex')
const compression = require('compression')
const { Model } = require('objection')
const { get } = require('lodash')
const { errors } = require('celebrate')

const PORT = process.env.PORT || 8080

Model.knex(knex({
  client: 'mysql',
  connection: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT || 3306
  }
}))

// Initialize the app
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(compression())
morganBody(app, {
  noColors: true,
  maxBodyLength: 10000
})

require('./routes')(app)
app.use(errors())
require('./apiDocs')(app)

app.use((e, req, res, next) => {
  console.error({
    errorMessage: get(e, 'response.data.message', e.message),
    errorPath: get(e, 'response.config.url'),
    body: req.body
  })
  return res.status(400).json({
    status: false,
    message: `An error has occurred`,
    clientMessage: get(e.clientMessage),
    errorMessage: get(e, 'response.data.message', e.message),
    errorPath: get(e, 'response.config.url'),
    errorStack: e.stack
  })
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`)
  // console.log(`Environment: ${JSON.stringify(process.env, null, 2)}`)
})