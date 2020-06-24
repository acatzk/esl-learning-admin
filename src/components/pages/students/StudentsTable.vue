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
    },

    methods: {
        capitalize(s) {
            if (typeof s !== 'string') return ''
            return s.charAt(0).toUpperCase() + s.slice(1)
        }
    }

    
}
</script>


<style scoped>
::v-deep .v-data-table-header{
  text-transform: uppercase;
}
</style>