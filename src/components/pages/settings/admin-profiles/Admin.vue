<template>
    <div class="profile-setting">
        <!-- ADMIN-DIALOG ADD AND EDIT -->
        <admin-dialog 
            :visible="dialog" @close="dialog = false"
            :modalType="`add`"
            :item="item"
        />

        <v-card>
            <div class="d-flex justify-content-center align-items-center mx-5 mt-5">
                <!-- ** SEARCH TEXT FIELD ** -->
                <v-text-field
                    placeholder="Search"
                    filled
                    rounded
                    flat
                    v-model="search"
                    prepend-inner-icon="search"
                    style="position: relative; margin-right: 5px; top: 6px;"
                ></v-text-field>

                <v-btn class="mt-4" color="primary" medium depressed @click.stop="dialog = true">
                    <v-icon center>mdi-plus</v-icon>
                </v-btn> 
            </div>

             <!-- ** TEACHERS VUETIFY TABLE ** -->
            <admins-table 
                :items="admins"
                :headers="headers"
                :search="search"
            />

        </v-card>
    </div>
</template>


<script>

import { fb, db } from '@/firebase'

import { toastAlertStatus } from '@/assets/js/toastAlert'

export default {
    name: 'Admin',

    data () {
        return {
            search: '',
            admins: [
                {
                    'email': 'joshuaimalay@gamil.com',
                    'provider': true,
                    'created_at': 'June 10, 2020',
                    'uid': '1pLFxjNITScCFXRF9j3s7llf92j2'
                },
                 {
                    'email': 'jeromevillaruel@gamil.com',
                    'provider': true,
                    'created_at': 'June 20, 2020',
                    'uid': 'RwuqsMGuHUTMlYBv0eHyx7mZ2h32'
                }
            ],
            dialog: false,
            item: [
                { email: null },
                { created_at: null }
            ]
        }
    },

    components: {
        AdminsTable: () => import('./AdminsTable'),
        AdminDialog: () => import('./AdminDialog')
    },

    computed: {
        headers() {
            return [
                { text: 'Identifier', value: 'email' },
                { text: 'Provider', value: 'provider', sortable: false },
                { text: 'Created', value: 'created_at' },
                { text: 'User UID', value: 'uid' },
                { text: 'Options', value: 'id', sortable: false }
            ]
        }
    }
}
</script>

<style scoped lang="scss">
.profile-setting {
    border-top: 1px solid #eee;
    .v-card {
        box-shadow: none !important;
        -moz-box-shadow: none;
        -webkit-box-shadow: none;
    }
    .v-btn-toggle {
        .v-btn {
            text-transform: capitalize;
        }
    }
}
</style>