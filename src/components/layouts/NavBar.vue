<template>
    <div>
        <v-app-bar
            app
            clipped-left
            flat
            color="deep-purple darken-4"
            dark
        >
            <v-app-bar-nav-icon @click="drawer = !drawer" class="mr-2">
            </v-app-bar-nav-icon>
            
            <router-link to="/" style="text-decoration: none; color: #eee;">
                <span class="hidden-md-and-up mr-3">
                    <v-icon>security</v-icon>
                </span>
                <span class="title hidden-sm-and-down mr-3">
                    <v-icon>security</v-icon>
                    Vic<span class="font-weight-light"> Admin</span>
                </span>
            </router-link>

            <v-spacer></v-spacer>

            <v-text-field
                solo-inverted
                flat
                tile
                hide-details
                label="Search"
                append-icon="search"
                color="#01579B"
            ></v-text-field>

            <v-spacer></v-spacer>

            <v-btn icon>
                <v-icon>mdi-apps</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>mdi-bell</v-icon>
            </v-btn>
            <v-btn
                icon
                large
                v-for="(pro, index) in profile" :key="index"
            >
                <v-avatar
                    size="32px"
                    item
                    color="grey"
                >
                <v-img
                    :src="profileImage(pro)"
                    alt="Vuetify"
                ></v-img></v-avatar>
            </v-btn>
            
        </v-app-bar>

        <side-bar 
            :visible="drawer" @close="drawer = false"
        />
        
    </div>
</template>

<script>

import { fb } from '@/firebase'

import { ADMIN_PROFILE_IMAGE_QUERY } from '@/graphql/queries/profile'

export default {
    name: 'NavBar',

    data () {
        return {
            drawer: true
        }
    },

    components: {
        SideBar: () => import('./SideBar')
    },

    methods: {
        profileImage (profile) {
            if (profile.profileUrl === null) {
                return 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQxs9QORl3noSnnXUQaU_Vlt3pbxfSy718YOuSIY3d3O69t3FeF&usqp=CAU'
            } else {
                return profile.profileUrl
            }
        }
    },

    apollo: {
        profile: {
            query: ADMIN_PROFILE_IMAGE_QUERY,
            variables () {
                return {
                    id: fb.auth().currentUser ? this.$route.params.id : fb.auth().currentUser.uid
                }
            },
            updateQuery(previousResult, { subscriptionData }) {
                if (previousResult) {
                    return {
                        profile: [
                            ...subscriptionData.data.profile
                        ]
                    }
                }
            }
        }
    }

}
</script>


<style scoped>
#nprogress .bar {
  background: white !important;
  /* box-shadow: none !important; */
}

</style>