<template>
    <div class="profile elevation-0">
        <v-row class="d-flex">
            <v-col cols="12" sm="8">
                <v-card
                    class="elevation-1"
                    style="background: white;"
                >
                    <v-container>
                       <header class="elevation-0 d-flex justify-space-between">
                           <div class="d-inline">
                                <v-icon left>mdi-security</v-icon>
                                <span class="title" style="position: relative; top: 4px;">
                                   CEO <span class="font-weight-light hidden-sm-and-down">Profile</span>
                                </span>&nbsp;
                                <small class="business hidden-sm-and-down" style="position: relative; top: 4px;">{{ firebase_admin.email }}</small>
                           </div>
                            <v-btn  
                                small
                                depressed
                                outlined
                                text
                                :color="editable === false ? 'primary white--text' : ''"
                                @click="editable = !editable"
                            >
                               <v-icon left v-show="editable === false">mdi-pencil</v-icon> 
                               <v-icon left v-show="editable === true">mdi-close</v-icon> 
                               {{ !editable ? 'Update Info' : 'Cancel' }}
                            </v-btn>
                       </header>

                        <edit-profile  
                            :visible="editable" 
                            @close="editable=false"
                        /> <!-- Editable Profile view -->
                        
                    </v-container>
                </v-card>
            </v-col>

            <v-col cols="12" sm="4">

                <side-bar /> <!-- Sidebar Navigation -->

            </v-col>

        </v-row>
    </div>
</template>

<script>

import { fb } from '@/firebase'

export default {
    name: 'Profile',

    data () {
        return {
            editable: false,
            firebase_admin: fb.auth().currentUser,
            hasura_admin: []
        }
    },

    components: {
        EditProfile: () => import('@/components/pages/profile/EditProfile'),
        SideBar: () => import('@/components/pages/profile/SideBar')
    }
}
</script>

<style scoped lang="scss">

.v-btn {
    text-transform: capitalize;
}

header {
    width: 90%;
    margin: auto;
    padding: 20px;
    position: relative;
    bottom: 20px;
    border-radius: 15px;
    background: #f1f8ff;
    border: 1px solid #c8e1ff;

    .title {
        color: rgb(66, 66, 66);
    }
    .business {
        color: rgb(66, 66, 66);
        font-style: italic;
    }
    .v-btn {
        text-transform: capitalize;
    }
}

</style>