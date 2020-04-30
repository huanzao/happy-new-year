<template>
  <div>
      <!-- 页头 -->
        <div class="pageHead">
            <span>科室领取记录</span>
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
                    <el-table-column label="单子编号"  prop="his.number"></el-table-column>
                    <el-table-column label="出入库时间" prop="his.inroomtime"></el-table-column>
                    <el-table-column label="操作人" prop="his.opreationPeople"></el-table-column>
                    <el-table-column label="仓库id" prop="his.roomid"></el-table-column>
                    <el-table-column label="类型" prop="his.roomtype" :formatter="roomType_formatter"></el-table-column>
                    <el-table-column label="科室" prop="his.dename" ></el-table-column>
                    <el-table-column label="状态" prop="his.status" :formatter="matter_status"></el-table-column>
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
  </div>
</template>
<script>
import {addUpload,myInit,myDelete,myEdit,myAdd,mySearch,handleSizeChange,handleCurrentChange} from '../../../assets/comon'
import {newInit_return} from '../../../assets/newAxios'
import KeShiTypeOption from '../Child/KeShiTypeOption'
import UserOption from '../Child/UserOption'
import ChangKuOption from '../Child/ChangKuOption'
    export default {
        data(){
            return{
                currentPage:1,
                pagesize:10,
                totalpage:0,
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
                tableData:[],
            }
        },
        mounted(){
            this.myInit('api/device/keshiinroom',{IndexPage:1,PageSize:10,deid:this.shaixuan.deid})
        },
        components:{
            KeShiTypeOption,UserOption,ChangKuOption
        },
        methods:{
            myInit,
            newInit_return,
            handleSizeChange,
            handleCurrentChange,
            myReset(){
                this.myInit('api/device/keshiinroom',{IndexPage:1,PageSize:10,deid:this.shaixuan.deid})
                this.isSearch=false
                for(var key in this.shaixuan){
                    this.shaixuan[key]=""
                }
            },
            goSearch(){
                this.$message.warning('数据结构与初始化是的数据不匹配')
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
                if(row.his.roomtype*1==0){
                    return '入库'
                }else if(row.his.roomtype*1==1){
                    return '出库'
                }
            },
            matter_status(row){
                if(row.his.status*1==0){
                    return '待审批'
                }else if(row.his.status*1==1){
                    return '通过'
                }else if(row.his.status*1==2){
                    return '拒绝'
                }
            }
        }
    }
</script>
<style scoped>

</style>