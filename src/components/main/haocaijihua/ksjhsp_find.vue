<template>
  <div>
      <!-- 页头 -->
        <div class="pageHead">
            <span>科室计划审批查询</span>
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
                <label>审核状态：</label>
                <div>
                    <el-select v-model="shaixuan.type" filterable placeholder="请选择" size="mini">
                    <el-option v-for="item in 20"
                        :key="item"
                        :label="item"
                        :value="item">
                        </el-option>
                    </el-select> 
                </div>
            </div>
            <div>
                <label>申请日期：</label>
                <div>
                    <el-date-picker v-model="shaixuan.day" type="daterange"
                        size="mini"
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
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
                    <el-table-column label="申请日期"  prop="applyDate"></el-table-column>
                    <el-table-column label="申请科室" prop="applyDepartment"></el-table-column>
                    <el-table-column label="申请人" prop="applyPeople"></el-table-column>
                    <el-table-column label="申请量" prop="totalCount"></el-table-column>
                    <el-table-column label="总金额" prop="totalPrice"></el-table-column>
                    <el-table-column label="状态" prop="status"></el-table-column>
                    <el-table-column label="操作" width="180">
                        <template slot-scope="scope">
                            <el-link type="primary" @click="myDetail(scope.row,scope.$index)">详情</el-link>
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
        <!-- 详情--抽屉 -->
        <el-drawer :title="drawer_title" :visible.sync="drawer" size='50%'  >
            <div style="padding:10px">
                <el-table  :data="detail_Data" style="width: 100%">
                    <el-table-column label="耗材编号" prop="number"></el-table-column>
                    <el-table-column label="耗材名称" prop="name" width="120"></el-table-column>
                    <el-table-column label="规格型号" prop="model"></el-table-column>
                    <el-table-column label="包装规格" prop="totalCount"></el-table-column>
                    <el-table-column label="生产厂家" prop="factory"></el-table-column>
                    <el-table-column label="单位" prop="unit"></el-table-column>
                    <el-table-column label="单价" prop="inroomPrice"></el-table-column>
                    <el-table-column label="计划数" prop="jhCount"></el-table-column>
                    <el-table-column label="金额" :formatter='totalMany'></el-table-column>
                </el-table>
            </div>
        </el-drawer>
  </div>
</template>
<script>
import {addUpload,myInit,myDelete,myEdit,myAdd,mySearch,handleSizeChange,handleCurrentChange} from '../../../assets/comon'
import {newInit_return} from '../../../assets/newAxios'        
    export default {
        data(){
            return{
                drawer:false,
                drawer_title:'',
                currentPage:1,
                pagesize:10,
                totalpage:0,
                shaixuan:{
                    name:'',
                    type:'',
                    day:''
                },
                tableData:[],
                detail_Data:[]
            }
        },
        mounted(){
            this.newInit_return('api/hcplan/showplan',{IndexPage:1,PageSize:10}).then(res=>{
                console.log(res)
                this.tableData=res.data.result
            })
        },
        methods:{
            newInit_return,
            handleSizeChange,
            handleCurrentChange,
            myDetail(row,index){
                this.newInit_return('api/hcplan/showplandetail',{IndexPage:1,PageSize:10,planid:row.id}).then(res=>{
                    console.log(res)
                    if(res.data.result.length===0){
                        this.$message.warning('暂无数据')
                    }else{
                        this.drawer=true,
                        this.drawer_title='申请科室：'+row.applyDepartment
                        this.detail_Data=res.data.result
                    }
                })
            },
            totalMany(row){
                return (row.jhCount*1)*(row.inroomPrice*1)
            }
        }
    }
</script>
<style scoped>

</style>