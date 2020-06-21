<template>
    <v-data-table
        :items="items"
        :headers="headers"
        :search="search"
    >
        <!-- ** TEACHER AVATAR  ** -->
        <template #item.firstname="{ item }">
            <v-avatar color="indigo" class="mr-2 ma-1">
                <img
                    :src="item.profile_url === null ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQxs9QORl3noSnnXUQaU_Vlt3pbxfSy718YOuSIY3d3O69t3FeF&usqp=CAU' : item.profile_url"
                    alt="profile-url"
                />
            </v-avatar>
            <span>{{ capitalize(item.firstname) + " " + capitalize(item.lastname) }}</span>
        </template>

        <!-- ** EMAIL ** -->
        <template #item.email="{ item }">
            <span>
                <v-icon>mdi-email</v-icon>
                {{ item.email }}
            </span>
        </template>

        <!-- ** CONTACT ** -->
        <template #item.phone="{ item }">
            <span>
                <v-icon>mdi-phone</v-icon>
                {{ item.phone }}
            </span>
        </template>

        <!-- ** GENDER ** -->
        <template #item.gender="{ item }">
            <v-btn text small :color="item.gender === 'male' ? 'primary white--text' : 'pink white--text'" >
                <v-icon left v-show="item.gender === 'female'">mdi-gender-female</v-icon> 
                <v-icon left v-show="item.gender === 'male'">mdi-gender-male</v-icon> 
                {{ item.gender === 'male' ? 'Male' : 'Female' }}
            </v-btn>
        </template>

        <!-- ** ACTIVE AND INACTIVE ** -->
        <template #item.is_active="{ item }">
            <v-btn text small :color="item.is_active ? 'success white--text' : 'error white--text'" >
                <v-icon left v-show="item.is_active" >hourglass_full</v-icon> 
                <v-icon left v-show="!item.is_active">hourglass_empty</v-icon> 
                {{ item.is_active ? 'Active' : 'Inactive' }}
            </v-btn>
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
</style>