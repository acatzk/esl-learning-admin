<template>
    <div class="profile elevation-0">
        <v-row class="d-flex">
            <v-col cols="12" sm="8">
                <v-card
                    class="elevation-1"
                    :dark="mode ? false : true"
                >
                    <v-toolbar :dark="mode ? false : true" flat>

                        <v-toolbar-title class="d-flex">
                            <v-icon left>mdi-security</v-icon> Admin Profile
                        </v-toolbar-title>

                        <v-spacer></v-spacer>

                        <v-btn
                            small
                            depressed
                            outlined
                            text
                            icon
                            v-show="fbId !== $route.params.id"
                            to="/admin/settings"
                        >
                            <v-icon>mdi-chevron-left</v-icon>
                        </v-btn>
                        <v-btn  
                            v-show="fbId === $route.params.id"
                            small
                            depressed
                            outlined
                            text
                            :color="editable === false && !mode ? 'error white--text' : ''"
                            @click="editable = !editable"
                        >
                            <v-icon left v-show="editable === false">mdi-pencil</v-icon> 
                            <v-icon left v-show="editable === true">mdi-close</v-icon> 
                            {{ !editable ? 'Update' : 'Cancel' }}
                        </v-btn>

                    </v-toolbar>

                    <v-divider></v-divider>

                    <v-container>

                        <edit-profile  
                            :visible="editable" 
                            @close="editable=false"
                        /> <!-- Editable Profile view -->
                        
                    </v-container>
                </v-card>
            </v-col>

            <v-col cols="12" sm="4">

                <side-bar /> <!-- Sidebar Navigation -->

            </v-col>

        </v-row>
    </div>
</template>

<script>

import { fb } from '@/firebase'

import { mapState } from 'vuex'

export default {
    name: 'Profile',

    data () {
        return {
            editable: false,
            firebase_admin: fb.auth().currentUser,
            hasura_admin: [],
            fbId: fb.auth().currentUser.uid
        }
    },

    components: {
        EditProfile: () => import('@/components/pages/profile/EditProfile'),
        SideBar: () => import('@/components/pages/profile/SideBar')
    },

    computed: {
        ...mapState(['mode'])
    }
}
</script>

<style scoped lang="scss">

.v-btn {
    text-transform: capitalize;
}

</style>