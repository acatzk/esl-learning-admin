<template>
  <div class="elevation-0">
    <v-row class="mx-3 d-flex justify-space-around">
      <v-card
        class="elevation-8 ml-2 mb-2"
        width="250"
      >
         <v-container class="pa-20">
            <div class="d-flex justify-space-between align-items-center">
              <p class="font-weight-normal inbox">Inbox</p>
              <v-icon size="50">mdi-email-outline</v-icon>
            </div>
            <h2 class="font-weight-medium number text-center">35</h2> 
            <small>Total number of inbox</small>
         </v-container>
      </v-card>
      
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

.v-card {
  border-bottom: 6px solid #f5365c;
}
</style>