const { celebrate, Joi } = require('celebrate')

module.exports = (app) => {
  /*
  Method: GET
  Description: simple get call without validation
   */
  app.get('/getExample', async (req, res) => {
    return res.send('This is a simple GET request without parameters')
  })

  /*
  Method: GET
  Description: params validation
   */
  app.get('/getExample/:idExample', celebrate({
    params: Joi.object().keys({
      idExample: Joi.number().integer().greater(0).required()
    })
  }), async (req, res) => {
    const { idExample } = req.params

    return res.send(`You required /getExample/${idExample}`)
  })

  /*
  Method: POST
  Description: multiple path pointing at the same function, with the same validation.
   */
  app.post([
    '/postExample',
    '/postExample/:idExample'
  ], celebrate({
    params: Joi.object().keys({
      idExample: Joi.number().integer().greater(0)
    }),
    body: Joi.object().keys({
      title: Joi.string().required(),
      date: Joi.date(),
      array: Joi.array().items({
        name: Joi.string()
      })
    })
  }), async (req, res) => {
    const { idExample } = req.params
    const body = req.body

    return res.status(200).json({
      status: true,
      message: `You posted some data! Parameter idExemple = ${idExample}`,
      data: body
    })
  })
}