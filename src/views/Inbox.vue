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
      <v-card class="mx-auto pa-3" outlined>
          <inbox-table 
            :items="inboxs"
            :headers="headers"
            :search="search"
          />
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Inbox',

  components: {
    InboxTable: () => import('@/components/pages/InboxTable')
  },

  data: () => ({
     inboxs: [
       {
         id: '1',
         name: 'Joshua Galit',
         email: 'joshuaimalay@gmail.com',
         created_at: '2020-01-01T10:10:10',
         message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam exercitationem odio amet ut tempore, incidunt adipisci, veritatis hic voluptatum fugiat repellat minima. Delectus hic commodi iusto. Nihil dolorum mollitia nam.',
         contact: '09123123123',
         status: 'Unread'
       },
       {
         id: '2',
         name: 'Jerwin Gilo',
         email: 'jerwingilo@gmail.com',
         created_at: '2020-03-01T10:10:10',
         message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam exercitationem odio amet ut tempore, incidunt adipisci, veritatis hic voluptatum fugiat repellat minima. Delectus hic commodi iusto. Nihil dolorum mollitia nam.',
         contact: '09123123123',
         status: 'Read'

       },
       {
         id: '3',
         name: 'Jerome Villaruel',
         email: 'jerome@gmail.com',
         created_at: '2020-07-01T10:10:10',
         message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam exercitationem odio amet ut tempore, incidunt adipisci, veritatis hic voluptatum fugiat repellat minima. Delectus hic commodi iusto. Nihil dolorum mollitia nam.',
         contact: '09123123123',
         status: 'Unread'
       },
       {
         id: '4',
         name: 'Jayson Mendez',
         email: 'jayson@gmail.com',
         created_at: '2020-09-01T10:10:10',
         message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam exercitationem odio amet ut tempore, incidunt adipisci, veritatis hic voluptatum fugiat repellat minima. Delectus hic commodi iusto. Nihil dolorum mollitia nam.',
         contact: '09123123123',
         status: 'Unread'
       },
       {
         id: '5',
         name: 'Joseph Beronio',
         email: 'joseph@gmail.com',
         created_at: '2020-08-01T10:10:10',
         message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam exercitationem odio amet ut tempore, incidunt adipisci, veritatis hic voluptatum fugiat repellat minima. Delectus hic commodi iusto. Nihil dolorum mollitia nam.',
         contact: '09123123123',
         status: 'Read'
       },
       {
         id: '6',
         name: 'Gilchrist Calunia',
         email: 'gilchrist@gmail.com',
         created_at: '2020-05-03T10:10:10',
         message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam exercitationem odio amet ut tempore, incidunt adipisci, veritatis hic voluptatum fugiat repellat minima. Delectus hic commodi iusto. Nihil dolorum mollitia nam.',
         contact: '09123123123',
         status: 'Unread'
       },
       {
         id: '7',
         name: 'James Harden',
         email: 'jamesharden@gmail.com',
         created_at: '2020-08-02T10:10:10',
         message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam exercitationem odio amet ut tempore, incidunt adipisci, veritatis hic voluptatum fugiat repellat minima. Delectus hic commodi iusto. Nihil dolorum mollitia nam.',
         contact: '09123123123',
         status: 'Unread'
       }
     ],
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
  }
}
</script>