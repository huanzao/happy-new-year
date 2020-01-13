<template>
    <div>
        <div class="pageHead">
            <span>系统设置</span>
            <el-tooltip class="item" effect="dark" content="添加" placement="bottom-end">
                <el-button size="mini" @click="new_myAdd('set_add')"  type="success" icon="el-icon-plus"></el-button>
            </el-tooltip>
        </div>
        <div style="padding:15px;background:#fff;padding-top:5px">
            <el-tabs v-model="activeName" @tab-click="handleClick" >
                <el-tab-pane label="策略设置" name="first">
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
                </el-tab-pane>
                <el-tab-pane label="时间设置" name="second">

                    <el-table :data="tableData" style="width: 100%;">
                        <el-table-column label="名称"  prop="seName"></el-table-column>
                        <el-table-column label="获取获取买入价格"  prop="getbuyTime"></el-table-column>
                        <el-table-column label="买入时间"  prop="buyTime" ></el-table-column>
                        <el-table-column label="获取卖出价格时间"  prop="getsaleTime"></el-table-column>
                        <el-table-column label="卖出时间"  prop="saleTime"></el-table-column>
                        <el-table-column label="启用">
                            <template slot-scope="scope" >
                                <div class="myRadio" @click='myRadio_fun(scope.row,scope.$index)' v-if="scope.row.used==1" style='color:#409EFF' ><i class="el-icon-success">启用</i></div>
                                <div class="myRadio" @click='myRadio_fun(scope.row,scope.$index)' v-else style='color:#909399' ><i class="el-icon-error">禁用</i></div>
                            </template>
                        </el-table-column>
                        
                        <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="myEdit(scope.row,'set_time_edit')">编辑</el-button>
                            <el-button size="mini" type="danger" @click="myDelete(scope.$index,'时间设置-'+scope.row.seName,{se_id:scope.row.id},'api/SettingsTime/Delete','api/SettingsTime/Show')">删除</el-button>
                        </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>   
        </div>
    </div>
</template>
<script>
import {myInit,myDelete,myEdit,myAdd,mySearch,handleSizeChange,handleCurrentChange} from '../../assets/comon'
import {mySell} from '../../assets/myaxios'
export default {
    data() {
      return {
        activeName:"first",
        formLabelWidth: '150px',
        used:0,  
        tableData:[],
        isQ:[0,1,0,0]
      }
    },
    mounted(){
         console.log('aaaaaaaabbbbbbbbbb',this.$route.params.id)
        if(this.$route.params.id==1){
            this.activeName='first'
            this.myInit('api/Settings/Show',{IndexPage:"1",PageSize:"100"})
        }else if(this.$route.params.id==2){
            this.activeName='second'
            this.myInit('api/SettingsTime/Show',{IndexPage:"1",PageSize:"100"})
        }
        
        console.log('aaaaaaaa',this.$route.query)
    },
    watch:{
        
    },
    methods:{
      mySell,  
      myInit,
      myInit,
      myDelete,  
      myEdit,
      myAdd,
      //tab栏切换函数
      handleClick(){
          console.log('切换')
          if(this.activeName==='first'){
              console.log('aaaaaaaa',this.$route.query)
              this.$router.push({path:'1'})
              this.myInit('api/Settings/Show',{IndexPage:"1",PageSize:"100"})
          }else if(this.activeName==='second'){
              console.log('aaaaaaaa',this.$route.params.id)
              console.log(4444444)
              this.myInit('api/SettingsTime/Show',{IndexPage:"1",PageSize:"100"})
              this.$router.push({path:'2'})
              this.tableData.forEach(function(item,i){
                  console.log(item,i)
              })
          }
      },
      //王祈年
      myRadio_fun(row,index){
          let firt=''
          let second=''
          console.log(row,index)
          if(row.used==1){
              return
          }if(row.used==0){
              let _this=this
              this.tableData.forEach(function(item,i){
                  console.log('qq',item,i)
                  if(item.used==1){
                      firt=item.id
                  }
                  _this.tableData[i].used=0
              })
              this.tableData[index].used=1
              second=this.tableData[index].id
              
              const loading = this.$loading({
                    lock: true,
                    text: '正在请求数据，求稍后',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.5)'
                });
                this.axios({
                method: 'post',
                headers:{'Authorization':'Bearer '+localStorage.token},
                timeout:5000,
                url: 'api/bond/settime',
                data:this.$qs.stringify({Id_one:second,Id_two:firt})
                }).then((res)=>{
                loading.close()
                    console.log(res)
                    if(res.data.response==="success"){
                        this.$message.success('设置成功')
                    }else{
                        this.$notify.error({
                            title: '错误',
                            message: '网路错误，请稍后再试'
                        })
                    }
                })
                .catch((error)=>{
                loading.close()
                    this.$notify.error({
                        title: '登录过期',
                        message: '登录过期，请重新登录'
                    })
                    setTimeout(()=>{
                        this.$router.push('/')
                    },1000)
                
                })




          }
          console.log(firt,second)
      },
      new_myAdd(){
          if(this.activeName==='first'){
              this.myAdd('set_add')
          }else if(this.activeName==='second'){
              this.myAdd('set_time_add')
          }
      },
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
                url: 'api/bond/settime',
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
    .myRadio{
        cursor: pointer;
    }
</style>
