<template>
  <div id="app">

    <login 
      v-if="$route.path === '/login'"
    />

    <div class="wrapper" v-else>
        <header class="header-top" header-theme="light">
            <div class="container-fluid">
                <div class="d-flex justify-content-between">
                    <div class="top-menu d-flex align-items-center">
                        <button type="button" class="btn-icon mobile-nav-toggle d-lg-none"><span></span></button>
                        <div class="header-search">
                            <div class="input-group">
                                <span class="input-group-addon search-close"><i class="ik ik-x"></i></span>
                                <input type="text" class="form-control">
                                <span class="input-group-addon search-btn"><i class="ik ik-search"></i></span>
                            </div>
                        </div>
                        <button type="button" id="navbar-fullscreen" class="nav-link"><i class="ik ik-maximize"></i></button>
                    </div>
                    <div class="top-menu d-flex align-items-center">
                        <div class="dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="notiDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="ik ik-bell"></i>
                                <span class="badge bg-danger">3</span>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right notification-dropdown" aria-labelledby="notiDropdown">
                                <h4 class="header">Notifications</h4>
                                <div class="notifications-wrap">
                                    <a href="#" class="media">
                                        <span class="d-flex">
                                            <i class="ik ik-check"></i> 
                                        </span>
                                        <span class="media-body">
                                            <span class="heading-font-family media-heading">Invitation accepted</span> 
                                            <span class="media-content">Your have been Invited ...</span>
                                        </span>
                                    </a>
                                    <a href="#" class="media">
                                        <span class="d-flex">
                                            <img src="@/assets/img/users/1.jpg" class="rounded-circle" alt="">
                                        </span>
                                        <span class="media-body">
                                            <span class="heading-font-family media-heading">Steve Smith</span> 
                                            <span class="media-content">I slowly updated projects</span>
                                        </span>
                                    </a>
                                    <a href="#" class="media">
                                        <span class="d-flex">
                                            <i class="ik ik-calendar"></i> 
                                        </span>
                                        <span class="media-body">
                                            <span class="heading-font-family media-heading">To Do</span> 
                                            <span class="media-content">Meeting with Nathan on Friday 8 AM ...</span>
                                        </span>
                                    </a>
                                </div>
                                <div class="footer"><a href="javascript:void(0);">See all activity</a></div>
                            </div>
                        </div>
                        <button type="button" class="nav-link ml-10 right-sidebar-toggle">
                            <i class="ik ik-message-square"></i>
                            <span class="badge bg-success">3</span>
                        </button>
                        <div class="dropdown">
                            <a class="dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <img class="avatar" src="@/assets/img/user.jpg" alt="">
                            </a>
                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                                <router-link to="/profile" class="dropdown-item">
                                    <i class="ik ik-user dropdown-icon"></i> Profile
                                </router-link>
                                <router-link to="/settings" class="dropdown-item">
                                    <i class="ik ik-settings dropdown-icon"></i> Settings
                                </router-link>
                                <a class="dropdown-item" href="#">
                                    <i class="ik ik-power dropdown-icon"></i> Logout
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </header>

        <div class="page-wrap">

            <div class="app-sidebar colored">
                <div class="sidebar-header">
                    <router-link to="/admin/dashboard" class="header-brand">
                        <div class="logo-img">
                            <span class="header-brand-img" style="font-size: 15px;">VS
                              <b style="color: red; margin-left: 2px; font-weight: bolder;">.</b></span>
                        </div>
                        <span class="text">Vic Solution</span>
                    </router-link>
                    <button type="button" class="nav-toggle"><i data-toggle="expanded" class="ik ik-toggle-right toggle-icon"></i></button>
                    <button id="sidebarClose" class="nav-close"><i class="ik ik-x"></i></button>
                </div>
                
                <div class="sidebar-content">
                    <div class="nav-container">
                        <nav id="main-menu-navigation" class="navigation-main">
                            <div class="nav-lavel">Management</div>
                            <div 
                              :class="$route.path === '/admin/dashboard' ? 'nav-item active' : 'nav-item'"
                            >
                                <router-link to="/admin/dashboard">
                                  <i class="ik box ik-box"></i><span>Dashboard</span>
                                </router-link>
                            </div>

                            <div 
                              :class="$route.path === '/admin/inbox' ? 'nav-item active' : 'nav-item'"
                            >
                                <router-link to="/admin/inbox">
                                  <span class="badge badge-primary">6</span>
                                  <i class="ik ik-mail dropdown-icon"></i> Inbox
                                </router-link>
                            </div>
                            <div 
                              :class="$route.path === '/admin/lessons' ? 'nav-item active' : 'nav-item'"
                            >
                                <router-link to="/admin/lessons">
                                  <i class="ik book ik-book"></i><span>Lessons</span>
                                </router-link>
                            </div>
                            <div 
                              :class="$route.path === '/admin/teachers' ? 'nav-item active' : 'nav-item'"
                            >
                                <router-link to="/admin/teachers">
                                  <i class="ik users ik-users"></i><span>Teachers</span>
                                </router-link>
                            </div>
                             <div 
                                :class="$route.path === '/admin/students' ? 'nav-item active' : 'nav-item'"
                              >
                                <router-link to="/admin/students">
                                  <i class="ik user ik-user"></i><span>Students</span>
                                </router-link>
                            </div>
                            <div class="nav-lavel">Account Settings</div>
                              <div 
                                :class="$route.path === '/admin/settings' ? 'nav-item active' : 'nav-item'"
                              >
                                <router-link to="/admin/settings">
                                  <i class="ik settings ik-settings"></i><span>Settings</span>
                                </router-link>
                            </div>
                             <div class="nav-item">
                                <a href="#">
                                  <i class="ik ik-power dropdown-icon"></i><span>Logout</span>
                                </a>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>

            <main-content>

                <div class="container-fluid">

                  <vue-page-transition name="fade-in-right" class="content">
                    
                    <router-view></router-view>

                  </vue-page-transition>

                </div>

            </main-content>

            <aside class="right-sidebar">
                <div class="sidebar-chat" data-plugin="chat-sidebar">
                    <div class="sidebar-chat-info">
                        <h6>Chat List</h6>
                        <form class="mr-t-10">
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Search for friends ..."> 
                                <i class="ik ik-search"></i>
                            </div>
                        </form>
                    </div>
                    <div class="chat-list">
                        <div class="list-group row">
                            <a href="javascript:void(0)" class="list-group-item" data-chat-user="Gene Newman">
                                <figure class="user--online">
                                    <img src="/assets/img/users/1.jpg" class="rounded-circle" alt="">
                                </figure><span><span class="name">Gene Newman</span>  <span class="username">@gene_newman</span> </span>
                            </a>
                            <a href="javascript:void(0)" class="list-group-item" data-chat-user="Billy Black">
                                <figure class="user--online">
                                    <img src="/assets/img/users/2.jpg" class="rounded-circle" alt="">
                                </figure><span><span class="name">Billy Black</span>  <span class="username">@billyblack</span> </span>
                            </a>
                            <a href="javascript:void(0)" class="list-group-item" data-chat-user="Herbert Diaz">
                                <figure class="user--online">
                                    <img src="/assets/img/users/3.jpg" class="rounded-circle" alt="">
                                </figure><span><span class="name">Herbert Diaz</span>  <span class="username">@herbert</span> </span>
                            </a>
                            <a href="javascript:void(0)" class="list-group-item" data-chat-user="Sylvia Harvey">
                                <figure class="user--busy">
                                    <img src="/assets/img/users/4.jpg" class="rounded-circle" alt="">
                                </figure><span><span class="name">Sylvia Harvey</span>  <span class="username">@sylvia</span> </span>
                            </a>
                            <a href="javascript:void(0)" class="list-group-item active" data-chat-user="Marsha Hoffman">
                                <figure class="user--busy">
                                    <img src="/assets/img/users/5.jpg" class="rounded-circle" alt="">
                                </figure><span><span class="name">Marsha Hoffman</span>  <span class="username">@m_hoffman</span> </span>
                            </a>
                            <a href="javascript:void(0)" class="list-group-item" data-chat-user="Mason Grant">
                                <figure class="user--offline">
                                    <img src="/assets/img/users/1.jpg" class="rounded-circle" alt="">
                                </figure><span><span class="name">Mason Grant</span>  <span class="username">@masongrant</span> </span>
                            </a>
                            <a href="javascript:void(0)" class="list-group-item" data-chat-user="Shelly Sullivan">
                                <figure class="user--offline">
                                    <img src="/assets/img/users/2.jpg" class="rounded-circle" alt="">
                                </figure><span><span class="name">Shelly Sullivan</span>  <span class="username">@shelly</span></span>
                            </a>
                        </div>
                    </div>
                </div>
            </aside>

            <div class="chat-panel" hidden>
                <div class="card">
                    <div class="card-header d-flex justify-content-between">
                        <a href="javascript:void(0);"><i class="ik ik-message-square text-success"></i></a>  
                        <span class="user-name">John Doe</span> 
                        <button type="button" class="close" aria-label="Close"><span aria-hidden="true">×</span></button>
                    </div>
                    <div class="card-body">
                        <div class="widget-chat-activity flex-1">
                            <div class="messages">
                                <div class="message media reply">
                                    <figure class="user--online">
                                        <a href="#">
                                            <img src="img/users/3.jpg" class="rounded-circle" alt="">
                                        </a>
                                    </figure>
                                    <div class="message-body media-body">
                                        <p>Epic Cheeseburgers come in all kind of styles.</p>
                                    </div>
                                </div>
                                <div class="message media">
                                    <figure class="user--online">
                                        <a href="#">
                                            <img src="img/users/1.jpg" class="rounded-circle" alt="">
                                        </a>
                                    </figure>
                                    <div class="message-body media-body">
                                        <p>Cheeseburgers make your knees weak.</p>
                                    </div>
                                </div>
                                <div class="message media reply">
                                    <figure class="user--offline">
                                        <a href="#">
                                            <img src="img/users/5.jpg" class="rounded-circle" alt="">
                                        </a>
                                    </figure>
                                    <div class="message-body media-body">
                                        <p>Cheeseburgers will never let you down.</p>
                                        <p>They'll also never run around or desert you.</p>
                                    </div>
                                </div>
                                <div class="message media">
                                    <figure class="user--online">
                                        <a href="#">
                                            <img src="img/users/1.jpg" class="rounded-circle" alt="">
                                        </a>
                                    </figure>
                                    <div class="message-body media-body">
                                        <p>A great cheeseburger is a gastronomical event.</p>
                                    </div>
                                </div>
                                <div class="message media reply">
                                    <figure class="user--busy">
                                        <a href="#">
                                            <img src="img/users/5.jpg" class="rounded-circle" alt="">
                                        </a>
                                    </figure>
                                    <div class="message-body media-body">
                                        <p>There's a cheesy incarnation waiting for you no matter what you palete preferences are.</p>
                                    </div>
                                </div>
                                <div class="message media">
                                    <figure class="user--online">
                                        <a href="#">
                                            <img src="img/users/1.jpg" class="rounded-circle" alt="">
                                        </a>
                                    </figure>
                                    <div class="message-body media-body">
                                        <p>If you are a vegan, we are sorry for you loss.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <form action="javascript:void(0)" class="card-footer" method="post">
                        <div class="d-flex justify-content-end">
                            <textarea class="border-0 flex-1" rows="1" placeholder="Type your message here"></textarea>
                            <button class="btn btn-icon" type="submit"><i class="ik ik-arrow-right text-success"></i></button>
                        </div>
                    </form>
                </div>
            </div>

            <foot-bar /> <!--**  FOOTER BAR COMPONENT **-->
                
          </div>
      </div>

  </div>
</template>

<script>
export default {
  name: 'App',

  components: {
    MainContent: () => import('@/components/layouts/MainContent'),
    FootBar: () => import('@/components/layouts/FootBar'),
    Login: () => import('@/views/Login')
  }
}
</script>