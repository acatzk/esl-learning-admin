import gql from 'graphql-tag'

export const PROFILE_SUBSCRIPTION = gql`
    query AdminQuery($id: String!) {
        administrators(where: {id: {_eq: $id}}) {
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