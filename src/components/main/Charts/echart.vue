<template>
  <div>
    <el-row :gutter="24">
      <el-col :span="6">
        <div class="grid-content bg-purple">
            <div>
                <p>已启用商品数/总数</p>
                <p>103/ 104</p>
                <el-progress :percentage="50" ></el-progress>
            </div>
            <div>
                <p>已启用商品数/总数</p>
                <p>103/ 104</p>
                <el-progress :percentage="50" ></el-progress>
            </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
            <div>
                <p>已启用商品数/总数</p>
                <p>103/ 104</p>
                <el-progress :percentage="50" ></el-progress>
            </div>
            <div>
                <p>已启用商品数/总数</p>
                <p>103/ 104</p>
                <el-progress :percentage="50" ></el-progress>
            </div>
        </div>
      </el-col>
      <el-col :span="6"><div :id='myid1' class="grid-content bg-purple"></div></el-col>
      <el-col :span="6"><div :id='myid'  class="grid-content bg-purple"></div></el-col>
    </el-row>
    <div :id="id" :class="className" style="width:100%;height:400px" />
  </div>
  
</template>

<script>
import echarts from 'echarts'
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
      chart: null,
      mychar:'mychar999',
      mychar1:'mychar999',
      myid:'isadaisg',
      myid1:'45qwew'
      
    }
  },
  mounted() {
    this.initChart()
    this.initMyChar()
    this.initMyChar1()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      const xData = (function() {
        const data = []
        for (let i = 1; i < 13; i++) {
          data.push(i + 'month')
        }
        return data
      }())
      this.chart.setOption({
        backgroundColor: '#344b58',
        title: {
          text: 'statistics',
          x: '20',
          top: '20',
          textStyle: {
            color: '#fff',
            fontSize: '22'
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
          data: ['female', 'male', 'average']
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
        series: [{
          name: 'female',
          type: 'bar',
          stack: 'total',
          barMaxWidth: 35,
          barGap: '10%',
          itemStyle: {
            normal: {
              color: 'rgba(255,144,128,1)',
              label: {
                show: true,
                textStyle: {
                  color: '#fff'
                },
                position: 'insideTop',
                formatter(p) {
                  return p.value > 0 ? p.value : ''
                }
              }
            }
          },
          data: [
            709,
            1917,
            2455,
            2610,
            1719,
            1433,
            1544,
            3285,
            5208,
            3372,
            2484,
            4078
          ]
        },

        {
          name: 'male',
          type: 'bar',
          stack: 'total',
          itemStyle: {
            normal: {
              color: 'rgba(0,191,183,1)',
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
            327,
            1776,
            507,
            1200,
            800,
            482,
            204,
            1390,
            1001,
            951,
            381,
            220
          ]
        }, {
          name: 'average',
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
            1036,
            3693,
            2962,
            3810,
            2519,
            1915,
            1748,
            4675,
            6209,
            4323,
            2865,
            4298
          ]
        }
        ]
      })
    },
    initMyChar(){
        this.mychar = echarts.init(document.getElementById(this.myid))
        this.mychar.setOption({
          color: ['#6dd8da', '#b6a2de', '#58afed','#F2637B','#c0392b'],
          tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          title: {
            text: '政采网',
            // x 设置水平安放位置，默认左对齐，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
            x: '10',
            // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
            y: '15',
            // itemGap设置主副标题纵向间隔，单位px，默认为10，
            itemGap: 30,
            // 主标题文本样式设置
            textStyle: {
              fontSize: 12,
              fontWeight: 'bolder',
              color: '#000080'
            },
            // 副标题文本样式设置
            subtextStyle: {
              fontSize: 18,
              color: '#8B2323'
            }
          },
          legend: {
              orient: 'vertical',
              x: 'right',
              y:'center',
              itemWidth: 24,   // 设置图例图形的宽
                  itemHeight: 10,  // 设置图例图形的高
                  textStyle: {
                    color: '#666'  // 图例文字颜色
                  },
                  // itemGap设置各个item之间的间隔，单位px，默认为10，横向布局时为水平间隔，纵向布局时为纵向间隔
                  itemGap: 10,
              data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
          },
          series: [
              {
                  name:'访问来源',
                  type:'pie',
                  radius: ['60%', '70%'],
                  avoidLabelOverlap: false,
                  label: {
                      normal: {
                          show: false,
                          position: 'center'
                      },
                      emphasis: {
                          show: true,
                          textStyle: {
                              fontSize: '15',
                              fontWeight: 'bold'
                          }
                      }
                  },
                  labelLine: {
                      normal: {
                          show: false
                      },
                      lineStyle:{
                          width:10
                      }
                  },
                  data:[
                      {value:335, name:'直接访问'},
                      {value:310, name:'邮件营销'},
                      {value:234, name:'联盟广告'},
                      {value:135, name:'视频广告'},
                      {value:1548, name:'搜索引擎'}
                  ]
              }
          ]
        })
    },
    initMyChar1(){
        this.mychar1 = echarts.init(document.getElementById(this.myid1))
        this.mychar1.setOption({
          color: ['#6dd8da', '#b6a2de', '#58afed','#F2637B','#c0392b'],
          tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          title: {
            text: '政采网',
            // x 设置水平安放位置，默认左对齐，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
            x: '10',
            // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
            y: '15',
            // itemGap设置主副标题纵向间隔，单位px，默认为10，
            itemGap: 30,
            // 主标题文本样式设置
            textStyle: {
              fontSize: 12,
              fontWeight: 'bolder',
              color: '#000080'
            },
            // 副标题文本样式设置
            subtextStyle: {
              fontSize: 18,
              color: '#8B2323'
            }
          },
          legend: {
              orient: 'vertical',
              x: 'right',
              y:'center',
              itemWidth: 24,   // 设置图例图形的宽
                  itemHeight: 10,  // 设置图例图形的高
                  textStyle: {
                    color: '#666'  // 图例文字颜色
                  },
                  // itemGap设置各个item之间的间隔，单位px，默认为10，横向布局时为水平间隔，纵向布局时为纵向间隔
                  itemGap: 10,
              data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
          },
          series: [
              {
                  name:'访问来源',
                  type:'pie',
                  radius: ['60%', '70%'],
                  avoidLabelOverlap: false,
                  label: {
                      normal: {
                          show: false,
                          position: 'center'
                      },
                      emphasis: {
                          show: true,
                          textStyle: {
                              fontSize: '15',
                              fontWeight: 'bold'
                          }
                      }
                  },
                  labelLine: {
                      normal: {
                          show: false
                      },
                      lineStyle:{
                          width:10
                      }
                  },
                  data:[
                      {value:335, name:'直接访问'},
                      {value:310, name:'邮件营销'},
                      {value:234, name:'联盟广告'},
                      {value:135, name:'视频广告'},
                      {value:1548, name:'搜索引擎'}
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
    padding-top:1px;
    padding-left: 20px;
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
</style>
