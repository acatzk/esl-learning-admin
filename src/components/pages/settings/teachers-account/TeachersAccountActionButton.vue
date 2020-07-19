<template>
    <div class="action-button">
        <v-btn 
            small
            icon
            color="error"
            @click="deleteTeacherAccount"
        >
            <v-icon>delete_outline</v-icon>
        </v-btn>
    </div>
</template>


<script>

import Swal from 'sweetalert2'

import { toastAlertStatus } from '@/assets/js/toastAlert'

import { DELETE_TEACHER_MUTATION } from '@/graphql/mutations/teachers'

export default {
    name: 'TeachersAccountActionButton',

    data () {
        return {
            dialog: false
        }
    },

    props: ['item', 'items'],

    methods: {
      deleteTeacherAccount () {
        Swal.fire({
            title: 'Are you sure?',
            text: "By the way before you actually delete the account make sure to remove the teachers profile image to minimize the firebase storage - by Backend Developer.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
        .then((result) => {
            if (result.value) {
                this.items.splice(this.item, 1)
                
                const { id } = this.item
                this
                 .$apollo
                 .mutate({
                     mutation: DELETE_TEACHER_MUTATION,
                     variables: { id }
                 })
                 .then(() => {
                    toastAlertStatus('success', 'Teacher account has been deleted')
                 })
                 .catch(error => toastAlertStatus('error', error))
            }
        })
      }
    }
}
</script>

<style scoped lang="scss">
.swal2-actions {
    padding: 6px;
    border: 1px solid #eee;
}
</style>