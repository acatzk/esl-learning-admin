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
                dense
            ></v-text-field>

            <v-spacer></v-spacer>

            <v-btn icon>
                <v-icon>mdi-apps</v-icon>
            </v-btn>


            <!-- Inbox Notifications -->
            <v-menu offset-y transition="slide-x-transition">
                
                <template v-slot:activator="{ on, attrs }">
                    <v-btn 
                        icon
                        v-bind="attrs"
                        v-on="on"
                    >
                        <v-icon>mdi-bell</v-icon>
                    </v-btn>
                </template>
                
                <v-list class="mt-3">
                    <v-list three-line dense style="max-width: 250px; max-height: 500px;">
                        <template v-for="(item, index) in notifications">
                            <v-subheader
                                v-if="item.header"
                                :key="`h-${index}`"
                                v-text="item.header"
                            ></v-subheader>

                            <v-list-item dense v-if="!item.header" :key="item.id" :to="`/admin/inbox/${item.id}`">
                                <v-list-item-avatar>
                                    <v-icon>mdi-email-outline</v-icon>
                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <v-list-item-title>
                                        {{ item.name }} - <span class="grey--text text--lighten-1">{{ item.created_at }}</span>
                                    </v-list-item-title>
                                    <v-list-item-subtitle>
                                        {{ item.message }}
                                    </v-list-item-subtitle>
                                    <v-divider :key="`d-${index}`"></v-divider>
                                </v-list-item-content>
                            </v-list-item>
                        </template>
                    </v-list>
                </v-list>

          </v-menu>

            <!-- Admin Avatar Profile -->
            <v-menu offset-y transition="slide-x-transition">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn 
                        v-if="$apollo.loading" 
                        icon 
                        :loading=true
                    >
                    </v-btn>
                    <v-btn
                        v-else
                        icon
                        large
                        v-bind="attrs"
                        v-on="on"
                    >
                        <v-avatar
                            size="32px"
                            item
                            color="indigo lighten-1"
                        >
                            <blur-image 
                                v-for="(pro, index) in profile" :key="index"
                                :src="profileImage(pro)"
                                alt="profile"
                            />
                        </v-avatar>
                    </v-btn>
                </template>

                <v-list dense class="mt-3">
                    <v-list-item
                        v-for="(opt, io) in profileOptions" 
                        :key="io"
                        :to="opt.to"
                        color="indigo darken-1"
                    >
                        <v-list-item-title>
                           <v-icon left>{{ opt.icon }}</v-icon> {{ opt.text }}
                        </v-list-item-title>
                    </v-list-item>

                    <v-list-item color="indigo darken-1" @click="adminLogout">
                        <v-list-item-title>
                           <v-icon left>mdi-logout</v-icon> Logout
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
            
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
            drawer: true,
            profileOptions: [
                { icon: 'mdi-account-outline', text: 'Profile', to: `/admin/profile/${fb.auth().currentUser.uid}` },
                { icon: 'mdi-earth', text: 'Settings', to: '/admin/settings' }
            ],
            notifications: [
                { 
                    header: 'Today July 10, 2020' 
                },
                {
                    id: '1',
                    name: 'Joshua Galit',
                    message: "Ali Connors I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
                    created_at: 'June 01, 2020'
                },
                {
                    id: '2',
                    name: 'James niel',
                    message: "to Alex, Scott, Jennifer Wish I could come, but I'm out of town this weekend.",
                    created_at: 'July 07, 2020'
                },
                {
                    id: '3',
                    name: 'Reynaldo Ramos',
                    message: "Sandra Adams Do you have Paris recommendations? Have you ever been?",
                    created_at: 'August 21, 2020'
                }
            ]
        }
    },

    components: {
        SideBar: () => import('./SideBar'),
        BlurImage: () => import('@/components/pages/settings/developers-info/BlurImage')
    },

    methods: {
        profileImage (profile) {
            if (profile.profileUrl === null) {
                return 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQxs9QORl3noSnnXUQaU_Vlt3pbxfSy718YOuSIY3d3O69t3FeF&usqp=CAU'
            } else {
                return profile.profileUrl
            }
        },
        adminLogout () {
            fb.auth()
              .signOut()
              .then(() => {
                    location.reload()
                })
              .catch(error => console.log(error))
        }
    },

    apollo: {
        profile: {
            query: ADMIN_PROFILE_IMAGE_QUERY,
            variables () {
                return {
                    id: fb.auth().currentUser.uid
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