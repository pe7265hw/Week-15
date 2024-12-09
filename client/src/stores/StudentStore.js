//imports store, vue objects and mande

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { mande } from 'mande'

//creates local api variable
const studentAPI = mande('api/students')

//sets all data to be exported from store
export const useStudentStore = defineStore('students', () => {

    //student list to hold data being input to db
    const sortedStudents = ref([])

    //most recent student used in present or not present and deletStudent
    const mostRecentStudent = ref( {} )

    //used for catching errors when adding new students
    const addNewStudentErrors = ref([])

    //gets all students from db
    function getAllStudents(){
        //make an API request to get all students and save them in the store - studentList
        studentAPI.get().then(students => { //students is the JSON response from the API
            sortedStudents.value = students
        }).catch(err => {
            console.log(err)
        })
    }

    //makes api call to add new student, call getAllStudents to re-request list from students from server
    function addNewStudent(student) {
        studentAPI.post(student).then(()=>{
            getAllStudents()
        }).catch(err=>{
            addNewStudentErrors.value = err.body
        })
    }

    //deletes students from database
    function deleteStudent(studentToDelete) { //TODO - this will become an API request
        const deleteStudentAPI = mande(`/api/students/${studentToDelete.id}`)
        deleteStudentAPI.delete().then(()=>{
            mostRecentStudent.value = studentToDelete
            getAllStudents()
        }).catch(err => {
            console.log(err)
        })
    }

    function arrivedOrLeft(student) { //TODO - this will become an API request
        const editStudentsAPI = mande(`/api/students/${student.id}`)
        editStudentsAPI.patch(student).then(()=>{
            mostRecentStudent.value = student //added to make welcome message work (incase negative affect on code)
            getAllStudents()
        }).catch(err => {
            console.log(err)
        })
    }


    const studentCount = computed( () => {
        return sortedStudents.value.length
    })

    return { 
        // reactive data
        sortedStudents, mostRecentStudent, addNewStudentErrors,

        // functions
        addNewStudent, deleteStudent, arrivedOrLeft, getAllStudents,

        // computed properties
        studentCount
    }

})