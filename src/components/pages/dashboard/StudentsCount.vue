<template>
    <v-container>
        <div class="d-flex justify-space-between align-items-center">
        <p class="font-weight-normal" style="font-size: 20px;">Students</p>
        <v-icon size="50">mdi-account-box-outline</v-icon>
        </div>
        <h2 
            class="font-weight-medium text-center" 
            style="font-size: 50px;"
        >
            {{ studentCount ? studentCount.aggregate.count : 0 }}
        </h2> 
        <small>Total number of teachers</small>
    </v-container>
</template>

<script>

import { TOTAL_STUDENTS_COUNT_QUERY } from '@/graphql/queries/students'

import { TOTAL_STUDENTS_COUNT_SUBSCRIPTION } from '@/graphql/subscriptions/students'

export default {
    name: 'StudentsCount',

    data () {
        return {
            studentCount: 0
        }
    },

    apollo: {
      studentCount: {
        query: TOTAL_STUDENTS_COUNT_QUERY,
        subscribeToMore: {
          document: TOTAL_STUDENTS_COUNT_SUBSCRIPTION,
          updateQuery(previousResult, { subscriptionData }) {
            if (previousResult) {
              return {
                studentCount: {
                  ...subscriptionData.data.studentCount
                }
              }
            }
          }
        },
        result ({ data }) {
          this.studentCount = data.studentCount
        }
      }
    }
}
</script>