<template>
    <div class="dashboard">
        <div class="row clearfix">
            <div class="col-lg-3 col-md-6 col-sm-12">
                <div class="widget">
                    <div class="widget-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="state">
                                <h6>Inbox</h6>
                                <h2>1,410</h2>
                            </div>
                            <div class="icon">
                                <i class="ik ik-mail dropdown-icon"></i>
                            </div>
                        </div>
                        <small class="text-small mt-10 d-block">Total Inbox</small>
                    </div>
                    <div class="progress progress-sm">
                        <div class="progress-bar bg-danger" role="progressbar" aria-valuenow="62" aria-valuemin="0" aria-valuemax="100" style="width: 100%;"></div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12">
                <div class="widget">
                    <div class="widget-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="state">
                                <h6>Lessons</h6>
                                <h2>41,410</h2>
                            </div>
                            <div class="icon">
                                <i class="ik book ik-book"></i>
                            </div>
                        </div>
                        <small class="text-small mt-10 d-block">Total Lessons</small>
                    </div>
                    <div class="progress progress-sm">
                        <div class="progress-bar bg-success" role="progressbar" aria-valuenow="78" aria-valuemin="0" aria-valuemax="100" style="width: 100%;"></div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12">
                <div class="widget">
                    <div class="widget-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="state">
                                <h6>Teachers</h6>
                                <h2>410</h2>
                            </div>
                            <div class="icon">
                                <i class="ik users ik-users"></i>
                            </div>
                        </div>
                        <small class="text-small mt-10 d-block">Total Teachers</small>
                    </div>
                    <div class="progress progress-sm">
                        <div class="progress-bar bg-warning" role="progressbar" aria-valuenow="31" aria-valuemin="0" aria-valuemax="100" style="width: 100%;"></div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12">
                <div class="widget">
                    <div class="widget-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="state">
                                <h6>Students</h6>
                                <h2>41,410</h2>
                            </div>
                            <div class="icon">
                                <i class="ik user-check ik-user-check"></i>
                            </div>
                        </div>
                        <small class="text-small mt-10 d-block">Total Student</small>
                    </div>
                    <div class="progress progress-sm">
                        <div class="progress-bar bg-info" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style="width: 100%;"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Dashboard'
}
</script>