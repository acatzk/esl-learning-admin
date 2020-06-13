<template>
    <div class="inbox-message">
        <v-card-title class="d-flex justify-center">
            <h4>
                <v-icon>markunread</v-icon> Inbox message 
            </h4>
        </v-card-title>
        <div class="mb-1">
            <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn 
                        to="/inbox" 
                        icon 
                        class="mr-2"
                        v-bind="attrs"
                        v-on="on"
                    >
                        <v-icon>chevron_left</v-icon>
                    </v-btn>
                </template>
                <span>Back to Inbox</span>
            </v-tooltip>
            <v-tooltip top>
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
            <v-tooltip top>
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
        <v-card outlined class="mx-auto" height="60vh">
            <v-row>
                <v-col cols="6">
                    <h2>Joshua Galit</h2>
                </v-col>
                <v-col cols="6">
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus fugiat iusto esse odio. Distinctio, explicabo aliquid, cupiditate tempore, veniam nobis aperiam quos dolore error perspiciatis magni. Voluptas quos aut quibusdam necessitatibus dolore in laborum quam omnis fugiat, voluptate culpa, magni aliquam ipsam similique, ipsa eum quis. Quas, numquam? Mollitia, deleniti.</p>
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>

<script>
export default {
    data: () => ({
        items: [
            {
                text: 'Inbox',
                disabled: false,
                to: '/inbox',
            },
            {
                text: 'Message',
                disabled: true
            },
        ],
    })
}
</script>

<style scoped lang="scss">

</style>