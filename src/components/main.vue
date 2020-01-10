<template>
    <el-container style="height:100%">
        <el-aside width='220px' style="background:#444444">
            <router-link class='mymain_router' to="/main/echarts">
              <h5 style="height: 61px;line-height: 61px;;color:#fff;background-color:#353535;margin:0;border-bottom: 1px solid #202020;font-size: 21px;">  管理系统</h5>
            </router-link>
            
        <el-col>
    <el-menu
      default-active="2"
      show-timeout='600'
      hide-timeout='600'
      :unique-opened="one_open"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#444444"
      text-color="#A1A1A1"
      active-text-color="#fff">
       <el-submenu index="3" style="text-align:left">
        <template slot="title">
          <i class="el-icon-tickets"></i>
          <span>报表</span>
        </template>
        <el-menu-item-group>
         
          <router-link class='mymain_router' to="/main/report">
              <el-menu-item index="3-2"><i class="el-icon-paperclip"></i>当日报表</el-menu-item>
          </router-link>
          <router-link class='mymain_router' to="/main/report_history">
              <el-menu-item index="3-3"><i class="el-icon-paperclip"></i>历史报表</el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2" style="text-align:left">
        <template slot="title">
          <i class="el-icon-money"></i>
          <span>基础信息</span>
        </template>
        <el-menu-item-group>
          <router-link class='mymain_router' to="/main/user">
              <el-menu-item index="2-5"><i class="el-icon-paperclip"></i>用户</el-menu-item>
          </router-link>
          <router-link class='mymain_router' to="/main/role">
              <el-menu-item index="2-8"><i class="el-icon-paperclip"></i>角色</el-menu-item>
          </router-link>
          <router-link class='mymain_router' to="/main/account">
              <el-menu-item index="2-10"><i class="el-icon-paperclip"></i>证券账户</el-menu-item>
          </router-link>
          <router-link class='mymain_router' to="/main/co">
              <el-menu-item index="2-11"><i class="el-icon-paperclip"></i>券商</el-menu-item>
          </router-link>
          <router-link class='mymain_router' to="/main/shares_show">
              <el-menu-item index="2-13"><i class="el-icon-paperclip"></i>股票</el-menu-item>
          </router-link>
          <router-link class='mymain_router' to="/main/shares_select">
              <el-menu-item index="2-14"><i class="el-icon-paperclip"></i>选股</el-menu-item>
          </router-link>
          <router-link class='mymain_router' to="/main/settings">
              <el-menu-item index="2-15"><i class="el-icon-paperclip"></i>系统设置</el-menu-item>
          </router-link>
          <router-link class='mymain_router' to="/main/set_show">
              <el-menu-item index="2-16"><i class="el-icon-paperclip"></i>设置展示</el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>
     
    </el-menu>
  </el-col>   

        </el-aside>
        
        <el-container>
            <el-header style="padding:0;text-align:right">
                <el-menu
                :default-active="activeIndex2"
                class="el-menu-demo my_header_right"
                mode="horizontal"
                @select="handleSelect"
                background-color="#353535"
                text-color="#fff"
                active-text-color="#ffd04b">
                <el-submenu index="2">
                    <template slot="title">{{ user }}</template>
                    <el-menu-item index="2-1" @click="editPs">修改密码</el-menu-item>
                    <el-menu-item index="2-1" @click="out">退出</el-menu-item>
                </el-submenu>
                
               
                </el-menu>
            </el-header>
            <el-main style="line-height:0">
                <router-view/>
            </el-main>
            <el-footer style="height:32px;line-height:32px"><span style="padding-right:20px">恒华科技</span><span>        
              </span><span>电话：400-060-8816</span></el-footer>
        </el-container>
        <!-- 修改密码的弹框 -->
        <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
          
          <el-form :model="form"  :rules="rules" ref="form">
            
            <el-form-item label="输入原始密码"  prop="pss1" :label-width="formLabelWidth">
              <el-input v-model="form.pss1" type='password' size='mini' autocomplete="off"></el-input>
            </el-form-item>
            
            <el-form-item label="输入新密码" prop="pss2" :label-width="formLabelWidth">
              <el-input v-model="form.pss2" type='password' size='mini' autocomplete="off"></el-input>
            </el-form-item>
            
            <el-form-item label="确认新密码" prop="pss3" :label-width="formLabelWidth">
              <el-input v-model="form.pss3" type='password' size='mini' autocomplete="off"></el-input>
            </el-form-item>
          
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('form')">确 定</el-button>
          </div>
        </el-dialog>


    </el-container>
</template>
<script>
import {mapMutations} from 'vuex'
export default {
    data() {
      return {
        formLabelWidth: '120px',
        activeIndex: '1',
        activeIndex2: '1',
        one_open:true,
        user:"",
        dialogFormVisible:false,
        form:{
            zh:"",
            pss1:'',
            pss2:'',
            pss3:''
        },
        rules: {
              pss1: [
                { required: true, message: '请输入型号编号', trigger: 'blur' },
              ],
              pss2: [
                { required: true, message: '请输入型号名称', trigger: 'blur' },
              ],
              pss3: [
                { required: true, message: '请输入型号名称', trigger: 'blur' },
              ],
        }     
      };
    },
    mounted(){
      this.user=localStorage.user
      // if(sessionStorage.user){
      //     this.user=sessionStorage.user
      //     this.form.zh=sessionStorage.user
      // }else{
      //     this.$notify.error({
      //       title: '错误',
      //       message: '请登录'
      //     })
      //     this.$router.push('/')
      // }  
    },
    methods: {
      ...mapMutations(['clear_state']),
      out(){
        localStorage.user=""
        localStorage.token=""
        this.clear_state()
        this.$router.push('/')
      },
      editPs(){
        this.dialogFormVisible=true
      },
      submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              if(this.form.pss1==this.form.pss2){
                  this.$message.error('新密码不能和旧密码一样');
              }else if(this.form.pss2!=this.form.pss3){
                  this.$message.error('两次输入的新密码不一致');
              }else{
                  const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                  });
              let param = new URLSearchParams()
              let obj=this.form
              Object.keys(obj).forEach(function(key){
                  param.append(key, obj[key])
              })
              console.log(this.form)
              this.axios({
                  method: 'post',
                  url: 'api/change_password',
                  data: param
              }).then((res)=>{
                      loading.close()
                      
                      if(res.data.success==1){
                          this.dialogFormVisible=false
                          this.$message({
                            message: '密码修改成功,请重新登录',
                            type: 'success'
                          });
                          sessionStorage.user=""
                          this.$router.push('/')
                      }else{
                          this.$message.error(res.data.result);
                      }
                  }).catch(()=>{
                      loading.close()
                      this.$notify.error({
                        title: '错误',
                        message: '网路故障，请稍后再试'
                      })
                  })
                  
              }

            } 
          });
      },
      handleSelect(key, keyPath) {
        // console.log(key, keyPath);
      },
       handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath){
        // console.log(key, keyPath);
      }
    }
  }
</script>
<style>
  /* 侧边栏样式 */
  .el-menu-item{
    background-color: #2A2A2A !important;
  }
  .el-submenu__title{
    height: 40px;
    line-height: 40px;
    border-top: 1px solid #333333;
    border-bottom: 1px solid #202020;
  }
  .el-submenu .el-menu-item {
    height: 40px;
    line-height: 40px;
    padding: 0 45px;
    min-width: 200px;
    border-top: 2px solid #333333;
    border-bottom: 2px solid #202020;
  }
  .el-submenu .el-menu-item:hover{
    color:#CCCCCC !important;
    background-color: #272727 !important;
  }
  .el-menu-item-group__title{
    padding: 0;
    height:2px;
    background-color:#4E4E4E; 
  }
  .el-menu-item-group .is-active{
    background-color: #272727 !important;
    border-top: 2px solid #333333;
    border-bottom: 2px solid #202020;
  }
  .el-submenu.is-active .el-submenu__title {
      border-bottom-color:#202020 !important;
  }


  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
    text-align: center;
    line-height: 200px;
  }
 

  .el-main {
    background-color: #EEEEEE;
    color: #333;
    text-align: left;
    line-height: 160px;
    padding: 10px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .my_header_right{
    padding-right: 80px;
  }
  .my_header_right>li{
    float:right !important;
  }
  .router-link-exact-active{
      color: rgb(255, 208, 75) !important;
  }
  .mymain_router{
      text-decoration:none;
      color: rgb(255, 255, 255);
  }
  .el-table td{
    padding: 8px 0;
  }
  .el-form-item {
    margin-bottom: 13px;
  }
  
  .srarch_result{
      position: relative;
      /* width: 30%;
      padding: 10px 0 10px 20px; */
    }
    .srarch_result>ul{
      position: absolute;
      width: 300px;
      height: 280px;
      overflow-y: scroll;
      background: #E9EEF3;
      z-index: 10;
      top: 26px;
      padding-top: 39px;
      border-radius:5px; 
      box-shadow: 10px 10px rgba(11, 11, 11, .5);
    }
    .srarch_result>ul>li{
      color: #000;
      cursor: pointer;
      line-height: 20px;
      list-style: none;
      padding:5px 0 5px 0; 
    }
    .srarch_result>ul>li:hover{
        color: #1abc9c;
         font-size: 20px;
    }
    .srarch_result>ul>li>span:nth-child(1){
      display: inline-block;
      width: 120px;
      margin-right: 20px;
    }
    .srarch_result>ul>li>span:nth-child(2){
      display: inline-block;
      width: 100px;
    }
    /* select 插件的样式 */
    .el-select,.el_select>.el_input{
      width: 100%
    }
   

    .el-dialog__header{ /* 弹出框标题样式 */
        text-align: left
    }
    .el-divider--horizontal{ /* 分割线的样式 */
        margin: 14px 0;
    }
    .el-page-header{
        padding:10px 0 0 5px;
    }
    /* table 的样式 */
    .el-table{
      border: 2px solid #CDCDCD; 
    }
    .el-table thead tr th{
	      background:linear-gradient(#FBFBFB, #EAEAEA);
        height: 40px;
        line-height: 40px;
        padding: 0;
    }
    .el-table__row:hover td{
      background-color:#EFEFEF !important;
    }
    .el-table__row td{
      padding: 5px 0;
      height: 27px;
      line-height: 27px;
      background-color: #F9F9F9;
    }


    /* dialog 弹框的样式 */
    .myDialog .el-select,.myDialog .el-input{
      width: 70%
    }
    .myDialog .el-select>.el-input{
      width: 100%;
    }

    /* 分页控件样式 */
    .el-pager>li{
        background:linear-gradient(#FEFEFE, #E6E6E6);
        border: 1px solid #CECECE;   
        border-left:0; 
    }
    .el-pager>li:first-child{
      border-left:1px solid #CECECE;
    }
    .el-pagination button{
        border: 1px solid #CECECE;   
        border-right:0; 
        background:linear-gradient(#FEFEFE, #E6E6E6);
    }
    .el-pagination .btn-next{ 
        border-left:0;
        border-right:1px solid #CECECE;
        background:linear-gradient(#FEFEFE, #E6E6E6);
    }
    .el-pagination .btn-prev{
        background:linear-gradient(#FEFEFE, #E6E6E6);
    }
    .el-pager>li:hover, .el-pagination button:hover{
        background:#DEDEDE;
        
    }
    .el-pager>li.active{
        background:linear-gradient(#525252, #222222);
        color: #fff;
    }
    .el-pagination .el-input__inner{
        background:linear-gradient(#FEFEFE, #E6E6E6);
    }
    /* 页头 */
    .pageHead{
        text-align: right;
        padding-bottom:10px;
    }
    .pageHead>span{
      float: left;
      display: inline-block;
      width: 150px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      position: relative;
      font-size: 20px;
      font-weight: bold;
    }
    .pageHead>span::after{
      content: "";
      background: rgba(193, 193, 193, 1);
      display: block;
      height: 7px;
      width: 150px;
      position: absolute;
      bottom:2px;
      border-radius: 100%;
    }
    /* input:-webkit-autofill{
        -webkit-box-shadow: 0 0 0 1000px #fff(0,0,0,.8) inset; 
        -webkit-text-fill-color: #000; 
        
    }
      input[type=text]:focus, input[type=password]:focus{
          -webkit-box-shadow: 0 0 0 1000px #fff(0,0,0,.8) inset; 
          -webkit-text-fill-color: #000;
      } */
</style>
