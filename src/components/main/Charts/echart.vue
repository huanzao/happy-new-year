<template>
  <div style='background-color: #EEEEEE;'>
    <el-card class="box-card" style="margin-bottom:13px">
      <div slot="header" class="clearfix">
        <span>卡片名称</span>
        <span style='cursor: pointer;font-size: 13px;color: #17a4fd;' @click='dialog_todos=true'>设置</span>
      </div>
      <div>
          <el-row :gutter="12">
            <el-col style="width:260px;"  v-for="(item,index) in todoThings"  :key='index' >
              <el-card shadow="hover" class="mycard" v-if='item.show'>
                <div><img :src="item.img" ></div>
                <div>
                  <p :style="{color:item.color}">{{ item.value }}</p>
                  <p>{{ item.title }}</p>
                </div>
              </el-card>
            </el-col>
          </el-row>
      </div>
    </el-card>
    <el-card class="box-card" :span='12' style="margin-bottom:13px">
      <div slot="header" class="clearfix">
        <span>设备概况</span>
      </div>
      <div style="display:flex;justify-content: space-evenly;">
        <div class="sbgk" v-for="(item,index) in sbgkArr" :key="index">
            <div>
              <p :style="item.color">{{item.percent}}%</p>
              <p :style="item.color">{{ item.title[0] }}</p>
            </div>
            <el-progress type="circle" :show-text='false' :color='item.cc' :percentage="56"></el-progress>
            <div>
              <p>{{item.title[0]+':'+item.value[0]}}台</p>
              <p>{{item.title[1]+':'+item.value[1]}}台</p>
            </div>
        </div>
          
      </div>
    </el-card>
    <el-row :gutter="18" style="margin-bottom:13px">
      <el-col :span="12">
        <div class="grid-content bg-purple">
            <el-card class="box-card mycard_line">
              <div slot="header" class="clearfix">
                <span>设备维修情况</span>
              </div>
              <div>
                  <div style="display:flex;justify-content: space-between;">
                      <el-button-group>
                        <el-button size="mini">最近一个月</el-button>
                        <el-button size="mini">最近三个月</el-button>
                        <el-button size="mini">最近半年</el-button>
                        <el-button size="mini">最近三年</el-button>
                      </el-button-group>
                      <el-select style="width:120px" size="mini" v-model="line_lelect1" placeholder="请选择">
                        <el-option label="维修次数" value="维修次数"></el-option>
                        <el-option label="维修费用" value="维修费用"></el-option>
                        <el-option label="费用分析" value="费用分析"></el-option>
                      </el-select>
                  </div>
                  <div style="height:400px;padding-top: 20px;" id='char_line_1'></div>
              </div>
            </el-card>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple">
            <el-card class="box-card mycard_line">
              <div slot="header" class="clearfix">
                <span>设备效益分析</span>
              </div>
              <div>
                  <div style="display:flex;justify-content: space-between;">
                      <el-button-group>
                        <el-button size="mini">最近一个月</el-button>
                        <el-button size="mini">最近三个月</el-button>
                        <el-button size="mini">最近半年</el-button>
                        <el-button size="mini">最近三年</el-button>
                      </el-button-group>
                      <el-select style="width:120px" size="mini" v-model="line_lelect1" placeholder="请选择">
                        <el-option label="收支趋势" value="收支趋势"></el-option>
                        <el-option label="收入分析" value="收入分析"></el-option>
                        <el-option label="支出分析" value="支出分析"></el-option>
                      </el-select>
                  </div>
                  <div style="height:400px;padding-top: 20px;" id='char_line_2'></div>
              </div>
            </el-card>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="18">
      <el-col :span="12">
        <div class="grid-content bg-purple">
            <el-card class="box-card mycard_line">
              <div slot="header" class="clearfix">
                <span>设备保养情况</span>
              </div>
              <div>
                  <div style="display:flex;justify-content: space-between;">
                      <el-button-group>
                        <el-button size="mini">最近一个月</el-button>
                        <el-button size="mini">最近三个月</el-button>
                        <el-button size="mini">最近半年</el-button>
                        <el-button size="mini">最近三年</el-button>
                      </el-button-group>
                      <el-select style="width:120px" size="mini" v-model="line_lelect1" placeholder="请选择">
                        <el-option label="保养次数" value="保养次数"></el-option>
                        <el-option label="保养统计" value="保养统计"></el-option>
                      </el-select>
                  </div>
                  <div style="height:400px;padding-top: 20px;" id='char_line_3'></div>
              </div>
            </el-card>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple">
            <el-card class="box-card mycard_line">
              <div slot="header" class="clearfix">
                <span>不良事件分析</span>
              </div>
              <div id=''>
                  <div style="display:flex;justify-content: space-between;">
                      <el-button-group>
                        <el-button size="mini">最近一个月</el-button>
                        <el-button size="mini">最近三个月</el-button>
                        <el-button size="mini">最近半年</el-button>
                        <el-button size="mini">最近三年</el-button>
                      </el-button-group>
                      
                  </div>
                  <div style="height:400px;padding-top: 20px;" id='char_line_4'></div>
              </div>
            </el-card>
        </div>
      </el-col>
    </el-row>
    <div :id="id" :class="className" style="width:100%;height:400px;padding-top:20px" />
    <el-dialog title="代办事项显示设置" :visible.sync="dialog_todos" label-width="120px">
      <el-form style="display:flex" id='todsStyle_show'>
        <el-form-item v-for="(item,index) in todoThings" :key='index' style="padding: 0 10px;" >
            <el-checkbox  :label="item.title"  v-model='item.show'></el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog_todos = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="todo_fun" size="mini">确 定</el-button>
      </div>
    </el-dialog>
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
      dialog_todos:false,
      form_todoLable:{
        checkList:[]
      },
      todoThings:[
        {title:'维修派工',value:'2',img:require('@/assets/hh.png'),color:'#1abc9c',show:true},
        {title:'维修处理',value:'6',img:require('@/assets/hh.png'),color:'#27ae60',show:true},
        {title:'借用执行',value:'45',img:require('@/assets/hh.png'),color:'#3498db',show:true},
        {title:'保养维护',value:'2',img:require('@/assets/hh.png'),color:'#8e44ad',show:true},
        {title:'科室巡检',value:'2',img:require('@/assets/hh.png'),color:'#34495e',show:true},
      ],
      sbgkArr:[
          {
            title:['再用设备','院内设备'],
            value:[672,906],
            percent:45,
            color:'color:#1abc9c',
            cc:"#1abc9c"
          },
          {
            title:['在保设备','买包设备'],
            value:[672,906],
            percent:45,
            color:'color:#2ecc71',
            cc:'#2ecc71'
          },
          {
            title:['重点设备','设备数量'],
            value:[672,906],
            percent:45,
            color:'color:#8c7ae6',
            cc:'#8c7ae6'
          },
          {
            title:['生命支持类','生命支持类'],
            value:[672,906],
            percent:45,
            color:'color:#2ecc71',
            cc:'#2ecc71'
          },
          {
            title:['大型设备','院内设备'],
            value:[672,906],
            percent:45,
            color:'color:#8e44ad',
            cc:'#8e44ad'
          }
      ],
      chart: null,
      pipCharOne:null,
      pipCharArr:{
          one:{}
      },
      table_cx:[],
      tableData:[],
      table_chicang:[],
      line_lelect1:"",
      line_lelect2:"",
      line_lelect3:"",
      line_lelect4:"",
      line_char1:null,
      line_char2:null,
      line_char3:null,
      line_char4:null,
      line_lelect2:"",
      line_lelect3:"",
      line_lelect4:"",
      four_lineArr:[
        {}
      ]
    }
  },
  mounted() {
    setTimeout(()=>{
        this.myLineChar(this.line_lelect1,'char_line_1')
        this.myLineChar(this.line_lelect2,'char_line_2')
        this.myLineChar(this.line_lelect3,'char_line_3')
        this.myLineChar(this.line_lelect4,'char_line_4')
    },500)


    //  setTimeout(() => window.onresize = () => {
    //     this.$message('bianbian ')
    //     // this.line_char1.resize()
    //     this.myLineChar(this.line_lelect1,'char_line_1').resize()
    //     // this.myLineChar(this.line_lelect2,'char_line_2')
    //     // this.myLineChar(this.line_lelect3,'char_line_3')
    //     // this.myLineChar(this.line_lelect4,'char_line_4')
    //     // ...
    //   }, 2000)
    
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    todo_fun(){
        console.log(this.form_todoLable)
        this.dialog_todos = false
    },
    myLineChar(char,id){
        char = echarts.init(document.getElementById(id))
        char.setOption({
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
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
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: [
              {type: 'value',
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
          }}
            ],
            series: [
                {
                    name: '邮件营销',
                    type: 'line',
                    stack: '总量',
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: '联盟广告',
                    type: 'line',
                    stack: '总量',
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: '视频广告',
                    type: 'line',
                    stack: '总量',
                    data: [150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name: '直接访问',
                    type: 'line',
                    stack: '总量',
                    data: [320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name: '搜索引擎',
                    type: 'line',
                    stack: '总量',
                    data: [820, 932, 901, 934, 1290, 1330, 1320]
                }
            ]
        })
    },
    
  }
}
</script>
<style >
    .mycard>.el-card__body{
      height:90px;
      padding: 0px;
      display: flex;
      align-items: center;
    }
    .mycard>.el-card__body>div:first-child{
      width: 90px;
      height: 100%;
      background: rebeccapurple;
    }
    .mycard>.el-card__body>div:nth-child(2){
      width: 100%;
      text-align: center;
    }
    .mycard>.el-card__body>div:nth-child(2)>p:first-child{
        font-size: 30px;
    }
    .mycard>.el-card__body>div:nth-child(2)>p:nth-child(2){
        font-size: 12px;
    }
    .sbgk{
      width: 150px;
      height: 200px;
      text-align: center;
      position: relative;
    }
    .sbgk>div:first-child{
      position: absolute;
      top:40px;
      text-align: center;
      width: 100%;
    }
    .sbgk>div:first-child>p:first-child{
      font-size: 22px;
      color: aquamarine;
    }
    .sbgk>div:first-child>p:nth-child(2){
        font-size: 15px;
    }
    .sbgk>div:nth-child(3)>p{
        font-size: 15px;
    }
    .mycard_line .el-card__body{
        padding: 5px;
    }
</style>
