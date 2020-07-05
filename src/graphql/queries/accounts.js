import gql from 'graphql-tag'

export const ACCOUNT_QUERY = gql`
    query AccountQuery($id: String!) {
        accounts(where: {id: {_eq: $id}}) {
            id
            email
            password
            created_at
        }
    }  
`

export const ALL_ACCOUNT_QUERY = gql`
    query AccountQueries {
        accounts(order_by: {created_at: desc}) {
            id
            email
            password
            created_at
        }
    }  
`