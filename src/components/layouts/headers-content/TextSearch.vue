<template>
    <v-text-field
        solo-inverted
        flat
        tile
        rounded
        hide-details
        label="Search"
        prepend-inner-icon="search"
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