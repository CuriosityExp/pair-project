'use strict';
const {
  Model
} = require('sequelize');
const { hashing } = require('../helpers');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    static associate(models) {
      User.hasMany(models.UserGroup)
      User.hasMany(models.Post)
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          msg: 'Email harus diisi'
        },
        isEmail:{
          msg: 'Format email salah'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password harus diisi'
        },
        min: {
          args: 8,
          msg: 'Password minimal 8 karakter'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'User',
    hooks:{
      beforeCreate: (user,options)=>{
        user.password = hashing(user.password)
        user.username = user.email.split('@')[0] + new Date().getTime().toString().slice(4)
        user.role = 'user'
      }
    }
  });
  return User;
};