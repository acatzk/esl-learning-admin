<template>
    <div class="sidebar-setting">
        <v-card
            style="height: 80vh;"
            class="elevation-1"
        >
            <template>
                <v-list-item two-line>
                    <v-list-item-avatar>
                        <img src="https://avatars0.githubusercontent.com/u/38458781?s=400&u=d2e21173ef861da3d8ca3a292398cbc0c6f7c000&v=4">
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title class="font-weight-medium">Joshua Galit</v-list-item-title>
                        <small class="small">Personal settings</small>
                    </v-list-item-content>
                </v-list-item>
            </template>

            <v-divider></v-divider>
            <v-list dense>
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
  export default {
    data () {
      return {
        items: [
          { title: 'Admin Profiles', icon: 'mdi-tag-faces', to: '/admin/settings/profile' },
          { title: 'Account', icon: 'mdi-account-circle', to: '/admin/settings/account' },
          { title: 'Teachers', icon: 'mdi-folder-account', to: '/admin/settings/teachers' },
          { title: 'Security', icon: 'mdi-security-network', to: '/admin/settings/security' },
          { title: 'Security log', icon: 'mdi-key-variant', to: '/admin/settings/security-log' },
          { title: 'Emails', icon: 'mdi-email-open', to: '/admin/settings/emails' },
          { title: 'Notifications', icon: 'mdi-bell-ring', to: '/admin/settings/notications' },
          { title: 'Billings', icon: 'mdi-deskphone', to: '/admin/settings/billings' },
          { title: 'Developers Info', icon: 'mdi-code-tags', to: '/admin/settings/developers-info' },
        ],
      }
    },
  }
</script>