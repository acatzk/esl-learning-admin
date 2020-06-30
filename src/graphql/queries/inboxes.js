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

export const INBOX_SINGLE_QUERY = gql`
    query InboxesSingleQuery($id: uuid!) {
        inboxes(order_by: {created_at: desc}, where: {id: {_eq: $id}}) {
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

export const TOTAL_INBOXES_COUNT_QUERY = gql`
    query InboxCountQuery {
        inboxCount: inboxes_aggregate {
            aggregate {
                count
            }
        }
    }
`