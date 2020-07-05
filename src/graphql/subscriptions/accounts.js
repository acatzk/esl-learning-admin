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

export const ALL_ACCOUNT_SUBSCRIPTION_EXCEPT_CURRENT_ADMIN = gql`
    subscription AccountSubscription($id: String!) {
        accounts(order_by: {created_at: desc}, where: {id: {_neq: $id}}) {
          id
          email
          password
          created_at
        }
    }
`