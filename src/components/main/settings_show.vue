<template>
    <div>
        <div class="pageHead">
            <span>展示配置</span>
            <el-tooltip class="item" effect="dark" content="添加" placement="bottom-end">
              <el-button size="mini" @click="myAdd('set_add')"  type="success" icon="el-icon-plus"></el-button>
            </el-tooltip>
        </div>
        <div>
        <el-table :data="tableData" style="width: 100%;">
              <el-table-column label="策略名称" width="180" prop="seName"></el-table-column>
              <el-table-column label="买几价" width="180" prop="howbuy" :formatter='buy'></el-table-column>
              <el-table-column label="卖几价" width="180" prop="howsale" :formatter="sale"></el-table-column>
              <el-table-column label="备注" width="180" prop="bz"></el-table-column>
              <el-table-column label="操作">
              <template slot-scope="scope">
                  <el-button size="mini" @click="myEdit(scope.row,'set_edit')">编辑</el-button>
                  <el-button size="mini" type="danger" @click="myDelete(scope.$index,'策略-'+scope.row.seName,{se_id:scope.row.id},'api/Settings/Delete','api/Settings/Show')">删除</el-button>
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
        tableData: []
      }
    },
    mounted(){
        this.myInit('api/Settings/Show',{IndexPage:"1",PageSize:"10"})
    },
    methods:{
      myInit,
      myDelete,  
      myEdit,
      myAdd,
      handleSizeChange,
      handleCurrentChange,
      buy(row){
          if(row.howbuy==2){
            return '买一价'
          }else if(row.howbuy==3){
            return '买二价'
          }else if(row.howbuy==4){
            return '买三价'
          }else if(row.howbuy==5){
            return '买四价'
          }else if(row.howbuy==6){
            return '买五价'
          }
      },
      sale(row){
          if(row.howsale==2){
            return '卖一价'
          }else if(row.howsale==3){
            return '卖二价'
          }else if(row.howsale==4){
            return '卖三价'
          }else if(row.howsale==5){
            return '卖四价'
          }else if(row.howsale==6){
            return '卖五价'
          }
      }
    }
  }
</script>
<style >
  
</style>
