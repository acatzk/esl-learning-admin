<template>
    <v-alert 
      :type="type"
      :border="border"
      :color="color"
      :text="textStyle"
    >
      {{ text }}
    </v-alert>
</template>

<script>
export default {
    name: 'Alert',

    props: {
        type: {
            type: String,
            default: 'error'
        },
        border: {
            type: String,
            default: 'bottom'
        },
        color: {
            type: String,
            default: 'pink'
        },
        text: {
            type: String,
            required: true
        },
        textStyle: {
            type: Boolean,
            default: false
        }
    }   
}
</script>

<style scoped>

.v-alert {
    border-radius: 0;
}

</style>