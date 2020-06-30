<template>
    <v-data-table
        :items="items"
        :headers="headers"
        :search="search"
    >
        <!-- ** EMAIL ** -->
        <template #item.email="{ item }">
            <span>
                <v-icon left>mdi-email</v-icon>
                {{ item.email }}
            </span>
        </template>

          <!-- ** CONTACT ** -->
        <template #item.password="{ item }">
            <span>
                <v-icon left>mdi-lock-open</v-icon>
                {{ item.password }}
            </span>
        </template>
    
        <!-- ** ACTION BUTTONS ** -->
        <template #item.id="{ item }">  
            <admins-action-button 
                :item="item"
            />
        </template>

    </v-data-table>
</template>

<script>
export default {
    name: 'AdminsTable',

    components: {
        AdminsActionButton: () => import('./AdminActionButton'),
        DateDisplay: () => import('../../DateDisplay')
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
    },

    methods: {
        capitalize(s) {
            if (typeof s !== 'string') return ''
            return s.charAt(0).toUpperCase() + s.slice(1)
        },
        getStudentAge(birth_date) {
            let today = new Date()
            let birthDate = new Date(birth_date)
            var age = today.getFullYear() - birthDate.getFullYear()
            let m = today.getMonth() - birthDate.getMonth()
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
            {
                age--;
            }
            return age
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