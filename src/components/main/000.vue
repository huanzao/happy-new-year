<template>
    <el-header style="padding:0;text-align:right">
                <el-menu
                :default-active="activeIndex2"
                class="el-menu-demo my_header_right"
                mode="horizontal"
                @select="handleSelect"
                background-color="#353535"
                text-color="#fff"
                active-text-color="#ffd04b">
                <el-menu-item index="1">处理中心</el-menu-item>
                <el-menu-item index="2">处理中心</el-menu-item>
                <el-menu-item index="3">处理中心</el-menu-item>
                <el-menu-item index="4">处理中心</el-menu-item>
                <el-submenu index="5">
                    <template slot="title">{{ user }}</template>
                    <el-menu-item index="2-1" @click="editPs">修改密码</el-menu-item>
                    <el-menu-item index="2-1" @click="out">退出</el-menu-item>
                </el-submenu>
                </el-menu>
    
    </el-header>
    
    <el-container>
                  <el-aside width='250px' style="background:#1E1F1C">
            <h5 style="height:14px;line-height: 14px;color:#fff">河南省政采商城管理系统</h5>
             <el-col>
            <el-menu
            default-active="2"
            show-timeout='600'
            hide-timeout='600'
            :unique-opened="one_open"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#1E1F1C"
            text-color="#fff"
            active-text-color="#ffd04b">
            
            <el-submenu index="2" style="text-align:left">
                <template slot="title">
                <i class="el-icon-money"></i>
                <span>商品报价及信息获取</span>
                </template>
                <el-menu-item-group>
                <router-link class='mymain_router' to="/main/goods_offer">
                    <el-menu-item index="2-1"><i class="el-icon-paperclip"></i>商品报价</el-menu-item>
                </router-link>
                <router-link class='mymain_router' to="/main/echarts">
                    <el-menu-item index="2-2"><i class="el-icon-paperclip"></i>仪表图</el-menu-item>
                </router-link>
                <router-link class='mymain_router' to="/main/goods">
                    <el-menu-item index="2-3"><i class="el-icon-paperclip"></i>商品列表</el-menu-item>
                </router-link>
                
                </el-menu-item-group>
            </el-submenu>
            
            </el-menu>
        </el-col>   

        </el-aside>
             <el-footer style="height:32px;line-height:32px"><span style="padding-right:20px">恒华科技</span><span>        
              </span><span>电话：400-060-8816</span>
        
        </el-footer>   
            </el-container>
        
        
        <el-container>
            
            
            <el-main style="line-height:0">

                <transition  name="slide-fade">
                  <router-view></router-view>
                </transition>
            </el-main>
            
        </el-container>


</template>



