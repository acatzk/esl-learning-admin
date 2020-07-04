<template>
    <div class="sidebar-setting">
        <v-card class="elevation-0">
            <template>
                <v-list-item two-line>

                    <v-list-item-avatar>
                        <v-skeleton-loader
                            type="avatar"
                            v-if="$apollo.loading"
                        ></v-skeleton-loader> 
                        <img 
                            v-else
                            src="https://avatars0.githubusercontent.com/u/38458781?s=400&u=d2e21173ef861da3d8ca3a292398cbc0c6f7c000&v=4"
                        >
                    </v-list-item-avatar>

                    <v-list-item-content
                        v-if="$apollo.loading"
                    >
                        <v-list-item-title>
                            <v-skeleton-loader
                                type="sentences"
                                style="background: transparent;"
                            ></v-skeleton-loader> 
                        </v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-content 
                        v-else
                        v-for="(admin, index) in administraotors" :key="index"
                    >
                        <v-list-item-title 
                            class="font-weight-medium"
                        >
                            {{ capitalize(`${admin.firstname}`) + " " + capitalize(`${admin.middlename}`) + " " + capitalize(`${admin.lastname}`) }}
                        </v-list-item-title>
                        <small class="small">General settings</small>
                    </v-list-item-content>
                </v-list-item>
            </template>

            <v-divider></v-divider>
            <v-list dense rounded>
                <v-list-item
                    v-for="item in items"
                    :key="item.title"
                    :to="item.to"
                    color="orange darken-4"
                >
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-card>
    </div>
</template>

<script>

import { fb } from '@/firebase'

import { PROFILE_QUERY } from '@/graphql/queries/profile'

import { PROFILE_SUBSCRIPTION } from '@/graphql/subscriptions/profile'

export default {
    name: 'SideBar',

    data () {
        return {
            items: [
                { title: 'Account', icon: 'mdi-account-circle', to: '/admin/settings/account' },
                { title: 'Administrators', icon: 'mdi-security', to: '/admin/settings/admins' },
                { title: 'Teachers', icon: 'mdi-folder-account', to: '/admin/settings/teachers' },
                { title: 'Security', icon: 'mdi-security-network', to: '/admin/settings/security' },
                { title: 'Security log', icon: 'mdi-key-variant', to: '/admin/settings/security-log' },
                { title: 'Emails', icon: 'mdi-email-open', to: '/admin/settings/emails' },
                { title: 'Notifications', icon: 'mdi-bell-ring', to: '/admin/settings/notications' },
                { title: 'Billings', icon: 'mdi-deskphone', to: '/admin/settings/billings' },
                { title: 'Developers Info', icon: 'mdi-code-tags', to: '/admin/settings/developers-info' },
            ],
            firebase_admin: fb.auth().currentUser,
            administraotors: []
        }
    },

    methods: {
        capitalize(s) {
            if (typeof s !== 'string') return ''
            return s.charAt(0).toUpperCase() + s.slice(1)
        }  
    },

    apollo: {
        administrators: {
            query: PROFILE_QUERY,
            variables () {
                return {
                    id: this.firebase_admin.uid
                }
            },
            subscribeToMore: {
                document: PROFILE_SUBSCRIPTION,
                variables () {
                    return {
                        id: this.firebase_admin.uid
                    }
                },
                updateQuery(previousResult, { subscriptionData }) {
                    if (previousResult) {
                        return {
                            administrators: [
                                ...subscriptionData.data.administrators
                            ]
                        }
                    }
                }
            },
            result ({ data }) {
                this.administraotors = data.administrators
            }
        }
    }

}
</script>

<style scoped>
/* 
.sidebar-setting {
    position: fixed;
} */

.v-card {
    height: 80vh; 
    background: transparent;
}

.v-list {
    background: transparent;
}

</style>