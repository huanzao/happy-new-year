<template>
  <div>
      <!-- 页头 -->
        <div class="pageHead">
            <span>科室管理</span>
            <el-button size="mini" @click="myAdd('user_add')"  type="primary">批量导入</el-button>
            <el-button size="mini" @click="myAdd('user_add')"  type="primary">批量导出</el-button>
            <el-button size="mini" @click="addKeshi('first',null)"  type="primary">添加一级科室</el-button>
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
                    <el-table-column label="科室编号"  prop="id"></el-table-column>
                    <el-table-column  label="科室名称" prop="name"></el-table-column>
                    <el-table-column label="座机" prop="tel"></el-table-column>
                    <el-table-column label="状态" prop="state"></el-table-column>
                    <el-table-column label="操作" width="180">
                        <template slot-scope="scope">
                            <el-link type="primary" @click="myEditKS('first',scope.row,scope.$index)">编辑</el-link>
                            <el-link type="primary" @click="myStop(scope.row,scope.$index)">{{scope.row.state==0?'停用':'启用'}}</el-link>
                            <el-link type="primary" @click="addKeshi('second',scope.row)">添加子科室</el-link>
                        </template>
                    </el-table-column>
                </el-table>
            </template>   
        </div>
        <!-- 分页 -->
        <div class="block" style="height:32px">
            <el-pagination
            style="height:50px"
              @size-change="handleSizeChange($event,'api/People/ShowPeople')"
              @current-change="handleCurrentChange($event,'api/People/ShowPeople')"
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
import {addUpload,myInit,myDelete,myEdit,myAdd,mySearch,handleSizeChange,handleCurrentChange} from '../../../../assets/comon'
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

        },
        methods:{
            handleSizeChange,
            handleCurrentChange
        }
    }
</script>
<style scoped>

</style>