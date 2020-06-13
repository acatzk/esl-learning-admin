<template>
    <v-data-table
        :items="items"
        :headers="headers"
        :search="search"
    >
        <template #item.created_at="{ item }">
            {{ item.created_at.split('T')[0] }}
        </template>
        <template #item.status="{ item }">
        <v-chip
            :color="item.status === 'Unread' ? 'red' : 'success'"
            text-color="white"
            small
        >
            <v-icon left>mail_outline</v-icon>
            {{ item.status }}
        </v-chip>
        </template>
    </v-data-table>
</template>

<script>
export default {
    name: 'InboxTable',

    props: {
        items: {
            type: Array,
            required: true
        },
        headers: {
            type: Array,
            required: true
        },
        search: {
            type: String
        }
    }
}
</script>