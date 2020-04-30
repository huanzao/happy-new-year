<template>
  <div>
      <!-- 页头 -->
        <div class="pageHead">
            <span>台账列表</span>
            <el-button size="mini" @click="myAdd('zcrk_add','add')"  type="primary">新增</el-button>
            <el-button size="mini" type="primary" @click="myExprotExcel(tHeader,filterVal,'耗材台账','book')">导出Excel</el-button>
            <el-button size="mini" v-if='isSearch'  @click="myReset" type="primary" icon='el-icon-refresh'></el-button>
        </div>
        <!-- 筛选 -->
        <div class="shaixuan">
            <div>
                <label>名称:</label>
                <div>
                    <el-input size="mini" v-model="shaixuan.devicename"></el-input>
                </div>
            </div>
            <div>
                <label>仓库名称：</label>
                <div>
                    <ChangKuOption v-model="shaixuan.myChangku"></ChangKuOption>
                </div>
            </div>
            <div>
                <label>器械分类：</label>
                <div>
                    <QiXieOption v-model="shaixuan.typeid"></QiXieOption>
                </div>
            </div>
            <div>
                <label>设备类型：</label>
                <div>
                    <el-cascader style="width:100%"  v-model="shaixuan.qixieid" size="mini" :options="prevFenlei" :props="Lives"></el-cascader>
                </div>
            </div>
            <div>
                <label>厂商：</label>
                <div>
                    <FactoryOption v-model="shaixuan.factory"></FactoryOption>
                </div>
            </div>
            <div>
                <el-button size="mini" @click="goSearch"><i class="el-icon-aim"></i> 筛选</el-button>
            </div>
        </div>
        <!-- 主体表格 -->
        <div>
            <template>
                <el-table :data="tableData" style="width:100%">
                    <el-table-column label="编号"  prop="book.id"></el-table-column>
                    <el-table-column label="设备名称" prop="book.devicename"></el-table-column>
                    <el-table-column label="仓库" prop="name"></el-table-column>
                    <el-table-column label="库存" prop="book.deviceCount"></el-table-column>
                    <el-table-column label="设备原值" prop="book.initPrice"></el-table-column>
                    <el-table-column label="耗材编号" prop="book.number"></el-table-column>
                    <el-table-column label="品牌" prop="book.brand"></el-table-column>
                    <el-table-column label="包装规格" prop="book.packpage"></el-table-column>
                    <el-table-column label="入库单价" prop="book.inroomPrice"></el-table-column>
                    <el-table-column label="规格型号" prop="book.model"></el-table-column>
                    <el-table-column label="厂家" prop="book.factory"></el-table-column>
                    <el-table-column label="单位" prop="book.unit"></el-table-column>
                    <el-table-column label="购入时间" prop="book.buyDate" width=150></el-table-column>
                    <el-table-column label="操作" width="180">
                        <template slot-scope="scope">
                            <el-link type="primary" @click="Outroom(scope.row,scope.$index)">出库</el-link>
                            <el-link type="primary" @click="detail(scope.row,scope.$index)">详情</el-link>
                            <el-link type="primary" @click="move(scope.row,scope.$index)">转移</el-link>
                        </template>
                    </el-table-column>
                </el-table>
            </template>   
        </div>
        <!-- 分页 -->
        <div class="block" style="height:32px">
            <el-pagination
            style="height:50px"
              @size-change="handleSizeChange($event,'api/device/devicebook',{roomid:shaixuan.roomid})"
              @current-change="handleCurrentChange($event,'api/device/devicebook',{roomid:shaixuan.roomid})"
              :current-page="currentPage"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalpage">
            </el-pagination>
        </div>
        <!-- 抽屉--入库 -->
        <el-drawer :title="drawerTitle"  style="overflow-y: scroll;" :visible.sync="drawer" size='30%'  direction="rtl" >
            <el-form class='drawerform demo-ruleForm'    :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="100px"  >
                <el-form-item label="设备编号">
                    <el-input v-model="ruleForm.DeviceNum" :disabled="true" size="mini"  autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="设备名称">
                    <el-input v-model="ruleForm.Devicename" :disabled="true" size="mini"  autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="品牌">
                    <el-input v-model="ruleForm.Brand" :disabled="true" size="mini"  autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="申请科室" prop="BuMeng">
                    <el-cascader style="width:100%"  v-model="ruleForm.BuMeng" size="mini" :options="prevFenlei_keshi" :props="KeshiOpt"></el-cascader>
                </el-form-item>
                <el-form-item label="存放仓库"  >
                    <el-input  v-model="ruleForm.myRoom.split('-*-')[1]" :disabled="true"  size="mini"  autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="转入仓库" v-if="drawerTitle=='转移'" >
                    <ChangKuOption v-model="ruleForm.myNewRoom" ></ChangKuOption>
                </el-form-item>
                <el-form-item label="操作人" prop="myPeople">
                    <UserOption v-model="ruleForm.myPeople"></UserOption>
                </el-form-item>
                <el-form-item label="数量" prop="DeviceCount">
                    <el-input v-model="ruleForm.DeviceCount" type="number"  size="mini"  autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button size="mini" @click="drawer = false">取 消</el-button>
                    <el-button size="mini" type="primary" @click="myUp" >确 定</el-button>
                </el-form-item>
            </el-form>
        </el-drawer>
        <!-- 抽屉--详情 -->
        <el-drawer :title="drawerTitle_detail"  style="overflow-y: scroll;" :visible.sync="drawer_detail" size='30%'  direction="rtl" >
            <el-table  :data="detail_Arr" style="width: 100%">
                <el-table-column label="编号"  prop="id"></el-table-column>
                <el-table-column  label="耗材名称" prop="name"></el-table-column>
                <el-table-column label="仓库" prop="roomId"></el-table-column>
                <el-table-column label="耗材种类" prop="kind"></el-table-column>
                <el-table-column label="耗材编号" prop="number"></el-table-column>
                <el-table-column label="品牌" prop="brand"></el-table-column>
                <el-table-column label="包装规格" prop="packpage"></el-table-column>
                <el-table-column label="规格型号" prop="model"></el-table-column>
                <el-table-column label="厂家" prop="factory"></el-table-column>
                <el-table-column label="入库单价" prop="inroomPrice"></el-table-column>
                <el-table-column label="库存" prop="count"></el-table-column>
                <el-table-column label="单位" prop="unit"></el-table-column>
            </el-table>
            <div class="block" style="height:32px">
                <el-pagination
                    @current-change="myFy_change"
                    :current-page.sync="myFy_page"
                    :page-size="10"
                    layout="total,prev,pager,next,jumper"
                    :total="myFy_total">
                </el-pagination>
            </div>
        </el-drawer>
  </div>
</template>
<script>
import {addUpload,myInit,myDelete,myAdd,myEdit,handleSizeChange,handleCurrentChange} from '../../../assets/comon'
import {newInit_return,myExprotExcel} from '../../../assets/newAxios'

import UserOption from '../Child/UserOption'
import ChangKuOption from '../Child/ChangKuOption'
import KeShiTypeOption from '../Child/KeShiTypeOption'
import FactoryOption from '../Child/FactoryOption'
import QiXieOption from '../Child/QiXieOption'

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
        data(){
            return{
                Lives: {
                    value:'id',
                    checkStrictly: true,
                    label:'name',
                    lazy: true,
                    lazyLoad (node, resolve) {
                        const { level,data } = node;
                        console.log(222,data)
                        if(data){
                            Mylives('api/devicedicttype/searchson',{shangji_id:data.id}).then(res=>{
                                const nodes = Array.from(res.data.results_son)
                                resolve(nodes);
                            })
                        }
                    }
                },
                KeshiOpt: {
                    value:'nameandid',
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
                prevFenlei_keshi:[],
                prevFenlei:[],
                myFy_total:250,
                myFy_page:1,
                detailBookId:'',
                tHeader:['编号','设备名称','仓库','库存','设备原值','耗材编号','品牌','包装规格','入库单价','规格型号','厂家','单位','购入时间'],
                filterVal:['book.id','book.devicename','book.roomname','book.deviceCount','book.initPrice','book.number','book.brand','book.packpage','book.inroomPrice','book.model','book.factory','book.unit','book.buyDate'],
                drawer:false,
                globalRoonId:"",
                drawerTitle:'入库',
                drawerTitle_detail:'',
                itemMax:'',
                drawer_detail:false,
                detail_Arr:[],
                currentPage:1,
                pagesize:10,
                totalpage:0,
                isSearch:false,
                searchAPI:'api/search/devicebook',
                shaixuan:{
                    IndexPage:'1',
                    PageSize:'10',
                    devicename:'',
                    roomid:"",
                    typeid:"",
                    qixieid:"",
                    supplier:"",
                    factory:"",
                    iscount:"",
                    is_out_device:"",
                    is_bigdevice:"",
                    is_use_for_public:"",
                    is_profit:"",
                    is_extra_device:"",
                    myChangku:''
                },
                tableData:[],
                ruleForm:{
                    DeviceId:"",
                    DeviceNum:"",
                    OldNum:"",
                    RegisterNum:"",
                    Devicename:"",
                    UsallyName:"",
                    DeviceSource:"",
                    InitPrice:"",
                    DeviceCount:"",
                    Devicemodel:"",
                    Roomid:"",
                    Unit:"",
                    TypeId:"",
                    QixieId:"",
                    Supplier:"",
                    Brand:"",
                    Factory:"",
                    BuyDate:"",
                    LeaveFactoryNum:"",
                    LeaveFactoryDate:"",
                    DeviceSerialNumber:"",
                    RepairFactory:"",
                    RepairEndDate:"",
                    BillNum:"",
                    FinaunceNum:"",
                    ZhejiuTotal:"",
                    ZhejiuMonths:"",
                    CountryNum:"",
                    ProducePlace:"",
                    DanganNum:"",
                    IsCount:"",
                    IsOutDevice:"",
                    IsBigdevice:"",
                    IsUseForPublic:"",
                    IsProfit:"",
                    IsExtraDevice:"",
                    SelfMoney:"",
                    GovermentMoney:"",
                    ScienceMoney:"",
                    TeachMoney:"",
                    DonatedMoney:"",
                    OthersMoney:"",
                    Remark:"",
                    DeviceFile:"",
                    Roomname:"",
                    BuMeng:'',
                    myPeople:'',
                    myRoom:"",
                    myNewRoom:''
                },
                moveForm:{

                },
                roomtype:'入库',
                rules: {
                    HCcount:[
                        { required: true, message: '数量不能为空', trigger: 'blur' },
                    ],
                    myRoom:[
                        { required: true, message: '仓库不能为空', trigger: 'change' },
                    ],
                    myPeople:[
                        { required: true, message: '申请人不能为空', trigger: 'change' },
                    ],
                    BuMeng:[
                        { required: true, message: '申请科室不能为空', trigger: 'change' },
                    ],
                    DeviceCount:[
                        { required: true, message: '出库数量不能为空', trigger: 'change' },
                    ]
                },
            }
        },
        created(){
            this.newInit_return('/api/devicedicttype/searchson',{shangji_id:0}).then(res=>{
                this.prevFenlei=res.data.results_son
            })
            this.newInit_return('api/department/ShowDe',{IndexPage:"1",PageSize:"10000",id:0},true).then(res=>{
                this.prevFenlei_keshi=res.data.results
            })
        },
        mounted(){
            this.pageInit('')
        },
        components:{
            UserOption,
            ChangKuOption,
            KeShiTypeOption,
            FactoryOption,
            QiXieOption
        },
        methods:{
            myAdd,myEdit,
            myExprotExcel,
            newInit_return,
            handleSizeChange,
            handleCurrentChange,
            myReset(){
                this.pageInit('')
                this.isSearch=false
                for(var key in this.shaixuan){
                    this.shaixuan[key]=""
                }
            },
            goSearch(){
                if(this.shaixuan.qixieid!=""){
                    this.shaixuan.qixieid=this.shaixuan.qixieid.reverse()[0]
                }
                if(this.shaixuan.myChangku!=""){
                    this.shaixuan.roomid=this.shaixuan.myChangku.split('-*-')[0]
                }
                console.log(this.shaixuan)
                this.newInit_return('api/search/devicebook',this.shaixuan).then(res=>{
                    console.log(res)
                    this.tableData=res.results
                    this.isSearch=true
                })
            },
            pageInit(id){
                this.newInit_return('api/device/devicebook',{IndexPage:1,PageSize:10,roomid:id}).then(res=>{
                    console.log(res)
                    this.tableData=res.data.result
                })
            },
            mysearch(){
                console.log(this.shaixuan)
                this.this.pageInit(this.shaixuan.roomid)
            },
            myUp(){
                this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    this.ruleForm.Roomname=this.ruleForm.myRoom.split('-*-')[1]
                    if(this.ruleForm.DeviceCount*1>this.itemMax*1){
                        this.$message.warning('库存数量不足,请修改数量')
                        return
                    }
                    var ahcArr=[]
                    ahcArr.push(this.ruleForm)
                    var uploadData={
                        allhc:ahcArr
                    }
                    console.log(this.ruleForm.BuMeng)
                    if(this.drawerTitle=='出库'){
                        this.newInit_return('api/device/inroom',
                                    {
                                        AllData:JSON.stringify(uploadData),
                                        roomid:this.ruleForm.myRoom.split('-*-')[0],
                                        roomname:this.ruleForm.myRoom.split('-*-')[1],
                                        roomtype:0,
                                        peopleid:this.ruleForm.myPeople.split('-*-')[0],
                                        peoplename:this.ruleForm.myPeople.split('-*-')[1],
                                        DeId:this.ruleForm.BuMeng.reverse()[0].split('*-*')[0],
                                        DeName:this.ruleForm.BuMeng.reverse()[0].split('*-*')[1]
                                    }
                            ).then(res=>{
                            console.log(res)
                            if(res.data.response==="success"){
                                this.$message.success(res.data.results)
                                this.drawer=false
                            }else{
                                this.$message.warning(res.data.results)
                            }
                        })
                    }else if(this.drawerTitle=='转移'){
                        var abj={
                                        AllData:JSON.stringify(uploadData),
                                        oldroomid:this.ruleForm.myRoom.split('-*-')[0],
                                        newroomid:this.ruleForm.myNewRoom.split('-*-')[0],
                                    
                                        olddeid:'',//仓库间转移 科室为空kong
                                        newdeid:"",//仓库间转移 科室为空kong
                                        room_id:this.ruleForm.myNewRoom.split('-*-')[0],
                                        roomtype:0, //仓库间转移
                                        DeId:this.ruleForm.BuMeng.reverse()[0].split('*-*')[0],
                                        DeName:this.ruleForm.BuMeng.reverse()[0].split('*-*')[1],
                                        peopleid:this.ruleForm.myPeople.split('-*-')[0],
                                        peoplename:this.ruleForm.myPeople.split('-*-')[1],
                                    }
                        console.log(abj)

                        this.newInit_return('api/movedevice/move',abj).then(res=>{
                            console.log(res)
                            if(res.data.response==="success"){
                                this.$message.success(res.data.results)
                                this.drawer=false
                            }else{
                                this.$message.warning(res.data.results)
                            }
                        })
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            },
            fuzhi(row){
                this.ruleForm.DeviceId=row.book.deviceId
                this.ruleForm.DeviceNum=row.book.deviceNum
                this.ruleForm.OldNum=row.book.oldNum
                this.ruleForm.RegisterNum=row.book.registerNum
                this.ruleForm.Devicename=row.book.devicename
                this.ruleForm.UsallyName=row.book.usallyName
                this.ruleForm.DeviceSource=row.book.deviceSource
                this.ruleForm.InitPrice=row.book.initPrice
                this.ruleForm.Devicemodel=row.book.devicemodel
                this.ruleForm.Roomid=row.book.roomid
                this.ruleForm.Unit=row.book.unit
                this.ruleForm.TypeId=row.book.typeId
                this.ruleForm.QixieId=row.book.qixieId
                this.ruleForm.Supplier=row.book.supplier
                this.ruleForm.Brand=row.book.brand
                this.ruleForm.Factory=row.book.factory
                this.ruleForm.BuyDate=row.book.buyDate
                this.ruleForm.LeaveFactoryNum=row.book.leaveFactoryNum
                this.ruleForm.LeaveFactoryDate=row.book.leaveFactoryDate
                this.ruleForm.DeviceSerialNumber=row.book.deviceSerialNumber
                this.ruleForm.RepairFactory=row.book.repairFactory
                this.ruleForm.RepairEndDate=row.book.repairEndDate
                this.ruleForm.BillNum=row.book.billNum
                this.ruleForm.FinaunceNum=row.book.finaunceNum
                this.ruleForm.ZhejiuTotal=row.book.zhejiuTotal
                this.ruleForm.ZhejiuMonths=row.book.zhejiuMonths
                this.ruleForm.CountryNum=row.book.countryNum
                this.ruleForm.ProducePlace=row.book.producePlace
                this.ruleForm.DanganNum=row.book.danganNum
                this.ruleForm.IsCount=row.book.isCount
                this.ruleForm.IsOutDevice=row.book.isOutDevice
                this.ruleForm.IsBigdevice=row.book.isBigdevice
                this.ruleForm.IsUseForPublic=row.book.isUseForPublic
                this.ruleForm.IsProfit=row.book.isProfit
                this.ruleForm.IsExtraDevice=row.book.isExtraDevice
                this.ruleForm.SelfMoney=row.book.selfMoney
                this.ruleForm.GovermentMoney=row.book.govermentMoney
                this.ruleForm.ScienceMoney=row.book.scienceMoney
                this.ruleForm.TeachMoney=row.book.teachMoney
                this.ruleForm.DonatedMoney=row.book.donatedMoney
                this.ruleForm.OthersMoney=row.book.othersMoney
                this.ruleForm.Remark=row.book.remark
                this.ruleForm.DeviceFile=row.book.deviceFile
                this.ruleForm.myRoom=row.book.roomid+'-*-'+row.book.roomname
            },
            Outroom(row,index){
                this.drawerTitle='出库'
                this.roomtype=0
                console.log(row,index)
                this.drawer=true
                this.itemMax=row.book.deviceCount
                //数量 申请人自己选
                this.fuzhi(row)
            },
            move(row,index){
                this.fuzhi(row)
                this.itemMax=row.book.deviceCount
                this.drawerTitle='转移'
                this.drawer=true
            },
            detail(row,index){
                console.log(row,index)
                this.detailBookId=row.book.id
                this.newInit_return('api/device/devicebookdetail',{IndexPage:1,PageSize:10,bookid:row.book.id},true).then(res=>{
                    console.log(res)
                    if(res.data.result.length==0){
                        this.$message('暂无数据')
                    }else{
                        this.$message.success('数据已返回')
                        this.drawer_detail=true
                        this.detail_Arr=res.data.result
                        this.myFy_total=res.data.totalpage
                        console.log(546,this.detail_Arr)
                    }
                })
            },
            myFy_change(){
                this.newInit_return('api/device/devicebookdetail',{IndexPage:this.myFy_page,PageSize:10,bookid:this.detailBookId},true).then(res=>{
                    this.detail_Arr=res.data.result
                })
            }
        }
    }
</script>
<style scoped>
    .d_select{
        display: flex;
    }
    .d_select label{
        line-height: 27px;
        padding-left: 10px;
    }
</style>