<template>
    <div class="row">
        <div class="col-md-8">
            <div class="card">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-lg-8 col-md-12">
                            <h3 class="card-title">Visitors By Countries</h3>
                            <div id="visitfromworld" style="width:100%; height:350px"></div>
                        </div>
                        <div class="col-lg-4 col-md-12">
                            <div class="row mb-15">
                                <div class="col-9">India</div>
                                <div class="col-3 text-right">28%</div>
                                <div class="col-12">
                                    <div class="progress progress-sm mt-5">
                                        <div class="progress-bar bg-green" role="progressbar" style="width: 48%" aria-valuenow="48" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-15">
                                <div class="col-9"> UK</div>
                                <div class="col-3 text-right">21%</div>
                                <div class="col-12">
                                    <div class="progress progress-sm mt-5">
                                        <div class="progress-bar bg-aqua" role="progressbar" style="width: 33%" aria-valuenow="33" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-15">
                                <div class="col-9"> USA</div>
                                <div class="col-3 text-right">18%</div>
                                <div class="col-12">
                                    <div class="progress progress-sm mt-5">
                                        <div class="progress-bar bg-purple" role="progressbar" style="width: 40%" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-9">China</div>
                                <div class="col-3 text-right">12%</div>
                                <div class="col-12">
                                    <div class="progress progress-sm mt-5">
                                        <div class="progress-bar bg-danger" role="progressbar" style="width: 15%" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card" style="min-height: 422px;">
                <div class="card-header"><h3>Donut chart</h3></div>
                <div class="card-body">
                    <div id="c3-donut-chart"></div>
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