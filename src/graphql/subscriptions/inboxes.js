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

export const _INBOX_SINGLE_SUBSCRIPTION = gql`
    subscription InboxesSingleSubscription($id: uuid!) {
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