//creates local variables for Sequelize and DataTypes, imports files
const {Sequelize, DataTypes} = require('sequelize')
const configJson = require('../config.json')
const createStudentModel = require('./student.js')

//look for an environment variable that will be called NODE_ENV and read its value
//enviornment variables are set for your whole computer (or for a ferver) but act similar to a local variable
//any application running on that server or computer can read them
//at azure, create an enivornment variable for your server called  NODE_ENV and set it to "production"
//values attributed to "production" found in config.json
//since env is produciton program will know to use SQL settings to connect to database
//allows you to use exact same code to connect to different databases since production is given template values
//if there is no NODE_ENV set, as in on your computer, we'll use the value "development"
const env = process.env.NODE_ENV || "development"

const config = configJson[env] //read the configuaration object for 'development' or 'poduction

const sequelize = new Sequelize(config)

const database = {
    sequelize: sequelize,
    Sequelize: Sequelize
}

//creates studentModel with information that will represent database
const studentModel = createStudentModel(sequelize, DataTypes)
const studentModelName = studentModel.name
database[studentModelName] = studentModel

module.exports = database