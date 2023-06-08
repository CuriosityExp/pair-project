'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tag.hasMany(models.PostTag)
    }
  }
  Tag.init({
    name: 
    {
     type: DataTypes.STRING,
     allowNull: false,
     validate: {
        notEmpty:{
          msg: 'Tags harus diisi'
        }
      }
    }

  }, {
    sequelize,
    modelName: 'Tag',
    hooks:{
      beforeCreate: (tag,options)=>{
        tag.name = '#'+ tag.name
      }
    }
  });
  return Tag;
};