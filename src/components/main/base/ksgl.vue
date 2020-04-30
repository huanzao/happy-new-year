<template>
    <div>
        <!-- 页头 -->
        <div class="pageHead">
            <span>科室管理</span>
            <el-button size="mini" @click="addKeshi('first',null)"  type="primary">添加一级科室</el-button>
            <el-button size="mini" v-if='isSearch'  @click="myReset" type="primary" icon='el-icon-refresh'></el-button>
        </div>
        <!-- 筛选 -->
        <div class="shaixuan">
            <div>
                <label>科室名称：</label>
                <div>
                    <el-input placeholder="请输入内容" prefix-icon="el-icon-search" size="mini" v-model="shaixuan.departmentname"></el-input>
                </div>
            </div>
            <div>
                <label>科室类型：</label>
                <div>
                    <KeShiTypeOption v-model="shaixuan.departmenttype" />
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
        <div id='specialTab' >
            <template>
                <el-table  v-if='isReload' :data="tableData" style="width: 100%"  
                    row-key="departmentid"
                    lazy
                    :load="load"
                    :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                  >
                    <el-table-column label="科室编号"  prop="department.number"></el-table-column> 
                    <el-table-column  label="科室名称" prop="department.name"></el-table-column>
                    <el-table-column label="所属医院" prop="hospital"></el-table-column>
                    <el-table-column label="状态" prop="department.status" :formatter='famter_state'></el-table-column>
                    <el-table-column label="科室类别" prop="detype" ></el-table-column>
                    <el-table-column label="地址" prop="department.address" ></el-table-column>
                    <el-table-column label="操作" width="210">
                        <template slot-scope="scope">
                            <el-link type="primary" @click="myEditKS(scope.row,scope.$index,$event)">编辑</el-link>
                            <el-link type="primary" @click="addKeshi('second',scope.row,scope.$index)">添加子科室</el-link>
                        </template>
                    </el-table-column>
                </el-table>
            </template>   
        </div>
        <!-- 分页 -->
        <div class="block" style="height:32px">
            <el-pagination
            style="height:50px"
              @size-change="handleSizeChange($event,'api/department/ShowDe')"
              @current-change="handleCurrentChange($event,'api/department/ShowDe')"
              :current-page="currentPage"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalpage">
            </el-pagination>
        </div>
        <!-- 弹框 添加科室 -->
        <el-dialog class="myDialog" :title="keshiDialogTitle" :visible.sync="addDialog">
            <el-form :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-form-item label="医院" v-if='ISshow_item'>
                    <HospitalOption v-if='!isEdit' v-model="watch_hospitalid"/>
                    <el-input  v-if='isEdit' v-model="ruleForm.show_hospital" size="mini"  autocomplete="off" :disabled="true"  ></el-input>
                </el-form-item>
                <el-form-item label="科室名称" prop="DeName">
                    <el-input v-model="ruleForm.DeName" size="mini"   autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="科室编号：">
                    <el-input v-model="ruleForm.Number" size="mini" ></el-input>
                </el-form-item>
                <el-form-item label="科室类别">
                    <KeShiTypeOption v-model="ruleForm.DetypeId" />
                </el-form-item>
                <el-form-item label="状态">
                    <el-radio v-model="ruleForm.Status" label="1">启用</el-radio>
                    <el-radio v-model="ruleForm.Status" label="0">禁用</el-radio>
                </el-form-item>
                <el-form-item label="负责人">
                    <UserOption v-model="ruleForm.UserId" />
                </el-form-item>
                <el-form-item label="科室地址">
                    <el-input v-model="ruleForm.Address" size="mini" ></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="ruleForm.Remark"  size="mini" ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="addDialog = false">取 消</el-button>
                <el-button size="mini" type="primary"  @click="myTijiao">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import {addUpload,myDelete,myEdit,myAdd,mySearch,handleSizeChange,handleCurrentChange} from '../../../assets/comon'
import {newInit,newInit_return,addUpload_current,myExprotExcel} from '../../../assets/newAxios'

import HospitalOption from '../Child/HospitalOption'
import KeShiTypeOption from '../Child/KeShiTypeOption'
import UserOption from '../Child/UserOption'

export default {
    data() {
      return {
        isEdit:false,
        isReload:true,
        tHeader:['科室标号','科室名称','座机','状态'],
        filterVal:['Number','Name','tel','Status'],
        isExport:false,  
        isSearch:false,
        searchAPI:'api/search/department',
        shaixuan:{
            departmentname:'',
            departmenttype:'',
            status:'',
        },
        first_leve:'',
        second_leve:'',
        seconde_leve:'',
        watch_change:false,
        watch_hospitalid:"",
        labelPosition:'left',
        currentPage:1,
        pagesize:10,
        totalpage:0,
        addDialog: false,//添加科室弹框
        hospital_disabled:false,
        keshiDialogTitle:'',
        ISshow_item:true,       
        addkKeTypeShow:false,  //科室类别
        ruleForm:{
            Id:'',
            DeName :'',
            Number :'',
            Pid :'',
            Hospitalid :'',
            UserId :'',
            DetypeId :'',
            Address :'',
            Status :"",
            Remark :'',
            show_hospital:''
        },  
        rules: {
              DeName:[
                {required:true,message:'科室名称不能为空',tirgger:'blur'}
              ]
            },
        keshiType:[
            {id:1,name:'火神山医院1',show:2},
            {id:2,name:'火神山医院2',show:2},
            {id:3,name:'火神山医院3',show:2},
            {id:4,name:'火神山医院4',show:2}
        ],
        tableData:[],
        // expandKeys:[],
      }
    },
    components:{
        HospitalOption,KeShiTypeOption,UserOption
    },
    mounted(){
       this.newInit_return('api/department/ShowDe',{IndexPage:"1",PageSize:"10",id:0}).then(res=>{
           this.tableData=res.data.results
       })
    },
    watch:{
        watch_hospitalid:function(value){
            if(this.watch_change){
                this.ruleForm.Hospitalid=value
            }
        }
    },
    methods:{
        newInit,
        newInit_return,
        myDelete,  
        myEdit,
        myAdd,
        mySearch,
        handleSizeChange,
        handleCurrentChange,
        addUpload,
        addUpload_current,
        myExprotExcel,
        myReset(){
            this.newInit_return('api/department/ShowDe',{IndexPage:"1",PageSize:"10",id:0}).then(res=>{
                this.tableData=res.data.results
                this.isSearch=false
                for(var key in this.shaixuan){
                    this.shaixuan[key]=""
                }
            })
        },
        goSearch(){
            this.newInit_return('api/search/department',
                {
                    IndexPage:"1",
                    PageSize:"10",
                    departmentname:this.shaixuan.departmentname,
                    departmenttype:this.shaixuan.departmenttype.split('-*-')[0],
                    status:this.shaixuan.status
                }
            ).then(res=>{
                    this.tableData=res.data.results
                    this.isSearch=true
            })
            this.isSearch=true
        },
        load(tree, treeNode, resolve){
            console.log('treee',tree)
            console.log('treeNode',treeNode)
            this.newInit_return('api/department/ShowDe',{IndexPage:"1",PageSize:"100",id:tree.departmentid},true).then(res=>{    
                console.log(res) 
                resolve(res.data.results)
            })
        },
        famter_state(row){
            if(row.department.status=='1'){
                return '启用'
            }else if(row.department.status=='0'){
                return '停用'
            }
        },
        famtter_time(row){
            if(row.department.createtime){
                return new Date(row.department.createtime*1).toLocaleString().split(' ')[0]
            }
        },
        myEditKS(row,index,el){
            this.isEdit=true
            this.addDialog=true
            console.log(row)
            this.ruleForm.Id=row.department.id
            this.ruleForm.DeName =row.department.name
            this.ruleForm.Number =row.department.number

            this.ruleForm.Hospitalid = row.department.hospitalid
            this.ruleForm.show_hospital=row.hospital
            this.ruleForm.UserId =row.department.userId.toString()+'-*-'+row.username
            console.log('用户类型',typeof(this.ruleForm.UserId))
            this.ruleForm.DetypeId =row.department.detypeId+'-*-'+row.detype
            this.ruleForm.Address =row.department.address
            this.ruleForm.Status =row.department.status
            this.ruleForm.Remark=row.department.remark
            this.keshiDialogTitle='编辑科室'
            this.watch_change=true
            
        },
        addKeshi(leve,row,index){
            this.isEdit=false
                this.addDialog=true
                this.watch_change=true
                for(var key in this.ruleForm){
                    this.ruleForm[key]=""
                }
                if(leve==='first'){
                    this.ISshow_item=true
                    this.hospital_disabled=false
                    this.keshiDialogTitle='添加一级科室'
                    this.ruleForm.Pid=0
                }else{
                    this.keshiDialogTitle='添加子科室'
                    this.watch_change=false
                    this.ISshow_item=false
                    this.hospital_disabled=true
                    this.ruleForm.Pid=row.department.id
                    this.ruleForm.Hospitalid=row.department.hospitalid
                    this.ruleForm.prevks=row.name
                }
        },
        myTijiao(){
            this.ruleForm.DetypeId=this.ruleForm.DetypeId.split('-*-')[0]
            this.ruleForm.UserId=this.ruleForm.UserId.split('-*-')[0]
            this.isReload=false
            if(this.keshiDialogTitle.indexOf('编辑')===-1){
                this.newInit_return('api/department/AddDe',this.ruleForm).then(res=>{
                    console.log(res)
                    if(res.data.response==='success'){
                        this.$message.success(res.data.results)
                        this.addDialog=false
                        this.newInit_return('api/department/ShowDe',{IndexPage:this.currentPage,PageSize:this.pagesize,id:0}).then(res=>{
                            this.tableData=res.data.results
                            this.isReload=true
                        })
                    }else{
                        this.$message.warning(res.data.results)
                    }
                })
            }else{
                console.log(this.ruleForm)
                this.newInit_return('api/department/UpdateDe',this.ruleForm).then(res=>{
                    console.log(res)
                    if(res.data.response==='success'){
                        this.$message.success(res.data.results)
                        this.addDialog=false

                        this.newInit_return('api/department/ShowDe',{IndexPage:this.currentPage,PageSize:this.pagesize,id:0}).then(res=>{
                            this.tableData=res.data.results
                            this.isReload=true

                        })
                    }else{
                        this.$message.warning(res.data.results)
                    }
                })
                // this.addUpload_current('api/department/AddDe','ruleForm')
            }
            
        }
    }
  }
</script>
<style>
    #specialTab .el-table__expanded-cell[class*=cell]{
        padding: 5px 5px;
        padding-left:20px; 
    }
</style>
<style scoped>
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
    .child_table .el-table__expanded-cell {
        padding: 0 !important;
    }
</style>
