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

export const TOTAL_STUDENTS_COUNT_QUERY = gql`
    query StudentCountQuery {
        StudentCount: students_aggregate {
            aggregate {
                count
            }
        }
    }
`