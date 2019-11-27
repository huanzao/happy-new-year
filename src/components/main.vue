<template>
    <el-container style="height:100%">
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
      <!-- <el-submenu index="1" style="text-align:left">
        <template slot="title">
          <i class="el-icon-coin"></i>
          <span>商品基础信息</span>
        </template>
        <el-menu-item-group>
          <router-link class='mymain_router' to="/main/goods">
              <el-menu-item index="1-1"><i class="el-icon-paperclip"></i>获取商品以及参数信息</el-menu-item>
          </router-link>
          <router-link class='mymain_router' to="/main/goods_information">
              <el-menu-item index="1-2"><i class="el-icon-paperclip"></i>获取商品目配件信息</el-menu-item>
          </router-link>
          <router-link class='mymain_router' to="/main/goods_service">
              <el-menu-item index="1-3" ><i class="el-icon-paperclip"></i>获取商品目增值服务信息</el-menu-item>
          </router-link>  
        </el-menu-item-group>
      </el-submenu> -->
    
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
        
        <el-container>
            <el-header style="padding:0;text-align:right">
                <el-menu
                :default-active="activeIndex2"
                class="el-menu-demo my_header_right"
                mode="horizontal"
                @select="handleSelect"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
                <!-- <el-menu-item index="1">处理中心</el-menu-item> -->
                <el-submenu index="2">
                    <template slot="title">{{ user }}</template>
                    <el-menu-item index="2-1" @click="editPs">修改密码</el-menu-item>
                    <el-menu-item index="2-1" @click="out">退出</el-menu-item>
                </el-submenu>
                
               
                </el-menu>
            </el-header>
            <el-main style="line-height:0">

                <transition  name="slide-fade">
                  <router-view></router-view>
                </transition>
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
      out(){
        sessionStorage.user=""
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
  .slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(100px);
  opacity: 0;
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
  .el-menu-item:hover{
    background-color: #3E3D32 !important;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
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
  .el-select .el-input {
    width: 130px;
  }
  .el-form-item {
    margin-bottom: 13px;
  }
  
  .srarch_result{
      position: relative;
      width: 30%;
      padding: 10px 0 10px 20px;
    }
    .srarch_result>ul{
      position: absolute;
      width: 1200px;
      height: 500px;
      overflow-y: scroll;
      background: #E9EEF3;
      z-index: 10;
      top: 26px;
      padding-top: 20px
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
      width: 360px;
      margin-right: 20px;
    }
    .srarch_result>ul>li>span:nth-child(2){
      display: inline-block;
      width: 350px;
    }
    /* select 插件的样式 */
    .myselect{ 
      width: 100%;
    }
    .myselect>div{
      width: 100% !important;
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
</style>
