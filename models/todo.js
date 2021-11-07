'use strict';
const { v4: uuid_v4 } = require('uuid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const ToDo = sequelize.define(
    'ToDo',
    {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: uuid_v4()
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        done: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        sequelize,
        modelName: 'ToDo'
    }
)
  return ToDo;
};