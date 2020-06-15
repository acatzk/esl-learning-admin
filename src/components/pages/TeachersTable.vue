<template>
    <v-data-table
        :items="items"
        :headers="headers"
        :search="search"
    >
        <template #item.is_active="{ item }">
            <v-chip label :color="item.is_active ? 'green white--text' : 'red white--text'" small>
                <v-icon left v-show="item.is_active" style="font-size: 15px;">hourglass_full</v-icon> 
                <v-icon left v-show="!item.is_active" style="font-size: 15px;">hourglass_empty</v-icon> 
                {{ item.is_active ? 'Active' : 'Inactive' }}
            </v-chip>
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