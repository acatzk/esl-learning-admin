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