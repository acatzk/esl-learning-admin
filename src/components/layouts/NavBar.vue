<template>
    <div>
        <v-app-bar
            app
            clipped-left
            flat
            color="deep-purple darken-4"
            dark
        >
            <v-app-bar-nav-icon @click="drawer = !drawer" class="mr-2">
            </v-app-bar-nav-icon>
            
            <router-link to="/" style="text-decoration: none; color: #eee;">
                <span class="hidden-md-and-up mr-3">
                    <v-icon>security</v-icon>
                </span>
                <span class="title hidden-sm-and-down mr-3">
                    <v-icon>security</v-icon>
                    Vic<span class="font-weight-light"> Admin</span>
                </span>
            </router-link>

            <v-spacer></v-spacer>

            <v-text-field
                solo-inverted
                flat
                tile
                hide-details
                label="Search"
                append-icon="search"
                color="#01579B"
            ></v-text-field>

            <v-spacer></v-spacer>

            <v-btn icon>
                <v-icon>mdi-apps</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>mdi-bell</v-icon>
            </v-btn>
            <v-btn
                icon
                large
            >
                <v-avatar
                size="32px"
                item
                >
                <v-img
                    src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
                    alt="Vuetify"
                ></v-img></v-avatar>
            </v-btn>
            
        </v-app-bar>

        <side-bar 
            :visible="drawer" @close="drawer = false"
        />
        
    </div>
</template>

<script>

export default {
    name: 'NavBar',

    data () {
        return {
            drawer: true
        }
    },

    components: {
        SideBar: () => import('./SideBar')
    }

}
</script>


<style scoped>
#nprogress .bar {
  background: white !important;
  /* box-shadow: none !important; */
}

</style>