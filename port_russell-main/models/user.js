const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * User schema
 * @typedef {Object} User
 * @property {string} username
 * @property {string} email
 * @property {string} password
 * @property {date} createdAt
 * @property {date} updatedAt
 */
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    }
},
{
         //Ajoute 2 champs de timestamp au documents, un à la création et l'autre lors de la modification
         timestamps: true
})

//Hachage du password après sauvegarde
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (err) {
      next(err);
    }
  });


module.exports = mongoose.model('User', userSchema);