import gql from 'graphql-tag'


export const INBOXES_SUBSCRIPTION = gql`
    subscription InboxesSubscription {
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