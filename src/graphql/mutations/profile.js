import gql from 'graphql-tag'

export const ADD_PROFILE_MUTATION = gql`
    mutation InsertAdminProfileMutation($id: String!, $firstname: String, $middlename: String, $lastname: String, $company: String, $location: String, $website: String, $twitterUser: String, $bio: String) {
        insert_profile(objects: {id: $id, firstname: $firstname, middlename: $middlename, lastname: $lastname, company: $company, location: $location, website: $website, twitterUser: $twitterUser, bio: $bio}) {
            affected_rows
            returning {
                id
            }
        }
    }  
`

export const UPDATE_PROFILE_MUTATION = gql`
    mutation UpdateAdminProfileMutation($id: String!, $firstname: String, $middlename: String, $lastname: String, $company: String, $location: String, $website: String, $twitterUser: String, $bio: String) {
        update_profile(where: {id: {_eq: $id}}, _set: {firstname: $firstname, lastname: $lastname, location: $location, middlename: $middlename, twitterUser: $twitterUser, company: $company, bio: $bio, website: $website}) {
            affected_rows
            returning {
                id
            }
        }
    }  
`