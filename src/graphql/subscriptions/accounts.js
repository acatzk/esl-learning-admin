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

export const ALL_ACCOUNT_SUBSCRIPTION = gql`
    subscription AccountSubscription {
        accounts(order_by: {created_at: desc}) {
            id
            email
            password
            created_at
        }
    }  
`