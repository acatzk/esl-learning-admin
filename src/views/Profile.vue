<template>
    <div class="profile">
        <v-row>
            <v-col cols="12" sm="6" md="4" lg="4">
                <v-card 
                    outlined
                    height="74vh"
                >
                    <v-avatar>
                        <img
                            src="https://cdn.vuetifyjs.com/images/john.jpg"
                            alt="John"
                            width="300"
                            style="margin: 50px;"
                        />
                    </v-avatar>
                     

                    <v-list-item three-line>

                        <v-list-item-content>
                            <div class="overline mb-4">OVERLINE</div>
                            <v-list-item-title class="headline mb-1">Headline 5</v-list-item-title>
                            <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
                        </v-list-item-content>

                    </v-list-item>

                    <v-card-actions>
                        <v-btn text>Button</v-btn>
                        <v-btn text>Button</v-btn>
                    </v-card-actions>


                </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="8" lg="8">
                <v-card 
                    outlined
                    height="74vh"
                >

                    <v-list-item-avatar
                        tile
                        class="mx-auto"
                        size="80"
                        color="grey"
                    ></v-list-item-avatar>

                    <v-list-item three-line>

                        <v-list-item-content>
                            <div class="overline mb-4">OVERLINE</div>
                            <v-list-item-title class="headline mb-1">Headline 5</v-list-item-title>
                            <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>

                    <v-card-actions>
                        <v-btn text>Button</v-btn>
                        <v-btn text>Button</v-btn>
                    </v-card-actions>

                </v-card>
            </v-col>
        </v-row>
    </div>
</template>