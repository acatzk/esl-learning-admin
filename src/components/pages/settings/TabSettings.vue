<template>
    <div class="tab-settings">
        <v-tabs horizontal fixed-tabs :color="mode ? 'indigo' : 'error'" :dark="mode ? 'error' : ''">
            <v-tab>
                <v-icon left>mdi-account-outline</v-icon>
                Account
            </v-tab>
            <v-tab dark>
                <v-icon left>mdi-shield-outline</v-icon>
                Administrators
            </v-tab>
            <v-tab>
                <v-icon left>mdi-account-multiple-outline</v-icon>
                Teachers
            </v-tab>
            <v-tab>
                <v-icon left>mdi-code-tags</v-icon>
                Developers Info
            </v-tab>

            <v-tab-item>

                <v-card :dark="mode ? 'error' : ''">

                    <account /> <!-- ACCOUNT SETTINGS -->

                </v-card>

            </v-tab-item>
            <v-tab-item>

                <v-card :dark="mode ? 'error' : ''">

                    <administrator /> <!-- ADMINISTRATOR SETTINGS -->

                </v-card>

            </v-tab-item>
            <v-tab-item>
                
                <v-card :dark="mode ? 'error' : ''">

                    <teachers-account /> <!-- TEACHERS ACCOUNT SETTINGS -->

                </v-card>

            </v-tab-item>
            <v-tab-item>

                <v-card :dark="mode ? 'error' : ''">

                    <dev-info /> <!-- DEVELOPERS INFORMATION -->

                </v-card>

            </v-tab-item>
        </v-tabs>
    </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
    name: 'TabSettings',

    data () {
        return {
            search: '',
        }
    },

    components: {
        Account: () => import('./admin-account/Account'),
        Administrator: () => import('./admin-profiles/Admin'),
        DevInfo: () => import('./developers-info/DevInfo'),
        TeachersAccount: () => import('./teachers-account/TeachersAccount')
    },

    computed: {
        ...mapState(['mode'])
    }
}
</script>

<style scoped>

header {
  padding: 15px;
  border-bottom: 1px solid #eee;
}

.v-tabs {
    border: none;
    box-shadow: none;
}

.v-tab {
    text-transform: capitalize;
}

</style>