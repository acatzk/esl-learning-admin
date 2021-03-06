<template>
    <v-navigation-drawer
        v-model="show"
        app
        clipped
        :dark="mode ? false : true"
    >
        <v-list>
            <template>
                <v-list-item two-line class="hidden-lg-and-up">
                    <v-list-item-avatar>
                        <v-app-bar-nav-icon @click="show = !show" class="mr-2"></v-app-bar-nav-icon>
                    </v-list-item-avatar>

                    <v-list-item-content>
                    <router-link to="/" style="text-decoration: none;">
                        <span class="title" style="color: grey;">
                            <v-icon>security</v-icon>
                            Vic<span class="font-weight-light"> Admin</span>
                        </span>
                    </router-link>
                    </v-list-item-content>
                </v-list-item>
            </template>
            <template v-for="(item, i) in sidebarItems">
                <v-list-item 
                    link 
                    :key="i"
                    :to="item.to"  
                    :color="mode ? 'deep-purple darken-2' : ''"
                >
                    <!-- ** SIDEBAR HEADING ** -->
                    <v-list-item-action v-if="item.heading">
                        {{ item.heading }}
                    </v-list-item-action>

                    <!-- ** INBOX ICON WITH BADGES NUMBER OF UNREAD MESSAGE ** -->
                    <v-list-item-action v-if="item.text === 'Inbox'">
                        <v-badge
                            :bordered="mode ? true : false"
                            color="error"
                            overlap
                            :content="inboxCounter ? inboxCounter.aggregate.count : 0"
                            v-if="inboxCounter ? inboxCounter.aggregate.count !== 0 : 0"
                        >
                            <v-icon>mdi-email-outline</v-icon>
                        </v-badge>
                        <v-icon v-else>mdi-email-outline</v-icon>
                    </v-list-item-action>
                    <!-- END INBOX ICON WITH BADGES NUMBER OF UNREAD MESSAGE -->

                    <!-- DYNAMIC ICON EXCEPT INBOX ICON -->
                    <v-list-item-action v-if="item.text !== 'Inbox'">
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    
                    <v-list-item-content>
                        <v-list-item-title 
                            class="font-weight-medium"
                            v-if="item.text !== 'Logout'"
                        >
                            {{ item.text }}
                        </v-list-item-title>

                        <v-list-item-title 
                            class="font-weight-medium"
                            @click="adminLogout"
                            v-if="item.text === 'Logout'"
                        >
                            Logout
                        </v-list-item-title>
                    </v-list-item-content>
                    
                </v-list-item>
                <v-divider :key="`i-${i}`"></v-divider>
            </template>
        </v-list>
    </v-navigation-drawer>
</template>


<script>

import gql from 'graphql-tag'

import { fb } from '@/services'

export default {
    name: 'SideBar',

    props: ['visible', 'mode'],

    computed: {
      show: {
        get () {
          return this.visible
        },
        set (value) {
           if (!value) {
             this.$emit('close')
           }
        }
      }
    },

    data () {
        return {
            sidebarItems: [
                { heading: 'Management' },
                { icon: 'mdi-cube-outline', text: 'Dashboard', to: '/admin/dashboard' },
                { icon: 'mdi-email-outline', text: 'Inbox', to: '/admin/inbox/messages' },
                { icon: 'mdi-folder-multiple-outline', text: 'Lessons', to: '/admin/lessons' },
                { icon: 'mdi-account-multiple-outline', text: 'Teachers', to: '/admin/teachers' },
                { icon: 'mdi-account-box-outline', text: 'Students', to: '/admin/students' },
                { heading: 'Account Settings' },
                { icon: 'mdi-earth', text: 'Settings', to: '/admin/settings' },
                { icon: 'mdi-account-outline', text: 'Profile', to: `/admin/profile/${fb.auth().currentUser.uid}` },
                { icon: 'mdi-logout', text: 'Logout' },
            ],
            inboxCounter: 0
        }
    },

    methods: {
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
        $subscribe: {
            inboxCount: {
                query: gql`
                    subscription InboxCountQuery {
                        inboxCount: inboxes_aggregate(where: {status: {_eq: "unread"}}) {
                            aggregate {
                                count
                            }
                        }
                    }
                `,
                result ({ data }) {
                    this.inboxCounter = data.inboxCount
                }
            }
        }
    }
}
</script>