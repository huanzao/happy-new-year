<template>
  <div>
      <!-- 页头 -->
        <div class="pageHead">
            <span>公司信息管理</span>
            <el-button size="mini" @click="myAdd"  type="primary">添加</el-button>
            <el-button size="mini" v-if='isSearch'  @click="myReset" type="primary" icon='el-icon-refresh'></el-button>
        </div>
        <!-- 筛选 -->
        <div class="shaixuan">
            <div>
                <label>医院名称：</label>
                <div>
                    <el-input placeholder="请输入内容" prefix-icon="el-icon-search" size="mini" v-model="shaixuan.hospitalname"></el-input>
                </div>
            </div>
            <div>
                <el-button size="mini" @click='goSearch'><i class="el-icon-aim" ></i> 筛选</el-button>
            </div>
        </div>
        <!-- 主体表格 -->
        <div>
            <template>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column label="科室编号"  prop="hospital.id"></el-table-column>
                    <el-table-column  label="医院名称" prop="hospital.name"></el-table-column>
                    <el-table-column label="医院地址" prop="hospital.address"></el-table-column>
                    <el-table-column label="备注" prop="hospital.remark"></el-table-column>
                    <el-table-column label="logo存放目录" prop="hospital.logoCatalog"></el-table-column>
                    <el-table-column label="操作" width="180">
                        <template slot-scope="scope">
                            <el-link type="primary" @click="myEdit(scope.row,scope.$index)">编辑</el-link>
                            <el-link type="primary"  @click="myDelete(scope.$index, '医院'+scope.row.hospital.name,{HospitalId:scope.row.hospital.id},'api/Hospital/DeleteHospital','api/Hospital/ShowHospital')">删除</el-link>
                        </template>
                    </el-table-column>
                </el-table>
            </template>   
        </div>
        <!-- 分页 -->
        <div class="block" style="height:32px">
            <el-pagination
            style="height:50px"
              @size-change="handleSizeChange($event,'api/Hospital/ShowHospital')"
              @current-change="handleCurrentChange($event,'api/Hospital/ShowHospital')"
              :current-page="currentPage"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalpage">
            </el-pagination>
        </div>
        <!-- 抽屉 -->
        <el-drawer :title="drawerTitle" :visible.sync="drawer" size='30%'  direction="rtl" >
            <el-form class='drawerform demo-ruleForm'    :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="100px"  >
                <el-form-item label="医院名称" prop="HospitalName">
                    <el-input v-model="ruleForm.HospitalName" size="mini"  autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="人员" prop="UserId">
                    <UserOption v-model="ruleForm.UserId" ></UserOption>
                </el-form-item>
                <el-form-item label="医院地址" prop="Address">
                    <el-input v-model="ruleForm.Address" size="mini"  autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="Logo存放目录">
                    <el-input v-model="ruleForm.LogoCatalog" size="mini"  autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="ruleForm.Remark" type="textarea" size="mini"  autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button size="mini" @click="addkeshiShow = false">取 消</el-button>
                    <el-button size="mini" type="primary"  @click="myUp">确 定</el-button>
                </el-form-item>
            </el-form>
        </el-drawer>
  </div>
</template>
<script>
import {addUpload,myInit,myDelete,mySearch,handleSizeChange,handleCurrentChange} from '../../../assets/comon'
import {addUpload_current} from '../../../assets/newAxios'
import UserOption  from '../Child/UserOption'
export default {
    data(){
        return{
            drawer:false,
            drawerTitle:'',
            currentPage:1,
            pagesize:10,
            totalpage:0,
            myDelete,
            isSearch:false,
            searchAPI:'api/search/hospital',
            shaixuan:{
                hospitalname:'',
            },
            tableData:[],
            ruleForm:{
                id:'',
                HospitalName :'',
                Remark :'',
                UserId :'',
                Address :'',
                LogoCatalog :'',
            },
            rules: {
                HospitalName:[
                    {required:true,message:'此项不能为空',tirgger:'blur'}
                ],
                UserId:[
                    {required:true,message:'此项不能为空',tirgger:'blur'}
                ],
                Address:[
                    {required:true,message:'此项不能为空',tirgger:'blur'}
                ],
            },
        }
    },
    mounted(){
        this.myInit('api/Hospital/ShowHospital',{IndexPage:'1',PageSize:'10'})
    },
    components:{
        UserOption
    },
    methods:{
        myInit,
        handleSizeChange,
        handleCurrentChange,
        addUpload_current,
        myReset(){
            this.myInit('api/Hospital/ShowHospital',{IndexPage:'1',PageSize:'10'})
            this.isSearch=false
            for(var key in this.shaixuan){
                this.shaixuan[key]=""
            }
        },
        goSearch(){
            this.myInit('api/search/hospital',{IndexPage:'1',PageSize:'10',hospitalname:this.shaixuan.hospitalname})
            this.isSearch=true
        },
        myAdd(){
            this.ruleForm
            for( var key in this.ruleForm){
                this.ruleForm[key]=""
            }
            this.drawerTitle='添加医院'
            this.drawer=true
        },
        myEdit(row,index){
            this.drawerTitle='编辑医院'
            this.drawer=true

            this.ruleForm.id=row.hospital.id
            this.ruleForm.HospitalName =row.hospital.name
            this.ruleForm.Remark =row.hospital.remark
            this.ruleForm.UserId =row.hospital.userId+'-*-'+row.username
            this.ruleForm.Address =row.hospital.address
            this.ruleForm.LogoCatalog =row.hospital.logoCatalog
        },
        myUp(){

            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    this.ruleForm.UserId=this.ruleForm.UserId.split('-*-')[0]
                    if(this.drawerTitle==='添加医院'){
                        console.log('添加医院')
                        this.addUpload_current('api/Hospital/AddHospital','ruleForm')
                    }else{
                        this.addUpload_current('api/Hospital/UpadateHospital','ruleForm')
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });

            
        },
        Current_init(){
            this.myInit('api/Hospital/ShowHospital',{IndexPage:'1',PageSize:'10'})  
        }
    }
}
</script>
<style scoped>

</style>