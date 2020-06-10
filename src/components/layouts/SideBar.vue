<template>
    <div class="app-sidebar colored">
        <div class="sidebar-header">
            <a class="header-brand" href="index.html">
                <div class="logo-img">
                    <img src="/assets/src/img/brand-white.svg" class="header-brand-img" alt="lavalite"> 
                </div>
                <span class="text">ThemeKit</span>
            </a>
            <button type="button" class="nav-toggle">
                <i data-toggle="expanded" class="ik ik-toggle-right toggle-icon"></i>
            </button>
            <button id="sidebarClose" class="nav-close">
                <i class="ik ik-x"></i>
            </button>
        </div>
        
        <div class="sidebar-content">
            <div class="nav-container">
                <nav id="main-menu-navigation" class="navigation-main">
                    <div class="nav-lavel">Navigation</div>
                    <div class="nav-item active">
                        <router-link to="/admin/dashboard"><i class="ik ik-bar-chart-2"></i><span>Dashboard</span></router-link>
                    </div>
                    <div class="nav-item">
                        <a href="pages/navbar.html"><i class="ik ik-menu"></i><span>Navigation</span> <span class="badge badge-success">New</span></a>
                    </div>
                    <div class="nav-item has-sub">
                        <a href="javascript:void(0)"><i class="ik ik-layers"></i><span>Widgets</span> <span class="badge badge-danger">150+</span></a>
                        <div class="submenu-content">
                            <a href="pages/widgets.html" class="menu-item">Basic</a>
                        </div>
                    </div>
                    <div class="nav-lavel">UI Element</div>
                    <div class="nav-item has-sub">
                        <a href="#"><i class="ik ik-box"></i><span>Basic</span></a>
                        <div class="submenu-content">
                            <a href="pages/ui/alerts.html" class="menu-item">Alerts</a>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </div>
</template>