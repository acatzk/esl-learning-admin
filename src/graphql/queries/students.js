import gql from 'graphql-tag'

export const STUDENT_QUERY = gql`
    query StudentQuery {
        students(order_by: {created_at: desc}) {
            id
            firstname
            lastname
            email
            contact
            gender
            birth_date
            created_at
        }
    }  
`