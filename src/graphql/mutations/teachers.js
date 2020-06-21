import gql from 'graphql-tag'

export const ADD_TEACHER_MUTATION = gql`
    mutation AddTeacherMutation($firstname: String!, $lastname: String!, $email: String!, $phone: String!, $gender: String!, $birthdate: String!) {
        insert_teachers(objects: {firstname: $firstname, lastname: $lastname, email: $email, phone: $phone, gender: $gender, birth_date: $birthdate}) {
            affected_rows
            returning {
                id
            }
        }
    }  
`