<template>
  <v-footer
    padless
    :dark="mode ? false : true"
  >
    <v-card
      class="flex"
      flat
      style="background: transparent;"
    >
      <v-card-text class="py-1 text-center">
        <v-btn
          v-for="link in socialLinks"
          :key="link"
          class="mx-4"
          dark
          icon
          :href="link.link"
          target="_blank"
        >
          <v-icon size="24px" color="grey">{{ link.icon }}</v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="grey--text pt-0 text-justify font-weight-light">
        We victors the dream and make globally competitive learners and professionals. Unleash the breakthrough English literacy for young learners with the most authentic teaching approach. Real time strengthening of Business and Professionals in doing strong partnership strategically mentored from chosen SME's and partners. At Victor Airclass Solutions "We Outsourced, Deliver, Transform lives in community.
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="grey--text">
        {{ new Date().getFullYear() }} <span class="font-weight-medium">Air Class Solution, Inc.</span>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>

import { mapState } from 'vuex'

export default {
  data: () => ({
    socialLinks: [
      {
        link: 'https://www.facebook.com/',
        icon: 'mdi-facebook'
      },
      {
        link: 'https://twitter.com/',
        icon: 'mdi-twitter'
      },
      {
        link: 'https://www.linkedin.com/',
        icon: 'mdi-linkedin'
      },
      {
        link: 'https://www.instagram.com/',
        icon: 'mdi-instagram'
      }
    ]
  }),

  computed: {
    ...mapState(['mode'])
  }
}
</script>
