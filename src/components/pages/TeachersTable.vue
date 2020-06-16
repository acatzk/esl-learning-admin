<template>
    <v-data-table
        :items="items"
        :headers="headers"
        :search="search"
    >
        <template #item.firstname="{ item }">
            <v-avatar color="indigo" class="mr-2 ma-1">
                <img
                    src="https://avatars0.githubusercontent.com/u/38458781?s=460&u=d2e21173ef861da3d8ca3a292398cbc0c6f7c000&v=4"
                    alt="John"
                />
            </v-avatar>
            <span>{{`${item.firstname} ${item.lastname}`}}</span>
        </template>
        <template #item.is_active="{ item }">
            <v-btn text small :color="item.is_active ? 'success white--text' : 'error white--text'" >
                <v-icon left v-show="item.is_active" style="font-size: 15px;">hourglass_full</v-icon> 
                <v-icon left v-show="!item.is_active" style="font-size: 15px;">hourglass_empty</v-icon> 
                {{ item.is_active ? 'Active' : 'Inactive' }}
            </v-btn>
        </template>
        <template #item.id="{ item }">  
            <teachers-action-button 
                :item="item"
            />
        </template>
    </v-data-table>
</template>

<script>

export default {
    name: 'TeachersTable',

    components: {
        TeachersActionButton: () => import('./TeachersActionButton')
    },

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

<style scoped>
.v-btn {
    text-transform: capitalize;
}
</style>