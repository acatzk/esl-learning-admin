import gql from 'graphql-tag'

export const PROFILE_QUERY = gql`
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
            profileUrl
        }
    }
`

export const ADMIN_PROFILE_IMAGE_QUERY = gql`
    query AdminProfileImageQuery($id: String!) {
        profile(where: {id: {_eq: $id}}) {
            id
            profileUrl
        }
    }
`