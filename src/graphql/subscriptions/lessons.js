import gql from 'graphql-tag'

export const LESSONS_SUBSCRIPTION = gql`
    subscription LessonSubscription {
        lessons(order_by: {created_at: desc}) {
            id
            title
            description
            price
            url_files
            created_at
            size
            type
        }
    } 
`