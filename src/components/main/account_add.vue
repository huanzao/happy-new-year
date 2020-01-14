<template>
    <div style="text-align:left;background:#fff">
          <el-page-header @back="myCancel" content="添加证券用户"></el-page-header>
          <el-divider></el-divider>
        <div style="width:60%;padding:20px 0 20px 0">
        <el-form :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户" prop="UserId">
                <el-select v-model="ruleForm.UserId" size="mini" style="width:100%" filterable placeholder="请选择">
                    <el-option v-for="(item,key) in people_options" :key="key" :label="item.username" :value="item.userid"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="账号" prop="Account">
                <el-input v-model="ruleForm.Account" size="mini"  autocomplete="off" ></el-input>
            </el-form-item>
            <el-form-item label="营业部" prop="YingyebuId">
                <el-input v-model="ruleForm.YingyebuId" size="mini" ></el-input>
            </el-form-item>
            <el-form-item label="种类" prop="Cat">
                <el-input v-model="ruleForm.Cat" size="mini" ></el-input>
            </el-form-item>
            <el-form-item label="券商" >
                <el-select v-model="watch_qs" size="mini" >
                  <el-option :label="item.name" :value="key" v-for="(item,key) in QuanShangSlect" :key='key'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="姓名" prop="Name">
                <el-input v-model="ruleForm.Name" size="mini" ></el-input>
            </el-form-item>
            <el-form-item label="资金账号" prop="ZijinAccount">
                <el-input v-model="ruleForm.ZijinAccount"  size="mini" ></el-input>
            </el-form-item>
            <el-form-item label="策略" prop="set_id">
                <el-select v-model="ruleForm.set_id" size="mini" >
                  <el-option :label="item.name" :value="item.id" v-for="(item,key) in this.$route.params.options" :key='key'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注" prop="Comments">
                <el-input v-model="ruleForm.Comments" type="textarea" size="mini" ></el-input>
            </el-form-item>
            
            <el-form-item>
                <el-button type="primary" size="mini" @click="addUpload2('api/Bond/AddAc','ruleForm')">提交</el-button>
                <el-button @click="myCancel" size="mini">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
    </div>
</template>
<script>
import {addUpload2,myCancel} from '../../assets/comon'
export default {
    data(){
        
        return{
            QuanShangSlect:[],
            people_options:[],
            watch_qs:'',
            ruleForm:{
              set_id:'',
              UserId:'',
              QId:'',
              Account:"",
              Password:"",
              CommPassword:"",
              
              YingyebuId:"",
              Cat:"",
              QuanshangId:"",
              
              Name:"",
              Comments:"",
              ZijinAccount:''
            },
            rules: {
              UserId:[
                {required:true,type:'number',message:'不能为空',tirgger:'change'}
              ],
              Account:[
                {required:true,message:'不能为空',tirgger:'blur'}
              ],
              YingyebuId:[
                {required:true,message:'不能为空',tirgger:'blur'}
              ],
              Cat:[
                {required:true,message:'不能为空',tirgger:'blur'}
              ],
              watch_qs:[
                {required:true,type:'number',message:'不能为空',tirgger:'change'}
              ],
              Name:[
                {required:true,message:'不能为空',tirgger:'blur'}
              ],
              ZijinAccount:[
                {required:true,message:'不能为空',tirgger:'blur'}
              ],
              set_id:[
                {required:true,type:'number',message:'不能为空',tirgger:'change'}
              ]
            },
        }
    },
    watch:{
        watch_qs:function(value){
            this.ruleForm.QuanshangId=this.QuanShangSlect[value].id
            this.ruleForm.QId=this.QuanShangSlect[value].q_Id
        }
    },
    mounted(){
         this.axios({
          method: 'post',
          headers:{'Authorization':'Bearer '+localStorage.token},
          url: 'api/Organ/SelectArea',
        }).then((res)=>{
            this.people_options=res.data.resultstwo
        }).catch((err)=>{
            this.$notify.error({
              title: '登录过期',
              message: '登录过期，请重新登录'
            })
            setTimeout(()=>{
              this.$router.push('/')
            },1000)
        })

        this.axios({
          method: 'post',
          headers:{'Authorization':'Bearer '+localStorage.token},
          url: 'api/Bond/ShowCo',
          data:this.$qs.stringify({IndexPage:"1",PageSize:"10"})
        }).then((res)=>{
            this.QuanShangSlect=res.data.results
        }).catch((err)=>{
            this.$notify.error({
              title: '登录过期',
              message: '登录过期，请重新登录'
            })
            setTimeout(()=>{
              this.$router.push('/')
            },1000)
        })
    },
    methods:{
      addUpload2,
      myCancel,
    }
}
</script>
<style >
    
</style>
