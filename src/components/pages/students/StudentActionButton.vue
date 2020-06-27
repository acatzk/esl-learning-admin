<template>
    <div class="action-button">
        <v-btn-toggle>
            <v-tooltip top color="warning">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn 
                        v-bind="attrs"
                        v-on="on"
                        small 
                        icon
                        @click.stop="dialog = true"
                    >
                        <v-icon>mdi-pencil-box-outline</v-icon>
                    </v-btn>
                </template>
                <span>Edit</span>
            </v-tooltip>

            <v-tooltip top color="error">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn 
                        v-bind="attrs"
                        v-on="on"
                        small
                        icon
                        @click="deleteStudent"
                    >
                        <v-icon>delete_outline</v-icon>
                    </v-btn>
                </template>
                <span>Delete</span>
            </v-tooltip>
        </v-btn-toggle>


        <!-- STUDENT-DIALOG ADD AND EDIT -->
        <student-dialog 
            :visible="dialog" @close="dialog = false"
            :modalType="`edit`" 
            :item="item"
        />

    </div>
</template>


<script>

// Toast Alert Status file
import { toastAlertStatus } from '@/assets/js/toastAlert'

import { DELETE_STUDENT_MUTATION } from '@/graphql/mutations/students'
import Swal from 'sweetalert2'

export default {
    name: 'StudentActionButton',

    components: {
        StudentDialog: () => import('@/components/pages/students/StudentDialog')
    },

    data () {
        return {
            dialog: false
        }
    },

    props: ['item'],


    methods: {
        deleteStudent () {
            if(confirm('Are you sure you want to delete student?')) {
                this.$apollo
                    .mutate({
                        mutation: DELETE_STUDENT_MUTATION,
                        variables: {
                            id: this.item.id
                        }
                    })
                    .then(() => {
                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            onOpen: (toast) => {
                                toast.addEventListener('mouseenter', Swal.stopTimer)
                                toast.addEventListener('mouseleave', Swal.resumeTimer)
                            }
                        })

                        Toast.fire({
                            icon: 'success',
                            title: 'Successfully Deleted.'
                        })
                    })
                    .catch(error => {
                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            onOpen: (toast) => {
                                toast.addEventListener('mouseenter', Swal.stopTimer)
                                toast.addEventListener('mouseleave', Swal.resumeTimer)
                            }
                        })

                        Toast.fire({
                            icon: 'error',
                            title: error
                        })
                    })
            }
        }
    }

}
</script>