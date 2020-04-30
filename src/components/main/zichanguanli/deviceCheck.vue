<template>
    <div>
        <!-- 页头 -->
        <div class="pageHead">
            <span>资产盘点计划列表</span>
            <el-button size="mini" @click="addCheck()"  type="primary">新增盘点计划</el-button>
            <el-button size="mini" @click="myExprotExcel(thead,tkey,'资产盘点计划列表')"  type="primary">导出</el-button>
            <el-button size="mini" v-if='isSearch'  @click="myReset" type="primary" icon='el-icon-refresh'></el-button>
        </div>
        <!-- 筛选 -->
        <div class="shaixuan">
            <div>
                <label>计划名称：</label>
                <div>
                     <el-input size='mini' v-model="shaixuan.name"></el-input>
                </div>
            </div>
            <div>
                <label>启用状态：</label>
                <div>
                    <el-select v-model="shaixuan.status" filterable placeholder="请选择" size="mini">
                        <el-option label="全部" value=""> </el-option>
                        <el-option label="待审批" value="0"> </el-option>
                        <el-option label="已通过" value="1"> </el-option>
                        <el-option label="已拒绝" value="2"> </el-option>
                    </el-select> 
                </div>
            </div>
            <div>
                <label>完成状态：</label>
                <div>
                    <el-select v-model="shaixuan.finish_status" filterable placeholder="请选择" size="mini">
                        <el-option label="全部" value=""> </el-option>
                        <el-option label="已完成" value="1"> </el-option>
                        <el-option label="未完成" value="0"> </el-option>
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
                    <el-table-column label="计划编号" prop="planNumber"></el-table-column>
                    <el-table-column label="计划名称" prop="planName"></el-table-column>
                    <el-table-column label="审批状态" prop="status" :formatter="statusFormatter"></el-table-column>
                    <el-table-column label="开始时间" prop="startTime"></el-table-column>
                    <el-table-column label="计划实施状态" prop="finishStatus"></el-table-column>
                    <el-table-column label="审批人" prop="opreationPeople"></el-table-column>
                    <el-table-column label="盘点人" prop="checkPeopleid"></el-table-column>
                    <el-table-column label="盘点类型" prop="checkType" :formatter="typeFormatter"></el-table-column>
                    <el-table-column label="操作" width="150">
                        <template slot-scope="scope">
                            <el-link type="primary" @click=" detail(scope.row,scope.$index)">详情</el-link>
                            <el-link type="primary" @click=" check(scope.row,scope.$index) ">审核</el-link>
                            <el-link type="primary" @click=" writeCheck(scope.row,scope.$index) ">录入</el-link>
                        </template>
                    </el-table-column>
                </el-table>
            </template>   
        </div>
        <!-- 分页 -->
        <div class="block" style="height:32px">
            <el-pagination
            style="height:50px"
              @size-change="handleSizeChange($event,'api/devicecheck/lookcheck')"
              @current-change="handleCurrentChange($event,'api/devicecheck/lookcheck')"
              :current-page="currentPage"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalpage">
            </el-pagination>
        </div>
        <!-- 弹框-详情  -->
        <el-drawer :title="drawer_title" width="750px;" :visible.sync="drawer"  :before-close="cancel">
            <el-form :model="ruleForm1"  :rules="rules" ref="ruleForm1" label-width="120px" class="demo-ruleForm">
                <el-row>
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <el-form-item label="申请计划ID："> 
                            <el-input v-model="ruleForm1.plan_id" size="mini" :disabled="isRead"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple-light">
                        <el-form-item label="审批状态："> 
                            <el-input v-model="ruleForm1.status" size="mini" :disabled="isRead"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                </el-row>
                <el-table
                    :data="detailTableData"
                    border
                    style="width: 100%">
                    <el-table-column fixed         prop="checkId" label="计划名称" width="150">
                    </el-table-column>
                    <el-table-column               prop="devicenumber" label="设备编号" width="150">
                    </el-table-column>
                    <el-table-column               prop="name" label="设备名称" width="120">
                    </el-table-column>
                    <el-table-column               prop="devicemodel" label="规格型号" width="120">
                    </el-table-column>
                    <el-table-column               prop="count" label="账面数量" width="120">
                    </el-table-column>
                    <el-table-column               prop="usenumber" label="使用编号" width="300">
                    </el-table-column>
                    <el-table-column fixed="right"  prop="realCount" label="盘点数量" width="120">
                        <template slot-scope="scope">
                            <span v-if="isShow">{{ scope.row.realCount }}</span>
                            <el-input v-else v-model="scope.row.realCount" size="mini"></el-input>
                        </template> 
                    </el-table-column>
                    
                    
                </el-table>
                <el-row>   
                    <el-col :span="24">    
                    <el-form-item>
                        <el-button size="mini" @click="drawer = false">取 消</el-button>
                        <el-button size="mini" type="primary"  @click="submitData">确 定</el-button>
                    </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-drawer>
        <!-- 弹框-新增盘点计划 -->
        <el-drawer title="新增盘点计划" width="750px;" :visible.sync="drawer_add"  :before-close="cancel">
            <el-form :model="ruleForm2"  :rules="rules" ref="ruleForm2" label-width="120px" class="demo-ruleForm">
                   
                <el-form-item label="计划名称："> 
                    <el-input v-model="ruleForm2.PlanName" size="mini"></el-input>
                </el-form-item>
            
                <el-form-item label="盘点人："> 
                    <el-select v-model="ruleForm2.CheckPeopleid" filterable placeholder="请选择" size="mini">
                        <el-option
                        v-for="item in peopleData"
                        :key="item.userid"
                        :label="item.username"
                        :value="item.userid">
                        </el-option>
                    </el-select>
                </el-form-item>
            
                <el-form-item label="盘点类型："> 
                    <el-select v-model="ruleForm2.CheckType" filterable placeholder="请选择" size="mini">
                        <el-option
                        v-for="item in checkType"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            
                <el-form-item label="盘点仓库："> 
                    <el-select v-model="ruleForm2.Roomid" filterable placeholder="请选择" size="mini">
                        <el-option
                        v-for="item in roomData"
                        :key="item.houseId"
                        :label="item.houseName"
                        :value="item.houseId">
                        </el-option>
                    </el-select>
                </el-form-item>  
                <el-form-item label="盘点科室："> 
                    <el-select v-model="ruleForm2.Departmentid" filterable placeholder="请选择" size="mini">
                        <el-option
                        v-for="item in ksData"
                        :key="item.deid"
                        :label="item.dename"
                        :value="item.deid">
                        </el-option>
                    </el-select>
                </el-form-item>
                    
                <el-form-item>
                    <el-button size="mini" @click="drawer_add = false">取 消</el-button>
                    <el-button size="mini" type="primary"  @click="upload(1)">确 定</el-button>
                </el-form-item>
                    
            </el-form>
        </el-drawer>
        
        <!-- 审核 -->
        <el-dialog class="myDialog" :title="dialog_title" :visible.sync="dialog"   :before-close="cancel">
            <el-form :model="ruleForm"   ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-form-item label="计划编号：">
                    <span>{{ ruleForm.PlanNumber }}</span>
                </el-form-item>
                
                <el-form-item label="审核：">
                    <el-select v-model="ruleForm.status" filterable placeholder="请选择" size="mini">
                        <el-option
                        v-for="item in checkData"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>      
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="cancel">取 消</el-button>
                <el-button size="mini" type="primary"  @click="upload(2)">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import {addUpload,myInit,myDelete,myEdit,myAdd,mySearch,handleSizeChange,handleCurrentChange} from '../../../assets/comon'
import {zmMyInit,zmMyInit4,selectData} from '../../../assets/zm-myInit'
import {addUpload_current,newInit_return,myExprotExcel} from '../../../assets/newAxios'
export default {
    data() {
        return {
            thead:['计划编号','计划名称','审批状态','开始时间','计划实施状态','审批人','盘点人','盘点类型'],
            tkey:['planNumber','planName','status','startTime','finishStatus','opreationPeople','checkPeopleid','checkType'],
            isSearch:false,
            searchAPI:'api/search/devicecheck',
            shaixuan:{
                IndexPage:'1',
                PageSize:'10',
                number:'',
                name:'',
                status:'',
                finish_status:'',
                opreationpeople:'',
                peopleid:'',
                check_type:'',
                check_de_id:'',
                check_room_id:''
            },
            peopleData:[],
            ksData:[],
            roomData:[],
            checkData:[{id:1,name:'通过'},{id:2,name:'拒绝'}],
            checkType:[{id:0,name:'仓库盘点'},{id:1,name:'科室盘点'}],
            labelPosition:'left',
            currentPage:1,
            pagesize:10,
            totalpage:0,
            isDisabled:true,       
            drawer:false,
            drawer_add:false,
            direction:'rtl',
            drawer_title:"",
            dialog_title:'',
            dialog:false,
            isShow:false,
            isRead:true,
            ruleForm1:{
                plan_id:'',
                status:''
            },
            ruleForm:{
                PlanNumber:'',
                plan_id:'',
                status:''
            },
            ruleForm2:{
            PlanName:'',
            CheckPeopleid:'',
            CheckType:'',
            Roomid:'',
            Departmentid:''
            },  
            rules: {
                ksName:[
                    {required:true,message:'科室名称不能为空',tirgger:'blur'}
                ]
                },
            tableData:[],
            detailTableData:[]
      }
    },
    mounted(){
        this.myInit('api/devicecheck/lookcheck',{IndexPage:"1",PageSize:"10"})
      
        // 人员
        this.selectData('api/Select/SelectUser').then(res=>{
            this.peopleData=res.data.results
            // console.log(123,this.peopleData)
        })
        // 科室
        this.selectData('api/Select/SelectKeShi').then(res=>{
            this.ksData=res.data.results
            // console.log(456,this.ksData)
        })
        // 仓库
        var params={IndexPage:0}
        const loading = this.$loading({
            lock: true,
            text: '正在请求数据，请稍后',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        });
        this.axios({
                method: 'post',
                headers:{'Authorization':'Bearer '+localStorage.token},
                timeout:5000,
                url: 'api/House/showhouse',
                data:this.$qs.stringify(params)
            }).then((res)=>{
                loading.close()
                // console.log(123456,res)
                
                if(res.data.result.length==0){
                    this.$message.warning('暂无数据')
                    return
                }
                this.roomData=res.data.result
                // console.log(5555555,this.roomData)
            }).catch((error)=>{
                loading.close()
                console.log(error)
                if (error.request) {
                this.$message.warning('请求超时,请稍后再试')
                }else{
                    this.$notify.error({
                        title: '登录过期',
                        message: '登录过期，请重新登录'
                    })
                    setTimeout(()=>{
                        this.$router.push('/')
                    },1000)
                }
            })

    },
    
    methods:{
        myInit,
        myDelete,  
        newInit_return,
        myExprotExcel,
        mySearch,
        handleSizeChange,
        handleCurrentChange,
        addUpload,
        selectData,
        addUpload_current,
        myReset(){
            this.myInit('api/devicecheck/lookcheck',{IndexPage:'1',PageSize:'10'})
            this.isSearch=false
            for(var key in this.shaixuan){
                this.shaixuan[key]=""
            }
        },
        goSearch(){
            this.newInit_return(this.searchAPI,this.shaixuan).then(res=>{
                console.log(res)
                this.tableData=res.data.results
                this.totalpage=res.data.totalpage
                this.isSearch=true
            })
            
        },
        detail(row){  
            this.drawer=true;
            this.drawer_title="资产盘点计划详情"
           
            this.isShow=true
            this.ruleForm1.plan_id=row.id
            this.ruleForm1.status=row.status
         
            var params={plan_id:''}
            params.plan_id=row.id
            const loading = this.$loading({
                lock: true,
                text: '正在请求数据，请稍后',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            this.axios({
                method: 'post',
                headers:{'Authorization':'Bearer '+localStorage.token},
                timeout:5000,
                url: 'api/devicecheck/checkdetail',
                data:this.$qs.stringify(params)
            }).then((res)=>{
                loading.close()
                console.log('详情数据',res)
                if(res.data.results.length==0){
                    this.$message.warning('暂无数据')
                    return
                }
                this.detailTableData=res.data.results
            }).catch((error)=>{
                loading.close()
                console.log(error)
                if (error.request) {
                this.$message.warning('请求超时,请稍后再试')
                }else{
                    this.$notify.error({
                        title: '登录过期',
                        message: '登录过期，请重新登录'
                    })
                    setTimeout(()=>{
                        this.$router.push('/')
                    },1000)
                }
            })
        
                
        }, 
        addCheck(){
            this.drawer_add=true;
            this.drawer_title="新增资产盘点计划";

        },
        writeCheck(row){
            this.drawer=true;
            this.drawer_title="资产盘点录入"
            this.ruleForm1.plan_id=row.id
            this.ruleForm1.status=row.status
            var params={plan_id:''}
            params.plan_id=row.id;
            this.isShow=false;
            console.log("write",this.isShow)
            
            const loading = this.$loading({
                lock: true,
                text: '正在请求数据，请稍后',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            this.axios({
                method: 'post',
                headers:{'Authorization':'Bearer '+localStorage.token},
                timeout:5000,
                url: 'api/devicecheck/checkdetail',
                data:this.$qs.stringify(params)
            }).then((res)=>{
                loading.close()
                console.log('详情数据',res)
                // if(res.data.result.length==0){
                //     this.$message.warning('暂无数据')
                //     return
                // }
                this.detailTableData=res.data.results
            }).catch((error)=>{
                loading.close()
                console.log(error)
                if (error.request) {
                this.$message.warning('请求超时,请稍后再试')
                }else{
                    this.$notify.error({
                        title: '登录过期',
                        message: '登录过期，请重新登录'
                    })
                    setTimeout(()=>{
                        this.$router.push('/')
                    },1000)
                }
            })

        },
        statusFormatter(row,col){
            let status=row.status;
            if(status==="0"){
                return "待审批"
            }else if(status==="1"){
                return "已通过"
            }else if(status==="2"){
                return "已拒绝"
            }
        },
        typeFormatter(row,col){
            let type=row.checkType;
            if(type==="0"){
                return "仓库盘点"
            }else if(type==="1"){
                return "科室盘点"
            }
        },
        check(row){
            this.dialog=true;
            this.dialog_title="资产盘点计划审批"
            this.ruleForm.PlanNumber=row.planNumber;
            this.ruleForm.plan_id=row.id;
            // this.ruleForm.break_id=row.id;

        },
        
         upload(type){ 
             if(type=="1"){
               this.addUpload_current('api/devicecheck/addcheck','ruleForm2')
             }else if(type=="2"){
               this.addUpload_current('api/devicecheck/shenpicheck','ruleForm')
             }
            
        },
        submitData(){
            // console.log(this.ruleForm1)
            console.log(JSON.stringify(this.detailTableData))

            var params={plan_id:'',status:'',AllData:{allhc:''}}
            params.plan_id=this.ruleForm1.plan_id;
            params.status=this.ruleForm1.status;
            params.AllData=JSON.stringify({allhc:this.detailTableData})
            const loading = this.$loading({
                lock: true,
                text: '正在请求数据，请稍后',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            this.axios({
                method: 'post',
                headers:{'Authorization':'Bearer '+localStorage.token},
                timeout:5000,
                url: 'api/devicelist/search',
                data:this.$qs.stringify(params)
            }).then((res)=>{
                loading.close()
                console.log('录入数据',res)
                if(res.data.response=="success"){
                    this.$message.warning(res.data.results)
                    this.drawer=false
                    return
                }
                // this.detailTableData=res.data.results
            }).catch((error)=>{
                loading.close()
                console.log(error)
                if (error.request) {
                this.$message.warning('请求超时,请稍后再试')
                }else{
                    this.$notify.error({
                        title: '登录过期',
                        message: '登录过期，请重新登录'
                    })
                    setTimeout(()=>{
                        this.$router.push('/')
                    },1000)
                }
            })

        },
        cancel(){
            this.drawer=false
            this.break_drawer=false
            this.dialog=false
            this.drawer_add=false
            this.ruleForm2={}
        },
        Current_init(){
            this.myInit('api/devicecheck/lookcheck',{IndexPage:"1",PageSize:"10"})    
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
