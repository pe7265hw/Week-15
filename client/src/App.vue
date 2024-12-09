<script setup>

//importing files to be used by the base app
import { onMounted } from 'vue';
import NewStudentForm from './components/NewStudentForm.vue'
import StudentTable from './components/StudentTable.vue'
import StudentMessage from './components/StudentMessage.vue'

import { useStudentStore } from './stores/StudentStore';

//variable which allows page to use exported information from student store
const studentStore = useStudentStore()

onMounted( () =>{
  //whatever code is in here will run when the component is first displayed
  studentStore.getAllStudents() //retrieves all student information from the database
})

</script>

<template>
  
  <NewStudentForm></NewStudentForm>
  <StudentTable></StudentTable>
  <StudentMessage></StudentMessage>
  
</template>

<style scoped>

</style>
