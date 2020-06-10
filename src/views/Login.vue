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
                            <div class="row">
                                <div class="col text-left">
                                    <label class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" id="item_checkbox" name="item_checkbox" value="option1">
                                        <span class="custom-control-label">&nbsp;Remember Me</span>
                                    </label>
                                </div>
                                <div class="col text-right">
                                    <router-link to="/forgot">Forgot Password ?</router-link>
                                </div>
                            </div>
                            <div class="sign-btn text-center">
                                <button class="btn btn-theme">Sign In</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>