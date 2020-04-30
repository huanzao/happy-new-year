<template>
  <div>
      <!-- 页头 -->
        <div class="pageHead">
            <span>科室分类</span>
            <el-button size="mini" @click="myAdd"  type="primary">添加</el-button>
            <el-button type="primary" size="mini" :loading='isExport' @click="myExprotExcel(tHeader,filterVal,'科室分类')" >{{ isExport | filterExport(isExport)}}</el-button>
        </div>
        <!-- 筛选 -->
        <div class="shaixuan">
            <!-- <div>
                <label>科室名称：</label>
                <div>
                    <el-input placeholder="请输入内容" prefix-icon="el-icon-search" size="mini" v-model="shaixuan.name"></el-input>
                </div>
            </div>
            <div>
                <label>科室类别：</label>
                <div>
                    <el-select v-model="shaixuan.type" filterable placeholder="请选择" size="mini">
                        <el-option v-for="item in 20" :key="item" :label="item" :value="item"> </el-option>
                    </el-select> 
                </div>
            </div>
            <div>
                <el-button size="mini"><i class="el-icon-aim"></i> 筛选</el-button>
            </div> -->
        </div>
        <!-- 主体表格 -->
        <div>
            <template>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column label="编号"  prop="id"></el-table-column>
                    <el-table-column label="名称" prop="name"></el-table-column>
                    <el-table-column label="备注" prop="remark"></el-table-column>
                    <el-table-column label="操作" width="180">
                        <template slot-scope="scope">
                            <el-link type="primary" @click="myEdit(scope.row,scope.$index)">编辑</el-link>
                            <el-link type="primary"  @click="myDelete(scope.$index, '科室分类'+scope.row.name,{typeid:scope.row.id},'api/departmenttype/DeleteDe','api/departmenttype/ShowDe')">删除</el-link>
                        </template>
                    </el-table-column>
                </el-table>
            </template>   
        </div>
        <!-- 分页 -->
        <div class="block" style="height:32px">
            <el-pagination
                style="height:50px"
                @size-change="handleSizeChange($event,'api/departmenttype/ShowDe')"
                @current-change="handleCurrentChange($event,'api/departmenttype/ShowDe')"
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
                <el-form-item label="名称" prop="DeName">
                    <el-input v-model="ruleForm.DeName" size="mini"  autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="ruleForm.DeRemark" type="textarea" size="mini"  autocomplete="off" ></el-input>
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
import {addUpload_current,myExprotExcel} from '../../../assets/newAxios'
    export default {
        data(){
            return{
                tHeader:['编号','名称','备注'],
                filterVal:['id','name','remark'],
                isExport:false,
                drawer:false,
                drawerTitle:'',
                currentPage:1,
                pagesize:10,
                totalpage:0,
                myDelete,
                IsSearch:false,
                shaixuan:{
                    name:'',
                    type:'',
                },
                tableData:[],
                ruleForm:{
                    id:'',
                    DeName :'',
                    DeRemark  :''
                },
                rules: {
                    DeName:[
                        {required:true,message:'此项不能为空',tirgger:'blur'}
                    ]
                },
            }
        },
        mounted(){
            this.myInit('api/departmenttype/ShowDe',{IndexPage:'1',PageSize:'10'})
        },
        methods:{
            myInit,
            handleSizeChange,
            handleCurrentChange,
            addUpload_current,
            myExprotExcel,
            myAdd(){
                this.ruleForm
                for( var key in this.ruleForm){
                    this.ruleForm[key]=""
                }
                this.drawerTitle='添加'
                this.drawer=true
            },
            myEdit(row,index){
                this.drawerTitle='编辑'
                this.drawer=true
                this.ruleForm.id=row.id
                this.ruleForm.DeName =row.name
                this.ruleForm.DeRemark =row.remark
            },
            myUp(){
                this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    if(this.drawerTitle==='添加'){
                        this.addUpload_current('api/departmenttype/AddDe','ruleForm')
                    }else{
                        this.addUpload_current('api/departmenttype/UpadateDe','ruleForm')
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });

                
            },
            Current_init(){
                this.myInit('api/departmenttype/ShowDe',{IndexPage:'1',PageSize:'10'})  
            }
        }
    }
</script>
<style scoped>

</style>