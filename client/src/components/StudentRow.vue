<script setup>

import { ref } from 'vue'

//defines events to be sent to parent
const props = defineProps({
    student: Object
})

//defines specifically what events will be sent
const emit = defineEmits(['arrived-or-left', 'delete-student'])

// A new ref to track if this student is present or not 
const isStudentPresent = ref( props.student.present )

//event that will be sent
const notifyArrivedOrLeft = () => {
    emit('arrived-or-left', props.student, isStudentPresent.value) 
}

//event that will be sent
const confirmThenDeleteStudent = () => {
    if (confirm(`Delete ${props.student.name}?`)) {
        emit('delete-student', props.student)
    } 
}

</script>

<template>
<!--Controls student present or absent-->
<tr class="align-middle" v-bind:class="{ present: student.present, absent: !student.present }">
    <td>{{ student.name }}</td>
    <td>{{ student.starID }}</td>
    <td> 
        <input type="checkbox" v-model="isStudentPresent" v-on:change="notifyArrivedOrLeft">
        <span class="mx-3" v-if="student.present">Here!</span>
        <span class="mx-3" v-else>Not present</span>
    </td>
    <!--Delete student-->
    <td>
        <button class="btn btn-danger" v-on:click="confirmThenDeleteStudent">
            <i class="bi bi-trash-fill"></i> Delete
        </button>
    </td>
</tr>

</template>

<style scoped>


.present {
    color: gray;
    font-style: italic;
}

.absent {
    color: black;
    font-weight: bold;
}


</style>

