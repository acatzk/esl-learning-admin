import gql from 'graphql-tag'

export const ADD_LESSONS_MUTATION = gql`
    mutation AddLessonMutation($title: String! $description: String, $price: numeric, $url_files: String!, $size: numeric) {
        insert_lessons(objects: {title: $title, description: $description, price: $price, url_files: $url_files, size: $size}) {
            affected_rows
            returning {
                id
            }
        }
    }
`

export const UPDATE_LESSONS_MUTATION = gql`
    mutation UpdateLessonMutation($id: uuid!, $title: String, $description: String, $price: numeric, $url_files: String, $size: numeric) {
        update_lessons(where: {id: {_eq: $id}}, _set: {title: $title, description: $description, price: $price, url_files: $url_files, size: $size}) {
            affected_rows
            returning {
                id
            }
        }
    }
`