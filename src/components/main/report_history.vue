<template>
    <div>
        <div class="pageHead" style="padding-bottom:16px">
            <span>历史报表</span>  
            <p style='display:inline'>账号：</p>
            <el-select v-model="Account" size="mini" filterable style="width:180px">
                <el-option :label="item.name+'--'+item.ac_zj_Account" :value="item.ac_zj_Account" v-for="(item,key) in AccountList" :key='key'></el-option>
            </el-select>
            <p style='display:inline;padding-left:10px'>时间段：</p>
            <el-date-picker
                      v-model="searchlogs_time"
                      type="daterange"
                      size="mini"
                      range-separator="至"
                      start-placeholder="开始日期"
                      value-format='yyyyMMddHHmmss'
                      end-placeholder="结束日期">
                  </el-date-picker>
            <!-- <el-tooltip class="item"  effect="dark" content="刷新" placement="bottom-end">
                <el-button size="mini" type='success' icon="el-icon-refresh"  @click="myShuaxin()"></el-button>
            </el-tooltip> -->
        </div>
        <div style="padding:20px;background:#fff">
            <el-tabs v-model="activeName" @tab-click="handleClick" style="">
              <el-tab-pane label="历史资金查询数据" name="first">
                  <template>
                    <el-table :data="tableData" height="500" style="width: 100%">
                        <el-table-column prop="a" label="成交日期" width="100"></el-table-column>
                        <el-table-column prop="b" label="业务名称" width="100"></el-table-column>
                        <el-table-column prop="c" label="发生金额"></el-table-column>
                        <el-table-column prop="d" label="剩余金额"></el-table-column>
                        <el-table-column prop="e" label="证券名称"></el-table-column>
                        <el-table-column prop="f" label="成交价格"></el-table-column>
                        <el-table-column prop="g" label="成交数量"></el-table-column>
                        <el-table-column prop="h" label="剩余数量"></el-table-column>
                        <el-table-column prop="i" label="币种"></el-table-column>
                        <el-table-column prop="j" label="证券代码"></el-table-column>
                        <el-table-column prop="k" label="帐号类别"></el-table-column>
                        <el-table-column prop="l" label="股东代码" width="120"></el-table-column>
                        <el-table-column prop="m" label="资金帐号" width="120"></el-table-column>
                        <el-table-column prop="n" label="委托数量"></el-table-column>
                        <el-table-column prop="o" label="委托价格"></el-table-column>
                        <el-table-column prop="p" label="股份发生数" width="120"></el-table-column>
                        <el-table-column prop="q" label="手续费"></el-table-column>
                        <el-table-column prop="r" label="印花税"></el-table-column>
                        <el-table-column prop="s" label="过户费"></el-table-column>
                        <el-table-column prop="t" label="句柄" width="110"></el-table-column>
                        <el-table-column prop="u" label="保留信息"></el-table-column>
                    </el-table>
                    <div class="block" style="height:32px">
                        <el-pagination
                        style="height:50px"
                          @size-change="handleSizeChange($event,'api/People/ShowPeople')"
                          @current-change="handleCurrentChange($event,'api/People/ShowPeople')"
                          :current-page="currentPage1"
                          :page-sizes="[10, 20, 50, 100]"
                          :page-size="10"
                          layout="total, sizes, prev, pager, next, jumper"
                          :total="totalpage1">
                        </el-pagination>
                    </div>
                  </template>
              </el-tab-pane>
              <el-tab-pane label="历史持仓数据" name="second">
                  <template >
                    <el-table :data="table_chicang" height="500" style="width: 100%">
                        <el-table-column prop="a" label="证券代码"></el-table-column>
                        <el-table-column prop="b" label="证券名称"></el-table-column>
                        <el-table-column prop="c" label="证券数量"></el-table-column>
                        <el-table-column prop="d" label="库存数量"></el-table-column>
                        <el-table-column prop="e" label="可卖数量"></el-table-column>
                        <el-table-column prop="f" label="成本价"></el-table-column>
                        <el-table-column prop="g" label="盈亏成本价" width="120"></el-table-column>
                        <el-table-column prop="h" label="当前价"></el-table-column>
                        <el-table-column prop="i" label="最新市值"></el-table-column>
                        <el-table-column prop="j" label="浮动盈亏"></el-table-column>
                        <el-table-column prop="k" label="盈亏比例(%)" width="120"></el-table-column>
                        <el-table-column prop="l" label="股东代码"></el-table-column>
                        <el-table-column prop="m" label="帐号类别"></el-table-column>
                        <el-table-column prop="n" label="交易所代码" width="120"></el-table-column>
                        <el-table-column prop="o" label="资金帐号"></el-table-column>
                        <el-table-column prop="p" label="交易所名称" width="120"></el-table-column>
                        <el-table-column prop="q" label="句柄"></el-table-column>
                        <el-table-column prop="r" label="保留信息"></el-table-column>
                    </el-table>
                    <div class="block" style="height:32px">
                        <el-pagination
                        style="height:50px"
                          @size-change="handleSizeChange($event,'api/People/ShowPeople')"
                          @current-change="handleCurrentChange($event,'api/People/ShowPeople')"
                          :current-page="currentPage2"
                          :page-sizes="[10, 20, 50, 100]"
                          :page-size="10"
                          layout="total, sizes, prev, pager, next, jumper"
                          :total="totalpage2">
                        </el-pagination>
                    </div>
                  </template>         
              </el-tab-pane>
              <el-tab-pane label="历史委托数据" name="third">
                  <template>
                    <el-table :data="table_weituo" height="500" style="width: 100%">
                        <el-table-column prop="a" label="委托日期" width="100"></el-table-column>
                        <el-table-column prop="b" label="委托时间"></el-table-column>
                        <el-table-column prop="c" label="证券代码"></el-table-column>
                        <el-table-column prop="d" label="证券名称"></el-table-column>
                        <el-table-column prop="e" label="买卖标志"></el-table-column>
                        <el-table-column prop="f" label="买卖标志"></el-table-column>
                        <el-table-column prop="g" label="委托价格"></el-table-column>
                        <el-table-column prop="h" label="委托数量"></el-table-column>
                        <el-table-column prop="i" label="委托编号"></el-table-column>
                        <el-table-column prop="j" label="成交数量"></el-table-column>
                        <el-table-column prop="k" label="成交金额"></el-table-column>
                        <el-table-column prop="l" label="成交均价"></el-table-column>
                        <el-table-column prop="m" label="撤单数量"></el-table-column>
                        <el-table-column prop="n" label="状态说明"></el-table-column>
                        <el-table-column prop="o" label="股东代码" width="120"></el-table-column>
                        <el-table-column prop="p" label="帐号类别"></el-table-column>
                        <el-table-column prop="q" label="资金帐号" width="120"></el-table-column>
                        <el-table-column prop="r" label="备注"></el-table-column>
                        <el-table-column prop="s" label="句柄" width="110"></el-table-column>
                        <el-table-column prop="t" label="保留信息"></el-table-column>
                    </el-table>
                    <div class="block" style="height:32px">
                        <el-pagination
                        style="height:50px"
                          @size-change="handleSizeChange($event,'api/People/ShowPeople')"
                          @current-change="handleCurrentChange($event,'api/People/ShowPeople')"
                          :current-page="currentPage3"
                          :page-sizes="[10, 20, 50, 100]"
                          :page-size="10"
                          layout="total, sizes, prev, pager, next, jumper"
                          :total="totalpage3">
                        </el-pagination>
                    </div>
                  </template>  
              </el-tab-pane>
              <el-tab-pane label="历史成交数据" name="fourth">
                  <template>
                    <el-table :data="table_cj" height="500" style="width: 100%">
                        <el-table-column prop="a" label="成交日期"></el-table-column>
                        <el-table-column prop="b" label="成交时间"></el-table-column>
                        <el-table-column prop="c" label="证券代码"></el-table-column>
                        <el-table-column prop="d" label="证券名称"></el-table-column>
                        <el-table-column prop="e" label="买卖标志"></el-table-column>
                        <el-table-column prop="f" label="买卖标志"></el-table-column>
                        <el-table-column prop="g" label="委托价格"></el-table-column>
                        <el-table-column prop="h" label="委托数量"></el-table-column>
                        <el-table-column prop="i" label="委托编号"></el-table-column>
                        <el-table-column prop="j" label="成交价格"></el-table-column>
                        <el-table-column prop="k" label="成交数量"></el-table-column>
                        <el-table-column prop="l" label="成交金额"></el-table-column>
                        <el-table-column prop="m" label="成交编号"></el-table-column>
                        <el-table-column prop="n" label="股东代码"></el-table-column>
                        <el-table-column prop="o" label="帐号类别"></el-table-column>
                        <el-table-column prop="p" label="交易所名称" width="120"></el-table-column>
                        <el-table-column prop="q" label="备注"></el-table-column>
                        <el-table-column prop="r" label="剩余数量"></el-table-column>
                        <el-table-column prop="s" label="句柄"></el-table-column>
                        <el-table-column prop="t" label="保留信息"></el-table-column>
                    </el-table>
                    <div class="block" style="height:32px">
                      <el-pagination
                      style="height:50px"
                        @size-change="handleSizeChange($event,'api/People/ShowPeople')"
                        @current-change="handleCurrentChange($event,'api/People/ShowPeople')"
                        :current-page="currentPage4"
                        :page-sizes="[10, 20, 50, 100]"
                        :page-size="10"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalpage4">
                      </el-pagination>
                    </div>
                  </template>
              </el-tab-pane>
              <el-tab-pane label="历史可撤订单数据" name="fiveth">
                  <template>
                    <el-table :data="table_cx" height="500" style="width: 100%">
                      <el-table-column prop="a" label="委托日期" width="110"></el-table-column>
                      <el-table-column prop="b" label="委托时间"></el-table-column>
                      <el-table-column prop="c" label="证券代码"></el-table-column>
                      <el-table-column prop="d" label="证券名称"></el-table-column>
                      <el-table-column prop="e" label="状态说明"></el-table-column>
                      <el-table-column prop="f" label="买卖标志"></el-table-column>
                      <el-table-column prop="g" label="买卖标志"></el-table-column>
                      <el-table-column prop="h" label="委托价格"></el-table-column>
                      <el-table-column prop="i" label="委托数量"></el-table-column>
                      <el-table-column prop="j" label="委托金额"></el-table-column>
                      <el-table-column prop="k" label="委托编号"></el-table-column>
                      <el-table-column prop="l" label="成交数量"></el-table-column>
                      <el-table-column prop="m" label="撤单数量"></el-table-column>
                      <el-table-column prop="n" label="股东代码"></el-table-column>
                      <el-table-column prop="o" label="帐号类别"></el-table-column>
                      <el-table-column prop="p" label="资金帐号"></el-table-column>
                      <el-table-column prop="q" label="备注"></el-table-column>
                      <el-table-column prop="r" label="句柄"></el-table-column>
                      <el-table-column prop="s" label="保留信息"></el-table-column>
                    </el-table>
                    <div class="block" style="height:32px">
                      <el-pagination
                      style="height:50px"
                        @size-change="handleSizeChange($event,'api/People/ShowPeople')"
                        @current-change="handleCurrentChange($event,'api/People/ShowPeople')"
                        :current-page="currentPage5"
                        :page-sizes="[10, 20, 50, 100]"
                        :page-size="10"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalpage5">
                      </el-pagination>
                  </div>
                  </template>  
              </el-tab-pane>
              <el-tab-pane label="历史交割单" name="sixth">
                  <template>
                    <el-table :data="table_jg" height="500" style="width: 100%">
                        <el-table-column prop="a" label="交割日期" width="100"></el-table-column>
                        <el-table-column prop="b" label="业务名称"></el-table-column>
                        <el-table-column prop="c" label="证券代码"></el-table-column>
                        <el-table-column prop="d" label="证券名称"></el-table-column>
                        <el-table-column prop="e" label="成交价格"></el-table-column>
                        <el-table-column prop="f" label="成交数量"></el-table-column>
                        <el-table-column prop="g" label="剩余数量"></el-table-column>
                        <el-table-column prop="h" label="成交金额"></el-table-column>
                        <el-table-column prop="i" label="清算金额"></el-table-column>
                        <el-table-column prop="j" label="剩余金额"></el-table-column>
                        <el-table-column prop="k" label="佣金"></el-table-column>
                        <el-table-column prop="l" label="券商佣金"></el-table-column>
                        <el-table-column prop="m" label="印花税"></el-table-column>
                        <el-table-column prop="n" label="过户费"></el-table-column>
                        <el-table-column prop="o" label="结算费"></el-table-column>
                        <el-table-column prop="p" label="交易所规费" width="120"></el-table-column>
                        <el-table-column prop="q" label="附加费"></el-table-column>
                        <el-table-column prop="r" label="币种"></el-table-column>
                        <el-table-column prop="s" label="成交编号" width="120"></el-table-column>
                        <el-table-column prop="t" label="股东代码" width="120"></el-table-column>
                        <el-table-column prop="u" label="帐号类别"></el-table-column>
                        <el-table-column prop="v" label="资金帐号" width="120"></el-table-column>
                        <el-table-column prop="w" label="句柄" width="100"></el-table-column>
                        <el-table-column prop="x" label="保留信息"></el-table-column>
                    </el-table>
                    <div class="block" style="height:32px">
                      <el-pagination
                      style="height:50px"
                        @size-change="handleSizeChange($event,'api/People/ShowPeople')"
                        @current-change="handleCurrentChange($event,'api/People/ShowPeople')"
                        :current-page="currentPage5"
                        :page-sizes="[10, 20, 50, 100]"
                        :page-size="10"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalpage5">
                      </el-pagination>
                  </div>
                  </template>  
              </el-tab-pane>
            </el-tabs>
        </div>
       
    </div>
</template>
<script>
import { mapState,mapMutations} from "vuex"
import { req_AccountList } from '../../assets/myaxios'
export default {
    data() {
      return {
        activeName:"", 
        searchlogs_time:'',
        searchData: {
          StartTime: '',
          EndTime: ''
        },
        tableData: [],
        table_chicang:[],
        table_weituo:[],
        table_cj:[],
        table_cx:[],
        table_jg:[],
        table_gd:[],
        AccountList:[],
        Account:'',

        currentPage1:1,
        totalpage1:10,
        currentPage2:1,
        totalpage2:10,
        currentPage3:1,
        totalpage3:10,
        currentPage4:1,
        totalpage4:10,
        currentPage5:1,
        totalpage5:10,
      }
    },
    mounted(){
        this.req_AccountList()
        //获取时间段
        this.time(new Date(),'end')
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
        this.time(start,'start')
        console.log(this.searchData)

    },
    watch:{
        searchlogs_time:function(value){
            if(this.Account===''){
                this.$message.warning('请先选择账号')
                return
            }
            if(this.activeName==0){
                this.activeName='first'
            }
            console.log(this.activeName)
            console.log(value)
            this.searchData.StartTime=value[0]
            this.searchData.EndTime=value[1]
            this.mySearch({Account:this.Account,IndexPage:"1",PageSize:"1",StartTime:this.searchData.StartTime,EndTime:this.searchData.EndTime})
        },
        Account:function(value){
            this.searchData.Account=value
            this.tableData=[]
            this.table_chicang=[]
            this.table_weituo=[]
            this.table_cj=[]
            this.table_cx=[]
            this.table_jg=[]
            this.table_gd=[]
        }
    },
    methods:{
        req_AccountList,
        time(T,type){
            var year=T.getFullYear()
            var mouth=T.getMonth()+1
            var day=T.getDate()
            if(mouth<10){
                mouth='0'+mouth
            }
            if(day<10){
                day='0'+day
            }
            var shi=T.getHours()<10?'0'+T.getHours():T.getHours()
            var fen=T.getMinutes()<10?'0'+T.getMinutes():T.getMinutes()
            var miao=T.getSeconds()<10?'0'+T.getSeconds():T.getSeconds()
            var res=`${year}${mouth}${day}${shi}${fen}${miao}`
            if(type==='start'){
                this.searchData.StartTime=res
            }else{
                this.searchData.EndTime=res
            }
        },
        table_req(url,params,type){
                const loading = this.$loading({
                    lock: true,
                    text: '正在请求数据，请稍后',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.axios({
                  method: 'post',
                  headers:{'Authorization':'Bearer '+localStorage.token},
                  timeout:5000,
                  url: url,
                  data:this.$qs.stringify(params)
                }).then((res)=>{
                    loading.close()
                    console.log(res)
                    if(res.data.results===""){
                        this.$message({message:'暂无数据',type:'success'});  
                    }else if(res.data.response==="fail"){
                        this.$message.warning(res.data.results)
                    }else{
                        if(type==='sraech'){
                            this.tableData=JSON.parse(res.data.results)
                        }else if(type==='cc'){
                            this.table_chicang=JSON.parse(res.data.results) 
                        }else if(type==='wt'){
                            this.table_weituo=JSON.parse(res.data.results) 
                        }else if(type==='cj'){
                            this.table_cj=JSON.parse(res.data.results) 
                        }else if(type==='cx'){
                            this.table_cx=JSON.parse(res.data.results) 
                        }else if(type==='jg'){
                            this.table_jg=JSON.parse(res.data.results) 
                        }else if(type==='gddm'){
                            this.table_gd=JSON.parse(res.data.results) 
                        }
                    } 
                }).catch((error)=>{
                     loading.close()
                    if (error.request) {
                        this.$message.warning('请求超时,请稍后再试')
                    }else{
                        this.$notify.error({
                            title: '登录过期',
                            message: '登录过期，请重新登录'
                        })
                        setTimeout(()=>{
                            this.$router.push('/')
                        },1000)
                    }   
                });
        },
        handleClick(tab) {
            if(this.Account===""){
                this.$message({
                    message: '请先选择账号',
                    type: 'warning'
                    });
                return  
            }
            switch(this.activeName) {
                case 'first':
                    if(this.tableData.length===0){
                        this.table_req('api/Bond/ShowCapital',{Account:this.Account,IndexPage:"1",PageSize:"1",StartTime:this.searchData.StartTime,EndTime:this.searchData.EndTime},'sraech')
                    }
                    break;
                case 'second':
                    if(this.table_chicang.length===0){
                        this.table_req('api/Bond/ShowTodayHolder',{Account:this.Account,IndexPage:"1",PageSize:"1",StartTime:this.searchData.StartTime,EndTime:this.searchData.EndTime},'cc') 
                    }
                    break;
                case 'third':
                    if(this.table_weituo.length===0){
                        this.table_req('api/Bond/ShowWt',{Account:this.Account,IndexPage:"1",PageSize:"1",StartTime:this.searchData.StartTime,EndTime:this.searchData.EndTime},'wt')
                    }
                    break;
                case 'fourth':
                    if(this.table_cj.length===0){
                        this.table_req('api/Bond/ShowTodayDeal',{Account:this.Account,IndexPage:"1",PageSize:"1",StartTime:this.searchData.StartTime,EndTime:this.searchData.EndTime},'cj')
                    }
                    break;
                case 'fiveth':
                    if(this.table_cx.length===0){
                        this.table_req('api/Bond/ShowCd',{Account:this.Account,IndexPage:"1",PageSize:"1",StartTime:this.searchData.StartTime,EndTime:this.searchData.EndTime},'cx')
                    }
                    break;
                case 'sixth':
                    if(this.table_jg.length===0){
                        this.table_req('api/Bond/Showjiaoge',{Account:this.Account,IndexPage:"1",PageSize:"1",StartTime:this.searchData.StartTime,EndTime:this.searchData.EndTime},'jg') 
                    }
                    break;            
                default:
            }
        },
        myShuaxin(){
            if(this.activeName==='first'){
                this.tableData_search=true
                this.table_req('api/Bond/ShowCapital',{Account:this.Account,IndexPage:"1",PageSize:"1",StartTime:this.searchData.StartTime,EndTime:this.searchData.EndTime},'sraech')
            }else if(this.activeName==='second'){
                    this.table_req('api/Bond/ShowTodayHolder',{Account:this.Account,IndexPage:"1",PageSize:"1",StartTime:this.searchData.StartTime,EndTime:this.searchData.EndTime},'cc')
            }else if(this.activeName==='third'){
                    this.table_weituo_search=true
                    this.table_req('api/Bond/ShowWt',{Account:this.Account,IndexPage:"1",PageSize:"1",StartTime:this.searchData.StartTime,EndTime:this.searchData.EndTime},'wt')
            }else if(this.activeName==='fourth'){
                    this.table_cj_search=true
                    this.table_req('api/Bond/ShowTodayDeal',{Account:this.Account,IndexPage:"1",PageSize:"1",StartTime:this.searchData.StartTime,EndTime:this.searchData.EndTime},'cj')
            }else if(this.activeName==='fiveth'){
                    this.table_req('api/Bond/ShowCd',{Account:this.Account,IndexPage:"1",PageSize:"1",StartTime:this.searchData.StartTime,EndTime:this.searchData.EndTime},'cx')
            }
        },
        mySearch(params){
            let url=""
            switch(this.activeName) {
                case 'first':
                    url='api/Bond/ShowCapital'
                    break;
                case 'second':
                    url='api/Bond/ShowTodayHolder'
                    break;
                case 'third':
                    url='api/Bond/ShowWt'
                    break;
                case 'fourth':
                    url='api/Bond/ShowTodayDeal'
                    break;
                case 'fiveth':
                    url='api/Bond/ShowCd'
                    break;            
                default:
            }
            const loading = this.$loading({
                lock: true,
                text: '正在请求搜索结果，请稍后',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            this.axios({
                method: 'post',
                headers:{
                    'Authorization':'Bearer '+localStorage.token
                },
                timeout:5000,
                url: url,
                data:this.$qs.stringify(params)
            }).then((res)=>{
                //还需根据结果再进行判断
                console.log('搜索RES',res)
                loading.close()
                if(res.data.results===''){
                    this.$message('暂无搜索数据');
                    return
                }else if(res.data.response==='fail'){
                    this.$message.error(res.data.results);
                }else{
                    console.log('搜索结果',JSON.parse(res.data.results))
                    this.isSearch=true
                    switch(this.activeName) {
                        case 'first':
                            this.tableData_search=true
                            this.tableData=JSON.parse(res.data.results) 
                            break;
                        case 'second':
                            this.table_chicang=JSON.parse(res.data.results) 
                            break;
                        case 'third':
                            this.table_weituo_search=true
                            this.table_weituo=JSON.parse(res.data.results) 
                            break;
                        case 'fourth':
                            this.table_cj_search=true
                            this.table_cj=JSON.parse(res.data.results) 
                            break;
                        case 'fiveth':
                            this.table_cx=JSON.parse(res.data.results) 
                            break;            
                        default:
                            //默认代码块
                    }
                }    
            }).catch((error)=>{
                    loading.close()
                    console.log('状态码',error.response)
                    if (error.request) {
                        this.$message.warning('请求超时,请稍后再试')
                    }else{
                        this.$notify.error({
                            title: '登录过期',
                            message: '登录过期，请重新登录'
                        })
                        setTimeout(()=>{
                            this.$router.push('/')
                        },1000)
                    }
            })
        }
    }  
  }
</script>
<style>
    
</style>
