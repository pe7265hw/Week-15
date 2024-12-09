<script setup>

//imports library
import { useStudentStore } from '../stores/StudentStore.js'
import { storeToRefs } from 'pinia'

//creates local variable to use exported data from store
const studentStore = useStudentStore()

//allows refs from student store to be used
const { mostRecentStudent } = storeToRefs(studentStore)

</script>

<template>
<!--Welcome or goodby message-->
<div id="welcome-or-goodbye-message" class="m-2">
    <div v-if="mostRecentStudent.name">

        <div v-if="mostRecentStudent.present" class="alert alert-success">
            Welcome, {{ mostRecentStudent.name }}!
        </div>
        <div v-else class="alert alert-info">
            Goodbye, {{ mostRecentStudent.name }}. See you later!
        </div>     
    </div>  
</div>

</template>

<style scoped>

</style>