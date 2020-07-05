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

export const ALL_ACCOUNT_QUERY_EXCEPT_CURRENT_ADMIN = gql`
    query AccountQueries($id: String!) {
        accounts(order_by: {created_at: desc}, where: {id: {_neq: $id}}) {
          id
          email
          password
          created_at
        }
    }
`