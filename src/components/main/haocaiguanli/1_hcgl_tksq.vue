<template>
  <div>
      <!-- 页头 -->
        <div class="pageHead">
            <span>退库申请</span>
        </div>
        <!-- 筛选 -->
        <div class="shaixuan">
            <div>
                <label>科室名称：</label>
                <div>
                    <KeShiTypeOption v-model="deid" ></KeShiTypeOption>
                </div>
            </div>
            <div>
                <el-button size="mini" @click="saixuan"><i class="el-icon-aim"></i> 筛选</el-button>
            </div>
        </div>
        <!-- 主体表格 -->
        <div>
            <template>
                <el-table  :data="tableData" style="width: 100%">
                    <el-table-column label="编号"  prop="number"></el-table-column>
                    <el-table-column  label="时间" prop="inroomtime"></el-table-column>
                    <el-table-column label="申请人" prop="peoplename"></el-table-column>
                    <el-table-column label="状态" prop="status" :formatter="matter_status"></el-table-column>
                    <el-table-column label="操作" width="180">
                        <template slot-scope="scope">
                            <el-link v-if='scope.row.status==0' type="primary" @click="shenhe(scope.row,scope.$index)">审核</el-link>
                            <el-link type="primary" @click="detail(scope.row,scope.$index)">详情</el-link>
                        </template>
                    </el-table-column>
                </el-table>
            </template>   
        </div>
        <!-- 分页 -->
        <div class="block" style="height:32px">
            <el-pagination
            style="height:50px"
              @size-change="handleSizeChange($event,'api/HaoCai/showtuiku',{deid:deid})"
              @current-change="handleCurrentChange($event,'api/HaoCai/showtuiku',{deid:deid})"
              :current-page="currentPage"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalpage">
            </el-pagination>
        </div>
        <!-- 退库申请详情 -->
        <el-drawer title="退库详情"  style="overflow-y: scroll;" :visible.sync="drawer" size='30%'  direction="rtl" >
            <el-table  :data="detailArr" style="width: 100%">
                <el-table-column label="耗材名称"  prop="name"></el-table-column>
                <el-table-column label="退款数量" prop="count"></el-table-column>
            </el-table>
        </el-drawer>
        <!-- 退库申请审批 -->
        <el-dialog class="myDialog" title="审批" :visible.sync="dialog_sp">
            <el-form :model="form_sp" ref="form_sp" :rules="rules"  label-width="150px">
                <el-form-item label="编号" >
                    <el-input size="mini" v-model="form_sp.number" autocomplete="off" :disabled="true"></el-input>
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
import {newInit_return} from '../../../assets/newAxios'
import KeShiTypeOption from '../Child/KeShiTypeOption'
    export default {
        data(){
            return{
                currentPage:1,
                pagesize:10,
                totalpage:0,
                drawer:false,
                dialog_sp:false,
                deid:'',
                tableData:[],
                detailArr:[],
                form_sp:{
                    number:"",
                    inroomid:"",
                    status:''
                },
                rules: {
                    status:[
                        { required: true, message: '请选择', trigger: 'blur' },
                    ]
                }
            }
        },
        components:{
            KeShiTypeOption
        },
        mounted(){
            this.myInit('api/HaoCai/showtuiku',{IndexPage:1,pagesize:10})
        },
        methods:{
            myInit,
            newInit_return,
            handleSizeChange,
            handleCurrentChange,
            saixuan(){
                this.myInit('api/HaoCai/showtuiku',{IndexPage:1,pagesize:10,deid:this.deid})
            },
            shenhe(row,index){
                this.dialog_sp=true
                this.form_sp.inroomid=row.id
                this.form_sp.number=row.number
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.newInit_return('api/HaoCai/tuikushenpi',this.form_sp).then(res=>{
                        console.log(res)
                        if(res.data.response==='success'){
                            this.dialog_sp=false
                            this.$message.success(res.data.result)
                            this.myInit('api/HaoCai/showtuiku',{IndexPage:this.currentPage,pagesize:this.pagesize})
                        }
                    })
                } else {
                    return false;
                }
                });
            },
            detail(row,index){
                this.newInit_return('api/HaoCai/showtuikudetail',{IndexPage:1,PageSize:100,tuikuid:row.id}).then(res=>{
                    console.log(res)
                    if(res.data.result.length!=0){
                        this.drawer=true
                        this.detailArr=res.data.result
                    }else{
                        this.$message.warning('暂无详情数据')
                    }
                })
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