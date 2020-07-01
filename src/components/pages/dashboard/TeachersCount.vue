<template>
    <v-container>
        <div class="d-flex justify-space-between align-items-center">
        <p class="font-weight-normal" style="font-size: 20px;">Teachers</p>
        <v-icon size="50">mdi-account-multiple-outline</v-icon>
        </div>
        <h2 
            class="font-weight-medium text-center" 
            style="font-size: 50px;"
        >
            <v-btn
              :loading="true"
              text
              color="warning"
              v-if="$apollo.loading"
            >
            </v-btn>
            <span v-else>{{ teacherCount ? teacherCount.aggregate.count : 0 }}</span>
        </h2> 
        <small>Total number of teachers</small>
    </v-container>
</template>

<script>

// Toast Alert Status
import { toastAlertStatus } from '@/assets/js/toastAlert'

import { TOTAL_TEACHERS_COUNT_QUERY } from '@/graphql/queries/teachers'

import { TOTAL_TEACHERS_COUNT_SUBSCRIPTION } from '@/graphql/subscriptions/teachers'

export default {
    name: 'TeachersCount',

    data () {
        return {
            teacherCount: 0
        }
    },

    apollo: {
      teacherCount: {
        query: TOTAL_TEACHERS_COUNT_QUERY,
        error (error) {
            this.error = toastAlertStatus('error', error)
        },
        subscribeToMore: {
          document: TOTAL_TEACHERS_COUNT_SUBSCRIPTION,
          updateQuery(previousResult, { subscriptionData }) {
            if (previousResult) {
              return {
                teacherCount: {
                  ...subscriptionData.data.teacherCount
                }
              }
            }
          }
        },
        result ({ data }) {
          this.teacherCount = data.teacherCount
        }
      }
    }
}
</script>