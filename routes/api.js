const express = require('express')
const database = require('../models') //wil require the index.js file from this directory
const { where } = require('sequelize')
const Student = database.Student //the student model

const router = express.Router()

//get request, retrieves all rows from db
router.get('/students', function(req, res, next){
    //query db, get all rows from db
    //convert to JSON, available in next function
    //sorts by name column
    Student.findAll({order:['name']}).then(students =>{
        return res.json(students)
    })
})

//creates a new entry in db
router.post('/students', function(req, res, next){
    const newStudent = req.body
    console.log(newStudent)
    Student.create(newStudent).then(result =>{
        //201 means something was created successfully
        return res.status(201).send('New student created.')
    }).catch(err=>{
        //400 = bad request - client is sending a bad request
        //this is extracting the error message from each error, putting it in an array
        //and putting it in a local variable
         if (err instanceof database.Sequelize.ValidationError){
            const messages = err.errors.map(e => e.message)
            return res.status(400).json(messages)
         }else{
            //some other error...
            next(err)
         }
    })
})

//used to handle patch requests (colon turns into a place holder, matches to studentID (req.params))
router.patch('/students/:id', function(req, res, next){
    const studentID = req.params.id
    const updatedStudent = req.body //updated data about this student
    console.log(updatedStudent)
    Student.update(updatedStudent, {where: {id: studentID}}).then((result)=>{
        
        const rowsModified = result[0]
        //if one row changed, we found student, they were updated
        if(rowsModified === 1){
           return res.send('OK') //default status code is 200
        }
        //data that doesn't exist handled here (student id doesn't exist)
        else{
            //if zero, student was not found
            return res.status(404).send('Student not found')
        }

    }).catch(err =>{ //database error, can't connect or db reports error
        if (err instanceof database.Sequelize.ValidationError){
            const messages = err.errors.map(e => e.message)
            return res.status(400).json(messages)
         }else{
            //some other error... - cant connect to db
            next(err)
         } //invalid data handled here
    })
})

//used to handle DELETE requests
router.delete('/students/:id', function(req, res, next){
    const studentID = req.params.id
    Student.destroy({where:{id:studentID}}).then((rowsDeleted)=>{
        if(rowsDeleted === 1){ //student is found
            return res.send('Student deleted.')
        } else{ //0 rows deleted - student with that id is not in the database
            return res.status(404).send('Student not found.')
        }
    }).catch(err => {
        return next(err)
    })
})


module.exports = router