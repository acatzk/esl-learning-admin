<template>
    <v-data-table
        :items="items"
        :headers="headers"
        :search="search"
    >
        <!-- ** STUDENT IDENTITY  ** -->
        <template #item.firstname="{ item }">
            <v-icon left>mdi-account-box</v-icon> {{ capitalize(item.firstname) + " " + capitalize(item.lastname) }}
        </template>

        <!-- ** EMAIL ** -->
        <template #item.email="{ item }">
            <span>
                <v-icon>mdi-email</v-icon>
                {{ item.email }}
            </span>
        </template>

         <!-- ** CONTACT ** -->
        <template #item.contact="{ item }">
            <span>
                <v-icon>mdi-phone</v-icon>
                {{ item.contact }}
            </span>
        </template>


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
.v-btn {
    text-transform: capitalize;
}
.v-icon {
    font-size: 16px;
}
::v-deep .v-data-table-header{
  text-transform: uppercase;
}
</style>