module.exports = (app) => {
  app.get('/ping', async (req, res) => {
    return res.send(`This is an example api on ${process.env.PORT} port`)
  })
  /*
  Require all files inside ./routes folder
   */
  require('./routes/example')(app)
}