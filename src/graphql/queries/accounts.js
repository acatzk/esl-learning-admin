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