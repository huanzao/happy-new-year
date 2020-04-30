<template>
    <div>
        <!-- 页头 -->
        <div class="pageHead">
            <span>耗材类别管理</span>
            <el-button size="mini" @click="add('first',null)"  type="primary">新增</el-button>
            <el-button size="mini" v-if='isSearch'  @click="myReset" type="primary" icon='el-icon-refresh'></el-button>
        </div>
        <!-- 筛选 -->
        <div class="shaixuan">
            <div>
                <label>分类名称：</label>
                <div>
                    <el-input size="mini" v-model="shaixuan.typename"></el-input>
                </div>
            </div>
            <div>
                <label>分类名称：</label>
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
                <el-table  :data="tableData" style="width: 100%">
                    <el-table-column label="分类编号" prop="id"></el-table-column>
                    <el-table-column label="分类名称" prop="name"></el-table-column>
                    <el-table-column label="上级分类" prop="pname"></el-table-column>
                    <el-table-column label="最后修改人" prop="editPeople"></el-table-column>
                    <el-table-column label="最后修改时间" prop="editTime" width="150"></el-table-column>
                    <el-table-column label="启用状态" prop="status" :formatter="famter_state"></el-table-column>
                    <el-table-column label="备注" prop="remark"></el-table-column>
                    <el-table-column label="操作" width="150">
                        <template slot-scope="scope">
                            <el-link type="primary" @click="edit(scope.row,scope.$index)">编辑</el-link>
                        </template>
                    </el-table-column>
                </el-table>
            </template>   
        </div>
        <!-- 分页 -->
        <div class="block" style="height:32px">
            <el-pagination style="height:50px"
              @size-change="handleSizeChange($event,'api/ConsumableType/ShowConsumableType')"
              @current-change="handleCurrentChange($event,'api/ConsumableType/ShowConsumableType')"
              :current-page="currentPage"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalpage">
            </el-pagination>
        </div>
        <!-- 弹框 编辑 -->
        <el-drawer :title="drawer_title" width="400px;" :visible.sync="drawer" :direction="direction" :before-close="cancel">
            <el-form :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-form-item label="分类编号：">
                    <el-input v-model="ruleForm.Number" size="mini" :placeholder="place"  autocomplete="off" :disabled="isDisabled1" ></el-input>
                </el-form-item>
                <el-form-item label="分类名称：">
                    <el-input v-model="ruleForm.Name" size="mini"    autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="上级分类：" prop="flPrev">
                    <el-input v-model="ruleForm.Pid" size="mini"   autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="最后修改时间：">
                    <el-input v-model="ruleForm.EditTime" size="mini"  :disabled="isDisabled" ></el-input>
                </el-form-item>
                <el-form-item label="最后修改人：">
                    <el-input v-model="ruleForm.EditPeople" size="mini"  :disabled="isDisabled"></el-input>
                </el-form-item>
                <el-form-item label="备注：">
                    <el-input v-model="ruleForm.Remark" size="mini" ></el-input>
                </el-form-item>
                <el-form-item label="启用状态：">
                     <el-radio v-model="ruleForm.Status" label="1">启用</el-radio>
                        <el-radio v-model="ruleForm.Status" label="0">停用</el-radio>
                    <!-- <el-input v-model="ruleForm.status" size="mini" ></el-input> -->
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
import {addUpload,myInit,myDelete,myEdit,myAdd,mySearch,handleSizeChange,handleCurrentChange,famter_state} from '../../../assets/comon'
import {zmMyInit} from '../../../assets/zm-myInit'
import {addUpload_current} from '../../../assets/newAxios'
export default {
    data() {
      return {
        isSearch:false,
        searchAPI:'api/search/haocaitype',
        shaixuan:{
            typename:'',
            status:''
        },
        labelPosition:'left',
        currentPage:1,
        pagesize:10,
        totalpage:0,
        editShow: false,
        addShow: false,    //添加科室弹框
        drawer:false,
        keshiDialogTitle:'',
        drawer_title:'',
        isDisabled:true,  
        direction:'rtl',  
        isDisabled1:true,   
        place:'',
        addkKeTypeShow:false,  //科室类别
        ruleForm:{
                Id:'',
                Number:'',
                Name:'',
                Pname:'',
                Pid:'',
                EditTime:'',
                EditPeople:'',
                Remark:'',
                Status:'1'
            },  
        rules: {
              ksName:[
                {required:true,message:'科室名称不能为空',tirgger:'blur'}
              ]
            },
        keshiType:[
            {id:1,name:'火神山医院1',show:2},
            {id:2,name:'火神山医院2',show:2},
            {id:3,name:'火神山医院3',show:2},
            {id:4,name:'火神山医院4',show:2},
        ],
        tableData:[]
      }
    },
    mounted(){
      // this.myInit('api/People/ShowPeople',{IndexPage:"1",PageSize:"10"})
     this.zmMyInit('api/ConsumableType/ShowConsumableType',{IndexPage:"1",PageSize:"10"})

    },
    methods:{
        myInit,
        myDelete,  
        myEdit,
        myAdd,
        mySearch,
        handleSizeChange,
        handleCurrentChange,
        addUpload,
        addUpload_current,
        zmMyInit,
        famter_state,
        myReset(){
            this.zmMyInit('api/ConsumableType/ShowConsumableType',{IndexPage:"1",PageSize:"10"})
            this.isSearch=false
            for(var key in this.shaixuan){
                this.shaixuan[key]=""
            }
        },
        goSearch(){
            this.myInit('api/search/haocaitype',{IndexPage:'1',PageSize:'10',typename:this.shaixuan.typename,status:this.shaixuan.status})
            this.isSearch=true
        },
        edit(row,index){
            this.drawer=true          
            this.drawer_title='编辑分类'
            this.isDisabled1=true
            this.ruleForm.Id=row.id
            this.ruleForm.Number=row.number
            this.ruleForm.Name=row.name
            this.ruleForm.Pname=row.pname
            this.ruleForm.EditTime=row.editTime
            this.ruleForm.EditPeople=row.editPeople
            this.ruleForm.Remark=row.remark
            this.ruleForm.Status=row.status
                
        },
        add(row){
                this.drawer=true         
                this.drawer_title='新增分类'
                this.isDisabled1=false
                this.place="如不输入则系统自动生成"
                for(var key in this.ruleForm ){
                    this.ruleForm[key]=""
                }
        },
        cancel(){
             this.drawer=false
        },
        upload(){
            if(this.drawer_title=="新增分类"){
                console.log('xinzengsdafasdf')
                this.addUpload_current('api/ConsumableType/AddConsumableType','ruleForm')
            }else{
                this.addUpload_current('api/ConsumableType/UpadateConsumableType','ruleForm')
            }
        },
        Current_init(){
            this.zmMyInit('api/ConsumableType/ShowConsumableType',{IndexPage:"1",PageSize:"10"})
                
        },
        myStop(row,index){
            console.log(row,index)
        }
    }
  }
</script>
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
</style>
