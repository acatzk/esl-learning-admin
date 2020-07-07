<template>
    <div class="teachers-account">
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

            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn 
                        icon 
                        class="mt-3" 
                        large 
                        v-on="on"
                        depressed
                        v-bind="attrs"
                        color="primary"
                    >
                        <v-icon>mdi-information</v-icon>
                    </v-btn>
                </template>
                <span dense>This account will permanently deleted.</span>
            </v-tooltip>

            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn 
                        icon 
                        class="mt-3" 
                        large 
                        v-on="on"
                        depressed
                        v-bind="attrs"
                    >
                        <v-icon>mdi-reload</v-icon>
                    </v-btn>
                </template>
                <span>Reload</span>
            </v-tooltip>
        </div>

        <v-skeleton-loader
            type="table-tbody"
            class="mx-auto"
            tile
            v-if="$apollo.loading"
        ></v-skeleton-loader> 

        <teachers-account-table 
            v-else
            :items="teachers"
            :headers="headers"
            :search="search"
        />
    </div>
</template>

<script>

// Toast Alert Status
import { toastAlertStatus } from '@/assets/js/toastAlert'
import { TEACHERS_QUERY } from '@/graphql/queries/teachers'
import { TEACHERS_SUBSCRIPTION } from '@/graphql/subscriptions/teachers'

export default {
    name: 'TeachersAccount',

    data () {
        return {
            search: '',
            teachers: []
        }
    },

    components: {
        TeachersAccountTable: () => import('./TeachersAccountTable')
    },

    computed: {
        headers() {
            return [
                { text: 'Identity', value: 'firstname' },
                { text: 'Email', value: 'email' },
                { text: 'Contact', value: 'phone', sortable: false },
                { text: 'Gender', value: 'gender', sortable: false },
                { text: 'Delete', value: 'id', sortable: false },
            ]
        }
    },

    apollo: {
        teachers: {
            query: TEACHERS_QUERY,
            error (error) {
                this.error = toastAlertStatus('error', error)
            },
            subscribeToMore: {
                document: TEACHERS_SUBSCRIPTION,
                updateQuery (previousResult, { subscriptionData }) {
                    if (previousResult) {
                        return {
                            teachers: [
                                ...subscriptionData.data.teachers
                            ]
                        }
                    }
                }
            },
            result ({ data }) {
                this.teachers = data.teachers
            }
        }
    }

}
</script>

<style scoped>

</style>