<template>
    <div class="action-button">
        <v-btn 
            small
            icon
            color="error"
            @click="deleteTeacherAccount"
        >
            <v-icon v-if="mode">delete_outline</v-icon>
            <v-icon v-else>delete</v-icon>
        </v-btn>
    </div>
</template>


<script>

import { fb } from '@/services'

import Swal from 'sweetalert2'

import { mapState } from 'vuex'

import { toastAlertStatus } from '@/utils'

import { DELETE_TEACHER_MUTATION } from '@/graphql/mutations/teachers'

export default {
    name: 'TeachersAccountActionButton',

    data () {
        return {
            dialog: false
        }
    },

    props: ['item', 'items'],

    computed: {
        ...mapState(['mode'])
    },

    methods: {
        deleteTeacherAccount () {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
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
                        this.onDeleteProfileImage(this.item)
                    })
                    .catch(error => toastAlertStatus('error', error))
                }
            })
        },

        // REMOVED ACTUAL PICTURE IN FIREBASE STORAGE
        onDeleteProfileImage (teacher) {
            
            if (!teacher.profile_url) return;

            let image = fb.storage().refFromURL(teacher.profile_url)

            image
             .delete()
             .then(() => {
                toastAlertStatus('success', 'Firebase storage profile deleted.')
             })
             .catch(error => toastAlertStatus('error', error))
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