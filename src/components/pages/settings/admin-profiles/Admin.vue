<template>
    <div class="profile-setting">
        <header class="d-flex justify-space-between">
            <v-toolbar-title>
               <span class="font-weight-medium">Admin Authentication</span>
            </v-toolbar-title>
            <v-btn color="primary" small depressed @click.stop="dialog = true">
               <v-icon center>mdi-plus</v-icon>
            </v-btn>   
        </header>

        <!-- ADMIN-DIALOG ADD AND EDIT -->
        <admin-dialog 
            :visible="dialog" @close="dialog = false"
            :modalType="`add`"
            :item="item"
        />

        <v-card>
            <!-- ** SEARCH TEXT FIELD ** -->
            <v-text-field
                label="Search"
                class="pa-5"
                prepend-icon="search"
                v-model="search"
                style="position: relative; top: 12px; border-radius: 50px;"
            ></v-text-field>

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
export default {
    name: 'Admin',

    data () {
        return {
            search: '',
            admins: [ 
                {
                    'id': '1pLFxjNITScCFXRF9j3s7llf92j2',
                    'email': 'joshuaimalay@gmail.com',
                    'provider': true,
                    'created_at': 'Jun 30, 2020',
                    'uid': '1pLFxjNITScCFXRF9j3s7llf92j2'
                },
                {
                    'id':'RwuqsMGuHUTMlYBv0eHyx7mZ2h32',
                    'email': 'jeromevillaruel@gmail.com',
                    'provider': true,
                    'created_at': 'Jun 28, 2020',
                    'uid': '1pLFxjNITScCFXRF9j3s7llf92j2'
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
    header {
        padding: 15px;
    }
    .v-card {
        border-radius: 10px;
    }
    .v-btn-toggle {
        .v-btn {
            text-transform: capitalize;
        }
    }
}
</style>