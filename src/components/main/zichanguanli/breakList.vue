<template>
    <div>
        <!-- 页头 -->
        <div class="pageHead">
            <span>资产报废申请列表</span>
            <el-button size="mini" @click="myExprotExcel(ex_head,ex_key,'资产报废申请列表')"  type="primary">导出</el-button>
            <el-button size="mini" v-if='isSearch'  @click="myReset" type="primary" icon='el-icon-refresh'></el-button>
        </div>
        <!-- 筛选 -->
        <div class="shaixuan">
            <div>
                <label>单号：</label>
                <div>
                    <el-input size='mini' v-model="shaixuan.number"></el-input>
                </div>
            </div>
            <div>
                <label>状态：</label>
                <div>
                     <el-select v-model="shaixuan.status" filterable placeholder="请选择" size="mini">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="待审批" value="0"></el-option>
                        <el-option label="已通过" value="1"></el-option>
                        <el-option label="已拒绝" value="2"></el-option>
                    </el-select>
                </div>
            </div>
            <div>
                <label>申请部门：</label>
                <div>
                    <el-cascader style="width:100%"  v-model="watch_SX_did" size="mini" :options="prevFenlei" :props="Lives"></el-cascader>
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
                    <el-table-column label="编号" prop="zidian.number"></el-table-column>
                    <el-table-column label="报废日期" prop="zidian.breaktime"></el-table-column>
                    <el-table-column label="部门名称" prop="zidian.dename"></el-table-column>
                    <el-table-column label="人员名称" prop="username"></el-table-column>
                    <el-table-column label="状态" prop="zidian.status" :formatter="statusFormatter"></el-table-column>
                    <el-table-column label="备注" prop="zidian.remark"></el-table-column>
                    <el-table-column label="操作" width="150">
                        <template slot-scope="scope">
                            <el-link type="primary" @click="detail(scope.row,scope.$index)">详情</el-link>
                            <el-link type="primary"  v-if='scope.row.status==0' @click="check(scope.row,scope.$index) ">审核</el-link>
                        </template>
                    </el-table-column>
                </el-table>
            </template>   
        </div>
        <!-- 分页 -->
        <div class="block" style="height:32px">
            <el-pagination
            style="height:50px"
              @size-change="handleSizeChange($event,'api/devicebreak/breaklist')"
              @current-change="handleCurrentChange($event,'api/devicebreak/breaklist')"
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
                                <el-form-item label="设备ID："> 
                                    <span>{{ruleForm1.DeviceId}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="使用编号："> 
                                    <span>{{ruleForm1.UseNum}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                   </el-row>
                    <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="设备编号："> 
                                    <span>{{ruleForm1.DeviceNum}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="原设备编号："> 
                                    <span>{{ruleForm1.OldNum}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                   </el-row>
                   <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="注册证件号："> 
                                    <span>{{ruleForm1.RegisterNum}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="设备名称："> 
                                    <span>{{ruleForm1.Devicename}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                   </el-row>
                   <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="通用名称："> 
                                    <span>{{ruleForm1.UsallyName}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="设备来源："> 
                                    <span>{{ruleForm1.DeviceSource}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                   </el-row>
                   <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="设备原值："> 
                                    <span>{{ruleForm1.InitPrice}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="设备数量："> 
                                    <span>{{ruleForm1.DeviceCount}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                   </el-row>
                   <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="设备规格型号："> 
                                    <span>{{ruleForm1.Devicemodel}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="仓库："> 
                                    <span>{{ruleForm1.Roomid}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                   </el-row>
                   <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="单位："> 
                                    <span>{{ruleForm1.Unit}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="设备类型："> 
                                    <span>{{ruleForm1.TypeId}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                   </el-row>
                   <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="器械分类："> 
                                    <span>{{ruleForm1.QixieId}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="供应商："> 
                                    <span>{{ruleForm1.Supplier}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                   </el-row>
                   <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="品牌："> 
                                    <span>{{ruleForm1.Brand}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="生产厂商："> 
                                    <span>{{ruleForm1.Factory}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                   </el-row>
                   <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="购买日期："> 
                                    <span>{{ruleForm1.BuyDate}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="出厂编号："> 
                                    <span>{{ruleForm1.LeaveFactoryNum}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                   </el-row>
                   <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="出厂日期："> 
                                    <span>{{ruleForm1.LeaveFactoryDate}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="设备序列号："> 
                                    <span>{{ruleForm1.DeviceSerialNumber}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                   </el-row>
                   <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="维保商："> 
                                    <span>{{ruleForm1.RepairFactory}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="过保日期："> 
                                    <span>{{ruleForm1.RepairEndDate}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                   </el-row>
                   <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="发票号："> 
                                    <span>{{ruleForm1.BillNum}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="财务编号："> 
                                    <span>{{ruleForm1.FinaunceNum}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                   </el-row>
                   <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="折旧总额："> 
                                    <span>{{ruleForm1.ZhejiuTotal}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="折旧月数："> 
                                    <span>{{ruleForm1.ZhejiuMonths}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                   </el-row>
                   <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="国有资产编号："> 
                                    <span>{{ruleForm1.CountryNum}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="存放地点："> 
                                    <span>{{ruleForm1.ProducePlace}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                   </el-row>
                   <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="档案编号："> 
                                    <span>{{ruleForm1.DanganNum}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="是否计量："> 
                                    <span>{{ruleForm1.IsCount}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                   </el-row>
                   <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="外账设备："> 
                                    <span>{{ruleForm1.IsOutDevice}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="大型设备："> 
                                    <span>{{ruleForm1.IsBigdevice}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                   </el-row>
                   <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="公用设备："> 
                                    <span>{{ruleForm1.IsUseForPublic}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="效益分析："> 
                                    <span>{{ruleForm1.IsProfit}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                   </el-row>
                   <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="附资产："> 
                                    <span>{{ruleForm1.IsExtraDevice}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="自筹资金："> 
                                    <span>{{ruleForm1.SelfMoney}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                   </el-row>
                   <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="政府拨款："> 
                                    <span>{{ruleForm1.GovermentMoney}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="科研经费："> 
                                    <span>{{ruleForm1.ScienceMoney}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                   </el-row>
                   <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="教学经费："> 
                                    <span>{{ruleForm1.TeachMoney}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="接收捐款："> 
                                    <span>{{ruleForm1.DonatedMoney}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                   </el-row>
                   <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="其他资金："> 
                                    <span>{{ruleForm1.OthersMoney}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="备注："> 
                                    <span>{{ruleForm1.Remark}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                   </el-row>
                   <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="设备资料文档："> 
                                    <span>{{ruleForm1.DeviceFile}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="人员ID："> 
                                    <span>{{ruleForm1.Peopleid}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                   </el-row>
                   <el-row>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="人员名称："> 
                                    <span>{{ruleForm1.Peoplename}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="部门ID："> 
                                    <span>{{ruleForm1.Departmentid}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                   </el-row>
                   <el-row>
                        <el-col :span="24">
                            <div class="grid-content bg-purple">
                                <el-form-item label="部门名称："> 
                                    <span>{{ruleForm1.Departmentname}}</span>
                                </el-form-item>
                            </div>
                        </el-col>
                        
                   </el-row>
                    
                    
                <el-form-item>
                <el-button size="mini" @click="drawer = false">取 消</el-button>
                <el-button size="mini" type="primary"  @click="drawer = false">确 定</el-button>
                </el-form-item>
                
            </el-form>
        
        </el-drawer>
        <!-- 弹框-报废申请 -->
        <!-- 审核 -->
        <el-dialog class="myDialog" title="报废审核" :visible.sync="dialog"   :before-close="cancel">
            <el-form :model="ruleForm"   ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-form-item label="编号：">
                    <span>{{ ruleForm.Number }}</span>
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
                <el-button size="mini" type="primary"  @click="upload">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>
<script>
import {addUpload,myInit,myDelete,myEdit,myAdd,mySearch,handleSizeChange,handleCurrentChange} from '../../../assets/comon'
import {zmMyInit,zmMyInit4,selectData} from '../../../assets/zm-myInit'
import {addUpload_current,newInit_return,myExprotExcel} from '../../../assets/newAxios'
import axios from 'axios'
import qs from 'qs'
function Mylives(url,params){
    return axios({
        method: 'post',
        headers:{'Authorization':'Bearer '+localStorage.token},
        timeout:5000,
        url: url,
        data:qs.stringify(params)
    }).then((res)=>{
        return res;
    }).catch((error)=>{
        loading.close()
        this.$message.warning('网络错误,请稍后再试')
    })
}
export default {
    data() {
      return {
        Lives: {
            value:'departmentid',
            label:'departmentname',
            checkStrictly: true,
            lazy: true,
            lazyLoad (node, resolve) {
                const { level,data } = node;
                if(data){
                    Mylives('api/department/ShowDe',{IndexPage:1,PageSize:10000,id:data.departmentid}).then(res=>{
                        console.log(res.data.results)
                        const nodes = Array.from(res.data.results)
                        resolve(nodes);
                    })
                }
            }
        },
        prevFenlei:[],
        watch_SX_did:'',
        ex_head:['编号','报废日期','部门名称','人员名称','状态','备注'],
        ex_key:['number','breaktime','dename','peoplename','status','remark'], 
        isSearch:false,
        searchAPI:'api/search/devicebreak',
        shaixuan:{
            IndexPage:'1',
            PageSize:'10',
            number:'',
            status:'',
            opreationpeople:'',
            deid:'',
            peopleid:'',
        },
        zh_Index:null,
        watch_Department:'',
        item:0,
        watch_People:'',
        item2:0,
        peopleData:[],
        ksData:[],
        checkData:[{id:1,name:'通过'},{id:0,name:'拒绝'}],
        labelPosition:'left',
        currentPage:1,
        pagesize:10,
        totalpage:0,
        isDisabled:true,       
        drawer:false,
        direction:'rtl',
        drawer_title:"",
        break_drawer:false,
        break_drawer_title:"",
        dialog:false,
        ruleForm1:{
        },
        ruleForm:{
            break_id:'',
            status:'',
            DevicelistId:''
        },  
        rules: {
              ksName:[
                {required:true,message:'科室名称不能为空',tirgger:'blur'}
              ]
            },
        tableData:[]
      }
    },
    created(){
        this.newInit_return('api/department/ShowDe',{IndexPage:"1",PageSize:"10000",id:0},true).then(res=>{
            this.prevFenlei=res.data.results
       })
    },
    mounted(){
        this.myInit('api/devicebreak/breaklist',{IndexPage:"1",PageSize:"10"})
      
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

    },
    methods:{
        myInit,
        myDelete,  
        mySearch,
        handleSizeChange,
        handleCurrentChange,
        addUpload,
        selectData,
        newInit_return,
        myExprotExcel,
        addUpload_current,
        myReset(){
            this.myInit('api/devicebreak/breaklist',{IndexPage:'1',PageSize:'10'})
            this.isSearch=false
            for(var key in this.shaixuan){
                this.shaixuan[key]=""
            }
            this.watch_SX_did=""
        },
        goSearch(){
            if(this.watch_SX_did!=""){
                this.shaixuan.deid=this.watch_SX_did.reverse()[0]
            }
            this.newInit_return(this.searchAPI,this.shaixuan).then(res=>{
                console.log(res)
                this.tableData=res.data.results
                this.totalpage=res.data.totalpage
                this.isSearch=true
            })
            
        },
        fuzhi(row1){
             this.ruleForm1.DeviceNum=row1.deviceNum
                this.ruleForm1.OldNum=row1.oldNum
                this.ruleForm1.RegisterNum=row1.registerNum
                this.ruleForm1.Devicename=row1.devicename
                this.ruleForm1.UsallyName=row1.usallyName
                this.ruleForm1.DeviceSource=row1.deviceSource
                this.ruleForm1.InitPrice=row1.initPrice
                this.ruleForm1.DeviceCount=row1.deviceCount
                this.ruleForm1.Devicemodel=row1.devicemodel
                this.ruleForm1.Roomid=row1.roomid
                this.ruleForm1.Unit=row1.unit
                this.ruleForm1.TypeId=row1.typeId
                this.ruleForm1.QixieId=row1.qixieId
                this.ruleForm1.Supplier=row1.supplier
                this.ruleForm1.Brand=row1.brand
                this.ruleForm1.Factory=row1.factory
                this.ruleForm1.BuyDate=row1.buyDate
                this.ruleForm1.LeaveFactoryNum=row1.leaveFactoryNum
                this.ruleForm1.LeaveFactoryDate=row1.leaveFactoryDate
                this.ruleForm1.DeviceSerialNumber=row1.deviceSerialNumber
                this.ruleForm1.RepairFactory=row1.repairFactory
                this.ruleForm1.RepairEndDate=row1.repairEndDate
                this.ruleForm1.BillNum=row1.billNum
                this.ruleForm1.FinaunceNum=row1.finaunceNum
                this.ruleForm1.ZhejiuTotal=row1.zhejiuTotal
                this.ruleForm1.ZhejiuMonths=row1.zhejiuMonths
                this.ruleForm1.CountryNum=row1.countryNum
                this.ruleForm1.ProducePlace=row1.producePlace
                this.ruleForm1.DanganNum=row1.danganNum
                this.ruleForm1.IsCount=row1.isCount
                this.ruleForm1.IsOutDevice=row1.isOutDevice
                this.ruleForm1.IsBigdevice=row1.isBigdevice
                this.ruleForm1.IsUseForPublic=row1.isUseForPublic
                this.ruleForm1.IsProfit=row1.isProfit
                this.ruleForm1.IsExtraDevice=row1.isExtraDevice
                this.ruleForm1.SelfMoney=row1.selfMoney
                this.ruleForm1.GovermentMoney=row1.govermentMoney
                this.ruleForm1.ScienceMoney=row1.scienceMoney
                this.ruleForm1.TeachMoney=row1.teachMoney
                this.ruleForm1.DonatedMoney=row1.donatedMoney
                this.ruleForm1.OthersMoney=row1.othersMoney
                this.ruleForm1.Remark=row1.remark
                this.ruleForm1.DeviceFile=row1.deviceFile
                this.ruleForm1.Peopleid=row1.peopleid
                this.ruleForm1.Peoplename=row1.peoplename
                this.ruleForm1.Departmentid=row1.departmentid
                this.ruleForm1.Departmentname=row1.departmentname
                this.ruleForm1.DeviceId=row1.deviceId
        },
        detail(row){
            // ajax
            var params={break_id:row.zidian.id}
            var url="api/devicebreak/listdetail";
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
                url: url,
                data:this.$qs.stringify(params)
            }).then((res)=>{
                loading.close()
                // console.log(123456,res.data.result[0])
                if(res.data.result.length==0){
                    this.$message.warning('暂无数据')
                    return
                }

                this.drawer_title="设备详情"
                this.drawer=true

             
                var row1=res.data.result[0]
                this.fuzhi(row1)
                // 详情数据
                 this.ruleForm1.UseNum=row1.useNum
                //  console.log(123123123,this.ruleForm1.UseNum)
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
            let status=row.zidian.status;
            if(status==="0"){
                return "待审批"
            }else if(status==="1"){
                return "已通过"
            }else if(status==="2"){
                return "已拒绝"
            }else if(status===null){
                return "- - - -"
            }
        },
        check(row,index){
            this.zh_Index=index
            this.dialog=true;
            this.ruleForm.Number=row.number;
            this.ruleForm.break_id=row.id;
            this.ruleForm.DevicelistId=row.devicelistId;
        },
        upload(){ 
            this.newInit_return('api/devicebreak/shenpi',this.ruleForm).then(res=>{
                console.log(res)
                this.dialog=false
                if(res.data.response=='success'){
                    this.$message.success(res.data.results)
                    if(this.ruleForm.status==1){
                        this.tableData[this.zh_Index].status=1
                    }else{
                        this.tableData[this.zh_Index].status=2
                    }
                }else{
                    this.$message.warning(res.data.results)
                }
            })
        },
        cancel(){
            this.drawer=false
            this.break_drawer=false
            this.dialog=false
        },
        Current_init(){
            this.myInit('api/devicebreak/breaklist',{IndexPage:"1",PageSize:"10"})    
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
