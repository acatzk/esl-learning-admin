<template>
    <div>
        <v-app-bar
            app
            clipped-left
            flat
            :color="mode ? 'deep-purple darken-4' : ''"
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

            <!-- Teacher search show only in large scale -->
            <text-search 
                :mode="mode"
                class="hidden-sm-and-down"
            />

            <v-spacer></v-spacer>

            <!-- Button Search show only in small scale like cellphone -->
            <button-search 
                class="hidden-md-and-up"
            />

            <!-- Apps Link Options -->
            <app-options />

            <!-- Inbox Notifications -->
            <notifications />

            <!-- Admin Avatar Profile -->
            <profile-options />

            <!-- Light and Dark mode -->
            <v-switch 
                v-model="mode" 
                class="mt-5"
                color="white"
            ></v-switch>
            
        </v-app-bar>

        <side-bar 
            :visible="drawer" @close="drawer = false"
            :mode="mode"
        />
        
    </div>
</template>

<script>

export default {
    name: 'NavBar',

    data () {
        return {
            drawer: true,
            mode: true
        }
    },

    components: {
        SideBar: () => import('./SideBar'),
        ProfileOptions: () => import('./headers-content/ProfileOptions'),
        Notifications: () => import('./headers-content/Notifications'),
        AppOptions: () => import('./headers-content/AppOptions'),
        TextSearch: () => import('./headers-content/TextSearch'),
        ButtonSearch: () => import('./headers-content/ButtonSearch')
    },
    

}
</script>


<style scoped>
#nprogress .bar {
  background: white !important;
  /* box-shadow: none !important; */
}

</style>