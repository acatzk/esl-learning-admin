import gql from 'graphql-tag'

export const LESSONS_QUERY = gql`
    query LessonQuery {
        lessons(order_by: {created_at: desc}) {
            id
            title
            description
            price
            url_files
            created_at
        }
    }  
`