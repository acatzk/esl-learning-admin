<template>
    <v-menu offset-y transition="slide-x-transition">     
        <template v-slot:activator="{ on, attrs }">
            <v-btn 
                icon
                v-bind="attrs"
                v-on="on"
            >
                <v-icon>mdi-apps</v-icon>
            </v-btn>
        </template>
        <v-list class="mt-2">
            <v-container class="mx-2">
                <v-layout cols="6">
                    <v-flex>
                        <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn 
                                    icon 
                                    v-bind="attrs"
                                    v-on="on"
                                    to="/admin/inbox/messages"
                                >
                                    <v-icon>mdi-email-outline</v-icon>
                                </v-btn>
                              </template>
                            <span>Inbox</span>
                        </v-tooltip>
                    </v-flex>
                    <v-flex>
                        <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn 
                                    icon 
                                    v-bind="attrs"
                                    v-on="on"
                                    to="/admin/lessons"
                                >
                                    <v-icon>mdi-folder-multiple-outline</v-icon>
                                </v-btn>
                              </template>
                            <span>Lessons</span>
                        </v-tooltip>
                    </v-flex>
                    <v-flex>
                        <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn 
                                    icon 
                                    v-bind="attrs"
                                    v-on="on"
                                    to="/admin/teachers"
                                >
                                    <v-icon>mdi-account-multiple-outline</v-icon>
                                </v-btn>
                            </template>
                            <span>Teachers</span>
                        </v-tooltip>
                    </v-flex>
                </v-layout>
                <v-layout cols="6" class="mt-2">
                    <v-flex>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn 
                                    icon 
                                    v-bind="attrs"
                                    v-on="on"
                                    to="/admin/students"
                                >
                                    <v-icon>mdi-account-box-outline</v-icon>
                                </v-btn>
                            </template>
                            <span>Students</span>
                        </v-tooltip>
                    </v-flex>
                    <v-flex>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn 
                                    icon 
                                    v-bind="attrs"
                                    v-on="on"
                                    to="/admin/settings"
                                >
                                    <v-icon>mdi-earth</v-icon>
                                </v-btn>
                            </template>
                            <span>Settings</span>
                        </v-tooltip>
                    </v-flex>
                    <v-flex>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn 
                                    icon 
                                    v-bind="attrs"
                                    v-on="on"
                                    :to="`/admin/profile/${profile}`"
                                >
                                    <v-icon>mdi-account-outline</v-icon>
                                </v-btn>
                           </template>
                            <span>Profile</span>
                        </v-tooltip>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-list>
    </v-menu>
</template>

<script>

import { fb } from '@/firebase'

export default {
    name: 'AppOptions',

    data () {
        return {
            profile: fb.auth().currentUser.uid
        }
    }
}
</script>