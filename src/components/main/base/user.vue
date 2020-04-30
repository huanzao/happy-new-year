<template>
    <div>
        <div class="pageHead">
            <span>用户列表</span>
            <!-- <el-button size="mini" @click="myAdd('user_add')"  type="primary">批量导入</el-button>
            <el-button size="mini" @click="myAdd('user_add')"  type="primary">批量导出</el-button> -->
            <el-button size="mini" @click="addUser('first',null)"  type="primary">新增</el-button>
            <!-- <el-button size="mini" v-if='isSearch'  @click="myReset" type="primary" icon='el-icon-refresh'></el-button> -->
            <el-button size="mini" v-if='isSearch' @click="myReset" type="primary" icon='el-icon-refresh'></el-button>

        </div>
         <!-- 筛选 -->
        <div class="shaixuan">
            <div>
                <label>用户名称：</label>
                <div>
                    <el-input v-model="shaixuan.Username" size="mini"></el-input>
                     
                </div>
            </div>
            <div>
                <label>角色名称：</label>
                <div>
                    <el-select v-model="shaixuan.Roleid"  placeholder="请选择" size="mini">
                        <el-option v-for="item in roleData" :key="item.roleid" :label="item.rolename" :value="item.roleid">
                        </el-option>
                    </el-select>
                     
                </div>
            </div>
            <div>
                <label>电话号码：</label>
                <div>
                     <el-input v-model="shaixuan.Phone" size="mini"></el-input>
                     
                </div>
            </div>
            
            <div>
                <el-button size="mini" @click="goSearch"><i class="el-icon-aim"></i> 筛选</el-button>
            </div>
        </div>
    <div>
        <el-table :data="tableData" style="width: 100%;">
          <el-table-column label="人员ID"        prop="userId" v-if="false"></el-table-column>
          <el-table-column label="登录名称"      prop="account"></el-table-column>
          <el-table-column label="角色名称"      prop="roleName" ></el-table-column>
          <!-- <el-table-column label="医院名称"      prop="hospitalName"></el-table-column> -->
          <el-table-column label="科室名称"      prop="departmentName"></el-table-column>
          <!-- <el-table-column label="委员会名称"    prop="organName" ></el-table-column> -->
          <!-- <el-table-column label="用户名称"      prop="userName"></el-table-column> -->
          <el-table-column label="座机号码"      prop="tel"></el-table-column>
          <el-table-column label="手机号码"      prop="phone" ></el-table-column>
          <el-table-column label="邮箱"          prop="email" ></el-table-column>
          <!-- <el-table-column label="最后登录ip"    prop="lastip"></el-table-column> -->
          <el-table-column label="最后登录时间"  prop="lastlogin"></el-table-column>
          <el-table-column label="备注"          prop="remark" ></el-table-column>
          <el-table-column label="添加时间"      prop="addtime" ></el-table-column>
          <el-table-column label="操作"          width="180">
            <template slot-scope="scope">
                <el-link type="primary" @click="editUser(scope.row)">编辑</el-link>
                <el-link type="primary"
                    @click="myDelete(scope.$index,'人员-'+scope.row.account,{UserId:scope.row.userId},'api/User/DeleteUser','api/User/ShowUser')">删除</el-link>
            </template>
          </el-table-column>
        </el-table>
    </div>
        <div class="block" style="height:32px">
            <el-pagination style="height:50px" @size-change="handleSizeChange($event,'api/User/ShowUser')"
              @current-change="handleCurrentChange($event,'api/User/ShowUser')"
              :current-page="currentPage"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalpage">
            </el-pagination>
        </div>
        <!-- 弹框  -->
        <el-drawer :title="drawer_title" width="400px;" :visible.sync="drawer" :direction="direction" :before-close="cancel">
            <el-form :model="ruleForm"  v-if="isReload"  ref="ruleForm"  :rules="rules"  label-width="120px" class="demo-ruleForm">
                <el-row>
                    <el-col :span="24">
                        <div class="grid-content bg-purple">
                            <el-form-item label="登录名称：" prop="Account" >
                                <el-input v-model="ruleForm.Account" size="mini" :disabled="edit"   autocomplete="off"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <div class="grid-content bg-purple-light" v-if="PasswordShow" >
                            <el-form-item label="密码：" prop="Password">
                                <el-input v-model="ruleForm.Password"  size="mini"   autocomplete="off" ></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="角色名称：" prop="Roleid" >
                                <el-select v-model="ruleForm.Roleid"  placeholder="请选择" size="mini">
                                    <el-option v-for="item in roleData" :key="item.roleid" :label="item.rolename" :value="item.roleid">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">

                        <div class="grid-content bg-purple-light">
                            <el-form-item label="医院名称：" prop="Hospitalid" >
                                <!-- <el-input v-model="ruleForm.Hospitalid" size="mini"   autocomplete="off" ></el-input> -->
                                <el-select v-model="ruleForm.Hospitalid" filterable placeholder="请选择" size="mini">
                                    <el-option v-for="item in hospitalData" :key="item.hospitalId" :label="item.hospitalname" :value="item.hospitalId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="科室名称：" prop="Departmentid" >
                                <!-- <el-input v-model="ruleForm.Departmentid" size="mini"    autocomplete="off"></el-input> -->
                                <el-select v-model="ruleForm.Departmentid" filterable placeholder="请选择" size="mini">
                                    <el-option
                                    v-for="item in ksData"
                                    :key="item.deid"
                                    :label="item.dename"
                                    :value="item.deid">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple-light">
                            <el-form-item label="委员会名称：" prop="Organid" >
                                <!-- <el-input v-model="ruleForm.Organid" size="mini"   autocomplete="off" ></el-input> -->
                                <el-select v-model="ruleForm.Organid" filterable placeholder="请选择" size="mini">
                                    <el-option
                                    v-for="item in wyData"
                                    :key="item.deid"
                                    :label="item.dename"
                                    :value="item.deid">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="用户名称：" prop="Username" >
                                <el-input v-model="ruleForm.Username" size="mini"    autocomplete="off"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple-light">
                            <el-form-item label="座机号码：" prop="Tel" >
                                <el-input v-model="ruleForm.Tel" size="mini"   autocomplete="off" ></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="手机号码：" prop="Phone">
                                <el-input v-model="ruleForm.Phone" size="mini"    autocomplete="off"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple-light">
                            <el-form-item label="邮箱：" prop="Email" >
                                <el-input v-model="ruleForm.Email" size="mini"   autocomplete="off" ></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                
                <el-row>
                    <el-col :span="24">
                        <div class="grid-content bg-purple" >
                            <el-form-item label="备注：" >
                                <el-input v-model="ruleForm.Remark" size="mini"    autocomplete="off"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-form-item>
                <el-button size="mini" @click="drawer = false">取 消</el-button>
                <el-button size="mini" type="primary"  @click="uoload">确 定</el-button>
                </el-form-item>             
            </el-form>      
        </el-drawer>
    </div>
</template>
<script>
import {myInit,myDelete,myEdit,myAdd,mySearch,handleSizeChange,handleCurrentChange} from '../../../assets/comon'
import {zmMyInit2,selectData } from '../../../assets/zm-myInit'
import {addUpload_current,newInit_return} from '../../../assets/newAxios'
export default {
    data() {
      return {
        isSearch:false,
        searchAPI:'api/search/user',
        shaixuan:{
            IndexPage:'1',
            PageSize:"10",
            Account:'',
            Roleid:'',
            Hospitalid:'',
            Departmentid:'',
            Organid:'',
            Username:'',
            Tel:'',
            Phone:'',
            Email:'',
           
        },
        isReload:true,
        edit:false,
        watch_Role:'',
        watch_Hospital:'',
        watch_Ks:'',
        watch_Wy:'',
        currentPage:1,
        pagesize:10,
        totalpage:0,
        isSearch:false,
        searchData: {
          name: '',
          region: ''
        },
        PasswordShow:false,
        drawer_title:'',
        drawer:false,
        direction:'rtl',
        formLabelWidth: '120px',  
        tableData: [],
        roleData:[],
        hospitalData:[],
        ksData:[],
        wyData:[],
        ruleForm:{
            Id:'',
            Account:'',
            Password:'',
            // Rolename:'',
            Roleid:'',
            Hospitalid:'',
            Departmentid:'',
            Organid:'',
            Username:'',
            Tel:'',
            Phone:'',
            Email:'',
            Lastip:'',
            Lastlogin:'',
            Remark:'',
            
        },
        rules:{
              Account:[
                {required:true,message:'登录名称不能为空',tirgger:'blur'}
              ],
              Password:[
                {required:true,message:'登录密码不能为空',tirgger:'blur'}
              ],
              Roleid:[
                {required:true,type:'number',message:'角色名称不能为空',tirgger:'change'}
              ],
              Hospitalid:[
                {required:true,type:'number',message:'医院名称不能为空',tirgger:'change'}
              ],
              Departmentid:[
                {required:true,type:'number',message:'科室名称不能为空',tirgger:'change'}
              ],
              Organid:[
                {required:true,type:'number',message:'委员会名称不能为空',tirgger:'change'}
              ],
              Username:[
                {required:true,message:'用户名称不能为空',tirgger:'blur'}
              ],
              Tel:[
                {required:true,message:'座机号码不能为空',tirgger:'blur'}
              ],
              Phone:[
                {required:true,message:'手机号码不能为空',tirgger:'blur'}
              ],
              Email:[
                {required:true,message:'电子邮箱不能为空',tirgger:'blur'}
              ],
              Lastip:[
                {required:true,message:'最后登录ip不能为空',tirgger:'blur'}
              ],
              Lastlogin:[
                {required:true,message:'最后登录时间不能为空',tirgger:'blur'}
              ],
              Remark:[
                {required:true,message:'备注不能为空',tirgger:'blur'}
              ],

            }
      }
    },
    mounted(){
      this.myInit('api/User/ShowUser',{IndexPage:"1",PageSize:"10"});
      // 角色
      this.selectData('api/Select/SelectRole').then(res=>{
          this.roleData=res.data.results;
        
      })
      // 医院
      this.selectData('api/Select/SelectHospital').then(res=>{
          this.hospitalData=res.data.results;
        
      })
      // 科室
     this.selectData('api/Select/SelectKeShi').then(res=>{
         this.ksData=res.data.results
      })
     // 委员会
     this.selectData('api/Select/SelectWeYuan').then(res=>{
         this.wyData=res.data.results
      })
    },
    methods:{
      myInit,
      newInit_return,
      myDelete,  
      myEdit,
      myAdd,
      mySearch,
      handleSizeChange,
      handleCurrentChange,
      addUpload_current,
      selectData,
      editUser(row){
        this.isReload=true          

          this.drawer=true;
          this.PasswordShow=false;
          this.edit=true;
          this.drawer_title="编辑用户";
          this.ruleForm.Id=row.userId;
          this.ruleForm.Account=row.account;
          this.watch_set=row.roleName;
          this.ruleForm.Roleid=row.roleId;
          this.watch_Role=row.roleName;
          this.watch_Hospital=row.hospitalName;
          this.ruleForm.Hospitalid=row.hospitalId;
          this.watch_Ks=row.departmentName;
          this.ruleForm.Departmentid=row.departmentId;
          this.watch_Wy=row.organName;
          this.ruleForm.Organid=row.organId
          this.ruleForm.Username=row.userName;
          this.ruleForm.Tel=row.tel;
          this.ruleForm.Phone=row.phone;
          this.ruleForm.Email=row.email;
          this.ruleForm.Lastip=row.lastip;
          this.ruleForm.Lastlogin=row.lastlogin;
          this.ruleForm.Remark=row.roleName;
      },
      addUser(){
          for(var key in this.ruleForm){
              this.ruleForm[key]=""
          }
          this.isReload=true
          this.drawer=true;
          this.drawer_title="添加用户";
          this.PasswordShow=true;
          this.edit=false;
      },
      cancel(){
        this.drawer=false;
      },
      goSearch(){
            this.newInit_return(this.searchAPI,this.shaixuan).then(res=>{
               
                this.tableData=res.data.results
                this.totalpage=res.data.totalpage
                this.isSearch=true
            })
        },
        myReset(){
            
            this.myInit('api/User/ShowUser',{IndexPage:this.currentPage,PageSize:this.pagesize});
            this.isSearch=false
            for(var key in this.shaixuan){
                if(key!='IndexPage'||key!='PageSize'){
                    this.shaixuan[key]=""
                }
            }
        },
      uoload(){

          this.$refs['ruleForm'].validate((valid) => {
            if (valid) {
                if(this.drawer_title=="添加用户"){
                    this.addUpload_current('api/User/AddUser','ruleForm')
                }else{
                    this.newInit_return('api/User/UpadateUser',this.ruleForm).then(res=>{
                     
                        if(res.data.response==="success"){
                            this.drawer=false;
                            this.$message.success(res.data.results)
                            this.myInit('api/User/ShowUser',{IndexPage:this.currentPage,PageSize:this.pagesize});
                            this.isReload=false
                        }
                    })
                }
            } else {
                console.log('error submit!!');
                return false;
            }
        })

      },
      Current_init(){
            this.myInit('api/User/ShowUser',{IndexPage:"1",PageSize:"10"})          
      }
    }
  }
</script>
<style >
  
</style>
