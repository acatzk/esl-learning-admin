import gql from 'graphql-tag'

export const TEACHERS_QUERY = gql`
    query TeachersQuery {
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

export const TOTAL_TEACHERS_COUNT_QUERY = gql`
    query TeacherCountQuery {
        teacherCount: teachers_aggregate {
            aggregate {
                count
            }
        }
    }  
`