<template>
    <div class="profile">
        <page-header 
            title="Profile"
            description="Administrator Profile Information"
            pageIcon="ik user ik-user"
            currentRouteName="Profile"
            titleIcon="ik user ik-user bg-blue"
        />
        <div class="row">
            <div class="col-lg-4 col-md-5">
                <div class="card">
                    <div class="card-body">
                        <div class="text-center"> 
                            <img src="https://avatars0.githubusercontent.com/u/38458781?s=460&u=d2e21173ef861da3d8ca3a292398cbc0c6f7c000&v=4" class="rounded-circle" width="150" />
                            <h4 class="card-title mt-10">Joshua galit</h4>
                            <p class="card-subtitle">Administrator</p>
                        </div>
                    </div>
                    <hr class="mb-0"> 
                    <div class="card-body"> 
                        <small class="text-muted d-block">Email address </small>
                        <h6>Joshua@admin.com</h6> 
                        <small class="text-muted d-block pt-10">Phone</small>
                        <h6>(+63) 9657268947</h6> 
                        <small class="text-muted d-block pt-10">Address</small>
                        <h6>Anahawan Bato, Leyte</h6>
                        <div class="map-box">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10611.004317852545!2d124.85338591460615!3d10.337338509965585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33071354a1bb7af7%3A0x57db815a52ed21b3!2sAnahawan%2C%20Bato%2C%20Leyte!5e0!3m2!1sen!2sph!4v1591840327981!5m2!1sen!2sph" width="100%" height="250" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>

                        </div> 
                        <small class="text-muted d-block pt-30">Social Profile</small>
                        <br/>
                        <div class="d-flex justify-content-around">
                            <button class="btn btn-icon btn-facebook"><i class="fab fa-facebook-f"></i></button>
                            <button class="btn btn-icon btn-twitter"><i class="fab fa-twitter"></i></button>
                            <button class="btn btn-icon btn-instagram"><i class="fab fa-instagram"></i></button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-8 col-md-7">
                <div class="card">
                    <ul class="nav nav-pills custom-pills" id="pills-tab" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" id="pills-timeline-tab" data-toggle="pill" href="#current-month" role="tab" aria-controls="pills-timeline" aria-selected="true">Timeline</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#last-month" role="tab" aria-controls="pills-profile" aria-selected="false">Profile</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="pills-setting-tab" data-toggle="pill" href="#previous-month" role="tab" aria-controls="pills-setting" aria-selected="false">Setting</a>
                        </li>
                    </ul>
                    <div class="tab-content" id="pills-tabContent">
                        <div class="tab-pane fade show active" id="current-month" role="tabpanel" aria-labelledby="pills-timeline-tab">
                            <div class="card-body">
                                <div class="profiletimeline mt-0">
                                    <div class="sl-item">
                                        <div class="sl-left"> <img src="/assets/img/users/1.jpg" alt="user" class="rounded-circle" /> </div>
                                        <div class="sl-right">
                                            <div><a href="javascript:void(0)" class="link">John Doe</a> <span class="sl-date">5 minutes ago</span>
                                                <p>assign a new task <a href="javascript:void(0)"> Design weblayout</a></p>
                                                <div class="row">
                                                    <div class="col-lg-3 col-md-6 mb-20"><img src="/assets/img/big/img2.jpg" class="img-fluid rounded" /></div>
                                                    <div class="col-lg-3 col-md-6 mb-20"><img src="/assets/img/big/img3.jpg" class="img-fluid rounded" /></div>
                                                    <div class="col-lg-3 col-md-6 mb-20"><img src="/assets/img/big/img4.jpg" class="img-fluid rounded" /></div>
                                                    <div class="col-lg-3 col-md-6 mb-20"><img src="/assets/img/big/img5.jpg" class="img-fluid rounded" /></div>
                                                </div>
                                                <div class="like-comm"> 
                                                    <a href="javascript:void(0)" class="link mr-10">2 comment</a> 
                                                    <a href="javascript:void(0)" class="link mr-10"><i class="fa fa-heart text-danger"></i> 5 Love</a> 
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="sl-item">
                                        <div class="sl-left"> <img src="/assets/img/users/2.jpg" alt="user" class="rounded-circle" /> </div>
                                        <div class="sl-right">
                                            <div> <a href="javascript:void(0)" class="link">John Doe</a> <span class="sl-date">5 minutes ago</span>
                                                <div class="mt-20 row">
                                                    <div class="col-md-3 col-xs-12"><img src="/assets/img/big/img6.jpg" alt="user" class="img-fluid rounded" /></div>
                                                    <div class="col-md-9 col-xs-12">
                                                        <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. </p> <a href="javascript:void(0)" class="btn btn-success"> Design weblayout</a>
                                                    </div>
                                                </div>
                                                <div class="like-comm mt-20"> 
                                                    <a href="javascript:void(0)" class="link mr-10">2 comment</a> 
                                                    <a href="javascript:void(0)" class="link mr-10"><i class="fa fa-heart text-danger"></i> 5 Love</a> 
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="sl-item">
                                        <div class="sl-left"> <img src="/assets/img/users/3.jpg" alt="user" class="rounded-circle" /> </div>
                                        <div class="sl-right">
                                            <div>
                                                <a href="javascript:void(0)" class="link">John Doe</a> <span class="sl-date">5 minutes ago</span>
                                                <p class="mt-10"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper </p>
                                            </div>
                                            <div class="like-comm mt-20"> 
                                                <a href="javascript:void(0)" class="link mr-10">2 comment</a> 
                                                <a href="javascript:void(0)" class="link mr-10"><i class="fa fa-heart text-danger"></i> 5 Love</a> 
                                            </div>
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="sl-item">
                                        <div class="sl-left"> <img src="/assets/img/users/4.jpg" alt="user" class="rounded-circle" /> </div>
                                        <div class="sl-right">
                                            <div><a href="javascript:void(0)" class="link">John Doe</a> <span class="sl-date">5 minutes ago</span>
                                                <blockquote class="mt-10">
                                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
                                                </blockquote>
                                            </div>
                                        </div>
                                    </div>
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
  name: 'Profile',

  components: {
      PageHeader: () => import('@/components/layouts/PageHeader')
  }
}
</script>