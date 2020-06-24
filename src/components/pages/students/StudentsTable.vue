<template>
    <v-data-table
        :items="items"
        :headers="headers"
        :search="search"
    >

    </v-data-table>
</template>

<script>
export default {
    name: 'StudentsTable',

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