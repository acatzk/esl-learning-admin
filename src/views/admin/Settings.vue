<template>
    <div class="elevation-0">
        <v-row>
            <v-col cols="12" sm="9">

                <router-view></router-view> <!-- Dynamic setting view -->

            </v-col>
            <v-col cols="12" sm="3">

                <side-bar /> <!-- SideBar vue component -->

            </v-col>
        </v-row>
    </div>
</template>


<script>
export default {
    name: 'Settings',

    components: {
        SideBar: () => import('@/components/pages/settings/SideBar')
    }
}
</script>