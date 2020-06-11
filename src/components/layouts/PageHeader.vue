<template>
    <div class="page-header">
        <div class="row align-items-end">
            <div class="col-lg-8">
                <div class="page-header-title">
                    <i :class="titleIcon"></i>
                    <div class="d-inline">
                        <h5>{{ title }}</h5>
                        <span>{{ description }}</span>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <nav class="breadcrumb-container" aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <router-link to="/admin/dashboard">
                                <i class="ik box ik-box"></i><span> Dashboard</span>
                            </router-link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">
                            <i :class="pageIcon"></i><span> {{ currentRouteName }}</span>
                        </li>
                    </ol>
                </nav>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: 'PageHeader',

    props: {
        titleIcon: {
            type: String,
            default: 'ik ik-file-text bg-blue'
        },
        pageIcon: {
            type: String,
            required: true
        },
        currentRouteName: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    }
}
</script>