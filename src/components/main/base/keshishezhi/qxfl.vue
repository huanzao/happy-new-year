<template>
  <div>
      <!-- 页头 -->
        <div class="pageHead">
            <span>器械分类</span>
            <el-button size="mini" @click="myAdd"  type="primary">添加</el-button>
            <el-button size="mini" v-if='isSearch'  @click="myReset" type="primary" icon='el-icon-refresh'></el-button>
            
        </div>
        <!-- 筛选 -->
        <div class="shaixuan">
            <div>
                <label>名称：</label>
                <div>
                    <el-input placeholder="请输入内容" prefix-icon="el-icon-search" size="mini" v-model="shaixuan.qixiename"></el-input>
                </div>
            </div>
            <div>
                <label>状态：</label>
                <div>
                    <el-select v-model="shaixuan.status" filterable placeholder="请选择" size="mini">
                        <el-option label="启用" value="1"> </el-option>
                        <el-option label="停用" value="0"> </el-option>
                    </el-select> 
                </div>
            </div>
            <div>
                <el-button size="mini" @click="goSearch"><i class="el-icon-aim"></i> 筛选</el-button>
            </div>
        </div>
        <!-- 主体表格 -->
        <div>
            <template>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column label="编号"  prop="number"></el-table-column>
                    <el-table-column label="名称" prop="name"></el-table-column>
                    <el-table-column label="状态" prop="status" :formatter='famter_state'></el-table-column>
                    <el-table-column label="备注" prop="remark"></el-table-column>
                    <el-table-column label="操作" width="180">
                        <template slot-scope="scope">
                            <el-link type="primary" @click="myEdit(scope.row,scope.$index)">编辑</el-link>
                            <!-- <el-link type="primary"  @click="myDelete(scope.$index, '器械'+scope.row.name,{DeId:scope.row.id},'api/devicedictqixie/DeleteDi','api/devicedictqixie/ShowDi')">删除</el-link> -->
                        </template>
                    </el-table-column>
                </el-table>
            </template>   
        </div>
        <!-- 分页 -->
        <div class="block" style="height:32px">
            <el-pagination
                style="height:50px"
                @size-change="handleSizeChange($event,'api/devicedictqixie/ShowDi')"
                @current-change="handleCurrentChange($event,'api/devicedictqixie/ShowDi')"
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
                <el-form-item label="编号" v-if="drawerTitle==='添加器械'" >
                    <el-input v-model="ruleForm.Number" size="mini"  placeholder="如不填写则自动生成"  autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="名称" prop="Name">
                    <el-input v-model="ruleForm.Name" size="mini"   autocomplete="off" ></el-input>
                </el-form-item>
                <!-- <el-form-item label="创建人" v-if="drawerTitle==='添加器械'">
                    <el-input v-model="ruleForm.EditPeople" size="mini"  autocomplete="off" ></el-input>
                </el-form-item> -->
                <el-form-item label="状态">
                    <el-radio v-model="ruleForm.Status" label="1">启用</el-radio>
                    <el-radio v-model="ruleForm.Status" label="0">禁用</el-radio>
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
import {addUpload,myInit,myDelete,mySearch,handleSizeChange,handleCurrentChange,famter_state} from '../../../../assets/comon'
import {addUpload_current} from '../../../../assets/newAxios'
    export default {
        data(){
            return{
                drawer:false,
                drawerTitle:'',
                addUpload_current,
                currentPage:1,
                pagesize:10,
                totalpage:0,
                isSearch:false,
                searchAPI:'api/search/qixietype',
                shaixuan:{
                    qixiename:'',
                    status:'',
                },
                tableData:[],
                ruleForm:{
                    Id:'',
                    Number :'',
                    Name :'',
                    Remark :'',
                    EditTime :'',
                    EditPeople :'',
                    Status:''
                },
                rules: {
                    Name:[
                        {required:true,message:'此项不能为空',tirgger:'blur'}
                    ]
                },
            }
        },
        mounted(){
            this.myInit('api/devicedictqixie/ShowDi',{IndexPage:'1',PageSize:'10'})
        },
        methods:{
            myInit,
            handleSizeChange,
            handleCurrentChange,
            famter_state,
            myReset(){
                this.myInit('api/devicedictqixie/ShowDi',{IndexPage:'1',PageSize:'10'})
                this.isSearch=false
                for(var key in this.shaixuan){
                    this.shaixuan[key]=""
                }
            },
            goSearch(){
                this.myInit('api/search/qixietype',{IndexPage:'1',PageSize:'10',qixiename:this.shaixuan.qixiename,status:this.shaixuan.status})
                this.isSearch=true
            },
            myAdd(){
                this.ruleForm
                for( var key in this.ruleForm){
                    this.ruleForm[key]=""
                }
                this.ruleForm.Status='1'
                this.drawerTitle='添加器械'
                this.drawer=true
            },
            myEdit(row,index){
                this.drawerTitle='编辑器械'
                this.drawer=true
                this.ruleForm.Id=row.id
                this.ruleForm.Name=row.name
                this.ruleForm.Status=row.status
                this.ruleForm.Remark=row.remark
            },
            myUp(){

                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        if(this.drawerTitle==='添加器械'){
                            this.addUpload_current('api/devicedictqixie/AddDi','ruleForm')
                        }else{
                            console.log('百年祭')
                            this.addUpload_current('api/devicedictqixie/UpdateDi','ruleForm')
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })

                
            },
            Current_init(){
                this.myInit('api/devicedictqixie/ShowDi',{IndexPage:'1',PageSize:'10'})  
            }
        }
    }
</script>
<style scoped>

</style>