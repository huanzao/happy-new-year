<template>
  <div>
      <!-- 页头 -->
        <div class="pageHead">
            <span>证件列表</span>
            <el-button size="mini" @click="add()"   type="primary">添加</el-button>
        </div>
        <!-- 筛选 -->
        <div class="shaixuan">
            <div>
                <label>证件编号：</label>
                <div>
                <el-select v-model="shaixuan.name" filterable placeholder="请选择" size="mini">
                    <el-option v-for="item in 20" :key="item" :label="item" :value="item"></el-option>
                </el-select>
                </div>
            </div>
            <div>
                <label>生产厂家：</label>
                <div>
                <el-select v-model="shaixuan.type" filterable placeholder="请选择" size="mini">
                    <el-option v-for="item in 20" :key="item" :label="item" :value="item"></el-option>
                </el-select>
                </div>
            </div>
            <div>
                <label>适用范围：</label>
                <div>
                <el-select v-model="shaixuan.status" filterable placeholder="请选择" size="mini">
                    <el-option v-for="item in 20" :key="item" :label="item" :value="item"></el-option>
                </el-select>
                </div>
            </div>
            <div>
                <label>是否过期：</label>
                <div>
                <el-select v-model="shaixuan.status" filterable placeholder="请选择" size="mini">
                    <el-option v-for="item in 20" :key="item" :label="item" :value="item"></el-option>
                </el-select>
                </div>
            </div>
            <div>
                <label>产品名称：</label>
                <div>
                <el-select v-model="shaixuan.name" filterable placeholder="请选择" size="mini">
                    <el-option v-for="item in 20" :key="item" :label="item" :value="item"></el-option>
                </el-select>
                </div>
            </div>
            <div>
                <label>结构组成：</label>
                <div>
                <el-select v-model="shaixuan.type" filterable placeholder="请选择" size="mini">
                    <el-option v-for="item in 20" :key="item" :label="item" :value="item"></el-option>
                </el-select>
                </div>
            </div>
            <div>
                <label>主要成分：</label>
                <div>
                <el-select v-model="shaixuan.status" filterable placeholder="请选择" size="mini">
                    <el-option v-for="item in 20" :key="item" :label="item" :value="item"></el-option>
                </el-select>
                </div>
            </div>
            <div>
                <label>是否进口：</label>
                <div>
                <el-select v-model="shaixuan.status" filterable placeholder="请选择" size="mini">
                    <el-option v-for="item in 20" :key="item" :label="item" :value="item"></el-option>
                </el-select>
                </div>
            </div>
            <div>
                <el-button size="mini">
                <i class="el-icon-aim"></i> 筛选
                </el-button>
            </div>
        </div>
        <!-- 主体表格 -->
        <div>
            <template>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column label="证件编号" prop="papersNumber"></el-table-column>
                    <!-- <el-table-column label="生产企业" prop="companyName"></el-table-column> -->
                    <el-table-column label="产品名称" prop="productName"></el-table-column>
                    <el-table-column label="代理商名称" prop="agent"></el-table-column>
                    <el-table-column label="有效至" prop="yxData"></el-table-column>
                    <el-table-column label="产品标准" prop="productStandard"></el-table-column>
                    <el-table-column label="操作" width="150">
                        <template slot-scope="scope">
                        <el-link type="primary" @click="myEdit(scope.row,scope.$index)">编辑</el-link>
                        <el-link type="primary" @click="myDelete(scope.$index,'证件-编号为：'+scope.row.papersNumber,{papersId :scope.row.id},'api/papers/Deletepapers','api/papers/Showpapers')">删除</el-link>
                        </template>
                    </el-table-column>
                </el-table>
            </template>   
        </div>
        <!-- 分页 -->
        <div class="block" style="height:32px">
            <el-pagination
            style="height:50px"
              @size-change="handleSizeChange($event,'api/papers/Showpapers',{},'results_papers')"
              @current-change="handleCurrentChange($event,'api/papers/Showpapers',{},'results_papers')"
              :current-page="currentPage"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalpage">
            </el-pagination>
        </div>
        <!--添加 弹框  -->
        <el-drawer :title="drawer_title" width="750px;"  :visible.sync="drawerShow" >
            <div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-row :gutter="0">
                <el-col :span="11">
                    <div class="grid-content bg-purple">
                    <el-form-item label="注册证编号：">
                        <el-input v-model="ruleForm.PapersNumber" size="mini"></el-input>
                    </el-form-item>
                    </div>
                </el-col>
                <el-col :span="11">
                    <div class="grid-content bg-purple">
                    <el-form-item label="产品名称：">
                        <el-input v-model="ruleForm.ProductName" size="mini"></el-input>
                    </el-form-item>
                    </div>
                </el-col>
                </el-row>
                <el-row :gutter="0">
                <el-col :span="11">
                    <div class="grid-content bg-purple">
                    <el-form-item label="注册证企业名：">
                        <el-input v-model="ruleForm.zcName" size="mini"></el-input>
                    </el-form-item>
                    </div>
                </el-col>
                <el-col :span="11">
                    <div class="grid-content bg-purple">
                    <el-form-item label="规格型号：">
                        <el-input size="mini" v-model="ruleForm.Model"></el-input>
                    </el-form-item>
                    </div>
                </el-col>
                </el-row>

                <el-row :gutter="0">
                <el-col :span="11">
                    <div class="grid-content bg-purple">
                    <el-form-item label="代理商：">
                        <el-input  v-model="ruleForm.Agent" size="mini" ></el-input>
                        <!-- <el-select filterable placeholder="请选择" size="mini">
                            <el-option v-for="item in 20" :key="item" :label="item" :value="item"></el-option>
                        </el-select> -->
                    </el-form-item>
                    </div>
                </el-col>
                <el-col :span="11">
                    <div class="grid-content bg-purple">
                    <el-form-item label="批准日期：">
                        <el-date-picker
                        size="mini"
                        type="date"
                        placeholder="选择日期"
                        v-model="ruleForm.PzData"
                        style="width: 100%;"
                        ></el-date-picker>
                    </el-form-item>
                    </div>
                </el-col>
                </el-row>
                <el-row :gutter="0">
                <el-col :span="11">
                    <div class="grid-content bg-purple">
                    <el-form-item label="有效期至：">
                        <el-date-picker type="date" placeholder="选择日期" size="mini" v-model="ruleForm.YxData" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    </div>
                </el-col>
                <el-col :span="11">
                    <div class="grid-content bg-purple">
                    <el-form-item label="审批部门：">
                        <el-input v-model="ruleForm.SpBumen" size="mini"></el-input>
                    </el-form-item>
                    </div>
                </el-col>
                </el-row>
                <el-row :gutter="0">
                <el-col :span="11">
                    <div class="grid-content bg-purple">
                    <el-form-item label="变更日期：">
                        <el-date-picker type="date" placeholder="选择日期" size="mini" v-model="ruleForm.BgData" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    </div>
                </el-col>
                <el-col :span="11">
                    <div class="grid-content bg-purple">
                    <el-form-item label="是否进口：">
                        <el-radio v-model="ruleForm.IsImport" label="1">是</el-radio>
                        <el-radio v-model="ruleForm.IsImport" label="0">否</el-radio>
                    </el-form-item>
                    </div>
                </el-col>
                </el-row>
                <el-form-item label="变更情况">
                <el-input type="textarea" v-model="ruleForm.BgDetail" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="生产地址：">
                <el-input type="textarea" v-model="ruleForm.Address" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="存储条件：">
                <el-input type="textarea"  v-model="ruleForm.SaveCondition" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="主要成分：">
                <el-input type="textarea" v-model="ruleForm.MainCf" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="适用范围：">
                <el-input type="textarea" v-model="ruleForm.UseLimit" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="预期用途：">
                <el-input type="textarea"  v-model="ruleForm.ExceptUse" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="产品标准：">
                <el-input type="textarea" v-model="ruleForm.ProductStandard" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="机构及组成：">
                <el-input type="textarea" v-model="ruleForm.Shape" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="其他内容：">
                <el-input type="textarea" v-model="ruleForm.Other" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="备注：">
                <el-input type="textarea" v-model="ruleForm.Remark" size="mini"></el-input>
                </el-form-item>

                <el-form-item>
                <el-button size="mini" @click="drawerShow = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="addUp" >确 定</el-button>
                </el-form-item>
            </el-form>
            </div>
        </el-drawer>
        
  </div>
</template>
<script>
import {addUpload,myInit,myDelete,mySearch,handleSizeChange,handleCurrentChange} from '../../../assets/comon'
import {newInit,newInit_return} from '../../../assets/newAxios'
    export default {
        data(){
            return{
                drawerShow:false,
                drawer_title:'',
                currentPage:1,
                pagesize:10,
                totalpage:0,
                shaixuan:{
                    name:'',
                    type:'',
                },
                tableData:[],
                ruleForm: {
                    Id:'',
                    PapersNumber:'',
                    ProductName:'',
                    Model:'',
                    Agent:'',
                    PzData:'' ,
                    YxData:'',
                    SpBumen:'' ,
                    BgData:'',
                    IsImport:'' ,
                    BgDetail:'',
                    Address:'',
                    SaveCondition:'' ,
                    MainCf:'', 
                    UseLimit:'' ,
                    ExceptUse:'',
                    ProductStandard:'', 
                    Shape:'' ,
                    OtherContent:'',
                    Remark:'' 
                },
                rules: {
                    ksName: [ { required: true, message: "科室名称不能为空", tirgger: "blur" } ]
                }
            } 
        },
        mounted(){
            this.Current_init()
        },
        methods:{
            newInit_return,
            myDelete,
            handleSizeChange,
            handleCurrentChange,
            add(){
                this.drawer_title='添加证件'
                for(var key in this.ruleForm){
                    this.ruleForm[key]=""
                }
                this.drawerShow=true
            },
            myEdit(row,index){
                this.drawer_title='编辑证件'
                this.drawerShow=true
                console.log(row)
                this.ruleForm.Id=row.id
                this.ruleForm.PapersNumber=row.papersNumber
                this.ruleForm.ProductName=row.productName
                this.ruleForm.Model=row.model
                this.ruleForm.Agent=row.agent
                this.ruleForm.PzData=row.pzData
                this.ruleForm.YxData=row.yxData
                this.ruleForm.SpBumen=row.spBumen
                this.ruleForm.BgData=row.bgData
                this.ruleForm.IsImport=row.isImport
                this.ruleForm.BgDetail=row.bgDetail
                this.ruleForm.Address=row.address
                this.ruleForm.SaveCondition=row.saveCondition
                this.ruleForm.MainCf=row.mainCf
                this.ruleForm.UseLimit=row.useLimit
                this.ruleForm.ExceptUse=row.exceptUse
                this.ruleForm.ProductStandard=row.productStandard
                this.ruleForm.Shape=row.shape
                this.ruleForm.OtherContent=row.otherContent
                this.ruleForm.Remark=row.remark
            },
            Current_init(){
                this.newInit_return('api/papers/Showpapers',{IndexPage:1,PageSize:10}).then(res=>{
                    console.log(res)
                    this.tableData=res.data.results_papers
                }) 
            },
            addUp(){
                if(this.drawer_title==='添加证件'){
                    this.newInit_return('api/papers/Addpapers',this.ruleForm).then(res=>{
                        this.drawerShow=false
                        this.$message.success('添加成功')
                        this.Current_init()
                    })
                }else{
                    this.newInit_return('api/papers/Upadatepapers',this.ruleForm).then(res=>{
                        this.drawerShow=false
                        this.$message.success('修改成功')
                        this.Current_init()
                    })
                }
                
            }
        }
    }
</script>
<style >
    .el-drawer.rtl {
        overflow: scroll;
    }
</style>