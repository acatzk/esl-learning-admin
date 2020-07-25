<template>
    <div>
        <v-avatar 
            color="#eee" 
            class="mr-2 ma-1 avatar-pic" 
            @click="dialog = !dialog"
        >
            <v-img
                :src="teacherProfileImage(item)"
                :lazy-src="teacherProfileImage(item)"
                aspect-ratio="1"
                :class="mode ? 'grey lighten-2' : 'black'"
            >
                <template v-slot:placeholder>
                    <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                    >
                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                </template>
            </v-img> 
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

import { mapState } from 'vuex'

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

    computed: {
        ...mapState(['mode'])
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