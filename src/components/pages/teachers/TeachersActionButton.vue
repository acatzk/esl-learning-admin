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
                        icon
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

// Toast Alert Status file
import { toastAlertStatus } from '@/assets/js/toastAlert'

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
                const { id } = this.item
                this.$apollo
                    .mutate({
                        mutation: UPDATE_DEACTIVE_TEACHER_MUTATION,
                        variables: { id }
                    })
                    .then(() => {
                        toastAlertStatus('success', 'Successfully Inactive Teacher')
                    })
                    .catch(error => {
                        toastAlertStatus('error', error)
                    })
            }
        }
    }

}
</script>