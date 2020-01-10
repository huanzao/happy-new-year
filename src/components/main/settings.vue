<template>
    <div>
        <div class="pageHead">
            <span>系统设置</span>
        </div>
        <div style="padding:15px;background:#fff;margin-top:30px;padding-top:5px">
            <el-tabs v-model="activeName" @tab-click="handleClick" >
                <el-tab-pane label="策略设置" name="first">
                        <el-table :data="tableData" style="width: 100%;" :row-class-name="tableRowClassName">
                            <el-table-column label="TS代码" prop="ts"></el-table-column>
                            <el-table-column label="股票名称" prop="name"></el-table-column>
                            <el-table-column label="股票代码" prop="dm" ></el-table-column>
                            <el-table-column label="开盘价/买入价" width="120" prop="buyPrice"></el-table-column>
                            <el-table-column label="最高价" prop="high"></el-table-column>
                            <el-table-column label="最低价" prop="low"></el-table-column>
                            <el-table-column label="收盘价/现价" prop="nowPrice"></el-table-column>
                            <el-table-column label="成交量" prop="cj_num"></el-table-column>
                            <el-table-column label="成交额" prop="cj_price"></el-table-column>
                            <el-table-column label="涨幅" prop="zf"></el-table-column>
                            <el-table-column 
                                prop="tag"
                                label="盈亏"
                                width="100"
                                :filters="[{ text: '亏损', value: '亏损' },{ text: '盈利', value: '盈利' },{ text: '无变化', value: '无变化' }]"
                                :filter-method="filterTag"
                                filter-placement="bottom-end">
                                <template slot-scope="scope">
                                    <span>{{scope.row.nowPrice-scope.row.buyPrice}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" width="160">
                                <template slot-scope="scope">
                                    <el-button size="mini" type="success" @click="tactics(scope.row)">策略</el-button>
                                    <el-button size="mini" type="warning" @click="mySell(scope.$index,scope.row.name,{RoleId:scope.row.id},'','')">出售</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                </el-tab-pane>
                <el-tab-pane label="时间设置" name="second">
                    <el-card class="box-card" shadow="always" style="width:50%;margin:10px">
                        <div slot="header" class="clearfix">
                            <span>获取买入价格时间</span>
                            <el-button style="float: right; padding: 3px 0;margin:-8px" type="text"  @click="setTime_show(2)">修改</el-button>
                        </div>
                        <div>
                            <span>每天 {{searchData.buyTime_Hq}}</span>  
                        </div>
                    </el-card>
                    <el-card class="box-card" shadow="always" style="width:50%;margin:10px">
                        <div slot="header" class="clearfix">
                            <span>买入时间</span>
                            <el-button style="float: right; padding: 3px 0;margin:-8px" type="text"  @click="setTime_show(0)">修改</el-button>
                        </div>
                        <div>
                            <span>每天 {{searchData.buyTime}}</span>  
                        </div>
                    </el-card>
                    <el-card class="box-card" shadow="always" style="width:50%;margin:10px">
                        <div slot="header" class="clearfix">
                            <span>获取卖出价格时间</span>
                            <el-button style="float: right; padding: 3px 0;margin:-8px" type="text"  @click="setTime_show(3)">修改</el-button>
                        </div>
                        <div class="text item" style="line-height:20px">
                            <span>每天  {{searchData.sellTime_Hq}}</span> 
                        </div>
                    </el-card>
                    <el-card class="box-card" shadow="always" style="width:50%;margin:10px">
                        <div slot="header" class="clearfix">
                            <span>卖出时间</span>
                            <el-button style="float: right; padding: 3px 0;margin:-8px" type="text"  @click="setTime_show(1)">修改</el-button>
                        </div>
                        <div class="text item" style="line-height:20px">
                            <span>每天  {{searchData.sellTime}}</span> 
                        </div>
                    </el-card>
                </el-tab-pane>
            </el-tabs>   
        </div>
        
        <el-dialog class="myDialog" title="时间设置" :visible.sync="setTime">
            <el-form>
                <el-form-item  :label="setTime_tile" :label-width="formLabelWidth">
                    <el-time-picker 
                        v-model="dialog_time"
                        value-format="HH:mm:ss"
                        size="mini"
                        placeholder="选择时间范围">
                    </el-time-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="setTime = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="globle_setTime">确定</el-button>
            </div>
        </el-dialog>

        <el-dialog class="myDialog" :title="celueTitle" :visible.sync="setTactics">
            <el-form :model="celueData">
                <el-form-item label="买入价" :label-width="formLabelWidth">
                    <el-select v-model="celueData.section" size='mini' placeholder="请选择">
                        <el-option
                            v-for="item in buy_option"
                            :key="item.value"
                            :label="item.name+':  '+item.value"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="卖出价" :label-width="formLabelWidth">
                    <el-select v-model="celueData.section" size='mini' placeholder="请选择">
                        <el-option
                            v-for="item in buy_option"
                            :key="item.value"
                            :label="item.name+':  '+item.value"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
               
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="setTactics = false">取 消</el-button>
                <el-button size="mini" type="primary" @click='do_setting' >确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import {myInit} from '../../assets/comon'
import {mySell} from '../../assets/myaxios'
export default {
    data() {
      return {
        activeName:"first",
        setTime: false,
        time_witch:0,
        setTactics:false,
        setTime_tile:'出售时间',
        isSearch:false,
        celueTitle:'',
        dialog_time:'',
        searchData: {
            buyTime_Hq:'09:30:00',
            buyTime:'09:30:00',
            sellTime_Hq:'09:26:00',
            sellTime:'09:26:00'
        },
        celueData:{
            section:'',
        },
        formLabelWidth: '150px',  
        tableData: [
            {
                ts:'10068',
                name:'中国移动',
                dm:'移动-10086',
                buyPrice:'250',
                nowPrice:'280',
                tag:'盈利',
                num:13.291,
                high:100,
                low:12,
                start:23,
                end:160,
                cj_num:645413,
                cj_price:54565,
                zf:'12%',

            },
            {
                ts:'10010',
                name:'中国联通',
                dm:'联通-10010',
                buyPrice:'250',
                nowPrice:'230',
                tag:'亏损',
                num:13.291,
                high:100,
                low:12,
                start:23,
                end:160,
                cj_num:645413,
                cj_price:54565,
                zf:'32%',
            },
            {
                ts:'12345',
                name:'中国电信',
                dm:'电信-12345',
                buyPrice:'250',
                nowPrice:'250',
                tag:'无变化',
                num:13.291,
                high:100,
                low:12,
                start:23,
                end:160,
                cj_num:645413,
                cj_price:54565,
                zf:'25%',
            }

        ],
        buy_option:[
            {name:'一档',value:5.01},
            {name:'二档',value:5.02},
            {name:'三档',value:5.03},
            {name:'四档',value:5.04},
            {name:'五档',value:5.05},
        ],
        options: [
            {
                label: '0-10',
                options: [{
                    value: '1',
                    label: '1'
                }, {
                    value: '2',
                    label: '2'
                }]
            },
            {
                label: '10-20',
                options: [{
                    value: '11',
                    label: '11'
                }, {
                    value: '12',
                    label: '12'
                }]
            },
        ],
      }
    },
    mounted(){
    //   this.myInit('api/Bond/ShowCo',{IndexPage:"1",PageSize:"10"})
    },
    methods:{
      mySell,  
      myInit,
      //亏损盈利颜色判断函数
      tableRowClassName({row, rowIndex}) {
        if (row.buyPrice*1<row.nowPrice*1) {
          return 'success-row';
        } else if (row.buyPrice*1>row.nowPrice*1) {
          return 'warning-row';
        }
        return 'primary-row';
      },
      //筛选函数
      filterTag(value, row) {
        return row.tag === value;
      },
      //策略 dialog 弹出函数
      tactics(row){
          this.celueTitle=row.name+'股票策略修改'
          this.setTactics=true
          console.log(row)
      },
      //策略提交函数
      do_setting(){
            console.log('提交设置')
            this.setTactics=false
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            let updata=this.celueData
            console.log('添加或修改提交的信息',updata)
            this.axios({
                method: 'post',
                headers:{
                    'Authorization':'Bearer '+localStorage.token
                },
                timeout:5000,
                url: 'aaa',
                data:this.$qs.stringify(updata)
            }).then((res)=>{
                console.log('res11111111',res)
                loading.close()
                if(res.data.response==="success"){
                    this.$message({
                        message: res.data.results,
                        type: 'success'
                    });
                    setTimeout(()=>{
                        window.history.go(-1)
                    },1000)
                }else{
                    this.$message({
                        message: res.data.results,
                        type: 'warning'
                    });
                }
            }).catch((err)=>{
                console.log('error0000000',err)
                loading.close()
                this.$notify.error({
                    title: '登录过期',
                    message: '请重新登陆'
                });
                setTimeout(()=>{
                    this.$router.push('/')
                },1000)
            })
      },
      //tab栏切换函数
      handleClick(){
          console.log('切换')
      },
      //时间设置弹出函数
      setTime_show(type){
          if(type===0){
                this.setTime_tile='买入时间'
                this.dialog_time=this.searchData.buyTime
          }else if(type===1){
                this.dialog_time=this.searchData.sellTime
                this.setTime_tile='出售时间'
          }else if(type===2){
                this.dialog_time=this.searchData.sellTime
                this.setTime_tile='获取买入价格时间'
          }else if(type===3){
                this.dialog_time=this.searchData.sellTime
                this.setTime_tile='获取卖出价格时间'
          }
          this.setTime=true
      },
      //时间设置提交函数
      globle_setTime(){
            if(this.setTime_tile==='买入时间'){
              this.searchData.buyTime=this.dialog_time
            }else if(this.setTime_tile==='出售时间'){
              this.searchData.sellTime=this.dialog_time
            }else if(this.setTime_tile==='获取买入价格时间'){
              this.searchData.buyTime_Hq=this.dialog_time
            }else if(this.setTime_tile==='获取卖出价格时间'){
              this.searchData.sellTime_Hq=this.dialog_time
            }
            this.setTime=false
            console.log(this.searchData)
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            let updata=this.searchData
            console.log('添加或修改提交的信息',updata)
            this.axios({
                method: 'post',
                headers:{
                    'Authorization':'Bearer '+localStorage.token
                },
                timeout:5000,
                url: 'bbb',
                data:this.$qs.stringify(updata)
            }).then((res)=>{
                console.log('res11111111',res)
                loading.close()
                if(res.data.response==="success"){
                    this.$message({
                        message: res.data.results,
                        type: 'success'
                    });
                    setTimeout(()=>{
                        window.history.go(-1)
                    },1000)
                }else{
                    this.$message({
                        message: res.data.results,
                        type: 'warning'
                    });
                }
            }).catch((err)=>{
                console.log('error0000000',err)
                loading.close()
                this.$notify.error({
                    title: '登录过期',
                    message: '请重新登陆'
                });
                setTimeout(()=>{
                    this.$router.push('/')
                },1000)
            })

      }
    }
  }
</script>
<style>
    .el-table .warning-row td:not(:last-child) {
        color: #F56C6C ;
    }
    .el-table .success-row  td:not(:last-child){
        color: #67C23A ;
    }
    .el-table .primary-row  td:not(:last-child){
        color: #409EFF ;
    }
</style>
td