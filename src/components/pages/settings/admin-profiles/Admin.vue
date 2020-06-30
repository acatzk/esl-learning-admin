<template>
    <div class="profile-setting">
        <header class="d-flex justify-space-between">
            <v-toolbar-title>
                <v-icon right>mdi-account-box</v-icon> Administrator Settings
            </v-toolbar-title>
            <v-btn small depressed @click.stop="dialog = true">
               <v-icon center>mdi-plus</v-icon>
            </v-btn>   
        </header>

        <!-- ADMIN-DIALOG ADD AND EDIT -->
        <admin-dialog 
            :visible="dialog" @close="dialog = false"
            :modalType="`add`"
            :item="item"
        />

        <v-card flat>
            <!-- ** SEARCH TEXT FIELD ** -->
            <v-text-field
                label="Search"
                filled
                class="mx-3"
                append-icon="search"
                dense
                rounded
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
                    'id': '123455678',
                    'email': 'joshuaimalay@gmail.com',
                    'password': 'ilusmdm123'
                },
                {
                    'id':'754321',
                    'email': 'jeromevillaruel@gmail.com',
                    'password': 'veoscriptofficial'
                }
            ],
            dialog: false,
            item: [
                { email: null },
                { password: null }
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
                { text: 'Email', value: 'email' },
                { text: 'Password', value: 'password' },
                { text: 'Options', value: 'id' }
            ]
        }
    }
}
</script>

<style scoped lang="scss">
.profile-setting {
    background: white;
    border: 1px solid #eee;
}
.profile-setting {
    header {
        padding: 15px;
        border-bottom: 1px solid #eee;
    }
    .v-btn-toggle {
        .v-btn {
            text-transform: capitalize;
        }
    }
}
</style>