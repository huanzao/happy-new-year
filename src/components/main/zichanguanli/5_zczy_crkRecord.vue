<template>
  <div>
      <!-- 页头 -->
        <div class="pageHead">
            <span>资产转移审批列表</span>
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
                <label>类型：</label>
                <div>
                    <el-select v-model="shaixuan.move_type" size="mini" placeholder="请选择">
                        <el-option label="全部类型" value=""></el-option>
                        <el-option label="仓库间转移" value="0"></el-option>
                        <el-option label="科室间转移" value="1"></el-option>
                    </el-select>
                </div>
            </div>
            <div>
                <label>状态：</label>
                <div>
                    <el-select v-model="shaixuan.status" size="mini" placeholder="请选择">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="待审批" value="0"></el-option>
                        <el-option label="已通过" value="1"></el-option>
                        <el-option label="已拒绝" value="1"></el-option>
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
                    <el-table-column label="耗材编号"  prop="his.number"></el-table-column>
                    <el-table-column label="时间" prop="his.movetime"></el-table-column>
                    <el-table-column label="类型" prop="his.moveType" :formatter="roomType_formatter"></el-table-column>
                    <el-table-column label="申请人" prop="his.peoplename"></el-table-column>
                    <el-table-column label="状态" prop="his.status" :formatter="status_formatter"></el-table-column>
                    <el-table-column label="操作" width="180">
                        <template slot-scope="scope">
                            <el-link type="primary" @click="showDetail(scope.row,scope.$index)">详情</el-link>
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
              @size-change="handleSizeChange($event,'api/movedevice/history',{deid:shaixuan.movetype})"
              @current-change="handleCurrentChange($event,'api/movedevice/history',{deid:shaixuan.movetype})"
              :current-page="currentPage"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalpage">
            </el-pagination>
        </div>
        <!-- 抽屉--详情 -->
        <el-drawer title="详情"  style="overflow-y: scroll;" :visible.sync="drawer_detail" size='30%'  direction="rtl" >
            <el-table   :data="detail_Arr" style="width: 100%">
                <el-table-column label="详情编号"  prop="detail.number"></el-table-column>
                <el-table-column label="人员" prop="detail.people"></el-table-column>
                <el-table-column label="科室" prop="detail.department"></el-table-column>
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
export default {
        data(){
            return{
                myFy_total:0,
                myFy_page:1,
                todo_row:'',
                todo_index:'',
                currentPage:1,
                pagesize:10,
                totalpage:0,
                dialog_sp:false,
                drawer_detail:false,
                detail_Arr:[],
                gloabIndex:'',
                isSearch:false,
                searchAPI:'api/search/devicemove',
                shaixuan:{
                    IndexPage:'1',
                    PageSize:'10',
                    number:'',
                    status:'',
                    opreationpeople:'',
                    peopleid:'',
                    deid:'',
                    move_type:'',
                    oldroomeid:'',
                    newroomid:'',
                    old_deid:'',
                    new_deid:'',
                },
                form_sp:{
                    number:"",
                    type_lable:"",
                    status:"",
                    inroomid:"",
                    movetype:"",
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
            this.myInit('api/movedevice/history',{IndexPage:1,PageSize:10,movetype:""})
        },
        components:{
            KeShiTypeOption
        },
        methods:{
            myInit,
            newInit_return,
            handleSizeChange,
            handleCurrentChange,
            myReset(){
                this.myInit('api/movedevice/history',{IndexPage:1,PageSize:10,movetype:""})
                this.isSearch=false
                for(var key in this.shaixuan){
                    if(key=='IndexPage'||key=='pagesize '){
                    }else{
                       this.shaixuan[key]="" 
                    }
                }
                console.log(this.shaixuan)
            },
            goSearch(){
                this.newInit_return(this.searchAPI,this.shaixuan).then(res=>{
                    console.log(res)
                    if(res.data.results!=""){
                        this.tableData=res.data.results
                    }else{
                        this.tableData=[]
                    }
                    this.totalpage=res.data.totalpage
                })
                this.isSearch=true
            },
            roomType_formatter(row){
                if(row.his.moveType*1==0){
                    return '仓库间转移'
                }else if(row.his.moveType*1==1){
                    return '科室间转移'
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
                this.form_sp.number=row.his.number
                if(row.his.moveType*1==0){
                    this.form_sp.type_lable='仓库间转移'
                }else if(row.his.moveType*1==1){
                    this.form_sp.type_lable='科室间转移'
                }
                this.form_sp.movetype=row.his.moveType
                this.form_sp.inroomid=row.his.id
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.newInit_return('api/movedevice/shenpi',this.form_sp).then(res=>{
                        console.log(999,res)
                        if(res.data.response==='success'){
                            this.dialog_sp=false
                            this.$message.success(res.data.result)
                            if(res.data.result==="拒绝成功"){
                                this.tableData[this.gloabIndex].his.status=2
                            }else{
                                this.tableData[this.gloabIndex].his.status=1
                            }
                        }
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
                this.newInit_return('api/movedevice/detail',
                    {IndexPage:1,PageSize:10,inroomid:row.his.id,rommtype:''}
                ).then(res=>{
                    console.log(res)
                    if(res.data.response=='success'&&res.data.result.length!=0){
                        this.detail_Arr=res.data.result
                        this.myFy_total=res.data.totalpage
                        this.drawer_detail =true
                    }else{
                        this.$message('暂无详情数据')
                    }
                })
            },
            myFy_change(){
                this.newInit_return('api/device/inroomhis',
                    {IndexPage:this.myFy_page,PageSize:10,inroomid:this.todo_row.his.id,rommtype:''}
                ).then(res=>{
                    console.log(res)
                    if(res.data.response=='success'){
                        this.detail_Arr=res.data.result
                        this.myFy_total=res.data.totalpage
                        this.drawer_detail =true
                    }else{
                        this.$message('网络错误')
                    }
                }).catch(err=>{
                    this.$message.warning(err)
                })
            }
        }
    }
</script>
<style scoped>

</style>