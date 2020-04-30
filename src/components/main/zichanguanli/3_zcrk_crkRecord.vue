<template>
  <div>
      <!-- 页头 -->
        <div class="pageHead">
            <span>设备出入库审批列表</span>
            <el-button size="mini"  @click="myExprotExcel(ex_head,ex_key,'设备出入库记录','his')" type="primary">导出EXCEL</el-button>
            <el-button size="mini" v-if='isSearch'  @click="myReset" type="primary" icon='el-icon-refresh'></el-button>
        </div>
        <!-- 筛选 -->
        <div class="shaixuan">
            <div>
                <label>操作人：</label>
                <div>
                    <UserOption v-model="shaixuan.opreationpeople_show"></UserOption>
                </div>
            </div>
            <div>
                <label>仓库：</label>
                <div>
                    <ChangKuOption v-model="shaixuan.roomid_show"></ChangKuOption>
                </div>
            </div>
            <div>
                <label>出入库：</label>
                <div>
                    <el-select size="mini" v-model="shaixuan.roomtype">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="出库" value="1"></el-option>
                        <el-option label="入库" value="0"></el-option>
                    </el-select>
                </div>
            </div>
            <div>
                <label>状态：</label>
                <div>
                    <el-select size="mini" v-model="shaixuan.status">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="待审批" value="0"></el-option>
                        <el-option label="已通过" value="1"></el-option>
                        <el-option label="已拒绝" value="2"></el-option>
                    </el-select>
                </div>
            </div>
            <div>
                <label>申请人：</label>
                <div>
                    <UserOption v-model="shaixuan.peopleid_show"></UserOption>
                </div>
            </div>
            <div>
                <label>单号：</label>
                <div>
                    <el-input size="mini" v-model="shaixuan.number"></el-input>
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
                    <el-table-column label="耗材编号"  prop="his.number"></el-table-column>
                    <el-table-column  label="时间" prop="his.inroomtime"></el-table-column>
                    <el-table-column label="仓库" prop="roomname"></el-table-column>
                    <el-table-column label="类型" prop="his.roomtype" :formatter="roomType_formatter"></el-table-column>
                    <el-table-column label="申请人" prop="his.peoplename"></el-table-column>
                    <el-table-column label="状态" prop="his.status" :formatter="status_formatter"></el-table-column>
                    <el-table-column label="操作" width="180">
                        <template slot-scope="scope">
                            <el-link type="primary" @click="showDetail(scope.row,scope.$index)">详情</el-link>
                            <el-link type="primary" @click="showJilu(scope.row,scope.$index)">记录</el-link>
                            <el-link v-if='scope.row.his.status==0' type="primary" @click="sh(scope.row,scope.$index)">审核</el-link>
                        </template>
                    </el-table-column>
                </el-table>
            </template>   
        </div>
        <!-- 分页 -->
        <div class="block" style="height:32px">
            <el-pagination
            style="height:50px"
              @size-change="handleSizeChange($event,'api/device/keshiinroom',{deid:shaixuan.deid.split('-*-')[0]})"
              @current-change="handleCurrentChange($event,'api/device/keshiinroom',{deid:shaixuan.deid.split('-*-')[0]})"
              :current-page="currentPage"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalpage">
            </el-pagination>
        </div>
        <!-- 抽屉--详情 -->
        <el-drawer :title="drawer_title"  style="overflow-y: scroll;" :visible.sync="drawer_detail" size='50%'  direction="rtl" >
            <el-table  v-if="drawer_title=='出入库记录'" :data="detail_Arr" style="width: 100%">
                <el-table-column label="编号"  prop="inroom.number"></el-table-column>
                <el-table-column label="申请科室" prop="inroom.inroomtime"></el-table-column>
                <el-table-column label="申请人" prop="inroom.opreationPeople"></el-table-column>
                <el-table-column label="科室" prop="inroom.dename"></el-table-column>
            </el-table>
            <el-table  v-if="drawer_title=='出入库详情'" :data="detail_Arr" style="width: 100%">
                <el-table-column label="编号"  prop="detail.id"></el-table-column>
                <el-table-column label="申请科室" prop="detail.department"></el-table-column>
                <el-table-column label="申请人" prop="detail.people"></el-table-column>
                <el-table-column label="类型" prop="detail.roomtype" :formatter="detail_Type"></el-table-column>
                <el-table-column label="单价" prop="detail.inroomprice"></el-table-column>
                <el-table-column label="数量" prop="detail.count"></el-table-column>
            </el-table>
            <div class="block" style="height:32px">
            <el-pagination  @current-change="myFy_change" :current-page.sync="myFy_page" :page-size="10" layout="total,prev,pager,next,jumper" :total="myFy_total">
            </el-pagination>
            </div>
        </el-drawer>
        <!-- 审批操作 -->
        <el-dialog class="myDialog" title="审批" :visible.sync="dialog_sp">
            <el-form :model="form_sp" ref="form_sp" :rules="rules"  label-width="150px">
                <el-form-item label="编号" >
                    <el-input size="mini" v-model="form_sp.number" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="类型" >
                    <el-input size="mini" v-model="form_sp.type_lable" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="审批" prop="status" >
                    <el-select size="mini" v-model="form_sp.status" placeholder="请选择">
                        <el-option label="通过 " value="1"></el-option>
                        <el-option label="拒绝" value="2"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialog_sp = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('form_sp')">确 定</el-button>
            </div>
        </el-dialog>
  </div>
</template>
<script>
import {addUpload,myInit,myDelete,myEdit,myAdd,mySearch,handleSizeChange,handleCurrentChange} from '../../../assets/comon'
import {newInit_return,myExprotExcel} from '../../../assets/newAxios'   
import KeShiTypeOption from '../Child/KeShiTypeOption'
import UserOption from '../Child/UserOption'
import ChangKuOption from '../Child/ChangKuOption'
export default {
        data(){
            return{
                ex_head:['耗材编号','时间','仓库','类型','申请人','状态'],
                ex_key:['his.number','his.inroomtime','his.roomname','his.roomtype','his.peoplename','his.status'],
                myFy_total:0,
                myFy_page:1,
                todo_row:'',
                todo_index:'',
                drawer_title:"",
                currentPage:1,
                pagesize:10,
                totalpage:0,
                dialog_sp:false,
                drawer_detail:false,
                detail_Arr:[],
                gloabIndex:'',
                isSearch:false,
                searchAPI:'api/search/deviceinroom',
                shaixuan:{
                    IndexPage:'1',
                    PageSize:'10',
                    opreationpeople:"",
                    opreationpeople_show:'',
                    roomid:'',
                    roomid_show:'',
                    roomtype:'',
                    status:'',
                    peopleid:"",
                    peopleid_show:"",
                    deid:'',
                    number:""
                },
                form_sp:{
                    number:"",
                    type_lable:"",
                    status:"",
                    inroomid:"",
                    roomtype:"",
                },
                rules: {
                    status: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                    ]
                },
                tableData:[]
            }
        },
        mounted(){
            this.myInit('api/device/keshiinroom',{IndexPage:1,PageSize:10,deid:""})
        },
        components:{
            KeShiTypeOption,UserOption,ChangKuOption
        },
        methods:{
            myExprotExcel,
            myInit,
            newInit_return,
            handleSizeChange,
            handleCurrentChange,
            myReset(){
                this.myInit('api/device/keshiinroom',{IndexPage:1,PageSize:10,deid:""})
                this.isSearch=false
                for(var key in this.shaixuan){
                    this.shaixuan[key]=""
                }
            },
            goSearch(){
                console.log(this.shaixuan)
                if(this.shaixuan.opreationpeople_show!=""){
                    this.shaixuan.opreationpeople=this.shaixuan.opreationpeople_show.split('-*-')[0]
                }
                if(this.shaixuan.roomid_show!=""){
                    this.shaixuan.roomid=this.shaixuan.roomid_show.split('-*-')[0]
                }
                if(this.shaixuan.peopleid_show!=""){
                    this.shaixuan.peopleid=this.shaixuan.peopleid_show.split('-*-')[0]
                }
                this.newInit_return(this.searchAPI,this.shaixuan).then(res=>{
                    console.log(res)
                    this.tableData=res.data.results
                    this.totalpage=res.data.totalpage
                })
                this.isSearch=true
            },
            roomType_formatter(row){
                if(row.his.roomtype==1){
                    return '入库'
                }else if(row.his.roomtype==0){
                    return '出库'
                }else{
                    return 'nan'
                }
            },
            detail_Type(row){
                if(row.detail.roomtype==1){
                    return '入库'
                }else if(row.detail.roomtype==0){
                    return '出库'
                }else{
                    return 'nan'
                }
            },
            status_formatter(row){
                if(row.his.status*1===0){
                    return '待审核'
                }else if(row.his.status*1===1){
                    return '已通过'
                }else{
                    return '已拒绝'
                }
            },
            sh(row,index){
                this.gloabIndex=index
                this.dialog_sp=true
                this.form_sp.inroomid=row.his.id
                this.form_sp.roomtype=row.his.roomtype
                this.form_sp.number=row.his.number
                if(row.his.roomtype=='1'){
                    this.form_sp.type_lable='入库'
                }else{
                    this.form_sp.type_lable="出库"
                }
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log( '开始时间',new Date())
                    this.$message('请求已提交，请耐心等待')
                    this.dialog_sp=false
                    this.axios({
                        method: 'post',
                        headers:{'Authorization':'Bearer '+localStorage.token},
                        timeout:900000,
                        url: 'api/device/deviceshenpi',
                        data:this.$qs.stringify(this.form_sp)
                    }).then((res)=>{
                        if(res.data.response==='success'){
                            
                            this.$message.success(res.data.result)
                            if(res.data.result==="拒绝成功"){
                                this.tableData[this.gloabIndex].his.status=2
                            }else{
                                this.tableData[this.gloabIndex].his.status=1
                            }
                            console.log('结束时间',new Date())
                        }else{
                            this.$message.success(res.data.result)
                        }
                    }).catch((error)=>{
                        console.log(error)
                        this.$message.warning('网络错误,请稍后再试')
                    })
                    
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            },
            showDetail(row,index){
                this.todo_row=row
                this.todo_index=index
                this.newInit_return('api/device/inroomdetail',
                    {IndexPage:1,PageSize:10,inroomid:row.his.id,rommtype:''}
                ).then(res=>{
                    console.log(res)
                    if(res.data.response=='success'&&res.data.result.length!=0){
                        this.detail_Arr=res.data.result
                        this.myFy_total=res.data.totalpage
                        this.drawer_detail =true
                        this.drawer_title='出入库详情'
                    }else{
                        this.$message.warning('暂无详情数据')
                    }
                })
            },
            showJilu(row,index){
                this.todo_row=row
                this.todo_index=index
                this.newInit_return('api/device/inroomhis',
                    {IndexPage:1,PageSize:10,inroomid:row.his.id,rommtype:''}
                ).then(res=>{
                    console.log(res)
                    if(res.data.response=='success'&&res.data.result.length!=0){
                        this.detail_Arr=res.data.result
                        this.myFy_total=res.data.totalpage
                        this.drawer_detail =true
                        this.drawer_title='出入库记录'
                    }else{
                        this.$message.warning('暂无详情数据')
                    }
                })
            },
            myFy_change(){
                if(this.drawer_title==='出入库记录'){
                    this.newInit_return('api/device/inroomhis',
                        {IndexPage:this.myFy_page,PageSize:10,inroomid:this.todo_row.his.id,rommtype:''}
                    ).then(res=>{
                        console.log(res)
                        if(res.data.response=='success'){
                            this.detail_Arr=res.data.result
                            this.myFy_total=res.data.totalpage
                            this.drawer_detail =true
                            this.drawer_title='出入库记录'
                        }else{
                            this.$message('网络错误')
                        }
                    }).catch(err=>{
                        this.$message.warning(err)
                    })
                }else{
                    this.newInit_return('api/device/inroomdetail',
                        {IndexPage:this.myFy_page,PageSize:10,inroomid:this.todo_row.his.id,rommtype:''}
                    ).then(res=>{
                        console.log(res)
                        if(res.data.response=='success'&&res.data.result.length!=0){
                            this.detail_Arr=res.data.result
                            this.drawer_detail =true
                            this.drawer_title='出入库详情'
                        }else{
                            this.$message.warning('暂无详情数据')
                        }
                    })
                }
            }
        }
    }
</script>
<style scoped>

</style>