import gql from 'graphql-tag'

export const TEACHERS_SUBSCRIPTION = gql`
    subscription TeachersQuery {
        teachers(order_by: {created_at: desc}) {
            id
            firstname
            lastname
            email
            phone
            gender
            birth_date
            is_active
            created_at
            profile_url
        }
    }  
`

export const TOTAL_TEACHERS_COUNT_SUBSCRIPTION = gql`
    subscription TeacherCountSubscription {
        teacherCount: teachers_aggregate {
            aggregate {
                count
            }
        }
    }  
`