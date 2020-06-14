import gql from 'graphql-tag'

export const INBOX_QUERY = gql`
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
`