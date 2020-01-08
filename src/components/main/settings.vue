<template>
    <div>
        <div class="pageHead">
            <span>系统设置</span>
        </div>
        <div style="padding:15px;background:#fff;margin-top:30px;padding-top:5px">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="策略设置" name="first">
                        <el-table :data="tableData" style="width: 100%;">
                            <el-table-column label="券商ID" width="180" prop="q_Id"></el-table-column>
                            <el-table-column label="券商名称" width="180" prop="name"></el-table-column>
                            <el-table-column label="IP/端口" width="180" >
                                <template slot-scope="scope">
                                    <span >{{ scope.row.ip+':'+scope.row.port }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="客户端版本" width="180" prop="clientVersion"></el-table-column>
                            <el-table-column label="创建时间" width="180" prop="createtime"></el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button size="mini" type="success" @click="tactics(scope.row)">策略</el-button>
                                    <el-button size="mini" type="warning" @click="mySell(scope.$index,scope.row.name,{RoleId:scope.row.id},'','')">出售</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
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
                </el-tab-pane>
                <el-tab-pane label="时间设置" name="second">
                    <el-card class="box-card" shadow="always" style="width:50%;margin:10px">
                        <div slot="header" class="clearfix">
                            <span>买入时间</span>
                            <el-button style="float: right; padding: 3px 0;margin:-8px" type="text"  @click="setTime_show(0)">修改</el-button>
                        </div>
                        <div>
                            <span>每天 {{searchData.buyTime[0]+'-'+searchData.buyTime[1]}}</span>  
                        </div>
                    </el-card>
                    <el-card class="box-card" shadow="always" style="width:50%;margin:10px">
                        <div slot="header" class="clearfix">
                            <span>出售时间</span>
                            <el-button style="float: right; padding: 3px 0;margin:-8px" type="text"  @click="setTime_show(1)">修改</el-button>
                        </div>
                        <div class="text item" style="line-height:20px">
                            <span>每天  {{searchData.sellTime[0]+'-'+searchData.sellTime[1]}}</span> 
                        </div>
                    </el-card>
                </el-tab-pane>
            </el-tabs>   
        </div>
        
        <el-dialog class="myDialog" title="时间设置" :visible.sync="setTime">
            <el-form>
                <el-form-item  :label="setTime_tile" :label-width="formLabelWidth">
                    <el-time-picker is-range
                        v-model="dialog_time"
                        value-format="HH:mm:ss"
                        size="mini"
                        range-separator="至"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
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
                <el-form-item label="区间选择" :label-width="formLabelWidth">
                    <el-select v-model="celueData.section" size='mini' placeholder="请选择">
                        <el-option-group
                        v-for="group in options"
                        :key="group.label"
                        :label="group.label">
                        <el-option
                            v-for="item in group.options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                        </el-option-group>
                    </el-select>
                </el-form-item>
               
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="setTactics = false">取 消</el-button>
                <el-button size="mini" type="primary" >确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import {myInit,handleSizeChange,handleCurrentChange} from '../../assets/comon'
import {mySell} from '../../assets/myaxios'
export default {
    data() {
      return {
        activeName:"first",
        currentPage:1,
        pagesize:10,
        totalpage:0, 

        setTime: false,
        time_witch:0,
        setTactics:false,
        setTime_tile:'出售时间',
        isSearch:false,
        celueTitle:'',
        dialog_time:'',
        searchData: {
            buyTime:['09:30:00','09:31:00'],
            sellTime:['09:25:00','09:26:00']
        },
        celueData:{
            section:'',
        },
        formLabelWidth: '120px',  
        tableData: [],
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
      this.myInit('api/Bond/ShowCo',{IndexPage:"1",PageSize:"10"})
    },
    methods:{
      mySell,  
      myInit,
      handleSizeChange,
      handleCurrentChange,
      tactics(row){
          this.celueTitle=row.name+'股票策略修改'
          this.setTactics=true
          console.log(row)
      },
      tactics_upload(){
          this.setTactics=false
      },
      handleClick(){
          console.log('切换')
      },
      setTime_show(type){
          if(type===0){
                this.setTime_tile='买入时间'
                this.dialog_time=this.searchData.buyTime
          }else if(type===1){
                this.dialog_time=this.searchData.sellTime
                this.setTime_tile='出售时间'
          }
          this.setTime=true
      },
      globle_setTime(){
          if(this.setTime_tile==='买入时间'){
              this.searchData.buyTime=this.dialog_time
          }else if(this.setTime_tile==='出售时间'){
              this.searchData.sellTime=this.dialog_time
          }
          this.setTime=false
          console.log(this.searchData)
      }
    }
  }
</script>
<style>
</style>
