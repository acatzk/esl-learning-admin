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
            <v-text-field
                solo-inverted
                flat
                rounded
                hide-details
                label="Search"
                prepend-inner-icon="search"
                color="#01579B"
                clearable
            ></v-text-field>

            <v-spacer></v-spacer>

            <v-btn icon>
                <v-icon>expand_more</v-icon>
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