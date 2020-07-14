<template>
   <div>
        <v-btn 
            icon
            @click="dialog = !dialog"
        >
            <v-icon>search</v-icon>
        </v-btn>

        <v-dialog
            v-model="dialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
            scrollable
        >
            <v-card flat>
                <v-row>
                    <v-col cols="12">
                        <v-btn icon @click="dialog = !dialog" large>
                            <v-icon>chevron_left</v-icon>
                        </v-btn>
                        <v-text-field>
                            Search..
                        </v-text-field>
                    </v-col>
                </v-row>
            </v-card>
        </v-dialog>
   </div>
</template>

<script>
export default {
    name: 'ButtonSearch',

    data () {
        return {
            dialog: false
        }
    }
}
</script>