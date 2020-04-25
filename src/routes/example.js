const { celebrate, Joi } = require('celebrate')

module.exports = (app) => {

  app.get('/getExample', async (req, res) => {
    return res.send('This is a simple GET request without parameters')
  })

  /**
   * @swagger
   *
   * /getExample/{idUtente}:
   *  get:
   *    tags:
   *    - examples
   *    summary: Get example
   *    description: Description of get example
   *    parameters:
   *    - in: path
   *      name: idExample
   *      type: integer
   *      required: true
   *      description: description param
   *    responses:
   *      200:
   *        description: Successful operation
   */
  app.get('/getExample/:idExample', celebrate({
    params: Joi.object().keys({
      idExample: Joi.number().integer().greater(0).required()
    })
  }), async (req, res) => {
    const { idExample } = req.params

    return res.send(`You required /getExample/${idExample}`)
  })


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