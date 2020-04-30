<template>
    <div>
        <div class="pageHead">
            <span>角色列表</span>
            <!-- <el-button size="mini" @click="myAdd('user_add')"  type="primary">批量导入</el-button>
            <el-button size="mini" @click="myAdd('user_add')"  type="primary">批量导出</el-button> -->
            <el-button size="mini" @click="addRole('first',null)"  type="primary">新增</el-button>
            <el-button size="mini" v-if='isSearch' @click="myReset" type="primary" icon='el-icon-refresh'></el-button>
        </div>
         <!-- 筛选 -->
        <div class="shaixuan">
            <div>
                <label>角色名称：</label>
                <div>
                     <!-- <el-select v-model="shaixuan.RoleName"  placeholder="请选择" size="mini">
                        <el-option v-for="item in roleData" :key="item.roleid" :label="item.rolename" :value="item.roleid">
                        </el-option>
                    </el-select> -->
                    <el-input v-model="shaixuan.RoleName" size="mini"></el-input>
                </div>
            </div>
            
            <div>
                <el-button size="mini" @click="goSearch"><i class="el-icon-aim"></i> 筛选</el-button>
            </div>
        </div>
    <div>
        <el-table :data="tableData" style="width: 100%;">
          <el-table-column label="ID"  prop="id"></el-table-column>
            <el-table-column label="角色名称"  prop="rolename"></el-table-column>
          <el-table-column label="备注"  prop="roleremark" ></el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-link 
                type="primary"
                @click="editRole(scope.row)">编辑</el-link>
              <el-link
                type="primary"
                @click="myDelete(scope.$index,'角色-'+scope.row.rolename,{RoleId:scope.row.id},'api/Role/DeleteRole','api/Role/ShowRole')">删除</el-link>
            </template>
          </el-table-column>
        </el-table>
    </div>
        <div class="block" style="height:32px">
            <el-pagination
            style="height:50px"
              @size-change="handleSizeChange($event,'api/Role/ShowRole')"
              @current-change="handleCurrentChange($event,'api/Role/ShowRole')"
              :current-page="currentPage"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalpage">
            </el-pagination>
        </div>
        <!-- 弹框  -->
        <el-drawer :title="drawer_title" width="400px;" :visible.sync="drawer" :direction="direction" :before-close="cancel">
            <el-form :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                
                <el-form-item label="角色名称：" prop="RoleName">
                    <el-input v-model="ruleForm.RoleName" size="mini"    autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注：" prop="flPrev">
                    <el-input v-model="ruleForm.RoleRemark" size="mini"   autocomplete="off" ></el-input>
                </el-form-item>
                
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
        searchAPI:'api/search/role',
          shaixuan:{
            IndexPage:'1',
            PageSize:"10",
            RoleName:'',
        },
        currentPage:1,
        pagesize:10,
        totalpage:0,
        isSearch:false,
        searchData: {
          name: '',
          region: ''
        },
        drawer_title:'',
        drawer:false,
        direction:'rtl',
        formLabelWidth: '120px',  
        tableData: [],
        roleData:[],
        ruleForm:{
            Id:'',
            RoleName:'',
            RoleRemark:''
        },
        rules:{
              RoleName:[
                {required:true,message:'角色名称不能为空',tirgger:'blur'}
              ]
            }
      }
    },
    mounted(){
      this.myInit('api/Role/ShowRole',{IndexPage:"1",PageSize:"10"})
      // 角色
      this.selectData('api/Select/SelectRole').then(res=>{
          this.roleData=res.data.results;
          // console.log('角色',this.roleData)
      })
    },
    methods:{
      myInit,
      myDelete,  
      myEdit,
      myAdd,
      mySearch,
      selectData,
      newInit_return,
      handleSizeChange,
      handleCurrentChange,
      addUpload_current,
      editRole(row){
        console.log(123)
          this.drawer=true;
          this.drawer_title="编辑角色";
          this.ruleForm.Id=row.id;
          this.ruleForm.RoleName=row.rolename;
          this.ruleForm.RoleRemark=row.roleremark
      },
      addRole(){
          this.drawer=true;
          this.drawer_title="添加角色"
      },
      cancel(){
        this.drawer=false;
      },
      uoload(){
        if(this.drawer_title=="添加角色"){
                // console.log('xinzeng')
            this.addUpload_current('api/Role/AddRole','ruleForm')
        }else{
          // console.log("修改")
            this.addUpload_current('api/Role/UpadateRole','ruleForm')
            // console.log(this.ruleForm)
        }
      },
      Current_init(){
             this.myInit('api/Role/ShowRole',{IndexPage:"1",PageSize:"10"})          
      },
      goSearch(){
          this.newInit_return(this.searchAPI,this.shaixuan).then(res=>{
              console.log(res)
              this.tableData=res.data.results
              this.totalpage=res.data.totalpage
              this.isSearch=true
          })
      },
      myReset(){
           this.myInit('api/Role/ShowRole',{IndexPage:"1",PageSize:"10"})
          this.isSearch=false
          for(var key in this.shaixuan){
              if(key!='IndexPage'||key!='PageSize'){
                  this.shaixuan[key]=""
              }
          }
      },
    }
  }
</script>
<style >
  
</style>
