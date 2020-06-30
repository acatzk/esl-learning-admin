<template>
    <v-container>
        <div class="d-flex justify-space-between align-items-center">
        <p class="font-weight-normal" style="font-size: 20px;">Lessons</p>
        <v-icon size="50">mdi-folder-multiple-outline</v-icon>
        </div>
        <h2 
            class="font-weight-medium text-center" 
            style="font-size: 50px;"
        >
            {{ lessonsCount ? lessonsCount.aggregate.count : 0 }}
        </h2> 
        <small>Total number of lessons</small>
    </v-container>
</template>


<script>

export default {
    name: 'LessonsCount',

    data () {
        return {
            lessonsCount: 0
        }
    },

}
</script>