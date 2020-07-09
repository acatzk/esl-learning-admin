<template>
    <v-card
        class="elevation-1 text-center card-profile"
    >
        <v-container>

            <v-skeleton-loader
                type="card"
                class="mx-auto"
                v-if="$apollo.loading"
            >
            </v-skeleton-loader>            
            <v-badge
                v-else
                bordered
                bottom
                color="success"
                dot
                offset-x="25"
                offset-y="25"
            >
                <v-avatar size="140px" class="elevation-2">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQxs9QORl3noSnnXUQaU_Vlt3pbxfSy718YOuSIY3d3O69t3FeF&usqp=CAU"
                        alt="John"
                    >
                </v-avatar>
            </v-badge>

                <!-- ** SKELETON LOADING FOR DATA ** -->
            <v-skeleton-loader
                type="list-item, list-item, list-item"
                class="mx-auto"
                tile
                v-if="$apollo.loading"
            ></v-skeleton-loader> 

            <div 
                v-else
                class="content-profile mt-2"
                v-for="(admin, index) in hasura_admin" :key="index"
            >
                <v-layout>
                    <v-flex class="mt-2">
                        <span>
                            <v-btn 
                                small 
                                depressed 
                                color="primary" 
                                @click="onPickFile"
                            >
                                <v-icon left>mdi-camera</v-icon> Upload Avatar
                            </v-btn>
                            <input type="file" style="display: none;" ref="fileInput">
                        </span>
                    </v-flex>
                </v-layout>
                <v-layout>
                    <v-flex class="mt-2">
                        <span class="company-name mb-2 text-uppercase">CEO / CO-FOUNDER - {{ admin.company ? ` ${admin.company} ` : 'Update your company'}}</span>
                        <div class="title mt-3 mb-3 text-uppercase">{{ admin.firstname ? `${admin.firstname} ${admin.middlename} ${admin.lastname}` : 'Update your fullname'}}</div>
                        <div class="message overflow-y-auto text-justify text-capitalize" style="height: 40vh;">
                            {{ admin.bio ? admin.bio : 'update your bio...' }}
                        </div>
                    </v-flex>
                </v-layout>
            </div>
        </v-container>
    </v-card>
</template>


<script>

import { fb } from '@/firebase'

import { PROFILE_QUERY } from '@/graphql/queries/profile'

import { PROFILE_SUBSCRIPTION } from '@/graphql/subscriptions/profile'

export default {
    name: 'SideBarProfile',

    data () {
        return {
            firebase_admin: fb.auth().currentUser,
            hasura_admin: []
        }
    },

    methods: {
        onPickFile () {
            alert('GOOD')
        }
    },
    
    apollo: {
        profile: {
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
                            profile: [
                                ...subscriptionData.data.profile
                            ]
                        }
                    }
                }
            },
            result ({ data }) {
                this.hasura_admin = data.profile
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
        border: 3px solid  transparent;
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

</style>