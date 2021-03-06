<template>
    <v-card
        :dark="mode ? false : true"
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
                <v-avatar 
                    size="140px" 
                    class="elevation-2"
                    v-for="(pro, ind) in hasura_admin" :key="ind"
                >
                    <v-img
                        :src="profileDisplay(pro)"
                        :lazy-src="profileDisplay(pro)"
                        aspect-ratio="1"
                    >
                        <template v-slot:placeholder>
                            <v-row
                                class="fill-height ma-0"
                                align="center"
                                justify="center"
                            >
                            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                            </v-row>
                        </template>
                    </v-img> 
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
                                v-show="firebase_admin.uid === $route.params.id"
                                small 
                                depressed 
                                @click="dialog = true"
                            >
                                <v-icon left>mdi-camera</v-icon> Change Avatar
                            </v-btn>
                            <input type="file" style="display: none;" ref="fileInput">

                            <avatar-dialog 
                                :visible="dialog" @close="dialog = false"
                                :admins="hasura_admin"
                            />

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

import { mapState } from 'vuex'

import { fb } from '@/services'

import { toastAlertStatus } from '@/utils'

import { PROFILE_QUERY } from '@/graphql/queries/profile'

import { PROFILE_SUBSCRIPTION } from '@/graphql/subscriptions/profile'

export default {
    name: 'SideBarProfile',

    components: {
        AvatarDialog: () => import('./AvatarDialog')
    },

    data () {
        return {
            firebase_admin: fb.auth().currentUser,
            hasura_admin: [],
            dialog: false
        }
    },

    computed: {
        ...mapState(['mode'])
    },

    methods: {
        profileDisplay (profile) {
            if (profile.profileUrl === null) {
                return 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQxs9QORl3noSnnXUQaU_Vlt3pbxfSy718YOuSIY3d3O69t3FeF&usqp=CAU'
            } else {
                return profile.profileUrl
            }
        }
    },
    
    apollo: {
        profile: {
            query: PROFILE_QUERY,
            error (error) {
                toastAlertStatus('error', error)
            },
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
    }
}
</script>

<style scoped lang="scss">

.card-profile {
    height: 79vh; 

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