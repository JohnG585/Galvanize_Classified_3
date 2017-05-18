const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()

if (process.env.NODE_ENV !== 'development') {
  const logger = require('morgan')
  app.use(logger('dev'))
}

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '/../client')))
app.use(express.static(path.join(__dirname, '/../', 'node_modules')))

app.use('/api/index', require('./routes/index'))

app.use('*', function (req, res) {
  res.sendFile('index.html', {
    root: path.join(__dirname, '/../client')
  })
})

app.use(function(err, req, res, next) {
  const response = { message: err.message }
  if (req.app.get('env') === 'development') {
    response.stack = err.stack
  }

  res.status(err.status || 500).json(response)
})

module.exports = app
