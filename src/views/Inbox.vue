<template>
   <div class="inbox container">
        <page-header 
            title="Inbox"
            description="Concerns and Email Information"
            pageIcon="ik ik-mail dropdown-icon"
            currentRouteName="Inbox"
            titleIcon="ik ik-mail dropdown-icon bg-blue"
        />
        <div class="row">
            <div class="card">
                <div class="card-header row">
                    <div class="col col-sm-3">
                        <div class="dropdown d-inline-block">
                            <a class="btn-icon checkbox-dropdown dropdown-toggle" href="#" id="moreDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></a>
                            <div class="dropdown-menu" aria-labelledby="moreDropdown">
                                <a class="dropdown-item" id="checkbox_select_all" href="javascript:void(0);">Select All</a>
                                <a class="dropdown-item" id="checkbox_deselect_all" href="javascript:void(0);">Deselect All</a>
                            </div>
                        </div>
                        <div class="card-options d-inline-block">
                            <a href="#"><i class="ik ik-inbox"></i></a>
                            <a href="#"><i class="ik ik-plus"></i></a>
                            <a href="#"><i class="ik ik-rotate-cw"></i></a>
                            <div class="dropdown d-inline-block">
                                <a class="nav-link dropdown-toggle" href="#" id="moreDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="ik ik-more-horizontal"></i></a>
                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="moreDropdown">
                                    <a class="dropdown-item" href="#">Action</a>
                                    <a class="dropdown-item" href="#">More Action</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col col-sm-6">
                        <div class="card-search with-adv-search dropdown">
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
                    <div class="col col-sm-3">
                        <div class="card-options text-right">
                            <span class="mr-5">1 - 50 of 2,500</span>
                            <a href="#"><i class="ik ik-chevron-left"></i></a>
                            <a href="#"><i class="ik ik-chevron-right"></i></a>
                        </div>
                    </div>
                </div>
                <div class="card-body p-0">
                    <div class="list-item-wrap">
                        <div class="list-item">
                            <div class="item-inner">
                                <label class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" id="item_checkbox" name="item_checkbox" value="option1">
                                    <span class="custom-control-label">&nbsp;</span>
                                </label>
                                <div class="list-title">
                                    <a href="#">Lorem Ipsum is simply dumm dummy text of the printing and typesetting industry.</a>
                                </div>
                                <div class="list-actions">
                                    <a href="#"><i class="ik ik-eye"></i></a>
                                    <a href="#"><i class="ik ik-inbox"></i></a>
                                    <a href="#"><i class="ik ik-edit-2"></i></a>
                                    <a href="#"><i class="ik ik-trash-2"></i></a>
                                </div>
                            </div>

                            <div class="qickview-wrap">
                                <div class="desc">
                                    <p>Fusce suscipit turpis a dolor posuere ornare at a ante. Quisque nec libero facilisis, egestas tortor eget, mattis dui. Curabitur viverra laoreet lig.</p>
                                </div>
                            </div>
                        </div>
                        <div class="list-item">
                            <div class="item-inner">
                                <label class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" id="item_checkbox" name="item_checkbox" value="option2">
                                    <span class="custom-control-label">&nbsp;</span>
                                </label>
                                <div class="list-title"><a href="javascript:void(0)">Aenean eu pharetra arcu, vitae elementum sem. Sed non ligula molestie, </a></div>
                                <div class="list-actions">
                                    <a href="#"><i class="ik ik-eye"></i></a>
                                    <a href="#"><i class="ik ik-inbox"></i></a>
                                    <a href="#"><i class="ik ik-edit-2"></i></a>
                                    <a href="#"><i class="ik ik-trash-2"></i></a>
                                </div>
                            </div>
                            <div class="qickview-wrap">
                                <div class="desc">
                                    <p>Fusce suscipit turpis a dolor posuere ornare at a ante. Quisque nec libero facilisis, egestas tortor eget, mattis dui. Curabitu.</p>
                                </div>
                            </div>
                        </div>
                        <div class="list-item">
                            <div class="item-inner">
                                <label class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" id="item_checkbox" name="item_checkbox" value="option3">
                                    <span class="custom-control-label">&nbsp;</span>
                                </label>
                                <div class="list-title">
                                    <a href="javascript:void(0)">Donec lectus augue, suscipit in sodales sit amet, semper sit amet enim. Duis pretium, nisi id pretium ornare, tortor nibh sodales tellus.</a>
                                </div>
                                <div class="list-actions">
                                    <a href="#">
                                        <i class="ik ik-eye"></i>
                                    </a>
                                    <a href="#">
                                        <i class="ik ik-inbox"></i>
                                    </a>
                                    <a href="#">
                                        <i class="ik ik-edit-2"></i>
                                    </a>
                                    <a href="#">
                                        <i class="ik ik-trash-2"></i>
                                    </a>
                                </div>
                            </div>
                            <div class="qickview-wrap">
                                <div class="desc">
                                    <p>Fusce suscipit turpis a dolor posuere ornare at a ante. Quisque nec libero facilisis, egestas tortor eget, mattis dui. Curabitur </p>
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
    name: 'Inbox',

    components: {
        PageHeader: () => import('@/components/pages/PageHeader')
    }
}
</script>