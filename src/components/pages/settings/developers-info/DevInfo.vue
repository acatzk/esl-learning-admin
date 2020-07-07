<template>
    <div class="dev-info">
        <v-container>
            <v-toolbar-title class="text-center font-weight-medium grey--text">
                <v-tooltip left>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn 
                            v-on="on"
                            v-bind="attrs"
                            href="https://github.com/acatzk/esl-learning-admin"
                            target="_blank"
                            icon
                            color="primary"
                        >
                            <v-icon>mdi-information</v-icon>
                        </v-btn>
                    </template>
                    <span dense>View this project source code.</span>
                </v-tooltip>
                    Developers Information
            </v-toolbar-title>

            <v-row>
                <v-col cols="12" sm="6" v-for="(dev, index) in developers" :key="index">
                    <v-card
                        class="mx-auto"
                        style="box-shadow: none;"
                    >
                        <blur-image
                            class="white--text align-end"
                            :src="dev.profileUrl"
                        >
                            <v-card-title>{{ dev.position }}</v-card-title>
                        </blur-image>

                        <v-card-subtitle class="pb-0">
                            <v-icon left>mdi-email</v-icon> {{ dev.email }}
                        </v-card-subtitle>

                        <v-card-text class="text--primary">
                            <div>
                                <v-icon left>mdi-account</v-icon> {{ dev.name }}
                            </div>

                            <div>
                                <v-icon left>location_on</v-icon> {{ dev.location }}
                            </div>
                            <div>
                                <v-icon left>mdi-link</v-icon> 
                                <a 
                                    :href="dev.website" 
                                    target="_blank"
                                    style="text-decoration: none;"
                                >
                                    {{ dev.website }}
                                </a>
                            </div>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-tooltip top color="#4267B2">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                        icon
                                        color="#4267B2"
                                        v-on="on"
                                        v-bind="attrs"
                                        :href="dev.fbLink"
                                        target="_blank"
                                    >
                                        <v-icon>mdi-facebook</v-icon>
                                    </v-btn>
                                </template>
                                <span>
                                    <v-icon left color="white">mdi-facebook</v-icon> Facebook
                                </span>
                            </v-tooltip>
                            <v-tooltip top color="#1DA1F2">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                        icon
                                        color="#1DA1F2"
                                        :href="dev.twitterLink"
                                        v-on="on"
                                        v-bind="attrs"
                                        target="_blank"
                                    >
                                        <v-icon>mdi-twitter</v-icon>
                                    </v-btn>
                                </template>
                                <span>
                                    <v-icon left color="white">mdi-twitter</v-icon> Twitter
                                </span>
                            </v-tooltip>
                            <v-tooltip top color="#333">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                        :href="dev.githubLink"
                                        icon
                                        color="#333"
                                        v-on="on"
                                        v-bind="attrs"
                                        target="_blank"
                                    >
                                        <v-icon>mdi-github</v-icon>
                                    </v-btn>
                                </template>
                                <span>
                                    <v-icon left color="white">mdi-github</v-icon> Github
                                </span>
                            </v-tooltip>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>


<script>
export default {
    name: 'DevInfo',

    components: {
        BlurImage: () => import('./BlurImage')
    },

    data () {
        return {
            developers: [
                {
                    id: 1,
                    profileUrl: 'https://avatars0.githubusercontent.com/u/38458781?s=460&u=d2e21173ef861da3d8ca3a292398cbc0c6f7c000&v=4',
                    position: 'Backend and Frontend Developer',
                    email: 'joshuaimalay@gmail.com',
                    name: 'Joshua Galit',
                    location: 'Anahawan Bato, Leyte',
                    website: 'https://www.josh-wang.ga/',
                    fbLink: 'https://www.facebook.com/profile.php?id=100016207784852',
                    twitterLink: 'https://twitter.com/angryboy_19',
                    githubLink: 'https://github.com/acatzk'
                },
                {
                    id: 2,
                    profileUrl: 'https://avatars0.githubusercontent.com/u/26340308?s=460&u=bfa907f2fee8b19b3d7d9ebde07cfe0f33215b19&v=4',
                    position: 'Frontend Developer',
                    email: 'jeromevillaruel1998@gmail.com',
                    name: 'Jerome Joseph Villaruel',
                    location: 'Bato, Leyte',
                    website: 'https://jeromevillaruel.netlify.com/',
                    fbLink: 'https://www.facebook.com/veoscript',
                    twitterLink: 'https://twitter.com/VeoScript43',
                    githubLink: 'https://github.com/veoscript'
                }
            ]
        }
    }
}
</script>

<style scoped lang="scss">
.dev-info {
    border-top: 1px solid #eee;
}
</style>