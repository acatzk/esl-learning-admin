<template>
    <div class="welcome">
        <v-card>
            <v-app-bar
                absolute
                color="indigo white--text"
                elevate-on-scroll
            >
                <v-toolbar-title>
                    <v-icon left class="white--text">mdi-security</v-icon> Vic Solution Administrator
                </v-toolbar-title>

                <v-spacer></v-spacer>

                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      :href="source"
                      class="white--text mr-2" 
                      depressed 
                      target="_blank"
                      color="indigo darken-2 white--text"
                      v-on="on"
                    >
                      <v-icon left class="white--text">mdi-web</v-icon> Main Page
                    </v-btn>
                  </template>
                  <span>Goto Main Domain</span>
                </v-tooltip>

                <v-btn 
                    class="white--text" 
                    depressed 
                    color="indigo darken-2 white--text"
                    to="/login"
                >
                    <v-icon left>mdi-login</v-icon> Login
                </v-btn>
            </v-app-bar>
        </v-card>
         <v-container style="margin-top: 60px;">
            <vue-flux
                :options="vfOptions"
                :images="vfImages"
                :transitions="vfTransitions"
                ref="slider"
                style="height: 560px;"
            >

                <template v-slot:preloader>
                    <flux-preloader />
                </template>

                <template v-slot:caption>
                    <flux-caption />
                </template>

                <template v-slot:controls>
                    <flux-controls />
                </template>

                <template v-slot:pagination>
                    <flux-pagination />
                </template>

                <template v-slot:index>
                    <flux-index />
                </template>
            </vue-flux>
        </v-container>

        <foot-bar />
    </div>
</template>

<script>

import {
   VueFlux,
   FluxCaption,
   FluxControls,
   FluxIndex,
   FluxPagination,
   FluxPreloader,
} from 'vue-flux';

export default {
   components: {
      VueFlux,
      FluxCaption,
      FluxControls,
      FluxIndex,
      FluxPagination,
      FluxPreloader,

      FootBar: () => import('@/components/layouts/FootBar')
   },

   data: () => ({
      vfOptions: {
         autoplay: true
      },
      vfImages: [ 
          'https://www.rd.com/wp-content/uploads/2016/04/33-your-childs-teacher-happy-kids-classroom.jpg', 
          'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F38%2F2014%2F08%2F12233930%2F550_102109769.jpg', 
          'https://ounews.co/wp-content/uploads/2017/11/shutterstock_259018115-e1510570774920.jpg' ],
      vfTransitions: [ 'fade', 'cube', 'book', 'wave' ],
      vfCaptions: [
         'Creative',
         'Active',
         'Friendly',
      ],

      source: 'https://victorsolutions.netlify.app/'
   }),
}

</script>

<style scoped>

.welcome {
    background-color: #F6F7FB;
}

.v-card {
    border-radius: 0;
}

.v-btn {
    text-transform: capitalize;
}
</style>