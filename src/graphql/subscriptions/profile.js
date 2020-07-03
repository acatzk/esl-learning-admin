import gql from 'graphql-tag'

export const PROFILE_SUBSCRIPTION = gql`
    query AdminProfileQuery($id: String!) {
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
        }
    }
`