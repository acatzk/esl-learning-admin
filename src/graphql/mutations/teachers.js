import gql from 'graphql-tag'

export const ADD_TEACHER_MUTATION = gql`
    mutation AddTeacherMutation($firstname: String!, $lastname: String!, $email: String!, $phone: String!, $gender: String!, $birth_date: String!) {
        insert_teachers(objects: {firstname: $firstname, lastname: $lastname, email: $email, phone: $phone, gender: $gender, birth_date: $birth_date}) {
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