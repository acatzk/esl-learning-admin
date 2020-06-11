<template>
     <div class="auth-wrapper">
        <div class="container-fluid h-100">
            <div class="row flex-row h-100 bg-white">
                <div class="col-xl-8 col-lg-6 col-md-5 p-0 d-md-block d-lg-block d-sm-none d-none">
                    <div class="lavalite-bg" style="background-image: url('/assets/img/auth/login-bg.jpg')">
                        <div class="lavalite-overlay"></div>
                    </div>
                </div>
                <div class="col-xl-4 col-lg-6 col-md-7 my-auto p-0">
                    <div class="authentication-form mx-auto">
                        <div class="logo-centered">
                            <img src="/assets/src/img/brand.svg" alt="">
                        </div>
                        <h3>Sign In to Vic Solution, Inc.</h3>
                        <p>Happy to see you again!</p>
                        <form>
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Email" />
                                <i class="ik ik-user"></i>
                            </div>
                            <div class="form-group">
                                <input type="password" class="form-control" placeholder="Password" />
                                <i class="ik ik-lock"></i>
                            </div>
                            <div class="text-right">
                                <button class="btn btn-theme w-100">Sign In</button>
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>