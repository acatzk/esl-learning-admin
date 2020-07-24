<template>
    <v-container>
        <div class="d-flex justify-space-between align-items-center">
        <p class="font-weight-normal" style="font-size: 20px;">Lessons</p>
        <v-icon size="50">mdi-folder-multiple-outline</v-icon>
        </div>
        <h2 
            class="font-weight-medium text-center" 
            style="font-size: 50px;"
        >
            <v-btn
              :loading="true"
              text
              color="success"
              v-if="$apollo.loading"
            >
            </v-btn>
            <span v-else>{{ lessonsCount ? lessonsCount.aggregate.count : 0 }}</span>
        </h2> 
        <small>Total number of lessons</small>
    </v-container>
</template>


<script>

import { TOTAL_LESSONS_COUNT_QUERY } from '@/graphql/queries/lessons'

import { TOTAL_LESSONS_COUNT_SUBSCRPTION } from '@/graphql/subscriptions/lessons'

export default {
    name: 'LessonsCount',

    data () {
        return {
            lessonsCount: 0
        }
    },

    apollo: {
      lessonCount: {
        query: TOTAL_LESSONS_COUNT_QUERY,
        error (error) {
            this.error = toastAlertStatus('error', error)
        },
        subscribeToMore: {
          document: TOTAL_LESSONS_COUNT_SUBSCRPTION,
          updateQuery(previousResult, { subscriptionData }) {
            if (previousResult) {
              return {
                lessonCount: {
                  ...subscriptionData.data.lessonCount
                }
              }
            }
          }
        },
        result ({ data }) {
          this.lessonsCount = data.lessonCount
        }
      }
    }

}
</script>