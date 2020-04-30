<template>
  <div>
      <!-- 页头 -->
        <div class="pageHead">
            <span>出入库审批列表</span>
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
                    <el-table-column label="耗材编号"  prop="inroom.number"></el-table-column>
                    <el-table-column  label="时间" prop="inroom.inroomtime"></el-table-column>
                    <el-table-column label="类型" prop="inroom.roomtype" :formatter="cr_type"></el-table-column>
                    <el-table-column label="申请人" prop="inroom.peoplename"></el-table-column>
                    <el-table-column label="状态" prop="inroom.status" :formatter="myStatus"></el-table-column>
                    <el-table-column label="操作" width="180">
                        <template slot-scope="scope">
                            <el-link type="primary" @click="showDetail(scope.row,scope.$index)">详情</el-link>
                            <el-link type="primary" v-if='scope.row.inroom.status==0' @click="sh(scope.row,scope.$index)">审核</el-link>
                        </template>
                    </el-table-column>
                </el-table>
                
            </template>   
        </div>
        <!-- 分页 -->
        <div class="block" style="height:32px">
            <el-pagination
            style="height:50px"
              @size-change="handleSizeChange($event,'api/HaoCai/inroomhis',{planid:shaixuan.plan})"
              @current-change="handleCurrentChange($event,'api/HaoCai/inroomhis',{planid:shaixuan.plan})"
              :current-page="currentPage"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalpage">
            </el-pagination>
        </div>
        <!-- 抽屉--详情 -->
        <el-drawer title="详情"  style="overflow-y: scroll;" :visible.sync="drawer_detail" size='30%'  direction="rtl" >
            <el-form  label-width="120px" class="demo-ruleForm" :model="detail_OBJ" >
                <el-row>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="耗材编号:"> 
                                <span>{{detail_OBJ.number}}</span>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="耗材名称:"> 
                                <span>{{detail_OBJ.name}}</span>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="耗材种类:"> 
                                <span>{{detail_OBJ.kind}}</span>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="品牌:"> 
                                <span>{{detail_OBJ.brand}}</span>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="规格型号:"> 
                                <span>{{detail_OBJ.model}}</span>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="厂家:"> 
                                <span>{{detail_OBJ.factory}}</span>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="入库单价:"> 
                                <span>{{detail_OBJ.inroomPrice}}</span>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="数量:"> 
                                <span>{{detail_OBJ.count}}</span>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="单位:"> 
                                <span>{{detail_OBJ.unit}}</span>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="包装规格:"> 
                                <span>{{detail_OBJ.packpage}}</span>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
            </el-form>


            <!-- <el-table  :data="detail_Arr" style="width: 100%">
                    <el-table-column label="编号"  prop="detail.id"></el-table-column>
                    <el-table-column label="耗材名称" prop="detail.name"></el-table-column>
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
                </el-table> -->
        </el-drawer>
        <!-- 审批操作 -->
        <el-dialog class="myDialog" title="审批" :visible.sync="dialog_sp">
            <el-form :model="form_sp" ref="form_sp" :rules="rules"  label-width="150px">
                <el-form-item label="编号" >
                    <el-input size="mini" v-model="form_sp.bianhao" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="类型" >
                    <el-input size="mini" v-model="form_sp.roomtype_lable" autocomplete="off" :disabled="true"></el-input>
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
                dialog_sp:false,
                todo_index:'',
                drawer_detail:false,
                detail_OBJ:{},
                form_sp:{
                    hisid:'',
                    status:"",
                    inroomid:"",
                    roomtype:"",
                    roomtype_lable:"",
                    bianhao:''
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
            this.myInit('api/HaoCai/inroomhis',{IndexPage:1,PageSize:10,planid:this.shaixuan.plan})
        },
        components:{
            ChangKuOption,UserOption
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
                this.myInit('api/HaoCai/inroomhis',{IndexPage:1,PageSize:10,planid:this.shaixuan.plan})
                this.isSearch=false
                for(var key in this.shaixuan){
                    if(key!='IndexPage'||key!='PageSize'){
                        this.shaixuan[key]=""
                    }
                }
            },
            cr_type(row){
                if(row.inroom.roomtype==1){
                    return '入库'
                }else if(row.inroom.roomtype==0){
                    return '出库'
                }else{
                    return 'nan'
                }
            },
            sh(row,index){
                console.log(row)
                this.todo_index=index
                this.dialog_sp=true
                this.form_sp.inroomid=row.inroom.id
                // this.form_sp.hisid=row.inroom.id
                if(row.inroom.roomtype==1){
                    this.form_sp.roomtype_lable='出库'
                }else{
                    this.form_sp.roomtype_lable='出库'
                }
                this.form_sp.roomtype=row.inroom.roomtype
                this.form_sp.bianhao=row.inroom.number
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.newInit_return('api/HaoCai/haocaishenpi',this.form_sp).then(res=>{
                        console.log(res)
                        if(res.data.response==='success'){
                            this.dialog_sp=false
                            this.$message.success(res.data.result)
                            if(this.form_sp.status==1){
                                this.tableData[this.todo_index].inroom.status=1
                            }else{
                                this.tableData[this.todo_index].inroom.status=2
                            }
                        }else{
                            this.$message.warning(res.data.result)
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            },
            showDetail(row,index){
                this.newInit_return('api/HaoCai/inroomdetail',
                    {IndexPage:1,PageSize:10,inroomid:row.inroom.id,rommtype:''}
                ).then(res=>{
                    console.log(res)
                    if(res.data.response=='success'&&res.data.result.length!=0){
                        this.detail_OBJ=res.data.result[0].detail
                        this.drawer_detail =true
                    }else{
                        this.$message.warning('暂无详情数据')
                    }
                })
            },
            myStatus(row){
                if(row.inroom.status*1===0){
                    return '待审核'
                }else if(row.inroom.status*1===1){
                    return '已通过'
                }else{
                    return '已拒绝'
                }
            }
        }
    }
</script>
<style scoped>

</style>