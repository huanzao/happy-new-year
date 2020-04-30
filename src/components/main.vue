<template>
    <el-container style="height:100%">
        
        <el-header style="padding:0;text-align:right">
          

            <el-menu
            :default-active="activeIndex2"
            class="el-menu-demo my_header_right"
            mode="horizontal"
            @select="handleSelect"
            background-color="#353535"
            text-color="#fff"
            active-text-color="#ffd04b">
            <div style="height: 50px; float: left;line-height: 100px;padding-left: 20PX;">
                  <img style="height: 50px;line-height: 50px;" src="../assets/logo.jpg" alt="">
            </div>
            <el-submenu index="2">
                <template slot="title">{{ user }}</template>
                <!-- <el-menu-item index="2-1" @click="editPs">修改密码</el-menu-item> -->
                <el-menu-item index="2-1" @click="out">退出</el-menu-item>
            </el-submenu>
            </el-menu>
        </el-header>
        <el-container style="height:500px">
            <el-aside width='' style="background:#444444">
            <el-col style="height:100%">
                <ul class="myside" style="float:left">
                  <li v-for="(item,index) in sideArr" :key='index' @click='sideClick(index)' :class="{'mysideActive':item.isActive}">
                    <i :class="item.icon"  ></i>
                    <span>{{item.title}}</span>
                  </li>
                </ul>
                <el-menu v-if='showMenu' id="mySideMenu" style="float:right"  :unique-opened="true"   class="el-menu-vertical-demo">
                  <label v-for="(item,index) in arrRoute[sideIndex]" :key="index">
                      <el-menu-item style="text-align:left" v-if='!item.child' :index="String(index)" @click="myJump(item.route)" >
                          <span slot="title">{{item.title}}</span>
                      </el-menu-item>
                      <el-submenu v-if='item.child' :index="String(index)" class="main_side_menu" >
                          <template slot="title" >
                              <span>{{ item.title }}</span>
                          </template>
                          <el-menu-item-group  style="overflow-x: hidden;">
                              <el-menu-item v-for="(sm,i) in item.child" :key='i' @click="myJump(sm.route)" >{{sm.title}}</el-menu-item>
                          </el-menu-item-group>
                      </el-submenu>
                  </label>
                </el-menu>
            </el-col>   
        </el-aside>
            <el-main style="line-height:0">
                <router-view/>
            </el-main>
            
        </el-container>
        <el-footer style="height:32px;line-height:32px"><span style="padding-right:20px">恒华科技</span><span>        
              </span><span>电话：400-060-8816</span>
            </el-footer>
        <!-- 修改密码的弹框 -->
        <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
          <el-form :model="ruleForm"  :rules="rules" ref="ruleForm" :label-width="formLabelWidth">
            <el-form-item label="账号" prop="account">
              <el-input  v-model="ruleForm.account" size="mini" autocomplete="off"></el-input>
            </el-form-item>  
            <el-form-item label="旧密码" prop="password">
              <el-input type="password" v-model="ruleForm.password" size="mini" autocomplete="off"></el-input>
            </el-form-item> 
             <el-form-item label="新密码" prop="pass">
              <el-input type="password" v-model="ruleForm.pass" size="mini" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="ruleForm.checkPass" size="mini" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
            <el-button  size="mini" type="primary" @click="submitForm('ruleForm')">确 定</el-button>
          </div>
        </el-dialog>
    </el-container>
</template>
<script>
import {mapMutations, mapState} from 'vuex'
export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        showMenu:false,
        myAIndex:0,
        isRout:true,
        isCollapse:true,
        formLabelWidth: '120px',
        activeIndex: '1',
        activeIndex2: '1',
        one_open:true,
        user:"",
        dialogFormVisible:false,
        ruleForm:{
            account:'',
            password:'',
            pass: '',
            checkPass: '',
        },
        rules: {
              account:[
                {required: true, message: '请输入账号', trigger: 'blur'}
              ],
              password:[
                {required: true, message: '请输入账号', trigger: 'blur'}
              ],
              pass: [
                { validator: validatePass, trigger: 'blur' }
              ],
              checkPass: [
                { validator: validatePass2, trigger: 'blur' }
              ],
        },
        sideArr:[
          {title:'主页',icon:'el-icon-s-home',isActive:true},

          // {title:'资产购入',icon:'el-icon-upload',isActive:false},
          // {title:'资产档案',icon:'el-icon-s-platform',isActive:false},
          // {title:'设备维修',icon:'el-icon-s-check',isActive:false},
          // {title:'设备质控',icon:'el-icon-stopwatch',isActive:false},
          
          {title:'厂商管理',icon:'el-icon-office-building',isActive:false},
          // {title:'耗材计划',icon:'el-icon-time',isActive:false},
          {title:'耗材管理',icon:'el-icon-collection',isActive:false},
          {title:'设备管理',icon:'el-icon-receiving',isActive:false},
          {title:'基础设置',icon:'el-icon-s-tools',isActive:false}
        ],
        arrRoute:
        [
          [],
          [
            {title:'证件列表',route:'zjlb',child:null},
            {title:'合同管理',route:'htgl',child:null},
            {title:'合同付款管理',route:'htfkgl',child:null},
          ],
          // [
          //   {title:'科室计划申请--废弃',route:'ksjhsq',child:null},
          //   {title:'科室计划审批--废弃',route:'ksjhsp',child:null},
          //   {title:'科室计划审批查询--废弃',route:'ksjhsp_find',child:null},
          // ],
          [
            {title:'耗材台账',route:'hcgl_hcrk',child:null},
            {title:'耗材列表',route:'hcgl_list',child:null},
            {title:'出入库审批列表',route:'hcgl_crkRecord',child:null},
            {title:'科室领取记录',route:'hcgl_lingqujilu',child:null},
            {title:'退库申请列表',route:'hcgl_tksq',child:null},
            // {title:'耗材计划盘点',route:'haocaiCheck',child:null}
          ],
          [
            {title:'设备台账',route:'zcrk_list',child:null},
            {title:'设备列表',route:'device_list',child:null},
            {title:'出入库审批列表',route:'zcrk_crkRecord',child:null},
            {title:'科室领取记录',route:'zcru_lingqujilu',child:null},
            {title:'资产转移审批列表',route:'zczy_crkRecord',child:null},
            {title:'报废申请列表',route:'breakList',child:null},
            {title:'设备盘点计划',route:'deviceCheck',child:null},
            
          ],
          [
            {title:'科室管理',route:'ksgl',child:null},
            {title:'仓库管理',route:'wareHouse',child:null},
            {title:'科室分类',route:'ksfl',child:null},
            {title:'组织管理',route:'wyhgl',child:null},
            {title:'角色管理',route:'role',child:null},
            {title:'人员管理',route:'user',child:null},
            {title:'医院信息管理',route:'hospital',child:null},
            {title:'设备基础设置',child:[
                    {title:'设备分类',route:'flwh'},
                    {title:'器械分类',route:'qxfl'},
                    {title:'设备字典',route:'sbzd'},
                ]
            },
            {title:'耗材基础设置',child:[
                    {title:'耗材分类',route:'hcfl'},
                    {title:'耗材字典',route:'hczd'},
                ]
            },
            // {title:'科室设置',child:[
            //         {title:'计划模板',route:'ksjhmb'},
            //         {title:'常用耗材设置',route:'kscyhcsj'},
            //         {title:'手术模板设置',route:'ssmbsj'}
            //     ]
            // },
            // {title:'维修自动派工',route:'wxzdpg',child:null}
            ]
          ],  
      };
    },
    mounted(){
      if(localStorage.token){
          this.user=localStorage.user
      }else{
          this.$notify.error({
            title: '错误',
            message: '请登录'
          })
          this.$router.push('/')
      }  
    },
    methods: {
      ...mapMutations(['change_sideIndex']),
      sideClick(index){
          this.change_sideIndex(index)
          if(this.myAIndex===index){
              if(this.showMenu===true){
                this.showMenu=false
              }else{
                this.showMenu=true
              }
          }else{
            this.myAIndex=index
            this.showMenu=true
          }
          if(index===0){
            this.showMenu=false
            this.$router.push('echarts')
          }
          this.sideArr.map((item,i)=>{
              item.isActive=false
              if(index===i){
                item.isActive=true
              }
          })
      },
      myJump(path){
          this.$router.push(path)
      },
      out(){
        localStorage.user=""
        localStorage.token=""
        this.$router.push('/')
      },
      editPs(){
        this.dialogFormVisible=true
      },
      submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
                const loading = this.$loading({
                  lock: true,
                  text: 'Loading',
                  spinner: 'el-icon-loading',
                  background: 'rgba(0, 0, 0, 0.7)'
                });
                var updata={
                  Account:this.ruleForm.account,
                  Password:this.ruleForm.password,
                  NewPassword:this.ruleForm.pass
                }
                this.axios({
                  method: 'post',
                  headers:{'Authorization':'Bearer '+localStorage.token},
                  timeout:5000,
                  url: 'api/People/ChangePassword',
                  data:this.$qs.stringify(updata)
                }).then((res)=>{
                   console.log(1111111111)
                    loading.close()
                    this.dialogFormVisible=false
                    if(res.data.response==="success"){
                        this.$message.success(res.data.results)
                    }else{
                      this.$message.warning(res.data.results)
                    }
                }).catch((error)=>{
                    loading.close()
                    this.$message.warning('用户名或密码错误')
                })
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
        console.log(key, keyPath);
      }
    },
    computed:{
        ...mapState({sideIndex:'sideIndex'}),
    },
    watch:{
        // $route(to,from){
        //   console.log(to.path);
        //   if(to.path=='/main/echarts'){
        //       console.log('主页')
        //       this.close(3)
        //       this.close(2)
        //   }
        // }
    }
  }
</script>

<style>
.el-menu.el-menu--horizontal {
    border-bottom:none;

}
  ul li{
    list-style: none;
  }
  /**新侧边栏 */
  .myside{
    padding: 0;
    margin: 0;
  }
  .mysideActive{
    /* background: #409EFF; */
  }
  .mysideActive>i,.mysideActive>span{
    color:#409EFF;
  }
  .myside>li{
    color: #fff;
    line-height: 30px;
    display: flex;
    flex-direction:column;
    align-items: center;
    cursor: pointer;
    border-top: 1px solid #333333;
    border-bottom: 1px solid #202020;
    padding: 0 5px;
  }
  .myside>li:first-child{
    border-top:#333;
  }
  .myside>li:hover{
    background: #c7ecee;
  }
  .myside>li:hover span{
    color: #000;
  }
  .myside>li:hover i{
    color: #000;
  }
  .myside>li>span{
    font-size: 10px;
    line-height: 20px;
  }
  .myside>li>i{
    font-size: 23px;
    padding-top: 6px;
  }
  #mySideMenu{
    box-sizing: border-box;
    height: 100%;
    width: 200px;
    
  }
  .main_side_menu>div{
    text-align: left !important;
  }
  /* 侧边栏样式 */
  /* .el-menu-item{
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
  } */


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
  .el-main >div{
    background: #fff;
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
    .el-select,.el_select>.el_inputm,.el-date-editor.el-input{
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
        height: 50px;
        padding-bottom:5px;
        border-bottom: 2px solid #2ea8e5;
        line-height: 50px;
        padding-right: 5px;
    }
    .pageHead>span{
      display: block;
      float: left;
      width: 300px;
      height: 40px;
      line-height: 55px;
      text-align: left;
      position: relative;
      font-size: 20px;
      color: #2ea8e5;
      padding-left: 10px;
    }
    /* 筛选 */
    .shaixuan{
      margin-top: 1px;
      padding: 10px;
      display: flex;
      flex-wrap: wrap;
    }
    .shaixuan>div{
      padding-right: 20px;
      margin: 2px 0;
    }
    .shaixuan>div>div{
      float: right;
    }
    .shaixuan>div>label {
      font-size: 12px;
      line-height: 26px;
    }
    .shaixuan>div .el-input,.shaixuan>div .el-input {
      width: 120px;
    }
    .shaixuan>div .el-input input {
      width: 100%;
    }
    /** 全局dialog的样式 */
    .el-dialog__body {
        padding: 5px;
    }
    /* */
    .inTable thead{
        display: none;
    }
    /* 小标题或按钮 + */
    .swTitle{
      color: #2d8cf0;
      cursor: pointer;
    }
    .myuili{
      padding: 0;
      margin: 0;
    }
    /*  抽屉里的表单样式  */
    .drawerform .el-input,.drawerform .el-textarea{
        width: 70%;
    }
    .el-drawer.rtl{
      overflow-y: scroll;
    }
  
</style>
