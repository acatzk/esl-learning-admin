<template>
  <div class="elevation-0">
    <v-row class="d-flex">

      <v-col cols="12" sm="3">
        <v-card
          class="elevation-1 card-inbox"
          :dark="mode ? false : true"
        >
           <inbox-count /> <!-- INBOX COUNT QUERY AND SUBSCRIPTION -->
        </v-card>
      </v-col>
      
      <v-col cols="12" sm="3">
        <v-card
          class="elevation-1 card-lessons"
          :dark="mode ? false : true"
        >
          <lessons-count /> <!-- LESSONS COUNT QUERY AND SUBSCRIPTION -->
        </v-card>
      </v-col>

       <v-col cols="12" sm="3">
         <v-card
          class="elevation-1 card-teachers"
          :dark="mode ? false : true"
        >
          <teachers-count /> <!-- TEACHERS COUNT QUERY AND SUBSCRIPTION -->
        </v-card>
       </v-col>

      <v-col cols="12" sm="3">
        <v-card
          class="elevation-1 card-students"
          :dark="mode ? false : true"
        >
          <students-count /> <!-- STUDENTS COUNT QUERY AND SUBSCRIPTION -->
        </v-card>
      </v-col>
      
    </v-row>

    <v-card 
      class="mx-auto visitor elevation-1" 
    >
      <v-sheet
        class="v-sheet--offset mx-auto"
        color="indigo lighten-1"
        elevation="0"
      >
        <v-sparkline
          :labels="labels"
          :value="value"
          color="white"
          line-width="2"
          padding="16"
        ></v-sparkline>
      </v-sheet>

      <v-card-text class="pt-0">
        <div class="title font-weight-light mb-2">User Registrations</div>
        <div class="subheading font-weight-light grey--text">Last Campaign Performance</div>
        <v-divider class="my-2"></v-divider>
        <v-icon
          class="mr-2"
          small
        >
          mdi-clock
        </v-icon>
        <span class="caption grey--text font-weight-light">last registration 26 minutes ago</span>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'Dashboad',

  components: {
    InboxCount: () => import('@/components/pages/dashboard/InboxCount'),
    LessonsCount: () => import('@/components/pages/dashboard/LessonsCount'),
    TeachersCount: () => import('@/components/pages/dashboard/TeachersCount'),
    StudentsCount: () => import('@/components/pages/dashboard/StudentsCount'),
  },

  data: () => ({
    labels: [
      '12am',
      '3am',
      '6am',
      '9am',
      '12pm',
      '3pm',
      '6pm',
      '9pm',
    ],
    value: [
      200,
      675,
      410,
      390,
      310,
      460,
      250,
      240,
    ],
    inboxCount: 0
  }),

  computed: {
    ...mapState(['mode'])
  }

}
</script>


<style scoped>

.total {
  font-size: 12px;
}

.card-inbox {
  border-bottom: 6px solid #f5365c !important;
  -moz-border-bottom: 6px solid #f5365c;
  -webkit-border-bottom: 6px solid #f5365c;
}

.card-lessons {
  border-bottom: 6px solid #2dce89 !important;;
  -moz-border-bottom: 6px solid #2dce89;
  -webkit-border-bottom: 6px solid #2dce89;
}

.card-teachers {
  border-bottom: 6px solid #fd7e14 !important;
  -moz-border-bottom: 6px solid #fd7e14;
  -webkit-border-bottom: 6px solid #fd7e14;
}

.card-students {
  border-bottom: 6px solid #007bff !important;
  -moz-border-bottom: 6px solid #007bff;
  -webkit-border-bottom: 6px solid #007bff;
}

.visitor {
  background: white;
}
</style>