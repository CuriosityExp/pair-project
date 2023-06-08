'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    
    

    get formatDateNumeric(){
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return this.createdAt.toLocaleDateString('id-ID',options)
    }

    static showAllFeeds(){
      return Post.findAll({
        include: sequelize.models.User
      })
    }

    static associate(models) {
      Post.hasMany(models.PostTag)
      Post.belongsTo(models.User)
    }
  }
  Post.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Title harus ada'
        }
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Caption harus ada'
        }
      }
    },
    imgUrl: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};