<template>
  <div class="inbox">
    <v-container>
      <v-card outlined>
        <div class="d-flex justify-space-between">
            <h3 style="position: relative; top: 20px; left: 20px;">
                <v-icon>markunread</v-icon> Inbox 
            </h3>
            <v-text-field 
                append-icon="search" 
                outlined
                dense
                style="max-width: 250px; position: relative; top: 14px; right: 10px;"
                color="deep-purple darken-1"
                v-model="search"
              >
            </v-text-field>
        </div>
      </v-card>
      <v-card class="mx-auto pa-3" outlined style="height: 72vh;">
          <inbox-table 
            :items="inboxes"
            :headers="headers"
            :search="search"
          />
      </v-card>
    </v-container>
  </div>
</template>

<script>

import gql from 'graphql-tag'

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
      query: gql`
        query InboxesQuery {
          inboxes(order_by: {created_at: desc}) {
            id
            name
            email
            status
            contact
            created_at
            message
          }
        }
      `,
      result ({ data }) {
        this.inboxes = data.inboxes
      }
    }
  }
}
</script>