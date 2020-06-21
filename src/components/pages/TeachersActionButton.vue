<template>
    <v-btn-toggle>
        <v-tooltip top color="primary">
            <template v-slot:activator="{ on, attrs }">
                <v-btn 
                    text
                    v-bind="attrs"
                    v-on="on"
                    small 
                    :class="item.id" 
                    color="primary"
                >
                <v-icon>remove_red_eye</v-icon>
            </v-btn>
            </template>
            <span>View</span>
        </v-tooltip>
        <v-tooltip top color="warning">
            <template v-slot:activator="{ on, attrs }">
                <v-btn 
                    v-bind="attrs"
                    v-on="on"
                    small 
                    text
                    :class="item.id"
                    color="warning"
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
                    text
                    color="error"
                >
                    <v-icon>delete_outline</v-icon>
                </v-btn>
            </template>
            <span>Delete</span>
        </v-tooltip>
    </v-btn-toggle>
</template>


<script>
export default {
    name: 'TeachersActionButton',

    props: {
        item: {
            type: String,
            required: true
        }
    }
}
</script>