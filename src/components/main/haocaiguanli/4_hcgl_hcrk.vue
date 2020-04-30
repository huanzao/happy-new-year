<template>
  <div>
      <!-- 页头 -->
        <div class="pageHead">
            <span>耗材台账</span>
            <el-button size="mini" type="primary" @click="myAdd">添加</el-button>
            <el-button size="mini" type="primary" @click="myExprotExcel(tHeader,filterVal,'耗材台账','book')">导出Excel</el-button>
            <el-button size="mini" v-if='isSearch'  @click="myReset" type="primary" icon='el-icon-refresh'></el-button>
        </div>
        <!-- 筛选 -->
        <div class="shaixuan">
            <div>
                <label>耗材名称：</label>
                <div>
                    <el-input  size="mini" v-model="shaixuan.haocainame"></el-input>
                </div>
            </div>
            <div>
                <label>仓库：</label>
                <div>
                    <ChangKuOption v-model="shaixuan.rooomid_show" ></ChangKuOption>
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
                    <el-table-column label="编号"  prop="book.id"></el-table-column>
                    <el-table-column  label="耗材名称" prop="book.name"></el-table-column>
                    <el-table-column label="仓库" prop="name"></el-table-column>
                    <el-table-column label="库存" prop="book.count"></el-table-column>
                    <el-table-column label="耗材种类" prop="book.kind"></el-table-column>
                    <el-table-column label="耗材编号" prop="book.number"></el-table-column>
                    <el-table-column label="品牌" prop="book.brand"></el-table-column>
                    <el-table-column label="包装规格" prop="book.packpage"></el-table-column>
                    <el-table-column label="入库单价" prop="book.inroomPrice"></el-table-column>
                    <el-table-column label="规格型号" prop="book.model"></el-table-column>
                    <el-table-column label="厂家" prop="book.factory"></el-table-column>
                    <el-table-column label="单位" prop="book.unit"></el-table-column>
                    <el-table-column label="台账查看" width="180">
                        <template slot-scope="scope">
                            <el-link type="primary" @click="Inroom(scope.row,scope.$index)">入库</el-link>
                            <el-link type="primary" @click="Outroom(scope.row,scope.$index)">出库</el-link>
                            <el-link type="primary" @click="Inroom_detail(scope.row,scope.$index)">详情</el-link>
                        </template>
                    </el-table-column>
                </el-table>
            </template>   
        </div>
        <!-- 分页 -->
        <div class="block" style="height:32px">
            <el-pagination
            style="height:50px"
              @size-change="handleSizeChange($event,'api/HaoCai/haocaibook')"
              @current-change="handleCurrentChange($event,'api/HaoCai/haocaibook')"
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
                <el-form-item label="耗材名称">
                    <el-input v-model="ruleForm.Name" v-if="drawerTitle!='新增入库'" :disabled="true" size="mini"  autocomplete="off" ></el-input>
                    <el-select v-model="myWatchIndex" size="mini"  v-if="drawerTitle=='新增入库'" >
                        <el-option v-for="(item,index) in myhaocaiArr" :key='index' :value="index" :label='item.consumeName'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="耗材编号">
                    <el-input v-model="ruleForm.HCId" :disabled="true" size="mini"  autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="规格型号">
                    <el-input v-model="ruleForm.Model" :disabled="true" size="mini"  autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="单位">
                    <el-input v-model="ruleForm.Unit" :disabled="true" size="mini"  autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="品牌">
                    <el-input v-model="ruleForm.Brand" :disabled="true" size="mini"  autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="包装规格">
                    <el-input v-model="ruleForm.Package" :disabled="true" size="mini"  autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="入库价格">
                    <el-input v-model="ruleForm.Inroomprice" :disabled="true" size="mini"  autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="厂商">
                    <el-input v-model="ruleForm.Factory" :disabled="true" size="mini"  autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="耗材种类">
                    <el-input v-model="ruleForm.Hctype" :disabled="true" size="mini"  autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="数量" prop="HCcount">
                    <el-input v-model="ruleForm.HCcount" type='number'  size="mini"  autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="操作人" prop="People" >
                    <UserOption v-model="ruleForm.People"  size="mini"  autocomplete="off"  />
                </el-form-item>

                <el-form-item label="仓库" prop="My_Changku"  >
                    <ChangKuOption v-model="ruleForm.My_Changku"  size="mini"  autocomplete="off"  />
                </el-form-item>

                <el-form-item label="申请科室" prop="req_KS" >
                    <KeShiTypeOption v-model="ruleForm.req_KS"></KeShiTypeOption>
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
                <el-table-column label="编号"  prop="detail.id"></el-table-column>
                <el-table-column  label="耗材名称" prop="detail.name"></el-table-column>
                <el-table-column label="仓库" prop="detail.roomId"></el-table-column>
                <el-table-column label="耗材种类" prop="detail.kind"></el-table-column>
                <el-table-column label="耗材编号" prop="detail.number"></el-table-column>
                <el-table-column label="品牌" prop="detail.brand"></el-table-column>
                <el-table-column label="包装规格" prop="detail.packpage"></el-table-column>
                <el-table-column label="规格型号" prop="detail.model"></el-table-column>
                <el-table-column label="厂家" prop="detail.factory"></el-table-column>
                <el-table-column label="入库单价" prop="detail.inroomPrice"></el-table-column>
                <el-table-column label="库存" prop="detail.count"></el-table-column>
                <el-table-column label="单位" prop="detail.unit"></el-table-column>
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
import {addUpload,myInit,myDelete,myEdit,mySearch,handleSizeChange,handleCurrentChange} from '../../../assets/comon'
import {newInit_return,myExprotExcel} from '../../../assets/newAxios'

import UserOption from '../Child/UserOption'
import ChangKuOption from '../Child/ChangKuOption'
import KeShiTypeOption from '../Child/KeShiTypeOption'
    export default {
        data(){
            return{
                isSearch:false,
                searchAPI:'api/search/haocaibook',
                shaixuan:{
                    IndexPage:'1',
                    PageSize:"10",
                    haocainame:"",
                    haocainumber:"",
                    rooomid:"",
                    modelid:"",
                    factoryid:"",
                    rooomid_show:''
                },
                myFy_total:250,
                myFy_page:1,
                detail_ID:'',
                tHeader:['编号','耗材名称','仓库','库存','耗材种类','耗材编号'],
                filterVal:['book.id', 'book.name', 'book.roomId', 'book.count','book.kind','book.number'],
                drawer:false,
                drawerTitle:'入库',
                drawerTitle_detail:'入库详情',
                itemMax:'',
                drawer_detail:false,
                detail_Arr:[],
                currentPage:1,
                pagesize:10,
                totalpage:0,
                shaixuan:{
                    name:'',
                    type:'',
                },
                tableData:[],
                ruleForm:{
                    HCId:"",
                    HCcount:'',
                    Ccount:0,
                    Number:"", 
                    Name:"",
                    Model:"",
                    Unit:"",
                    Brand:"", 
                    Package:"",
                    Inroomprice:"",
                    Factory :"",
                    Hctype:"",
                    roomid:'',
                    roomname:'',
                    People:'',
                    peoplename:'',
                    peopleid:"",
                    DeName:'',
                    DeId:'',
                    req_KS:'',
                    My_Changku:''
                },
                roomtype:'入库',
                rules: {
                    HCcount:[
                        { required: true, message: '数量不能为空', trigger: 'blur' },
                    ],
                    roomid:[
                        { required: true, message: '仓库不能为空', trigger: 'change' },
                    ],
                    People:[
                        { required: true, message: '申请人不能为空', trigger: 'change' },
                    ],
                    req_KS:[
                        { required: true, message: '申请科室不能为空', trigger: 'change' },
                    ]
                },
                myhaocaiArr:[],
                myWatchIndex:''
            }
        },
        mounted(){
            this.pageInit()
        },
        watch:{
            myWatchIndex:function(val){
                console.log(val)

                this.ruleForm.HCId=this.myhaocaiArr[val].id
                this.ruleForm.Number=this.myhaocaiArr[val].consumeNum
                this.ruleForm.Name=this.myhaocaiArr[val].consumeName
                this.ruleForm.Model=this.myhaocaiArr[val].spec //???
                this.ruleForm.Unit=this.myhaocaiArr[val].unit
                this.ruleForm.Brand=this.myhaocaiArr[val].brand
                this.ruleForm.Package=this.myhaocaiArr[val].packingSize
                this.ruleForm.Inroomprice=this.myhaocaiArr[val].inroomPrice
                this.ruleForm.Factory=this.myhaocaiArr[val].supplier
                this.ruleForm.Hctype=this.myhaocaiArr[val].consumeTypeIda
                // this.ruleForm.roomname=row.name
                this.ruleForm.roomid=this.myhaocaiArr[val].roomId

            }
        },
        components:{
            UserOption,
            ChangKuOption,
            KeShiTypeOption
        },
        methods:{
            myExprotExcel,
            newInit_return,
            handleSizeChange,
            handleCurrentChange,
            myReset(){
                this.pageInit()
                this.isSearch=false
                for(var key in this.shaixuan){
                    this.shaixuan[key]=""
                }
            },
            goSearch(){
                console.log(this.shaixuan.rooomid_show)
                if(this.shaixuan.rooomid_show){
                    this.shaixuan.rooomid=this.shaixuan.rooomid_show.split('-*-')[0]
                }
                this.newInit_return(this.searchAPI,this.shaixuan).then(res=>{
                    console.log(res)
                    this.tableData=res.data.results
                    this.totalpage=res.data.totalpage
                    this.isSearch=true
                })
            },
            pageInit(){
                this.newInit_return('api/HaoCai/haocaibook',{IndexPage:1,PageSize:10,roomid:""}).then(res=>{
                    console.log(res)
                    this.tableData=res.data.result
                })
            },
            myAdd(){
                if(this.myhaocaiArr.length===0){
                    this.newInit_return('api/ConsumableDict/ShowConsumableDict',{IndexPage:"1",PageSize:"100000"}).then(res=>{
                        this.myhaocaiArr=res.data.result_consumable
                        console.log('*****',this.myhaocaiArr)
                    })
                }
                this.drawer=true
                this.drawerTitle='新增入库'
            },
            myUp(){
                this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    this.ruleForm.peoplename=this.ruleForm.People.split('-*-')[1]
                    this.ruleForm.peopleid=this.ruleForm.People.split('-*-')[0]
                    console.log(this.ruleForm)
                    if(this.roomtype===0 && this.itemMax*1<this.ruleForm.HCcount*1){
                        this.$message.warning('库存数量不足')
                        return
                    }

                    var ahcArr=[]
                    ahcArr.push(this.ruleForm)
                    var uploadData={
                        allhc:ahcArr
                    }

                    let TotalMessage=null

                    if(this.drawerTitle=='新增入库'){
                        this.ruleForm.My_Changku
                        this.ruleForm.roomid=this.ruleForm.My_Changku.split('-*-')[0]
                        this.ruleForm.roomname=this.ruleForm.My_Changku.split('-*-')[1]
                        

                        TotalMessage={
                                    AllData:JSON.stringify(uploadData),
                                    roomid:this.ruleForm.roomid,
                                    roomname:this.ruleForm.roomname,
                                    roomtype:1,
                                    peoplename:this.ruleForm.peoplename,
                                    peopleid:this.ruleForm.peopleid,
                                    DeId:this.ruleForm.req_KS.split('-*-')[0],
                                    DeName:this.ruleForm.req_KS.split('-*-')[1]
                                }
                        console.log(4545,TotalMessage)
                    }else{
                        TotalMessage={
                                    AllData:JSON.stringify(uploadData),
                                    roomid:this.ruleForm.roomid,
                                    roomtype:this.roomtype,
                                    peoplename:this.ruleForm.peoplename,
                                    peopleid:this.ruleForm.peopleid,
                                    DeId:this.ruleForm.req_KS.split('-*-')[0],
                                    DeName:this.ruleForm.req_KS.split('-*-')[1]
                                }
                    }

                    
                    
                    this.newInit_return('api/HaoCai/inroom',TotalMessage).then(res=>{
                        console.log(res)
                        if(res.data.response==="success"){
                            this.$message.success(res.data.results)
                            this.drawer=false

                            if(this.drawerTitle=='新增入库'){
                                this.newInit_return('api/HaoCai/haocaibook',{IndexPage:this.currentPage,PageSize:this.pagesize,roomid:""}).then(res=>{
                                    console.log(res)
                                    this.tableData=res.data.result
                                })
                            }
                        }else{
                            this.$message.warning(res.data.results)
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            },
            Outroom(row,index){
                this.drawerTitle='出库'
                this.roomtype=0
                console.log(row,index)
                this.drawer=true
                this.itemMax=row.book.count
                //数量 申请人自己选
                this.ruleForm.HCId=row.book.haocaiId
                this.ruleForm.Number=row.book.number
                this.ruleForm.Name=row.book.name
                this.ruleForm.Model=row.book.model
                this.ruleForm.Unit=row.book.unit
                this.ruleForm.Brand=row.book.brand
                this.ruleForm.Package=row.book.packpage
                this.ruleForm.Inroomprice=row.book.inroomprice
                this.ruleForm.Factory=row.book.factory
                this.ruleForm.Hctype=row.book.kind
                this.ruleForm.roomname=row.name
                this.ruleForm.roomid=row.book.roomId
            },
            Inroom(row,index){
                this.drawerTitle='入库'
                this.roomtype=1
                console.log(row,index)
                this.drawer=true
                this.itemMax=row.book.count
                console.log('conunt',this.itemMax)
                //数量 申请人自己选
                this.ruleForm.HCId=row.book.haocaiId
                this.ruleForm.Number=row.book.number
                this.ruleForm.Name=row.book.name
                this.ruleForm.Model=row.book.model
                this.ruleForm.Unit=row.book.unit
                this.ruleForm.Brand=row.book.brand
                this.ruleForm.Package=row.book.packpage
                this.ruleForm.Inroomprice=row.book.inroomprice
                this.ruleForm.Factory=row.book.factory
                this.ruleForm.Hctype=row.book.kind
                this.ruleForm.roomname=row.name
                this.ruleForm.roomid=row.book.roomId
            },
            Inroom_detail(row,index){
                console.log(row,index)
                this.detail_ID=row.book.id
                this.newInit_return('api/HaoCai/haocaibookdetail',{IndexPage:1,PageSize:10,bookid:row.book.id},true).then(res=>{
                    console.log(546,res)
                    if(res.data.result.length==0){
                        this.$message('暂无数据')
                    }else{
                        this.detail_Arr=res.data.result
                        this.myFy_total=res.data.totalpage
                        this.drawer_detail=true
                    }
                })
            },
            myFy_change(){
                this.newInit_return('api/HaoCai/haocaibookdetail',{IndexPage:this.myFy_page,PageSize:10,bookid:this.detail_ID}).then(res=>{
                   console.log('分页数据',res)
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