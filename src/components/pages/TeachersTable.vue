<template>
    <v-data-table
        :items="items"
        :headers="headers"
        :search="search"
    >
        <template #item.is_active="{ item }">
            <v-chip label :color="item.is_active ? 'success white--text' : 'error white--text'" small>
                <v-icon left v-show="item.is_active" style="font-size: 15px;">hourglass_full</v-icon> 
                <v-icon left v-show="!item.is_active" style="font-size: 15px;">hourglass_empty</v-icon> 
                {{ item.is_active ? 'Active' : 'Inactive' }}
            </v-chip>
        </template>
        <template #item.id="{ item }">  
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
    </v-data-table>
</template>

<script>
export default {
    name: 'TeachersTable',

    props: {
        items: {
            type: Array,
            required: true
        },
        headers: {
            type: Array,
            requried: true
        },
        search: {
            type: String,
            required: true
        }
    }
}
</script>