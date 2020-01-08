<template>
    <div>
        <div class="pageHead" style="padding-bottom:16px">
            <span>当日报表</span>
            <p style='display:inline'>账号:</p>
            <el-select v-model="Account" size="mini" filterable style="width:180px">
                <el-option :label="item.name+'--'+item.ac_zj_Account" :value="item.ac_zj_Account" v-for="(item,key) in AccountList" :key='key'></el-option>
            </el-select>
            <el-tooltip class="item"  effect="dark" content="刷新" placement="bottom-end">
                <el-button size="mini" type='success' icon="el-icon-refresh"  @click="myShuaxin()"></el-button>
            </el-tooltip>
        </div>
        <div style="padding:20px;background:#fff">
            <el-tabs v-model="activeName" @tab-click="handleClick" style="">
              <el-tab-pane label="当日资金查询数据" name="first">
                  <template>
                    <el-table :data="tableData" height="500" style="width: 100%">
                        <el-table-column prop='a' label="资金账号"></el-table-column>
                        <el-table-column prop='b' label="币别"></el-table-column>
                        <el-table-column prop='c' label="资金余额"></el-table-column>
                        <el-table-column prop='d' label="可用资金"></el-table-column>
                        <el-table-column prop='e' label="冻结资金"></el-table-column>
                        <el-table-column prop='f' label="可取资金"></el-table-column>
                        <el-table-column prop='j' label="最新市值"></el-table-column>
                        <el-table-column prop='h' label="总资金"></el-table-column>
                        <el-table-column prop='i' label="买入冻结资金" width="120"></el-table-column>
                        <el-table-column prop='j' label="备注"></el-table-column>
                        <el-table-column prop='k' label="句柄"></el-table-column>
                        <el-table-column prop='l' label="保留信息"></el-table-column>
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
              <el-tab-pane label="当日持仓数据" name="second">
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
              <el-tab-pane label="当日委托数据" name="third">
                  <template>
                    <el-table :data="table_weituo" height="500" style="width: 100%">
                      <el-table-column prop="a" label="委托日期" width="90"></el-table-column>
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
                      <el-table-column prop="o" label="撤单标志"></el-table-column>
                      <el-table-column prop="p" label="股东代码" width="120"></el-table-column>
                      <el-table-column prop="q" label="帐号类别"></el-table-column>
                      <el-table-column prop="r" label="资金帐号" width="120"></el-table-column>
                      <el-table-column prop="s" label="交易所名称" width="120"></el-table-column>
                      <el-table-column prop="t" label="备注"></el-table-column>
                      <el-table-column prop="u" label="句柄" width="110"></el-table-column>
                      <el-table-column prop="v" label="保留信息"></el-table-column>
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
              <el-tab-pane label="当日成交数据" name="fourth">
                  <template  >
                    <el-table :data="table_cj" height="500" style="width: 100%">
                        <el-table-column prop="a" label="成交日期" width="100"></el-table-column>
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
                        <el-table-column prop="n" label="股东代码" width="120"></el-table-column>
                        <el-table-column prop="o" label="帐号类别"></el-table-column>
                        <el-table-column prop="p" label="状态说明"></el-table-column>
                        <el-table-column prop="q" label="交易所名称" width="120"></el-table-column>
                        <el-table-column prop="r" label="备注"></el-table-column>
                        <el-table-column prop="s" label="撤单标志"></el-table-column>
                        <el-table-column prop="t" label="句柄" width="110"></el-table-column>
                        <el-table-column prop="u" label="保留信息"></el-table-column>
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
              <el-tab-pane label="当日可撤订单数据" name="fiveth">
                  <template>
                    <el-table :data="table_cx" height="500" style="width: 100%">
                      <el-table-column prop="a" label="委托日期"></el-table-column>
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
              <el-tab-pane label="股东代码" name="sixth">
                  <template>
                    <el-table :data="table_gd" height="500" style="width: 100%">
                        <el-table-column prop="a" label="股东代码"></el-table-column>
                        <el-table-column prop="b" label="股东名称"></el-table-column>
                        <el-table-column prop="c" label="帐号类别"></el-table-column>
                        <el-table-column prop="d" label="资金帐号"></el-table-column>
                        <el-table-column prop="e" label="融资融券标识"></el-table-column>
                        <el-table-column prop="f" label="句柄"></el-table-column>
                        <el-table-column prop="g" label="保留信息"></el-table-column>
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
import {req_AccountList} from '../../assets/myaxios'
export default {
    data() {
      return {
        activeName:"", 
        AccountList:[],
        Account:'',
        searchlogs_time:'',
        searchData: {
          StartTime: '',
          EndTime: ''
        },
        searchBoxShow:false,
        formLabelWidth: '120px',
        tableData: [],
        table_chicang:[],

        table_weituo:[],

        table_cj:[],

        table_cx:[],
        table_jg:[],
        table_gd:[],
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
    },
    watch:{
        searchlogs_time:function(value){
            console.log(value)
            this.searchData.StartTime=value[0]
            this.searchData.EndTime=value[1]
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
                    if(res.data.result===""){
                        this.$message({message:'暂无数据',type:'success'});  
                    }else if(res.data.response==="fail"){
                        this.$message.warning(res.data.result)
                    }else{
                        if(type==='sraech'){
                            this.tableData=JSON.parse(res.data.result)
                        }else if(type==='cc'){
                            this.table_chicang=JSON.parse(res.data.result) 
                        }else if(type==='wt'){
                            this.table_weituo=JSON.parse(res.data.result) 
                        }else if(type==='cj'){
                            this.table_cj=JSON.parse(res.data.result) 
                        }else if(type==='cx'){
                            this.table_cx=JSON.parse(res.data.result) 
                        }else if(type==='jg'){
                            this.table_jg=JSON.parse(res.data.result) 
                        }else if(type==='gddm'){
                            this.table_gd=JSON.parse(res.data.result) 
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
          if(this.Account==""){
               this.$message({
                  message: '请先选择账号',
                  type: 'warning'
                });
              return  
          }
          switch(this.activeName) {
              case 'first':
                  if(this.tableData.length===0){
                      this.table_req('api/Bond/ShowCapital',{Account:this.Account,IndexPage:"1",PageSize:"1",StartTime:'',EndTime:''},'sraech')
                  }
                  break;
              case 'second':
                  if(this.table_chicang.length===0){
                      this.table_req('api/Bond/ShowTodayHolder',{Account:this.Account,IndexPage:"1",PageSize:"1",StartTime:'',EndTime:''},'cc') 
                  }
                  break;
              case 'third':
                  if(this.table_weituo.length===0){
                      this.table_req('api/Bond/ShowWt',{Account:this.Account,IndexPage:"1",PageSize:"1",StartTime:'',EndTime:''},'wt')
                  }
                  break;
              case 'fourth':
                  if(this.table_cj.length===0){
                      this.table_req('api/Bond/ShowTodayDeal',{Account:this.Account,IndexPage:"1",PageSize:"1",StartTime:'',EndTime:''},'cj')
                  }
                  break;
              case 'fiveth':
                  if(this.table_cx.length===0){
                      this.table_req('api/Bond/ShowCd',{Account:this.Account,IndexPage:"1",PageSize:"1",StartTime:'',EndTime:''},'cx')
                  }
                  break;
              case 'sixth':
                  if(this.table_gd.length===0){
                      this.table_req('api/Bond/ShowGudongCode',{Account:this.Account,IndexPage:"1",PageSize:"1",StartTime:'',EndTime:'""'},'gddm')
                  }
                  break;       
              default:
          }
      },
      myShuaxin(){
          if(this.activeName==='first'){
              this.table_req('api/Bond/ShowCapital',{Account:this.Account,IndexPage:"1",PageSize:"1",StartTime:'',EndTime:''},'sraech')
          }else if(this.activeName==='second'){
                this.table_req('api/Bond/ShowTodayHolder',{Account:this.Account,IndexPage:"1",PageSize:"1",StartTime:'',EndTime:''},'cc')
          }else if(this.activeName==='third'){
                this.table_req('api/Bond/ShowWt',{Account:this.Account,IndexPage:"1",PageSize:"1",StartTime:'',EndTime:''},'wt')
          }else if(this.activeName==='fourth'){
                this.table_req('api/Bond/ShowTodayDeal',{Account:this.Account,IndexPage:"1",PageSize:"1",StartTime:'',EndTime:''},'cj')
          }else if(this.activeName==='fiveth'){
                this.table_req('api/Bond/ShowCd',{Account:this.Account,IndexPage:"1",PageSize:"1",StartTime:'',EndTime:''},'cx')
          }else if(this.activeName==='sixth'){
                this.table_req('api/Bond/ShowGudongCode',{Account:this.Account,IndexPage:"1",PageSize:"1",StartTime:'',EndTime:''},'gddm')
          }
      },
      mySearch(params){
        let url=""
        if(this.Account===''){
            this.$message.warning('请先选择账号')
            return
        }
        alert(this.Account)
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
              this.searchBoxShow=false
              console.log('搜索RES',res)
              loading.close()
              if(res.data.result===''){
                  this.$message('暂无搜索数据');
                  return
              }else if(res.data.response==='fail'){
                  this.$message.error(res.data.result);
              }else{
                this.searchBoxShow=false
                console.log('搜索结果',JSON.parse(res.data.result))
                this.isSearch=true
                switch(this.activeName) {
                    case 'first':
                        this.tableData=JSON.parse(res.data.result) 
                        break;
                    case 'second':
                        this.table_chicang=JSON.parse(res.data.result) 
                        break;
                    case 'third':
                        this.table_weituo=JSON.parse(res.data.result) 
                        break;
                    case 'fourth':
                        this.table_cj=JSON.parse(res.data.result) 
                        break;
                    case 'fiveth':
                        this.table_cx=JSON.parse(res.data.result) 
                        break;            
                    default:
                        //默认代码块
                }
            }    
          }).catch((error)=>{
                loading.close()
                console.log(res,err)
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
