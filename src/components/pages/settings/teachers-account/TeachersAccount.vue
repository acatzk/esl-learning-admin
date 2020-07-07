<template>
    <div class="teachers-account">
        <v-card>
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
                        >
                            <v-icon>mdi-reload</v-icon>
                        </v-btn>
                    </template>
                    <span>Reload</span>
                </v-tooltip>
            </div>



        </v-card>
    </div>
</template>

<script>
export default {
    name: 'TeachersAccount',

    data () {
        return {
            search: ''
        }
    }
}
</script>

<style scoped>

</style>