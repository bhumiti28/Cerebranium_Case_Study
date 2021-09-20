const crypto = require('crypto')
const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

const ProfessorModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      maxlength: 32,
      unique: true,
      trim: true
    },
    hashedPassword: {
      type: String,
      required: true,
      trim: true
    },
    salt: {
      type: String
    }
  },
  { timestamps: true }
)

ProfessorModel.virtual('password')
  .set(function (password) {
    this._password = password
    this.salt = uuidv4()
    this.hashedPassword = this.securePassword(password)
  })
  .get(function () {
    return this._password
  })

ProfessorModel.methods = {
  authenticate: function (plainpassword) {
    return this.securePassword(plainpassword) === this.hashedPassword
  },
  securePassword: function (plainpassword) {
    if (!plainpassword) return ''
    try {
      return crypto
        .createHmac('sha256', this.salt)
        .update(plainpassword)
        .digest('hex')
    } catch (error) {
      console.log(error)
      return ''
    }
  }
}

module.exports = mongoose.model('Professor', ProfessorModel)
