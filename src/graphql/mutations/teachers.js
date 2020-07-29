import gql from 'graphql-tag'

export const ADD_TEACHER_MUTATION = gql`
    mutation AddTeacherMutation($firstname: String!, $lastname: String!, $email: String!, $phone: String!, $gender: String!, $birth_date: String!, $firebase_id: String!) {
        insert_teachers(objects: {firstname: $firstname, lastname: $lastname, email: $email, phone: $phone, gender: $gender, birth_date: $birth_date, firebase_id: $firebase_id}) {
            affected_rows
            returning {
                id
            }
        }
    }  
`

export const UPDATE_TEACHER_MUTATION = gql`
    mutation UpdateTeacherMutation($firstname: String, $lastname: String, $email: String, $phone: String, $gender: String, $birth_date: String, $id: uuid!) {
        update_teachers(_set: {firstname: $firstname, lastname: $lastname, email: $email, phone: $phone, gender: $gender, birth_date: $birth_date}, where: {id: {_eq: $id}}) {
            affected_rows
            returning {
                id
            }
        }
    }
`

export const UPDATE_DEACTIVE_TEACHER_MUTATION = gql`
    mutation UpdateDeactiveUpdateTeacherMutation($id: uuid!) {
        update_teachers(where: {id: {_eq: $id}}, _set: {is_active: false}) {
            affected_rows
            returning {
                id
            }
        }
    }  
`


export const DELETE_TEACHER_MUTATION = gql`
    mutation deleteTeacherMutation($id: uuid!) {
        delete_teachers(where: {id: {_eq: $id}}) {
            affected_rows
            returning {
                id
            }
        }
    }
`

export const UPDATE_TEACHERS_PROFILE_IMAGE_MUTATION = gql`
    mutation UpdateTeacherProfileMutation($id: uuid!, $profileUrl: String) {
        update_teachers(where: {id: {_eq: $id}}, _set: {profile_url: $profileUrl}) {
            affected_rows
            returning {
                id
            }
        }
    }
`