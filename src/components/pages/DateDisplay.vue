<template>
    <span>
        {{ filteredDate(created_at) }}
    </span>
</template>

<script>

import moment from 'moment'

export default {
    name: 'DateDisplay',

    props: ['created_at'],

    computed: {
        filteredDate(value) {
            return moment(String(value)).format('MM/DD/YYYY hh:mm')
        }
    }
}
</script>