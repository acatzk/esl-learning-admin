<template>
    <v-data-table
        :items="items"
        :headers="headers"
        :search="search"
    >
        <!-- ** TEACHER AVATAR  ** -->
        <template #item.firstname="{ item }">
            <v-avatar 
                color="#eee" 
                class="mr-2 ma-1 avatar-pic" 
                @click="dialog = !dialog"
            >
                <img
                    :src="teacherProfileImage(item)"
                    alt="profile-url"

                />     
            </v-avatar>
            <span>{{ capitalize(item.firstname) + " " + capitalize(item.lastname) }}</span>
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


         <!-- ** ACTION BUTTONS ** -->
        <template #item.id="{ item }">  
            <teachers-account-action-button 
                :item="item"
            />
        </template>

    </v-data-table>
</template>

<script>

export default {
    name: 'TeachersAccountTable',

    components: {
        TeachersAccountActionButton: () => import('./TeachersAccountActionButton')
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
        teacherProfileImage (profile) {
            if (profile.profile_url === null) {
                return 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQxs9QORl3noSnnXUQaU_Vlt3pbxfSy718YOuSIY3d3O69t3FeF&usqp=CAU'
            } else {
                return profile.profile_url
            }
        },
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