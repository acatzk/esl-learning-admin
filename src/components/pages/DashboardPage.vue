<template>
  <div class="elevation-0">
    <v-row class="d-flex">

      <v-col cols="12" sm="3">
        <v-card
          class="elevation-8 card-inbox"
        >
          <v-container>
              <div class="d-flex justify-space-between align-items-center">
                <p class="font-weight-normal inbox">Inbox</p>
                <v-icon size="50">mdi-email-outline</v-icon>
              </div>
              <h2 class="font-weight-medium number text-center">291</h2> 
              <small>Total number of inbox</small>
          </v-container>
        </v-card>
      </v-col>
      
      <v-col cols="12" sm="3">
        <v-card
          class="elevation-8 card-lessons"
        >
          <v-container class="pa-20">
              <div class="d-flex justify-space-between align-items-center">
                <p class="font-weight-normal inbox">Lessons</p>
                <v-icon size="50">mdi-folder-multiple-outline</v-icon>
              </div>
              <h2 class="font-weight-medium number text-center">35</h2> 
              <small>Total number of lessons</small>
          </v-container>
        </v-card>
      </v-col>


       <v-col cols="12" sm="3">
         <v-card
          class="elevation-8 card-teachers"
        >
          <v-container class="pa-20">
              <div class="d-flex justify-space-between align-items-center">
                <p class="font-weight-normal inbox">Teachers</p>
                <v-icon size="50">mdi-account-multiple-outline</v-icon>
              </div>
              <h2 class="font-weight-medium number text-center">225</h2> 
              <small>Total number of teachers</small>
          </v-container>
        </v-card>
       </v-col>


      <v-col cols="12" sm="3">
        <v-card
          class="elevation-8 card-students"
        >
          <v-container class="pa-20">
              <div class="d-flex justify-space-between align-items-center">
                <p class="font-weight-normal inbox">Students</p>
                <v-icon size="50">mdi-account-box-outline</v-icon>
              </div>
              <h2 class="font-weight-medium number text-center">155</h2> 
              <small>Total number of teachers</small>
          </v-container>
        </v-card>
      </v-col>
      

    </v-row>
  </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
  }
</script>

<style scoped>
.inbox {
  font-size: 20px;
}

.number {
  font-size: 50px;
}

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
</style>