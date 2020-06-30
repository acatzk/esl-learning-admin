import gql from 'graphql-tag'

export const STUDENT_SUBSCRIPTION = gql`
    subscription StudentSubscription {
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

export const TOTAL_STUDENTS_COUNT_SUBSCRIPTION = gql`
    subscription StudentCountSubscription {
        studentCount: students_aggregate {
            aggregate {
                count
            }
        }
    }
`