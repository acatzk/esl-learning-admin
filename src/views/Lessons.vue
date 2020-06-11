<template>
    <div class="lessons">
        <page-header 
            title="Lessons"
            description="Teachers Online lessons"
            pageIcon="ik book ik-book"
            currentRouteName="Lessons"
            titleIcon="ik book ik-book bg-blue"
        />
    </div>
</template>

<script>
export default {
    name: 'Lessons',

    components: {
        PageHeader: () => import('@/components/pages/PageHeader')
    }
}
</script>