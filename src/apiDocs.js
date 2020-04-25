const path = require('path')
const swaggerJSDoc = require('swagger-jsdoc')
const { exec } = require('child_process')
const fs = require('fs')
const express = require('express')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'nodejs-express-celebrate',
      version: '1.0.0'
    },
    servers: [
      {
        url: ``
      }
    ],
    components: {
      securitySchemes: {
        Bearer: {
          type: 'http',
          scheme: 'bearer'
        }
      }
    },
    security: [
      { Bearer: [] }
    ]
  },
  // Path to the API docs
  apis: [path.join(__dirname, 'routes/*.js')]
}

const apiDocs = (app) => {
  const swaggerSpec = swaggerJSDoc(options)
  fs.writeFile(path.join(__dirname, './docs/swagger.json'), JSON.stringify(swaggerSpec, null, 4), e => {
    exec('npx redoc-cli bundle src/docs/swagger.json --output=./src/docs/index.html')
  })

  app.use('/api-docs', express.static(path.join(__dirname, './docs')))
  app.get('/api-docs', function response (req, res) {
    res.sendFile('index.html')
  })
}

module.exports = apiDocs
