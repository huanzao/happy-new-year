<template>
    <div>
        <div class="pageHead">
            <span>角色列表</span>
            <el-tooltip class="item" effect="dark" content="添加" placement="bottom-end">
              <el-button size="mini" @click="myAdd('role_add')"  type="success" icon="el-icon-plus"></el-button>
            </el-tooltip>
        </div>
    <div>
        <el-table :data="tableData" style="width: 100%;">
            <el-table-column label="角色名称" width="180" prop="rolename"></el-table-column>
          <el-table-column label="备注" width="180" prop="roleremark" ></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="myEdit(scope.row,'role_edit')">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="myDelete(scope.$index,'角色-'+scope.row.rolename,{RoleId:scope.row.id},'api/Role/DeleteRole','api/Role/ShowRole')">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
    </div>
        <div class="block" style="height:32px">
            <el-pagination
            style="height:50px"
              @size-change="handleSizeChange($event,'api/Role/ShowRole')"
              @current-change="handleCurrentChange($event,'api/Role/ShowRole')"
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
import {myInit,myDelete,myEdit,myAdd,mySearch,handleSizeChange,handleCurrentChange} from '../../assets/comon'
export default {
    data() {
      return {
        currentPage:1,
        pagesize:10,
        totalpage:0,
        isSearch:false,
        searchData: {
          name: '',
          region: ''
        },
        formLabelWidth: '120px',  
        tableData: []
      }
    },
    mounted(){
      this.myInit('api/Role/ShowRole',{IndexPage:"1",PageSize:"10"})
    },
    methods:{
      myInit,
      myDelete,  
      myEdit,
      myAdd,
      mySearch,
      handleSizeChange,
      handleCurrentChange
    }
  }
</script>
<style >
  
</style>
