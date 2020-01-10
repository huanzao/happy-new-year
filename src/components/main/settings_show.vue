<template>
    <div>
        <div class="pageHead">
            <span>展示配置</span>
            <el-tooltip class="item" effect="dark" content="添加" placement="bottom-end">
              <el-button size="mini" @click="myAdd('set_add')"  type="success" icon="el-icon-plus"></el-button>
            </el-tooltip>
        </div>
        <div>
        <el-table
    :data="tableData"
    style="width: 100%;">
        <el-table-column label="策略名称" width="180" prop="name"></el-table-column>
        <el-table-column label="买入时间" width="180" prop="howbuy"></el-table-column>
        <el-table-column label="卖出时间" width="180" prop="howsale"></el-table-column>
        <el-table-column label="备注" width="180" prop="bz"></el-table-column>
        <el-table-column label="操作">
        <template slot-scope="scope">
            <el-button size="mini" @click="myEdit(scope.row,'set_edit')">编辑</el-button>
            <el-button size="mini" type="danger" @click="myDelete(scope.$index,'策略-'+scope.row.name,{se_id:scope.row.id},'api/Settings/Delete','api/Settings/Show')">删除</el-button>
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
        searchData: {
          name: '',
          region: ''
        },
        formLabelWidth: '120px',  
        tableData: [
            {id:1,name:'第一方案',howbuy:'09:20:11',howsale:"09:25:11",bz:'恭喜发财11'},
            {id:2,name:'第二方案',howbuy:'09:20:22',howsale:"09:25:22",bz:'恭喜发财222'},
            {id:3,name:'第三方案',howbuy:'09:20:33',howsale:"09:25:33",bz:'恭喜发财333'},
            {id:4,name:'第四方案',howbuy:'09:20:44',howsale:"09:25:44",bz:'恭喜发财4444'}
        ]
      }
    },
    mounted(){
    //   this.myInit('api/Settings/Show',{IndexPage:"1",PageSize:"10"})
    },
    methods:{
      myInit,
      myDelete,  
      myEdit,
      myAdd,
      handleSizeChange,
      handleCurrentChange
    }
  }
</script>
<style >
  
</style>
