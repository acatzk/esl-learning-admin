<template>
    <v-container>
        <div class="d-flex justify-space-between align-items-center">
        <p class="font-weight-normal inbox" style="font-size: 20px;">Inbox</p>
        <v-icon size="50">mdi-email-outline</v-icon>
        </div>
        <h2 
            class="font-weight-medium text-center"
            style="font-size: 50px;"
        >
        {{  inboxCount ? inboxCount.aggregate.count : 0 }}
        </h2> 
        <small>Total number of inbox</small>
    </v-container>
</template>

<script>

import { TOTAL_INBOXES_COUNT_QUERY } from '@/graphql/queries/inboxes'

import { TOTAL_INBOXES_COUNT_SUBSCRIPTION } from '@/graphql/subscriptions/inboxes'

export default {
    name: 'InboxCount',

    data () {
        return {
            inboxCount: 0
        }
    },

    apollo: {
      inboxCount: {
        query: TOTAL_INBOXES_COUNT_QUERY,
        subscribeToMore: {
          document: TOTAL_INBOXES_COUNT_SUBSCRIPTION,
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