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
                               {{ !editable ? 'Edit Profile' : 'Cancel' }}
                            </v-btn>
                       </header>
                        
                         <!-- ** SKELETON LOADING FOR DATA ** -->
                        <v-skeleton-loader
                            type="list-item, list-item, list-item, list-item, list-item, list-item, list-item, list-item"
                            class="mx-auto"
                            tile
                            v-if="$apollo.loading"
                        ></v-skeleton-loader> 

                        <edit-profile  
                            v-else
                            :visible="editable" 
                            @close="editable=false"
                        /> <!-- Editable Profile view -->
                        
                    </v-container>
                </v-card>
            </v-col>

            <v-col cols="12" sm="4">
                <v-card
                    class="elevation-1 text-center card-profile"
                >
                    <v-container>            
                        <v-badge
                            bordered
                            bottom
                            color="success"
                            dot
                            offset-x="25"
                            offset-y="25"
                        >
                            <v-avatar size="140px" class="elevation-2">
                                <img
                                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                                    alt="John"
                                >
                            </v-avatar>
                        </v-badge>
                        <div 
                            class="content-profile mt-2"
                            v-for="(admin, index) in hasura_admin" :key="index"
                        >
                            <span class="company-name mb-2 text-uppercase">CEO / CO-FOUNDER - {{ admin.company ? ` ${admin.company} ` : 'Update your company'}}</span>
                            <div class="title mt-3 mb-3 text-uppercase">{{ admin.firstname ? `${admin.firstname} ${admin.middlename} ${admin.lastname}` : 'Update your fullname'}}</div>
                            <div class="message overflow-y-auto text-justify text-capitalize" style="height: 40vh;">
                                {{ admin.bio ? admin.bio : 'update your bio...' }}
                            </div>
                        </div>
                    </v-container>
                </v-card>
            </v-col>

        </v-row>
    </div>
</template>

<script>

import { fb } from '@/firebase'

import { PROFILE_QUERY } from '@/graphql/queries/profile'

import { PROFILE_SUBSCRIPTION } from '@/graphql/subscriptions/profile'

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
        EditProfile: () => import('@/components/pages/profile/EditProfile')
    },

    apollo: {
        administrators: {
            query: PROFILE_QUERY,
            variables () {
                return {
                    id: this.firebase_admin ? this.$route.params.id : this.firebase_admin.uid
                }
            },
            subscribeToMore: {
                document: PROFILE_SUBSCRIPTION,
                variables () {
                    return {
                        id: this.firebase_admin ? this.$route.params.id : this.firebase_admin.uid
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
                this.hasura_admin = data.administrators
            }
        }
    },
}
</script>

<style scoped lang="scss">

.card-profile {
    height: 79vh; 
    background: white;

    .company-name {
        font-size: 13px;
        color: grey;
    }

    .message {
        font-size: 15px;
        font-weight: lighter;
        color: grey;
    }

    .v-avatar {
        border: 4px solid  transparent;
        background: #f09433; 
        background: -moz-linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); 
        background: -webkit-linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); 
        background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); 
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f09433', endColorstr='#bc1888',GradientType=1 );
    }

}

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