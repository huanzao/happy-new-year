<template>
    <div>
        <div class="pageHead">
            <span>选股</span>
            <el-tooltip class="item" effect="dark" content="搜索" placement="bottom-end">
              <el-button size="mini" @click="searchBoxShow = true" type="primary" icon="el-icon-search"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="添加" placement="bottom-end">
              <el-button size="mini" @click="myAdd('shares_add')"  type="success" icon="el-icon-plus"></el-button>
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
      label="TS代码"
      prop="tsCode"
      width="100"
      >
    </el-table-column>
    <el-table-column
      label="股票代码"
      prop="symbol"
      >
    </el-table-column>
    <el-table-column
      label="股票名称"
      prop="name"
      >
    </el-table-column>
    <el-table-column
      label="所在地域"
      prop="area"
      >
    </el-table-column>
    <el-table-column
      label="所属行业"
      prop="industry"
      >
    </el-table-column>
    <el-table-column
      label="股票全称"
      width="200"
      prop="fullname"
      >
    </el-table-column>
    <el-table-column
      label="英文全称"
      width="250"
      prop="enname"
      >
    </el-table-column>
    <el-table-column
      label="市场类型"
      prop="market"
      >
    </el-table-column>
    <el-table-column
      label="交易所代码"
      prop="exchange"
      width="100"
      :formatter="jiaoyisuo"
      >
    </el-table-column>
    <el-table-column
      label="交易货币"
      prop="currType"
      >
    </el-table-column>
    <el-table-column
      label="上市状态"
      prop="listStatus"
      :formatter="shangshiStatus"
      >
    </el-table-column>
    <el-table-column
      label="上市日期"
      prop="listDate"
      width="100"
      >
    </el-table-column>
    <el-table-column
      label="退市日期"
      prop="delistDate"
      >
    </el-table-column>
    <el-table-column
      label="是否沪深港通标"
      prop="isHs"
      width="160"
      :formatter="isTongbiao"
      >
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="myDelete(scope.$index,'股票-'+scope.row.name,{stockId:scope.row.id},'api/Stock/DeleteDealStock','api/Stock/ShowDealStock')">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
        </div>
        <div class="block" style="height:32px">
            <el-pagination
            style="height:50px"
              @size-change="handleSizeChange($event,'api/stock/ShowDealStock')"
              @current-change="handleCurrentChange($event,'api/stock/ShowDealStock')"
              :current-page="currentPage"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalpage">
            </el-pagination>
        </div>
        <el-dialog class="myDialog" title="搜索" :visible.sync="searchBoxShow">
            <el-form :model="searchData">
                <el-form-item label="NAME" :label-width="formLabelWidth">
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
      this.myInit('api/Stock/ShowDealStock',{IndexPage:"1",PageSize:"10"})
    },
    methods:{
      myInit,
      myDelete,  
      myEdit,
      myAdd,
      mySearch,
      handleSizeChange,
      handleCurrentChange,
      shangshiStatus(row, column){
          if(row.listStatus=='L'){
              return '上市'
          }else if(row.listStatus=='D'){
              return '退市'
          }else if(row.listStatus=='P'){
              return '暂停上市'
          }
      },
      isTongbiao(row, column){
          if(row.isHs=='N'){
              return '否'
          }else if(row.isHs=='H'){
              return '沪股通'
          }else if(row.isHs=='S'){
              return '深股同'
          }
      },
      jiaoyisuo(row, column){
          if(row.exchange=='SSE'){
              return '上交所'
          }else if(row.exchange=='SZSE'){
              return '深交所'
          }else if(row.exchange=='HKEX'){
              return '港交所(未上线)'
          }
      },
      filter_time(role){
          var time=new Date(role.addtime)
          console.log(role.addtime)
          var yue=time.getMonth()+1
          var _time=`${time.getFullYear()}-${yue}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
          return _time
      }
    }
  }
</script>
<style >
  
</style>
