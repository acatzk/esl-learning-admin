<template>
    <div>
        <div id="notfound">
            <div class="notfound">
                <div class="notfound-404">
                <h1>4<span></span>4</h1>
                </div>
                <h2>Oops! Page Not Be Found</h2>
                <p>Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable</p>
                <router-link to="/" class="link-custom" href="">Back to homepage</router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>
#notfound {
  position: relative;
  height: 100vh;
}
#notfound .notfound {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
}
.notfound {
  max-width: 520px;
  width: 100%;
  text-align: center;
  line-height: 1.4;
}
.notfound .notfound-404 {
  height: 190px;
}
.notfound .notfound-404 h1 {
  font-family: 'Montserrat', sans-serif;
  font-size: 146px;
  font-weight: 700;
  margin: 0px;
  color: #fff;
}
.notfound .notfound-404 h1>span {
  display: inline-block;
  width: 120px;
  height: 120px;
  background-image: url('../assets/404/img/emoji.png') !important;
  background-size: cover;
  -webkit-transform: scale(1.4);
      -ms-transform: scale(1.4);
          transform: scale(1.4);
  z-index: -1;
}
.notfound h2 {
  font-family: 'Montserrat', sans-serif;
  font-size: 22px;
  font-weight: 700;
  margin: 0;
  text-transform: uppercase;
  color: #fff;
}
.notfound p {
  font-family: 'Montserrat', sans-serif;
  color: #c7c7c7;
  font-weight: 300;
}
.notfound .link-custom {
  font-family: 'Montserrat', sans-serif;
  display: inline-block;
  padding: 12px 30px;
  font-weight: 700;
  background-color: #f99827;
  color: #fff;
  border-radius: 40px;
  text-decoration: none;
  -webkit-transition: 0.2s all;
  transition: 0.2s all;
}
.notfound .link-custom:hover {
  opacity: 0.8;
}
@media only screen and (max-width: 767px) {
  .notfound .notfound-404 {
    height: 115px;
  }
  .notfound .notfound-404 h1 {
    font-size: 86px;
  }
  .notfound .notfound-404 h1>span {
    width: 86px;
    height: 86px;
  }
}
</style>