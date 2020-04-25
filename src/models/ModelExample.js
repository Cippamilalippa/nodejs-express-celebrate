const { Model } = require('objection')

class ModelExample extends Model {
  static get tableName () {
    return 'table_name'
  }
}

module.exports = ModelExample
