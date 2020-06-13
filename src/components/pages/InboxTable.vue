<template>
    <v-data-table
        :items="items"
        :headers="headers"
        :search="search"
        show-expand
        @click:row="gotoMessage"
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
        <template #expanded-item="{ headers, item }">
            <td :colspan="headers.length">
                <v-row>
                    <v-col cols="12" md="2">
                        <b>{{ item.name }}</b>
                    </v-col>
                    <v-col cols="12" md="10">
                        <p>{{ item.message }}</p>
                    </v-col>
                </v-row>
                <v-row class="d-flex justify-center">
                    <v-btn
                        class="ma-2 white--text"
                        color="error"
                        small
                        outlined
                        @click="removedMessage(item)"
                    >
                        <v-icon left>delete_outline</v-icon> Remove
                    </v-btn>

                    <v-btn
                        small
                        class="ma-2"
                        color="success"
                        outlined
                        @click="markAsReadMessage(item)"
                    >
                        <v-icon left>mail_outline</v-icon> Mark as Read
                    </v-btn>
                </v-row>
            </td>
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
    },

    methods: {
        removedMessage(item) {
            if(confirm('Are you sure you want to delete?')) {
                alert(item.name)
            } 
        },
        markAsReadMessage(item) {
            alert(item.message)
        },
        gotoMessage(item) {
            this.$router.push(`/inbox/${item.id}`)
        }
    }
}
</script>


<style lang="scss" scoped>

</style>