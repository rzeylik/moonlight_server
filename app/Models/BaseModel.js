const { pick, omit, isArray, each, reduce, isEmpty } = require('lodash')

const Model = use('Model')

class BaseModel extends Model {
  static boot() {
    super.boot()
    // Processing options to one number
    this.addHook('beforeSave', async (instance) => {
      const options = this.options || {}
      each(options, (v, k) => {
        if (instance.dirty[k]) {
          const values = instance.dirty[k]
          const data = (isArray(values) ? values : [values]).filter((i) => v.includes(i))
          let value = 0
          data.forEach((i) => {
            value = value | (1 << (i - 1))
          })
          instance[k] = value
        }
      })
    })
  }

  /**
   *
   */
  static async createItem(data) {
    return this.create(omit(pick(data, this.columns || []), ['id']))
  }

  /**
   *
   */
  async updateItem(data, force = false) {
    const exclude = force ? [] : this.constructor.readonly || []
    let filtered = reduce(
      omit(pick(data, this.constructor.columns || []), exclude),
      (n, v, k) => {
        return v === undefined ? n : { ...n, [k]: v }
      },
      {}
    )
    this.merge(filtered)

    if (!isEmpty(filtered)) {
      return this.save()
    }
  }
}

module.exports = BaseModel
