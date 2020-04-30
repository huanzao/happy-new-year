<template>
  <div>
      <!-- 页头 -->
        <div class="pageHead">
            <span>科室计划审批</span>
        </div>
        <!-- 筛选 -->
        <div class="shaixuan">
            <div>
                <label>科室名称：</label>
                <div>
                    <el-input placeholder="请输入内容" prefix-icon="el-icon-search" size="mini" v-model="shaixuan.name"></el-input>
                </div>
            </div>
            <div>
                <label>科室类别：</label>
                <div>
                    <el-select v-model="shaixuan.type" filterable placeholder="请选择" size="mini">
                    <el-option
                        v-for="item in 20"
                        :key="item"
                        :label="item"
                        :value="item">
                        </el-option>
                    </el-select> 
                </div>
            </div>
            <div>
                <el-button size="mini"><i class="el-icon-aim"></i> 筛选</el-button>
            </div>
        </div>
        <!-- 主体表格 -->
        <div>
            <template>
                <el-table  :data="tableData" style="width: 100%">
                    <el-table-column label="申请日期"  prop="applyDate"></el-table-column>
                    <el-table-column  label="申请科室" prop="applyDepartment"></el-table-column>
                    <el-table-column label="申请人" prop="applyPeople"></el-table-column>
                    <el-table-column label="总数量" prop="totalCount"></el-table-column>
                    <el-table-column label="总金额" prop="totalPrice"></el-table-column>
                    <el-table-column label="状态" prop="status" :formatter="myStatus"></el-table-column>
                    <el-table-column label="操作" width="180">
                        <template slot-scope="scope">
                            <el-link type="primary" @click="pass(scope.row,scope.$index)">审批</el-link>
                        </template>
                    </el-table-column>
                </el-table>
            </template>   
        </div>
        <!-- 分页 -->
        <div class="block" style="height:32px">
            <el-pagination
            style="height:50px"
              @size-change="handleSizeChange($event,'api/hcplan/showplan')"
              @current-change="handleCurrentChange($event,'api/hcplan/showplan')"
              :current-page="currentPage"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalpage">
            </el-pagination>
        </div>
        <!-- 弹框--处理 -->
        <el-dialog class="myDialog" title="审批操作" :visible.sync="dialogFormVisible">
            <el-form :model="form" label-width="120px">
                <el-form-item label="请选择" >
                    <el-select v-model="myWitch"  size="mini">
                        <el-option v-for="(item,index) in statusArr" :key="index" :label="item" :value="index"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="up_pass">确 定</el-button>
            </div>
        </el-dialog>
  </div>
</template>
<script>
import {addUpload,myInit,myDelete,myEdit,myAdd,mySearch,handleSizeChange,handleCurrentChange} from '../../../assets/comon'
import {newInit_return} from '../../../assets/newAxios'        
    export default {
        data(){
            return{
                myIndex:'',
                currentPage:1,
                pagesize:10,
                totalpage:0,
                shaixuan:{
                    name:'',
                    type:'',
                },
                myWitch:'',
                tableData:[],
                dialogFormVisible:false,
                statusArr:['待审批','通过','拒绝'],
                form:{
                    planid:'',
                    status:'',
                },
                
            }
        },
        mounted(){
            this.newInit_return('api/hcplan/showplan',{IndexPage:1,PageSize:10}).then(res=>{
                console.log(res)
                this.tableData=res.data.result
            })
        },
        watch:{
            myWitch:function(value){
                this.form.status=value
            }
        },
        methods:{
            newInit_return,
            handleSizeChange,
            handleCurrentChange,
            pass(row,index){
                this.myIndex=index
                this.dialogFormVisible=true
                console.log(row)
                this.form.planid=row.id
                this.form.status=row.status
                this.myWitch=row.status
                switch (row.status) {
                    case '0':
                        return this.myWitch='待审批'
                        break;
                    case '1':
                        return this.myWitch='已通过'
                        break;    
                    case '2':
                        return this.myWitch='已拒绝'
                        break;
                    default:
                        break;
                }

            },
            up_pass(){
                if(this.form.status===""){
                    this.$message.warning('请选择状态')
                }else{
                    this.newInit_return('api/hcplan/changestatus',this.form).then(res=>{
                        this.$message.success('修改成功')
                        this.tableData[this.myIndex].status=this.form.status.toString()
                        this.dialogFormVisible=false
                    })
                }
            },
            myStatus(row){
                switch (row.status) {
                    case '0':
                        return '待审批'
                        break;
                    case '1':
                        return '已通过'
                        break;    
                    case '2':
                        return '已拒绝'
                        break;
                    default:
                        break;
                }
            }
        }
    }
</script>
<style scoped>

</style>