import gql from 'graphql-tag'

export const ADD_PROFILE_MUTATION = gql`
    mutation InsertAdminMutation($id: String!, $firstname: String, $middlename: String, $lastname: String, $company: String, $location: String, $website: String, $twitterUser: String, $bio: String) {
        insert_administrators(objects: {id: $id, firstname: $firstname, middlename: $middlename, lastname: $lastname, company: $company, location: $location, website: $website, twitterUser: $twitterUser, bio: $bio}) {
            affected_rows
            returning {
                id
            }
        }
    }  
`