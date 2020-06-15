<template>
    <v-data-table
        :items="items"
        :headers="headers"
        :search="search"
    >
        <template #item.is_active="{ item }">
            <v-chip :color="item.is_active ? 'green white--text' : 'red white--text'" small>
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