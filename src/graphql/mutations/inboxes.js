import gql from 'graphql-tag'

export const INBOX_DELETE_MUTATION = gql`
    mutation InboxDeleteMutation($id: uuid!) {
        delete_inboxes(where: {id: {_eq: $id}}) {
            affected_rows
            returning {
                id
            }
        }
    }
`

export const INBOX_UPDATE_MUTATION = gql`
    mutation InboxUpdateMutation($id: uuid!) {
        update_inboxes(where: {id: {_eq: $id}}, _set: {status: "read"}) {
            affected_rows
            returning {
                id
            }
        }
    }
`