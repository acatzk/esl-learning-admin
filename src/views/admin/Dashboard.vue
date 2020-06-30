<template>
  <div class="elevation-0">
    <v-row class="d-flex">

      <v-col cols="12" sm="3">
        <v-card
          class="elevation-1 card-inbox"
        >
           <inbox-count /> <!-- INBOX COUNT QUERY AND SUBSCRIPTION -->
        </v-card>
      </v-col>
      
      <v-col cols="12" sm="3">
        <v-card
          class="elevation-1 card-lessons"
        >
          <v-container>
              <div class="d-flex justify-space-between align-items-center">
                <p class="font-weight-normal" style="font-size: 20px;">Lessons</p>
                <v-icon size="50">mdi-folder-multiple-outline</v-icon>
              </div>
              <h2 class="font-weight-medium text-center" style="font-size: 50px;">35</h2> 
              <small>Total number of lessons</small>
          </v-container>
        </v-card>
      </v-col>

       <v-col cols="12" sm="3">
         <v-card
          class="elevation-1 card-teachers"
        >
          <v-container>
              <div class="d-flex justify-space-between align-items-center">
                <p class="font-weight-normal" style="font-size: 20px;">Teachers</p>
                <v-icon size="50">mdi-account-multiple-outline</v-icon>
              </div>
              <h2 class="font-weight-medium text-center" style="font-size: 50px;">225</h2> 
              <small>Total number of teachers</small>
          </v-container>
        </v-card>
       </v-col>

      <v-col cols="12" sm="3">
        <v-card
          class="elevation-1 card-students"
        >
          <v-container>
              <div class="d-flex justify-space-between align-items-center">
                <p class="font-weight-normal" style="font-size: 20px;">Students</p>
                <v-icon size="50">mdi-account-box-outline</v-icon>
              </div>
              <h2 class="font-weight-medium text-center" style="font-size: 50px;">155</h2> 
              <small>Total number of teachers</small>
          </v-container>
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

export default {
  name: 'Dashboad',

  components: {
    InboxCount: () => import('@/components/pages/dashboard/InboxCount')
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
  })

}
</script>


<style scoped>

.total {
  font-size: 12px;
}

.card-inbox {
  border-bottom: 6px solid #f5365c;
}

.card-lessons {
  border-bottom: 6px solid #2dce89;
}

.card-teachers {
  border-bottom: 6px solid #fd7e14
}

.card-students {
  border-bottom: 6px solid #007bff
}

.visitor {
  background: white;
}
</style>