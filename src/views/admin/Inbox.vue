<template>
  <div class="inbox">
    <header>
      <v-toolbar-title>
        <v-icon right>markunread</v-icon> Inbox
      </v-toolbar-title>
    </header>
    <v-card 
      class="mx-auto" 
      flat 
    >
      <v-text-field
        label="Search"
        v-model="search"
        filled
        class="mx-3"
        append-icon="search"
        dense
        rounded
        style="position: relative; top: 10px; border-radius: 50px;"
      ></v-text-field>
      <v-skeleton-loader
        type="table-tbody"
        class="mx-auto"
        tile
        v-if="$apollo.loading"
      ></v-skeleton-loader> 
      <inbox-table 
        v-else
        :items="inboxes"
        :headers="headers"
        :search="search"
      />
    </v-card>
  </div>
</template>

<script>

// INBOXES QUERY 
import { INBOX_QUERY } from '@/graphql/queries/inboxes'
// INBOXES SUBSCRIPTION
import { INBOXES_SUBSCRIPTION } from '@/graphql/subscriptions/inboxes'

export default {
  name: 'Inbox',

  components: {
    InboxTable: () => import('@/components/pages/InboxTable')
  },

  data: () => ({
     inboxes: [],
     search: ''
  }),

  computed: {
    headers() {
      return [
        { text: 'Name',  value: 'name' },
        { text: 'Email', value: 'email' },
        { text: 'Date', value: 'created_at' },
        { text: 'Contact', value: 'contact', sortable: false },
        { text: 'Status', value: 'status', sortable: false }
      ]
    }
  },

  apollo: {
    inboxes: {
      query: INBOX_QUERY,
      subscribeToMore: {
        document: INBOXES_SUBSCRIPTION,
        updateQuery(previousResult, { subscriptionData }) {
          if (previousResult) {
            return {
              inboxes: [
                ...subscriptionData.data.inboxes
              ]
            }
          }
        }
      },
      result ({ data }) {
        this.inboxes = data.inboxes
      }
    }
  }
}
</script>

<style scoped>
header {
  padding: 15px;
  border-bottom: 1px solid #eee;
}
</style>