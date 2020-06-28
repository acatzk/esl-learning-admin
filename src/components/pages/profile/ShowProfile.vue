<template>
    <v-row class="ma-3">
        <v-col cols="12" sm="6" md="4">
            <v-chip
                class="subtitle-1 ma-2"
                text
                style="background: none;"
            >
                <v-avatar>
                    <v-icon>mdi-account-outline</v-icon>
                </v-avatar>
                Firstname
            </v-chip>
            <v-divider></v-divider>
        </v-col>
        <v-col cols="12" sm="6" md="4">
            <v-chip
                class="subtitle-1 ma-2"
                text
                style="background: none;"
            >
                <v-avatar>
                    <v-icon>mdi-account-outline</v-icon>
                </v-avatar>
                Middlename
            </v-chip>
            <v-divider></v-divider>
        </v-col>
        <v-col cols="12" sm="6" md="4">
            <v-chip
                class="subtitle-1 ma-2"
                text
                style="background: none;"
            >
                <v-avatar>
                    <v-icon>mdi-account-outline</v-icon>
                </v-avatar>
                Lastname
            </v-chip>
            <v-divider></v-divider>
        </v-col>
        <v-col cols="12" sm="6">
            <v-chip
                class="subtitle-1 ma-2"
                text
                style="background: none;"
            >
                <v-avatar class="mr-2">
                    <v-icon>mdi-hospital-building</v-icon>
                </v-avatar>
                Company
            </v-chip>
            <v-divider></v-divider>
        </v-col>
        <v-col cols="12" sm="6">
            <v-chip
                class="subtitle-1 ma-2"
                text
                style="background: none;"
            >
                <v-avatar class="mr-2">
                    <v-icon>mdi-map-marker-circle</v-icon>
                </v-avatar>
                Location
            </v-chip>
            <v-divider></v-divider>
        </v-col>
        <v-col cols="12" sm="6">
            <v-chip
                class="subtitle-1 ma-2"
                text
                style="background: none;"
            >
                <v-avatar class="mr-2">
                    <v-icon>mdi-link</v-icon>
                </v-avatar>
                <a href="#" target="_blank">Website</a>
            </v-chip>
            <v-divider></v-divider>
        </v-col>
        <v-col cols="12" sm="6">
            <v-chip
                class="subtitle-1 ma-2"
                text
                style="background: none;"
            >
                <v-avatar class="mr-2">
                    <v-icon>mdi-twitter</v-icon>
                </v-avatar>
                <a href="https://twitter.com/" target="_blank">@username</a>
            </v-chip>
            <v-divider></v-divider>
        </v-col>
        <v-col cols="12" sm="12">
            <v-chip
                class="subtitle-1 ma-2 my-5"
                text
                style="background: none;"
            >
                <v-avatar class="mr-2">
                    <v-icon>mdi-paper-cut-vertical</v-icon>
                </v-avatar>
                Your Bio
            </v-chip>
            <v-divider></v-divider>
        </v-col>
    </v-row>
</template>

<style scoped>
a {
    text-decoration: none;
}
</style>