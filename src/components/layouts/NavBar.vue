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
            <v-text-field
                solo-inverted
                flat
                rounded
                hide-details
                label="Search"
                prepend-inner-icon="search"
                color="#01579B"
                clearable
            ></v-text-field>

            <v-spacer></v-spacer>

            <v-btn icon>
                <v-icon>expand_more</v-icon>
            </v-btn>
        </v-app-bar>

        <v-navigation-drawer
            v-model="drawer"
            app
            clipped
        >
            <v-list>
                <template>
                    <v-list-item two-line class="hidden-lg-and-up">
                        <v-list-item-avatar>
                            <v-app-bar-nav-icon @click="drawer = !drawer" class="mr-2"></v-app-bar-nav-icon>
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
                        color="deep-purple darken-2"
                    >
                        <v-list-item-action v-if="item.heading">
                            {{ item.heading }}
                        </v-list-item-action>

                        <!-- ** INBOX ICON WITH BADGES NUMBER OF UNREAD MESSAGE ** -->
                        <v-list-item-action v-if="item.text === 'Inbox'">
                            <v-badge
                                bordered
                                color="error"
                                overlap
                                :content="inboxCounter ? inboxCounter.aggregate.count : 0"
                                v-if="inboxCounter.aggregate.count !== 0"
                            >
                                <v-icon>markunread</v-icon>
                            </v-badge>
                            <v-icon v-else>markunread</v-icon>
                        </v-list-item-action>
                        <!-- END INBOX ICON WITH BADGES NUMBER OF UNREAD MESSAGE -->

                        <v-list-item-action v-if="item.text !== 'Inbox'">
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-action>

                        <v-list-item-content>
                            <v-list-item-title 
                                class="font-weight-medium"
                            >
                                {{ item.text }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider :key="`i-${i}`" class="mx-2"></v-divider>
                </template>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>

import gql from 'graphql-tag'

export default {
    name: 'NavBar',
    data () {
        return {
            drawer: null,
            sidebarItems: [
                { heading: 'Management' },
                { icon: 'dashboard', text: 'Dashboard', to: '/' },
                { icon: 'markunread', text: 'Inbox', to: '/inbox' },
                { icon: 'library_books', text: 'Lessons', to: '/lessons' },
                { icon: 'supervisor_account', text: 'Teachers', to: '/teachers' },
                { icon: 'face', text: 'Students', to: '/students' },
                { heading: 'Account Setting' },
                { icon: 'settings', text: 'Settings', to: '/settings' },
                { icon: 'perm_contact_calendar', text: 'Profile', to: '/profile' },
                { icon: 'whatshot', text: 'Logout', to: '/logout' },
            ],
            inboxCounter: 0
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


<style scoped>
#nprogress .bar {
  background: white !important;
  /* box-shadow: none !important; */
}

</style>