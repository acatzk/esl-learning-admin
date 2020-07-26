<template>
    <v-menu offset-y>
        <template v-slot:activator="{ on }">
                <v-text-field
                    v-on="on"
                    :solo="mode ? false : true"
                    :solo-inverted="mode ? true : false"
                    flat
                    rounded
                    hide-details
                    label="Search"
                    prepend-inner-icon="search"
                    :color="mode ? 'deep-purple darken-4' : ''"
                    dense
                    autocomplete="off"
                    v-model="state"
                    @focus="modal = true"
                ></v-text-field>
        </template>
        <v-list 
            :dark="mode ? false : true"
            v-if="filteredStates && modal"
        >
            <v-list-item-group>
                <v-list-item
                    v-for="filtered in filteredStates" :key="filtered.id"
                    :to="filtered.to"
                    @click="setState(filtered)"
                >
                    <v-list-item-avatar>
                        <v-icon>{{ filtered.icon }}</v-icon>
                    </v-list-item-avatar>

                    <v-list-item-content>
                        {{ filtered.text }}
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>   
    </v-menu>
</template>

<script>
export default {
    name: 'TextSearch',

    props: ['mode'],

    data () {
        return {
            states: [
                { id: '1', icon: 'mdi-cube-outline', text: 'Dashboard', to: '/admin/dashboard' },
                { id: '2', icon: 'mdi-email-outline', text: 'Inbox', to: '/admin/inbox/messages' },
                { id: '3', icon: 'mdi-folder-multiple-outline', text: 'Lessons', to: '/admin/lessons' },
                { id: '4', icon: 'mdi-account-multiple-outline', text: 'Teachers', to: '/admin/teachers' },
                { id: '5', icon: 'mdi-account-box-outline', text: 'Students', to: '/admin/students' },
                { id: '6', icon: 'mdi-earth', text: 'Settings', to: '/admin/settings' }
            ],
            filteredStates: [],
            modal: false,
            state: ''
        }
    },

    mounted () {
        this.filterStates()
    },

    methods: {
        filterStates () {
            if (this.state.length === 0) {
                this.filteredStates = this.states
            }
            this.filteredStates = this.states.filter(state => {
                return state.text.toLowerCase().startsWith(this.state.toLowerCase())
            })
        },
        
        setState(state) {
            this.state = state.text
            this.modal = false
        }
    },

    watch: {
        state() {
            this.filterStates()
        }
    }
}
</script>