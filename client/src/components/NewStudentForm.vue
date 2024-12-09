<script setup>

//import keywords or objects from library
import { ref, watch } from 'vue'

//import store from pinia
import { useStudentStore } from '../stores/StudentStore'
import { storeToRefs } from 'pinia';

//creates local variable to allow use of exported store data
const studentStore = useStudentStore() 

//local variables to contain name and starID
const newStudentName = ref('')
const newStarID = ref('')

//array for errors
const formErrors = ref([])

//imports addNewStudentErrors from pinia to use here
const {addNewStudentErrors} = storeToRefs(studentStore)

//watches for changes to addNewStudentErrors, if changed displays them in alert
watch(addNewStudentErrors, ()=>{
    if (addNewStudentErrors.value && addNewStudentErrors.value.length > 0){
        alert(addNewStudentErrors.value.join('\n'))
    }
})

//adds student
const addStudent = () => {
    formErrors.value = []   // clear errors array

    if (!newStudentName.value) {
        formErrors.value.push('Student name must be entered')
    }

    if (!newStarID.value) {
        formErrors.value.push('StarID must be entered')
    }

    // if there are no errors
    if (formErrors.value.length == 0) {
        let student = { name: newStudentName.value, starID: newStarID.value, present: false }

        studentStore.addNewStudent(student)
        newStudentName.value = ''   // clear form input
        newStarID.value = ''  
    }
}

</script>

<template>
<!--Shows errors-->
<div id="new-student-form-errors" class="m-2">
    <div class="alert alert-danger" v-if="formErrors.length > 0">
        <li v-for="error in formErrors" v-bind:key="error">
            {{ error }}
        </li>
    </div>
</div>
<!--Student info input form-->
<div id="new-student-form" class="card add-student m-2 p-2">
    <h4 class="card-title">Add new student</h4>

    <div class="form-group mb-3">
        <label for="name">Name</label>
        <input id="name" class="form-control" v-model.trim="newStudentName">
    </div>
    <div class="form-group mb-3">
        <label for="starID">Star ID</label>
        <input id="starID" class="form-control" v-model.trim="newStarID">
    </div>
<!--Add student button-->
    <button class="btn btn-primary" v-on:click="addStudent">Add</button>
</div>


</template>

<style scoped>

</style>