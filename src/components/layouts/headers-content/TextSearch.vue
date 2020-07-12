<template>
    <v-text-field
        solo-inverted
        flat
        tile
        hide-details
        label="Search"
        append-icon="search"
        :color="mode ? 'deep-purple darken-4' : ''"
        dense
    ></v-text-field>
</template>

<script>
export default {
    name: 'TextSearch',

    props: ['mode']
}
</script>