<template>
  <div>
    <div style="padding:20px;background:#fff;">
            <el-tabs v-model="activeName" @tab-click="handleClick" style="">
              <el-tab-pane label="当日资金查询数据" name="first">
                  <template>
                    <el-table :data="tableData" height="300" style="width: 100%">
                        <el-table-column prop='zjAccount' label="资金账号"></el-table-column>
                        <el-table-column prop='bibie' label="币别"></el-table-column>
                        <el-table-column prop='zjYue' label="资金余额"></el-table-column>
                        <el-table-column prop='zjKeyong' label="可用资金"></el-table-column>
                        <el-table-column prop='zjSalefrozen' label="冻结资金"></el-table-column>
                        <el-table-column prop='zjKequ' label="可取资金"></el-table-column>
                        <el-table-column prop='zuixinshizhi' label="最新市值"></el-table-column>
                        <el-table-column prop='zjTotal' label="总资金"></el-table-column>
                        <el-table-column prop='zjBuyfrozen' label="买入冻结资金" width="120"></el-table-column>
                        <el-table-column prop='j' label="备注"></el-table-column>
                        <el-table-column prop='jubing' label="句柄"></el-table-column>
                        <el-table-column prop='blMes' label="保留信息"></el-table-column>
                    </el-table>
                  </template>
              </el-tab-pane>
              <el-tab-pane label="当日持仓数据" name="second">
                  <template >
                    <el-table :data="table_chicang" height="300" style="width: 100%">
                        <el-table-column prop="bondCode" label="证券代码"></el-table-column>
                        <el-table-column prop="bondName" label="证券名称"></el-table-column>
                        <el-table-column prop="bondCount" label="证券数量"></el-table-column>
                        <el-table-column prop="stockCount" label="库存数量"></el-table-column>
                        <el-table-column prop="saleCount" label="可卖数量"></el-table-column>
                        <el-table-column prop="cbPrice" label="成本价"></el-table-column>
                        <el-table-column prop="ykcbPrice" label="盈亏成本价" width="120"></el-table-column>
                        <el-table-column prop="price" label="当前价"></el-table-column>
                        <el-table-column prop="newestShizhi" label="最新市值"></el-table-column>
                        <el-table-column prop="ykFloat" label="浮动盈亏"></el-table-column>
                        <el-table-column prop="ykPercent" label="盈亏比例(%)" width="120"></el-table-column>
                        <el-table-column prop="shareholderCode" label="股东代码"></el-table-column>
                        <el-table-column prop="accountType" label="帐号类别"></el-table-column>
                        <el-table-column prop="jysCode" label="交易所代码" width="120"></el-table-column>
                        <el-table-column prop="zjAccount" label="资金帐号"></el-table-column>
                        <el-table-column prop="jysName" label="交易所名称" width="120"></el-table-column>
                        <el-table-column prop="jubing" label="句柄"></el-table-column>
                        <el-table-column prop="blMes" label="保留信息"></el-table-column>
                    </el-table>
                  </template>         
              </el-tab-pane>
              <el-tab-pane label="当日可撤订单数据" name="fiveth">
                  <template>
                    <el-table :data="table_cx" height="300" style="width: 100%">
                      <el-table-column prop="weituoDate" label="委托日期" width="100"></el-table-column>
                      <el-table-column prop="weituoTime" label="委托时间"></el-table-column>
                      <el-table-column prop="bondCode" label="证券代码"></el-table-column>
                      <el-table-column prop="bondName" label="证券名称"></el-table-column>
                      <el-table-column prop="ztRemark" label="状态说明"></el-table-column>
                      <el-table-column prop="dealRemark" label="买卖标志1" width="100"></el-table-column>
                      <el-table-column prop="dealRemarks" label="买卖标志2" width="100"></el-table-column>
                      <el-table-column prop="weituoPrice" label="委托价格"></el-table-column>
                      <el-table-column prop="weituoCount" label="委托数量"></el-table-column>
                      <el-table-column prop="weituoJine" label="委托金额"></el-table-column>
                      <el-table-column prop="weituoNum" label="委托编号"></el-table-column>
                      <el-table-column prop="dealNum" label="成交数量"></el-table-column>
                      <el-table-column prop="cdNum" label="撤单数量"></el-table-column>
                      <el-table-column prop="shareholdersCode" label="股东代码"></el-table-column>
                      <el-table-column prop="accountType" label="帐号类别"></el-table-column>
                      <el-table-column prop="zjAccount" label="资金帐号"></el-table-column>
                      <el-table-column prop="remarks" label="备注"></el-table-column>
                      <el-table-column prop="jubing" label="句柄"></el-table-column>
                      <el-table-column prop="blMes" label="保留信息"></el-table-column>
                    </el-table>
                  </template>  
              </el-tab-pane>
            </el-tabs>
        </div>
    <div :id="id" :class="className" style="width:100%;height:400px;padding-top:20px" />
  </div>
</template>
<script>
import echarts from 'echarts'
import {table_req} from '../../../assets/myaxios'
export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  data() {
    return {
      activeName:'first', 
      AccountList:[],
      Account:'',
      chart: null,
      timer:null,
      table_cx:[],
      tableData:[],
      table_chicang:[],
    }
  },
  mounted() {
    this.table_req('api/bond/showcatable',{Account:1,PageSize:1000},'sraech')
    // this.timer=setInterval(()=>{
    //       console.log('5000定时器')
    //   },2000)
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
    clearInterval(this.timer)      
    this.timer = null
  },
  methods: {
    table_req,
    handleClick(tab) {
          switch(this.activeName) {
              case 'first':
                      this.table_req('api/bond/showcatable',{Account:1,PageSize:"1",StartTime:1000},'sraech')
                  break;
              case 'second':
                      this.table_req('api/bond/showchicang',{Account:1,PageSize:1000},'cc') 
                  break;
              case 'fiveth':
                      this.table_req('api/bond/showchedan',{Account:1,PageSize:1000},'cx')
                  break; 
              default:
          }
      },
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      const xData = (function() {
        const data = []
        for (let i = 1; i < 30; i++) {
          data.push(i + '天')
        }
        return data
      }())
      this.chart.setOption({
        backgroundColor: '#344b58',
        title: {
          text: '资金走势',
          x: '20',
          top: '10',
          textStyle: {
            color: '#fff',
            fontSize: '18'
          },
          subtextStyle: {
            color: '#90979c',
            fontSize: '16'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            textStyle: {
              color: '#fff'
            }
          }
        },
        grid: {
          left: '5%',
          right: '5%',
          borderWidth: 0,
          top: 150,
          bottom: 95,
          textStyle: {
            color: '#fff'
          }
        },
        legend: {
          x: '5%',
          top: '10%',
          textStyle: {
            color: '#90979c'
          },
          data: ['female', 'male', 'hhkj']
        },
        calculable: true,
        xAxis: [{
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitArea: {
            show: false
          },
          axisLabel: {
            interval: 0
          },
          data: xData
        }],
        yAxis: [{
          type: 'value',
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0
          },
          splitArea: {
            show: false
          }
        }],
        dataZoom: [{
          show: true,
          height: 30,
          xAxisIndex: [
            0
          ],
          bottom: 30,
          start: 10,
          end: 80,
          handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
          handleSize: '110%',
          handleStyle: {
            color: '#d3dee5'
          },
          textStyle: {
            color: '#fff' },
          borderColor: '#90979c'

        }, {
          type: 'inside',
          show: true,
          height: 15,
          start: 1,
          end: 35
        }],
        series: [
        //   {
        //     name: 'female',
        //     type: 'bar',
        //     stack: 'total',
        //     barMaxWidth: 35,
        //     barGap: '10%',
        //     itemStyle: {
        //     normal: {
        //       color: 'rgba(255,144,128,1)',
        //       label: {
        //         show: true,
        //         textStyle: {
        //           color: '#fff'
        //         },
        //         position: 'insideTop',
        //         formatter(p) {
        //           return p.value > 0 ? p.value : ''
        //         }
        //       }
        //     }
        //   },
        //   data: [
        //     -709,
        //     1917,
        //     2455,
        //     2610,
        //     1719,
        //     1433,
        //     1544,
        //     3285,
        //     5208,
        //     3372,
        //     2484,
        //     4078
        //   ]
        // },
        // {
        //   name: 'male',
        //   type: 'bar',
        //   stack: 'total',
        //   itemStyle: {
        //     normal: {
        //       color: 'rgba(0,191,183,1)',
        //       barBorderRadius: 0,
        //       label: {
        //         show: true,
        //         position: 'top',
        //         formatter(p) {
        //           return p.value > 0 ? p.value : ''
        //         }
        //       }
        //     }
        //   },
        //   data: [
        //     327,
        //     1776,
        //     507,
        //     1200,
        //     800,
        //     482,
        //     204,
        //     1390,
        //     1001,
        //     951,
        //     381,
        //     220
        //   ]
        // }, 
        {
          name: 'hhkj',
          type: 'line',
          stack: 'total',
          symbolSize: 10,
          symbol: 'circle',
          itemStyle: {
            normal: {
              color: 'rgba(252,230,48,1)',
              barBorderRadius: 0,
              label: {
                show: true,
                position: 'top',
                formatter(p) {
                  return p.value > 0 ? p.value : ''
                }
              }
            }
          },
          data: [
            1.0,
            1,
            0.5,
            1,
            -0.8,
            1,
            0.5,
            1,
            1
          ]
        }
        ]
      })
    }
  }
}
</script>
<style scoped>
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 230px;
  }
  .grid-content>div{
    padding-top:3px;
    line-height:normal;
    height: 115px;
    text-align: left;
  }
  .grid-content>div>p{
      line-height:4px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  /* table 样式 */
  .table_box>span{
    display: inline-block;
    padding-left:10px;
    padding-bottom:5px;
  }
  .table_box>small{
    display:block;
    float: right;
  }
  .table_box table{
    border-collapse: collapse;
    margin: 0 auto;
    text-align: center;
  }
  .table_box table td, table th{
    border: 1px solid #cad9ea;
    color: #666;
    height: 20px;
    line-height: 20px;
  }
  /* .table_box table thead{
      display: inline-block;
  } */
  .table_box table thead th{
      background-color: #CCE8EB;
      width: 100px;
  }
  .table_box table tbody tr:hover{
      background-color: antiquewhite;
      cursor: pointer;
  }
  .table_box table tr:nth-child(odd){
      background: #fff;
  }
  .table_box table tr:nth-child(even){
      background: #F5FAFA;
  }
</style>
