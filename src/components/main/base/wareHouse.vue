<template>
    <div>
        <!-- 页头 -->
        <div class="pageHead">
            <span>仓库管理</span>
            <el-button size="mini" @click="myAdd"  type="primary">新增</el-button>
            <el-button size="mini" @click="myExprotExcel(tHeader,filterVal,'仓库列表')"  type="primary">批量导出</el-button>
            <el-button size="mini" v-if='isSearch'  @click="myReset" type="primary" icon='el-icon-refresh'></el-button>
        </div>
        <!-- 筛选 -->
        <div class="shaixuan">
            <div>
                <label>仓库名称:</label>
                <div>
                    <el-input size="mini" v-model="shaixuan.housename"></el-input> 
                </div>
            </div>
            <!-- <div>
                <label>状态:</label>
                <div>
                    <el-select v-model="shaixuan.name" filterable placeholder="请选择" size="mini">
                        <el-option label="启用" value="1"> </el-option>
                        <el-option label="停用" value="0"> </el-option>
                    </el-select> 
                </div>
            </div> -->
            <div>
                <el-button size="mini" @click="goSearch"><i class="el-icon-aim"></i> 筛选</el-button>
            </div>
        </div>
        <!-- 主体表格 -->
        <div>
            <template>
                <el-table  :data="tableData" style="width: 100%">
                    <el-table-column label="仓库ID" prop="houseId"></el-table-column>
                    <el-table-column label="仓库名称" prop="houseName"></el-table-column>
                    <el-table-column label="仓库负责人" prop="userName"></el-table-column>
                    <el-table-column label="仓库创建时间" prop="createtime"></el-table-column>
                    <el-table-column label="操作" width="150">
                        <template slot-scope="scope">
                            <el-link type="primary" @click="myEdit('first',scope.row,scope.$index)">编辑</el-link>
                            <el-link size="mini" type="primary"
                    @click="myDelete(scope.$index,scope.row.houseName,{roomId:scope.row.houseId},'api/House/Deletehouse','api/House/showhouse')">删除</el-link>
                        </template>
                    </el-table-column>
                </el-table>
            </template>   
        </div>
        <!-- 分页 -->
        <div class="block" style="height:32px">
            <el-pagination
            style="height:50px"
              @size-change="handleSizeChange($event,'api/House/showhouse')"
              @current-change="handleCurrentChange($event,'api/House/showhouse')"
              :current-page="currentPage"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalpage">
            </el-pagination>
        </div>
        <!-- 弹框  -->
        <el-drawer :title="drawer_title" width="750px;" :visible.sync="drawer"  :before-close="cancel">
            <el-form :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                    <el-form-item label="仓库名称：" prop="Name"> 
                        <el-input v-model="ruleForm.Name" size="mini" type="text">
                    </el-input>
                    </el-form-item>
                    <el-form-item label="负责人名称：" prop="watch_User"> 
                        <UserOption v-model="ruleForm.watch_User"></UserOption>
                    </el-form-item>
                <el-form-item>
                <el-button size="mini" @click="drawer = false">取 消</el-button>
                <el-button size="mini" type="primary"  @click="upload">确 定</el-button>
                </el-form-item>
            </el-form>
        </el-drawer>
    </div>
</template>
<script>
import {addUpload,myInit,myDelete,myEdit,mySearch,handleSizeChange,handleCurrentChange} from '../../../assets/comon'
import {myExprotExcel} from '../../../assets/newAxios'
import {zmMyInit} from '../../../assets/zm-myInit'
import {addUpload_current} from '../../../assets/newAxios'
import UserOption from '../Child/UserOption'
export default {
    data() {
      return {
        tHeader:['仓库ID','仓库名称','仓库负责人','创建时间'],  
        filterVal:['houseId','houseName','userName','createtime'],
        isSearch:false,
        searchAPI:'api/search/warehouse',
        shaixuan:{
            housename:'',
            status:""
        },
        item:'',
        labelPosition:'left',
        currentPage:1,
        pagesize:10,
        totalpage:0,
        isDisabled:true,       
        drawer:false,
        direction:'rtl',
        drawer_title:"",
        peopleData:[],
        ruleForm:{
            myUser:'',
            Name:'',
            houseId:'',
            UserId:'',
            watch_User:""
        },  
        rules: {
              Name:[
                {required:true,message:'此项不能为空',tirgger:'blur'}
              ],
              watch_User:[
                {required:true,message:'此项不能为空',tirgger:'change'}
              ],

            },
        tableData:[]
      }
    },
    mounted(){
        this.zmMyInit('api/House/showhouse',{IndexPage:"1",PageSize:"10"})
    },
    components:{
        UserOption
    },
    methods:{
        myExprotExcel,
        myInit,
        myDelete,  
        myEdit,
        mySearch,
        handleSizeChange,
        handleCurrentChange,
        addUpload,
        zmMyInit,
        addUpload_current,
        myReset(){
            this.zmMyInit('api/House/showhouse',{IndexPage:"1",PageSize:"10"})
            this.isSearch=false
            for(var key in this.shaixuan){
                this.shaixuan[key]=""
            }
        },
        goSearch(){
            this.isSearch=true
            this.myInit('api/search/warehouse',{IndexPage:'1',PageSize:'10',housename:this.shaixuan.housename,status:this.shaixuan.status})
            
        },
        myEdit(leve,row,index){
            this.drawer=true
            this.ruleForm.houseId=row.houseId
            this.drawer_title='编辑仓库'
            this.ruleForm.Name=row.houseName
            this.ruleForm.UserId=row.userid
            this.ruleForm.watch_User=row.userid+'-*-'+row.userName    
            console.log(487847847,this.ruleForm)  
        },
        myAdd(leve,row){
            for(var key in this.tableData){
                this.tableData[key]=""
            }
            this.drawer=true         
            this.drawer_title='新增仓库'
        },
        upload(){
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    this.ruleForm.UserId=this.ruleForm.watch_User.split('-*-')[0]
                    if(this.drawer_title=="新增仓库"){
                        // console.log('xinzeng')
                        this.addUpload_current('api/House/addhouse','ruleForm')
                    }else{
                        this.addUpload_current('api/House/Upadatehouse','ruleForm')
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        exportFile(){
            console.log(456)
        },
        cancel(){
            this.drawer=false
        },
        Current_init(){
            this.zmMyInit('/api/House/showhouse',{IndexPage:"1",PageSize:"10"})
                
        },
        myStop(row,index){
            console.log(row,index)

        }
    }
  }
</script>
<style>
    .addkeTyoestyle{
        
        border: 1px solid #333;
        border-bottom: 0;
    }
    .addkeTyoestyle>li{
        border-bottom:1px solid #333; 
        padding: 5px;
    }
    .addkeTyoestyle>li>div{
        height: 30px;
        padding-right:30px; 
    }
    .addkeTyoestyle>li>div p{
        line-height: 30px;
    }
    .addkeTyoestyle>li>div span{
        display:block;
        float: right;
        line-height: 30px;
        cursor: pointer;
        padding:0 10px ;
    }
    .el-drawer.rtl{
 
        overflow: scroll;
    }
    /* 评价 */  
    .el-radio{
        margin-right:0;
        font-size:8px;
        font-weight:100;
    }
    .el-radio__label {
        font-size: 8px;
        padding-left: 0px;
    }
</style>
