<template>
    <v-data-table
        :items="items"
        :headers="headers"
        :search="search"
    >
        <!-- ** TEACHER AVATAR  ** -->
        <template #item.firstname="{ item }">
            <teachers-table-profile 
                :item="item"
            />
        </template>

        <!-- ** EMAIL ** -->
        <template #item.email="{ item }">
            <span>
                <v-icon left>mdi-email</v-icon>
                {{ item.email }}
            </span>
        </template>

        <!-- ** CONTACT ** -->
        <template #item.phone="{ item }">
            <span>
                <v-icon left>mdi-phone</v-icon>
                {{ item.phone }}
            </span>
        </template>

        <!-- ** GENDER ** -->
        <template #item.gender="{ item }">
            <td @click.stop class="non-clickable">
                <v-icon left v-show="item.gender === 'Female'">mdi-gender-female</v-icon> 
                <v-icon left v-show="item.gender === 'Male'">mdi-gender-male</v-icon> 
                {{ item.gender === 'Male' ? 'Male' : 'Female' }}
            </td>
        </template>

        <!-- ** ACTIVE AND INACTIVE ** -->
        <template #item.is_active="{ item }">
            <td @click.stop class="non-clickable">
                <v-chip
                    :color="item.is_active ? 'success--text' : 'error--text'" 
                    small
                    label
                    style="background: none;"
                >
                    <v-icon left v-show="item.is_active" >hourglass_full</v-icon> 
                    <v-icon left v-show="!item.is_active">hourglass_empty</v-icon> 
                    {{ item.is_active ? 'Active' : 'Inactive' }}
                </v-chip>
            </td>
        </template>

        <!-- ** ACTION BUTTONS ** -->
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

    data () {
        return {
            dialog: false
        }
    },

    components: {
        TeachersActionButton: () => import('./TeachersActionButton'),
        TeachersTableProfile: () => import('./TeachersTableProfile')
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
.v-icon {
    font-size: 16px;
}
::v-deep .v-data-table-header{
  text-transform: uppercase;
}
</style>