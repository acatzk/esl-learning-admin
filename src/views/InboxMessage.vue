<template>
    <div class="inbox-message">
        <v-card-title class="d-flex justify-center">
            <h4>
                <v-icon>markunread</v-icon> Inbox message 
            </h4>
        </v-card-title>
        <v-breadcrumbs :items="items">
            <template v-slot:divider>
                <v-icon>mdi-chevron-left</v-icon>
            </template>
            <v-breadcrumbs-item
                slot="item"
                slot-scope="{ item }"
                exact
                :to="item.to"
            >
                {{ item.text }}
            </v-breadcrumbs-item>
        </v-breadcrumbs>
        <v-card outlined class="mx-auto" height="60vh">

        </v-card>
    </div>
</template>

<script>
export default {
    data: () => ({
        items: [
            {
                text: 'Inbox',
                disabled: false,
                to: '/inbox',
            },
            {
                text: 'Message',
                disabled: true
            },
        ],
    })
}
</script>

<style scoped lang="scss">

</style>