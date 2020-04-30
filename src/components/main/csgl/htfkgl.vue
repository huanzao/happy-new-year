<template>
  <div>
      <!-- 页头 -->
        <div class="pageHead">
            <span>合同付款管理</span>
            <el-button size="mini" type="primary">付款</el-button>
            <el-button size="mini" type="primary">导出</el-button>
        </div>
        <!-- 筛选 -->
        <div class="shaixuan">
            <div>
                <label>乙方单位：</label>
                <div>
                    <el-select v-model="shaixuan.type" filterable placeholder="请选择" size="mini">
                        <el-option v-for="item in 20" :key="item" :label="item" :value="item"> </el-option>
                    </el-select> 
                </div>
            </div>
            <div>
                <label>合同名称：</label>
                <div>
                    <el-select v-model="shaixuan.type" filterable placeholder="请选择" size="mini">
                        <el-option v-for="item in 20" :key="item" :label="item" :value="item"> </el-option>
                    </el-select> 
                </div>
            </div>
            <div>
                <label>状态：</label>
                <div>
                    <el-select v-model="shaixuan.type" filterable placeholder="请选择" size="mini">
                        <el-option v-for="item in 20" :key="item" :label="item" :value="item"> </el-option>
                    </el-select> 
                </div>
            </div>
            <div>
                <label>计划付款日期：</label>
                <div>
                    <el-date-picker v-model="shaixuan.type" value-format="yyyy-MM-dd" size="mini" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker> 
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
                    <el-table-column label="计划付款日期"  prop="qdData"></el-table-column>
                    <el-table-column  label="乙方单位" prop="yifangUnit"></el-table-column>
                    <el-table-column label="合同编号" prop="number"></el-table-column>
                    <el-table-column label="期数" prop="state"></el-table-column>
                    <el-table-column label="金额" prop="price"></el-table-column>
                    <el-table-column label="状态">
                        <template slot-scope="scope">
                              <el-link type="primary" @click="myStop(scope.row,scope.$index)">{{scope.row.state==0?'已付款':'未付款'}}</el-link>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="180">
                        <template slot-scope="scope">
                            <el-link type="primary" @click="myEdit(scope.row,'addht','edit')">编辑</el-link>
                            <el-link type="primary"  @click="myDelete(scope.$index, '合同'+scope.row.name,{agreementId:scope.row.id},'api/agreement/Delete','api/agreement/Show')">删除</el-link>                       
                        </template>
                    </el-table-column>
                </el-table>
            </template>   
        </div>
        <!-- 分页 -->
        <div class="block" style="height:32px">
            <el-pagination
            style="height:50px"
              @size-change="handleSizeChange($event,'api/agreement/Show',{},'results_papers')"
              @current-change="handleCurrentChange($event,'api/agreement/Show',{},'results_papers')"
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
import {newInit,newInit_return} from '../../../assets/newAxios'
    export default {
        data(){
            return{
                currentPage:1,
                pagesize:10,
                totalpage:0,
                shaixuan:{
                    name:'',
                    type:'',
                },
                tableData:[]
            }
        },
        mounted(){
            this.newInit_return('api/agreement/Show',{IndexPage:"1",PageSize:"10"}).then(res=>{
                console.log(res)
                this.tableData=res.data.results_papers
            })
        },
        methods:{
            newInit_return,
            myEdit,
            myDelete,
            handleSizeChange,
            handleCurrentChange,
            myStop(){
                this.$message('马云爸爸我没钱')
            }
        }
    }
</script>
<style scoped>

</style>