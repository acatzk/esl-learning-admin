import gql from 'graphql-tag'

export const ADD_LESSONS_MUTATION = gql`
    mutation AddLessonMutation($title: String! $description: String, $price: money, $url_files: String!) {
        insert_lessons(objects: {title: $title, description: $description, price: $price, url_files: $url_files}) {
            affected_rows
            returning {
                id
            }
        }
    }
`