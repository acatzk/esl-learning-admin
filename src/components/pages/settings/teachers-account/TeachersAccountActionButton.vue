<template>
    <div class="action-button">
        <v-btn 
            small
            icon
            color="error"
        >
            <v-icon>delete_outline</v-icon>
        </v-btn>
    </div>
</template>


<script>

// Toast Alert Status file
import { toastAlertStatus } from '@/assets/js/toastAlert'

export default {
    name: 'TeachersAccountActionButton',

    data () {
        return {
            dialog: false
        }
    },

    props: ['item'],

    methods: {
      
    }

}
</script>