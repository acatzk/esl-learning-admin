import gql from 'graphql-tag'

export const ACCOUNT_SUBSCRIPTION = gql`
    subscription AccountSubscription($id: String!) {
        accounts(where: {id: {_eq: $id}}) {
            id
            email
            password
            created_at
        }
    }  
`