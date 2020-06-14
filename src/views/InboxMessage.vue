<template>
    <div class="inbox-message">
        <div class="d-flex justify-space-between">
            <div class="mb-1">
                <v-btn 
                    to="/inbox" 
                    icon 
                    class="mr-2"
                >
                    <v-icon>chevron_left</v-icon>
                </v-btn>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn 
                            icon 
                            class="mr-2"
                            v-bind="attrs"
                            v-on="on"
                        >
                            <v-icon>email</v-icon>
                        </v-btn>
                    </template>
                    <span>Mark as Read</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn 
                            icon
                            class="mr-2"
                            v-bind="attrs"
                            v-on="on"
                        >
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </template>
                    <span>Delete Message</span>
                </v-tooltip>
            </div>
            <h4 style="position: relative; top: 5px; right: 10px;">Inbox message</h4>
        </div>
        <v-card outlined class="mx-auto">
            <v-row class="pa-5">
                <v-col cols="12" sm="4" lg="4" style="line-height: 40px;">
                    <div class="d-flex justify-center">
                        <v-avatar color="indigo">
                            <v-icon dark>mdi-account-circle</v-icon>
                        </v-avatar>
                    </div>
                    <div class="d-flex justify-center mt-2">
                        <h2>Joshua Galit</h2>
                    </div>
                   <div>
                        <div><v-icon>email</v-icon>: joshuaimalay@gmail.com</div>
                        <div><v-icon>phone</v-icon>: 1231231231</div>
                        <div><v-icon>date_range</v-icon>: July 20, 2020</div>
                        <div>
                            <v-btn color="deep-purple darken-4" width="100%" outlined>
                                <v-icon left>email</v-icon> Mark as Read
                            </v-btn>
                        </div>
                   </div>
                </v-col>
                <v-col cols="12" sm="8" lg="8">
                    <div class="d-flex justify-space-between">
                        <div class="caption">
                            Joshua Galit
                        </div>
                        <div class="caption">
                            Date on July 20, 2020 about 19 hours ago
                        </div>
                    </div>
                    <v-card flat style="overflow-y: scroll; height: 63vh; text-align: justify;">
                        <p class="pt-4 content-style mr-3" >
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit a ipsam adipisci quis deleniti optio nesciunt officiis laudantium eligendi, assumenda voluptate expedita! Sequi harum molestias mollitia asperiores. Provident eaque enim eveniet velit quos numquam expedita, quis fuga nisi ut? Quia praesentium expedita et minima nihil id voluptatum fugiat eos nisi omnis! Sunt illum sint, eius at accusantium ut magni facilis labore harum fugiat quos quis aperiam eaque doloremque nesciunt itaque distinctio minima perspiciatis non? Consectetur doloremque provident excepturi dicta repudiandae nulla quia assumenda necessitatibus adipisci esse inventore, eius, laboriosam pariatur officiis 
                        </p>
                    </v-card>
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'InboxMessage',

}
</script>

<style scoped lang="scss">
.content-style {
    white-space: pre-wrap; 
    word-wrap: break-word;
    font-family: inherit;
}
</style>