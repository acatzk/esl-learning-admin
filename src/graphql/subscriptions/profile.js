import gql from 'graphql-tag'

export const PROFILE_SUBSCRIPTION = gql`
    subscription AdminProfileSubscription($id: String!) {
        profile(where: {id: {_eq: $id}}) {
            id
            lastname
            location
            middlename
            twitterUser
            website
            firstname
            bio
            company
            profileUrl
        }
    }
`

export const ADMIN_PROFILE_IMAGE_SUBSCRIPTION = gql`
subscription AdminProfileImageSubscription($id: String!) {
        profile(where: {id: {_eq: $id}}) {
            id
            profileUrl
        }
    }
`