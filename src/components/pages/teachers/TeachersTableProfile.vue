<template>
    <div>
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

        <teachers-avatar-dialog-edit 
            :visible="dialog" 
            @close="dialog=false"
            :item="item"
        />

    </div>
</template>

<script>
export default {
    name: 'TeachersTableProfile',

    props: ['item'],

    components: {
        TeachersAvatarDialogEdit: () => import('./TeachersAvatarDialogEdit')
    },

    data () {
        return {
            dialog : false
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
.avatar-pic {
    cursor: pointer !important;
}
</style>