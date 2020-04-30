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
                <label>单号：</label>
                <div>
                    <el-input size="mini" v-model="shaixuan.number"></el-input>
                </div>
            </div>
            <div>
                <label>操作人：</label>
                <div>
                    <UserOption v-model="shaixuan.opreation_people_lable"></UserOption>
                </div>
            </div>
            <div>
                <label>仓库：</label>
                <div>
                    <ChangKuOption v-model="shaixuan.roomid_lable"></ChangKuOption>
                </div>
            </div>
            <div>
                <label>出入库：</label>
                <div>
                    <el-select v-model="shaixuan.roomtype" filterable placeholder="请选择" size="mini">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="出库" value="0"></el-option>
                        <el-option label="入库" value="1"></el-option>
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
                    <el-table-column label="单子编号"  prop="number"></el-table-column>
                    <el-table-column label="出入库时间" prop="inroomtime"></el-table-column>
                    <el-table-column label="操作人" prop="opreationPeople"></el-table-column>
                    <el-table-column label="仓库id" prop="roomid"></el-table-column>
                    <el-table-column label="类型" prop="roomtype" ></el-table-column>
                    <el-table-column label="状态" prop="status" :formatter="matter_status"></el-table-column>
                </el-table>
            </template>   
        </div>
        <!-- 分页 -->
        <div class="block" style="height:32px">
            <el-pagination
            style="height:50px"
              @size-change="handleSizeChange($event,'/api/HaoCai/keshiinroom',{deid:shaixuan.deid})"
              @current-change="handleCurrentChange($event,'/api/HaoCai/keshiinroom',{deid:shaixuan.deid})"
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
                isSearch:false,
                searchAPI:'api/search/haocaiinroom',
                shaixuan:{
                    IndexPage:'1',
                    PageSize:"10",
                    number:'',
                    opreation_people:'',
                    roomid:'',
                    roomtype:'',
                    status:'',
                    deid:'',
                    peopleid:'',
                    opreation_people_lable:'',
                    roomid_lable:''
                },
                currentPage:1,
                pagesize:10,
                totalpage:0,
                tableData:[],
            }
        },
        mounted(){
            this.myInit('api/HaoCai/keshiinroom',{IndexPage:1,PageSize:10,deid:this.shaixuan.deid})
        },
        components:{
            KeShiTypeOption,ChangKuOption,UserOption
        },
        methods:{
            myInit,
            newInit_return,
            handleSizeChange,
            handleCurrentChange,
            goSearch(){
                console.log(this.shaixuan)
                if(this.shaixuan.opreation_people_lable!=""){
                    this.shaixuan.opreation_people=this.shaixuan.opreation_people_lable.split('-*-')[1]
                }
                if(this.shaixuan.roomid_lable!=""){
                    this.shaixuan.roomid=this.shaixuan.roomid_lable.split('-*-')[0]
                }
                this.newInit_return(this.searchAPI,this.shaixuan).then(res=>{
                    console.log(res)
                    this.tableData=res.data.results
                    this.totalpage=res.data.totalpage
                    this.isSearch=true
                })
            },
            myReset(){
                this.myInit('api/HaoCai/keshiinroom',{IndexPage:1,PageSize:10,deid:this.shaixuan.deid})
                this.isSearch=false
                for(var key in this.shaixuan){
                    if(key!='IndexPage'||key!='PageSize'){
                        this.shaixuan[key]=""
                    }
                }
            },
            matter_status(row){
                if(row.status==0){
                    return '待审批'
                }else if(row.status==1){
                    return '通过'
                }else if(row.status==2){
                    return '拒绝'
                }
            }
        }
    }
</script>
<style scoped>

</style>