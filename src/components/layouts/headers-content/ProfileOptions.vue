<template>
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
                    :color="mode ? 'indigo lighten-1' : ''"
                >
                    <v-img
                        v-for="(pro, index) in profile" :key="index"
                        :src="profileImage(pro)"
                        :lazy-src="profileImage(pro)"
                        aspect-ratio="1"
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
            </v-btn>
        </template>

        <v-list dense class="mt-2" :dark="mode ? false : true">
            <v-list-item
                v-for="(opt, io) in profileOptions" 
                :key="io"
                :to="opt.to"
                :color="mode ? 'indigo darken-1' : ''"
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
</template>

<script>

import { fb } from '@/services'

import { ADMIN_PROFILE_IMAGE_QUERY } from '@/graphql/queries/profile'

export default {
    name: 'ProfileOptions',

    props: ['mode'],

    data () {
        return {
             profileOptions: [
                { icon: 'mdi-account-outline', text: 'Profile', to: `/admin/profile/${fb.auth().currentUser.uid}` },
                { icon: 'mdi-earth', text: 'Settings', to: '/admin/settings' }
            ]
        }
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