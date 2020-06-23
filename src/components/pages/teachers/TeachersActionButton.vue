<template>
    <div class="action-button">
        <v-btn-toggle>
            <v-tooltip top color="warning">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn 
                        v-bind="attrs"
                        v-on="on"
                        small 
                        @click="dialog = !dialog"
                    >
                        <v-icon>colorize</v-icon>
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
                        tile
                        @click="inactiveTeacherStatus"
                    >
                        <v-icon>delete_outline</v-icon>
                    </v-btn>
                </template>
                <span>Delete</span>
            </v-tooltip>
        </v-btn-toggle>

        <!-- Edit Dialog -->
        <teacher-edit-dialog 
            :visible="dialog" 
            @close="dialog=false"
            :item="item"
        />
    </div>
</template>


<script>

import Swal from 'sweetalert2'
import { UPDATE_DEACTIVE_TEACHER_MUTATION } from '@/graphql/mutations/teachers'

export default {
    name: 'TeachersActionButton',

    data () {
        return {
            dialog: false
        }
    },

    props: ['item'],

    components: {
        TeacherEditDialog: () => import('./TeacherEditDialog')
    },

    methods: {
        inactiveTeacherStatus () {
            if(confirm('Are you sure you want to deactive teacher account?')) {
                this.$apollo
                    .mutate({
                        mutation: UPDATE_DEACTIVE_TEACHER_MUTATION,
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
                            title: 'Teacher Account Successfully Inactive.'
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