<template>
  <div class="elevation-0">
    <v-row class="d-flex">

      <v-col cols="12" sm="3">
        <v-card
          class="elevation-1 card-inbox"
        >
          <v-container>
              <div class="d-flex justify-space-between align-items-center">
                <p class="font-weight-normal inbox">Inbox</p>
                <v-icon size="50">mdi-email-outline</v-icon>
              </div>
              <h2 
                class="font-weight-medium number text-center"
              >
                {{  inboxCount ? inboxCount.aggregate.count : 0 }}
              </h2> 
              <small>Total number of inbox</small>
          </v-container>
        </v-card>
      </v-col>
      
      <v-col cols="12" sm="3">
        <v-card
          class="elevation-1 card-lessons"
        >
          <v-container>
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
          class="elevation-1 card-teachers"
        >
          <v-container>
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
          class="elevation-1 card-students"
        >
          <v-container>
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

  import gql from 'graphql-tag'

  export default {
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

    apollo: {
      inboxCount: {
        query: gql`
          query InboxCountQuery {
            inboxCount: inboxes_aggregate {
              aggregate {
                count
              }
            }
          }
        `,
        subscribeToMore: {
          document: gql`
            subscription InboxCountSubscription {
              inboxCount: inboxes_aggregate {
                aggregate {
                  count
                }
              }
            }
          `,
          updateQuery(previousResult, { subscriptionData }) {
            if (previousResult) {
              return {
                inboxCount: {
                  ...subscriptionData.data.inboxCount
                }
              }
            }
          }
        },
        result ({ data }) {
          this.inboxCount = data.inboxCount
        }
      }
    }
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

.visitor {
  background: white;
}
</style>