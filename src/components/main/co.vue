<template>
    <div>
        <div class="pageHead">
            <span>券商列表</span>
            <el-tooltip class="item" effect="dark" content="搜索" placement="bottom-end">
              <el-button size="mini" @click="searchBoxShow = true" type="primary" icon="el-icon-search"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="添加" placement="bottom-end">
              <el-button size="mini" @click="myAdd('co_add')"  type="success" icon="el-icon-plus"></el-button>
            </el-tooltip>
            <el-tooltip class="item"  effect="dark" content="初始化页面" placement="bottom-end">
              <el-button size="mini" v-if="isSearch" type='info' icon="el-icon-refresh"  @click="myInit('init_test',{IndexPage:1,PageSize:10})"></el-button>
            </el-tooltip>
        </div>
        <div>
        <el-table
    :data="tableData"
    style="width: 100%;">
    <el-table-column
      label="券商ID"
      width="180"
      prop="q_Id"
      >
    </el-table-column>
    <el-table-column
      label="券商名称"
      width="180"
      prop="name"
      >
    </el-table-column>
    <el-table-column
      label="IP/端口"
      width="180"
      >
      <template slot-scope="scope">
        <span >{{ scope.row.ip+':'+scope.row.port }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="客户端版本"
      width="180"
      prop="clientVersion"
      >
    </el-table-column>
    <el-table-column
      label="创建时间"
      width="180"
      prop="createtime"
      >
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="myEdit(scope.row,'co_edit')">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="myDelete(scope.$index, '券商'+scope.row.name,{Coid:scope.row.id},'api/Bond/DeleteCo','api/Bond/ShowCo')">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
        </div>
        <div class="block" style="height:32px">
            <el-pagination
            style="height:50px"
              @size-change="handleSizeChange($event,'api/Bond/ShowCo')"
              @current-change="handleCurrentChange($event,'api/Bond/ShowCo')"
              :current-page="currentPage"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalpage">
            </el-pagination>
        </div>
        <el-dialog class="myDialog" title="用户搜索" :visible.sync="searchBoxShow">
            <el-form :model="searchData">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                  <el-input v-model="searchData.name" size="mini" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="searchBoxShow = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="mySearch('api/People/ShowPeople',searchData)">确 定</el-button>
            </div>
        </el-dialog>
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
        searchBoxShow: false,
        isSearch:false,
        searchData: {
          name: ''
        },
        formLabelWidth: '120px',  
        tableData: []
      }
    },
    mounted(){
      this.myInit('api/Bond/ShowCo',{IndexPage:"1",PageSize:"10"})

      

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
