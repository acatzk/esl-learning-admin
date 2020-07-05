import gql from 'graphql-tag'

export const ACCOUNT_UPDATE_MUTATION = gql`
    mutation UpdateAccountMutation($id: String!, $email: String, $password: String) {
        update_accounts(where: {id: {_eq: $id}}, _set: {email: $email, password: $password}) {
            affected_rows
            returning {
                id
                email
            }
        }
    }  
`

export const ADD_ACCOUNT_MUTATION = gql`
    mutation AddAccountMutation($id, String!, $email: String!, $password: String!) {
        insert_accounts(objects: {id: String!, email: $email, password: $password}) {
            affected_rows
            returning {
                id
            }
        }
    }
`