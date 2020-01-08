<template>
    <div style="text-align:left;background:#fff">
          <el-page-header @back="myCancel" content="添加股票"></el-page-header>
          <el-divider></el-divider>
        <div style="width:60%;padding:20px 0 20px 0">
        <el-form :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
            
            <el-form-item label="交易日期">
                
                <el-date-picker
                v-model="time"
                type="date"
                size="mini"
                value-format="yyyyMMdd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="搜索">
                  <div class="srarch_result">
                  <el-input placeholder="请输入股票名称或股票代码" @focus="focusfns" size="mini" v-model="searchkey" @keyup.enter.native="search" style="top: 7px;" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search" @click='search'></el-button>
                  </el-input>
                  <div v-if="box_show" class="search_title" style="position:absolute;top:40px;height:43px;z-index:12;"><span>股票名称</span><span>股票代码</span></div>
                  <ul v-if="box_show"  class="ulstyle">
                      <li v-for="(item,key)  in search_res"  :key='key' @click='liclick(item)'>
                        <span>{{ item.name }}</span> 
                        <span>{{ item.symbol }}</span>
                      </li>
                  </ul>
            </div>
            </el-form-item>
            
            <el-form-item label="股票代码">
                <el-input v-model="ruleForm.symbol" size="mini"  autocomplete="off" disabled ></el-input>
            </el-form-item>
            <el-form-item label="股票名称 ">
                <el-input v-model="ruleForm.name" size="mini"  autocomplete="off"  disabled></el-input>
            </el-form-item>
            <el-form-item label="所在地域">
                <el-input v-model="ruleForm.area" size="mini"  autocomplete="off" disabled ></el-input>
            </el-form-item>
            <el-form-item label="所属行业">
                <el-input v-model="ruleForm.industry" size="mini"  autocomplete="off" disabled ></el-input>
            </el-form-item>
            <el-form-item label="股票全称">
                <el-input v-model="ruleForm.fullname" size="mini"  autocomplete="off" disabled ></el-input>
            </el-form-item>
            <el-form-item label="英文全称">
                <el-input v-model="ruleForm.enname" size="mini"  autocomplete="off" disabled ></el-input>
            </el-form-item>
            <el-form-item label="市场类型">
                <el-input v-model="ruleForm.market" size="mini"  autocomplete="off" disabled ></el-input>
            </el-form-item>
            <el-form-item label="交易所代码">
                <el-input v-model="ruleForm.exchange" size="mini"  autocomplete="off" disabled ></el-input>
            </el-form-item>
            <el-form-item label="交易货币">
                <el-input v-model="ruleForm.currType" size="mini"  autocomplete="off" disabled ></el-input>
            </el-form-item>
            <el-form-item label="上市状态">
                <el-input v-model="ruleForm.listStatus" size="mini"  autocomplete="off" disabled ></el-input>
            </el-form-item>
            <el-form-item label="上市日期">
                <el-input v-model="ruleForm.listDate" size="mini"  autocomplete="off" disabled ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="mini" @click="myaddUpload">提交</el-button>
                <el-button @click="myCancel" size="mini">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
    </div>
</template>
<script>
import {myCancel} from '../../assets/comon'
export default {
    data(){
        return{
            searchkey:'',
            search_res:[],
            box_show:false,
            time:'',
            ruleForm:{
            },
            uploadForm:{
              dealdata :'',
              stockcode:''
            },
            rules: {
              name:[
                {required:true,message:'不能为空',tirgger:'blur'}
              ]
            },
        }
    },
    mounted(){
         
    },
    methods:{
      myCancel,
      focusfns(){
        if(this.search_res.length>0){
            this.box_show=true
        }
      },
      search(){
        let params={'stockargs':this.searchkey}
          const loading = this.$loading({
              lock: true,
              text: '正在请求数据，请稍后',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.5)'
          });
          this.axios({
              method: 'post',
              headers:{'Authorization':'Bearer '+localStorage.token},
              timeout:5000,
              url: 'api/Stock/SelectStock',
              data:this.$qs.stringify(params)
          }).then((res)=>{
              loading.close()
              console.log(res)
              if(res.data.results.length==0){
                  this.$message("暂无数据");
                  this.box_show=false
              }else{
                console.log(res)
                this.search_res=res.data.results
                this.box_show=true
              }
          }).catch((err)=>{
              loading.close()
              console.log(err)
              this.$notify.error({
                title: '登录过期',
                message: '登录过期，请重新登录'
              })
              setTimeout(()=>{
                this.$router.push('/')
              },1000)
          })
      },
      liclick(value){
          this.ruleForm=value
          this.box_show=false
          this.uploadForm.dealdata=this.time
          this.uploadForm.stockcode=value.symbol
      },
      myaddUpload(){
        
          if(this.uploadForm.dealdata===''||this.uploadForm.dealdata===''){
                this.$message({
                    showClose: true,
                    message: '交易时间和股票代码不能为空',
                    type: 'warning'
                  }); 
          }else{
            const loading = this.$loading({
              lock: true,
              text: '正在提交，请稍后',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.5)'
          });
              this.axios({
              method: 'post',
              headers:{'Authorization':'Bearer '+localStorage.token},
              timeout:5000,
              url: 'api/Stock/AddDealStock',
              data:this.$qs.stringify(this.uploadForm)
          }).then((res)=>{
              loading.close()
              console.log(res)
              if(res.data.response==="success"){
                  this.$message({
                    showClose: true,
                    message:res.data.results,
                    type: 'success'
                  });
                  setTimeout(()=>{
                    window.history.go(-1)
                  },1000)
              }else{
                  this.$message({
                    showClose: true,
                    message: res.data.results,
                    type: 'warning'
                  });
              }
          }).catch((err)=>{
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
      }
    }
}
</script>
<style >
    .search_title{
      background: #E9EEF3;
      border-bottom:1px solid rebeccapurple;
      height: 42px;
      top: 40px;
    }
    .search_title>span{
      display: inline-block;
      width: 120px;
      padding-left: 33px;
      font-weight: bold;
      line-height: 47px;
    }
</style>
