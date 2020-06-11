<template>
    <div class="lessons">
        <page-header 
            title="Lessons"
            description="Teachers Online lessons"
            pageIcon="ik book ik-book"
            currentRouteName="Lessons"
            titleIcon="ik book ik-book bg-blue"
        />
        <div class="row">
            <div class="col-md-12">
                <div class="mb-2 clearfix">
                    <a class="btn pt-0 pl-0 d-md-none d-lg-none" data-toggle="collapse" href="#displayOptions" role="button" aria-expanded="true" aria-controls="displayOptions">
                        Display Options
                        <i class="ik ik-chevron-down align-middle"></i>
                    </a>
                    <div class="collapse d-md-block display-options" id="displayOptions">
                        <span class="mr-3 d-inline-block float-md-left dispaly-option-buttons">
                            <a href="#" class="mr-1 view-list active">
                                <i class="ik ik-menu view-icon"></i>
                            </a>
                            <a href="#" class="mr-1 view-thumb">
                                <i class="ik ik-list view-icon"></i>
                            </a>
                            <a href="#" class="mr-1 view-grid">
                                <i class="ik ik-grid view-icon"></i>
                            </a>
                        </span>
                        <div class="d-block d-md-inline-block">
                            <div class="btn-group float-md-left mr-1 mb-1">
                                <button class="btn btn-outline-dark btn-xs dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Order By 
                                    <i class="ik ik-chevron-down mr-0 align-middle"></i>
                                </button>
                                <div class="dropdown-menu">
                                    <a class="dropdown-item" href="#">Action</a>
                                    <a class="dropdown-item" href="#">Another action</a>
                                </div>
                            </div>
                            <div class="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                                <form action="">
                                    <input type="text" class="form-control" placeholder="Search.." required>
                                    <button type="submit" class="btn btn-icon"><i class="ik ik-search"></i></button>
                                    <button type="button" id="adv_wrap_toggler" class="adv-btn ik ik-chevron-down dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                                    <div class="adv-search-wrap dropdown-menu dropdown-menu-right" aria-labelledby="adv_wrap_toggler">
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Full Name">
                                        </div>
                                        <div class="form-group">
                                            <input type="email" class="form-control" placeholder="Email">
                                        </div>
                                        <button class="btn btn-theme">Search</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="float-md-right">
                            <span class="text-muted text-small mr-2">Displaying 1-10 of 210 items </span>
                            <button class="btn btn-outline-dark btn-xs dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                20
                                <i class="ik ik-chevron-down mr-0 align-middle"></i>
                            </button>
                            <div class="dropdown-menu dropdown-menu-right">
                                <a class="dropdown-item" href="#">10</a>
                                <a class="dropdown-item" href="#">20</a>
                                <a class="dropdown-item" href="#">30</a>
                                <a class="dropdown-item" href="#">50</a>
                                <a class="dropdown-item" href="#">100</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="separator mb-20"></div>

                <div class="row layout-wrap" id="layout-wrap">
                    <div class="col-12 list-item">
                        <div class="card d-flex flex-row mb-3">
                            <a class="d-flex card-img" href="#editLayoutItem" data-toggle="modal" data-target="#editLayoutItem">
                                <img src="/assets/img/portfolio-1.jpg" alt="Donec sit amet est at sem iaculis aliquam." class="list-thumbnail responsive border-0">
                                <span class="badge badge-pill badge-primary position-absolute badge-top-left">New</span>
                                <span class="badge badge-pill badge-secondary position-absolute badge-top-left-2">Trending</span>
                            </a>
                            <div class="d-flex flex-grow-1 min-width-zero card-content">
                                <div class="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                                    <a class="list-item-heading mb-1 truncate w-40 w-xs-100" href="#editLayoutItem" data-toggle="modal" data-target="#editLayoutItem">
                                        Donec felis urna, commodo eget velit interdum, malesuada lacinia eros.
                                    </a>
                                    <p class="mb-1 text-muted text-small category w-15 w-xs-100">Art</p>
                                    <p class="mb-1 text-muted text-small date w-15 w-xs-100">02.04.2018</p>
                                    <div class="w-15 w-xs-100">
                                        <span class="badge badge-pill badge-secondary">On Hold</span>
                                    </div>
                                </div>
                                <div class="list-actions">
                                    <a href="#editLayoutItem" data-toggle="modal" data-target="#editLayoutItem"><i class="ik ik-eye"></i></a>
                                    <a href="layout-edit-item.html"><i class="ik ik-edit-2"></i></a>
                                    <a href="#" class="list-delete"><i class="ik ik-trash-2"></i></a>
                                </div>
                                <div class="custom-control custom-checkbox pl-1 align-self-center">
                                    <label class="custom-control custom-checkbox mb-0">
                                        <input type="checkbox" class="custom-control-input">
                                        <span class="custom-control-label"></span>
                                    </label>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div class="col-12 list-item">
                        <div class="card d-flex flex-row mb-3">
                            <a class="d-flex card-img" href="#editLayoutItem" data-toggle="modal" data-target="#editLayoutItem">
                                <img src="/assets/img/portfolio-2.jpg" alt="Nullam porttitor elit rhoncus luctus volutpat." class="list-thumbnail responsive border-0">
                                <span class="badge badge-pill badge-primary position-absolute badge-top-left">New</span>
                                <span class="badge badge-pill badge-secondary position-absolute badge-top-left-2">Trending</span>
                            </a>
                            <div class="d-flex flex-grow-1 min-width-zero card-content">
                                <div class="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                                    <a href="#editLayoutItem" data-toggle="modal" data-target="#editLayoutItem" class="w-40 w-sm-100">
                                        <p class="list-item-heading mb-1 truncate">Proin sit amet augue lorem. Interdum et malesuada fames.</p>
                                    </a>
                                    <p class="mb-1 text-muted text-small category w-15 w-sm-100">Travel</p>
                                    <p class="mb-1 text-muted text-small date  w-15 w-sm-100">21.03.2018</p>
                                    <div class="w-15 w-sm-100">
                                        <span class="badge badge-pill badge-primary">Processed</span>
                                    </div>
                                </div>
                                <div class="list-actions">
                                    <a href="#editLayoutItem" data-toggle="modal" data-target="#editLayoutItem"><i class="ik ik-eye"></i></a>
                                    <a href="layout-edit-item.html"><i class="ik ik-edit-2"></i></a>
                                    <a href="#" class="list-delete"><i class="ik ik-trash-2"></i></a>
                                </div>
                                <div class="custom-control custom-checkbox pl-1 align-self-center">
                                    <label class="custom-control custom-checkbox mb-0">
                                        <input type="checkbox" class="custom-control-input">
                                        <span class="custom-control-label"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 list-item">
                        <div class="card d-flex flex-row mb-3">
                            <a class="d-flex card-img" href="#editLayoutItem" data-toggle="modal" data-target="#editLayoutItem">
                                <img src="/assets/img/portfolio-7.jpg" alt="Nullam porttitor elit rhoncus luctus volutpat." class="list-thumbnail responsive border-0">
                                <span class="badge badge-pill badge-primary position-absolute badge-top-left">New</span>
                                <span class="badge badge-pill badge-secondary position-absolute badge-top-left-2">Trending</span>
                            </a>
                            <div class="d-flex flex-grow-1 min-width-zero card-content">
                                <div class="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                                    <a href="#editLayoutItem" data-toggle="modal" data-target="#editLayoutItem" class="w-40 w-sm-100">
                                        <p class="list-item-heading mb-1 truncate">Class aptent taciti sociosqu ad litora torquent per conubia nostra.</p>
                                    </a>
                                    <p class="mb-1 text-muted text-small category w-15 w-sm-100">Design</p>
                                    <p class="mb-1 text-muted text-small date  w-15 w-sm-100">19.02.2018</p>
                                    <div class="w-15 w-sm-100">
                                        <span class="badge badge-pill badge-secondary">On Hold</span>
                                    </div>
                                </div>
                                <div class="list-actions">
                                    <a href="#editLayoutItem" data-toggle="modal" data-target="#editLayoutItem"><i class="ik ik-eye"></i></a>
                                    <a href="layout-edit-item.html"><i class="ik ik-edit-2"></i></a>
                                    <a href="#" class="list-delete"><i class="ik ik-trash-2"></i></a>
                                </div>
                                <div class="custom-control custom-checkbox pl-1 align-self-center">
                                    <label class="custom-control custom-checkbox mb-0">
                                        <input type="checkbox" class="custom-control-input">
                                        <span class="custom-control-label"></span>
                                    </label>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div class="col-12 list-item">
                        <div class="card d-flex flex-row mb-3">
                            <a class="d-flex card-img" href="#editLayoutItem" data-toggle="modal" data-target="#editLayoutItem">
                                <img src="/assets/img/portfolio-8.jpg" alt="Nullam porttitor elit rhoncus luctus volutpat." class="list-thumbnail responsive border-0">
                                <span class="badge badge-pill badge-primary position-absolute badge-top-left">New</span>
                                <span class="badge badge-pill badge-secondary position-absolute badge-top-left-2">Trending</span>
                            </a>
                            <div class="d-flex flex-grow-1 min-width-zero card-content">
                                <div class="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                                    <a href="#editLayoutItem" data-toggle="modal" data-target="#editLayoutItem" class="w-40 w-sm-100">
                                        <p class="list-item-heading mb-1 truncate">Maecenas ut felis iaculis, dapibus mi quis, cursus mi.</p>
                                    </a>
                                    <p class="mb-1 text-muted text-small category w-15 w-sm-100">Travel</p>
                                    <p class="mb-1 text-muted text-small date  w-15 w-sm-100">14.02.2018</p>
                                    <div class="w-15 w-sm-100">
                                        <span class="badge badge-pill badge-primary">Processed</span>
                                    </div>
                                </div>
                                <div class="list-actions">
                                    <a href="#editLayoutItem" data-toggle="modal" data-target="#editLayoutItem"><i class="ik ik-eye"></i></a>
                                    <a href="layout-edit-item.html"><i class="ik ik-edit-2"></i></a>
                                    <a href="#" class="list-delete"><i class="ik ik-trash-2"></i></a>
                                </div>
                                <div class="custom-control custom-checkbox pl-1 align-self-center">
                                    <label class="custom-control custom-checkbox mb-0">
                                        <input type="checkbox" class="custom-control-input">
                                        <span class="custom-control-label"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
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