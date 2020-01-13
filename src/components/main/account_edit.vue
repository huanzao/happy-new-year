<template>
    <div style="text-align:left;background:#fff">
          <el-page-header @back="myCancel" content="编辑证券用户"></el-page-header>
          <el-divider></el-divider>
        <div style="width:60%;padding:20px 0 20px 0">
        <el-form :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户">
                <el-select v-model="ruleForm.UserId" size="mini" style="width:100%" filterable placeholder="请选择">
                    <el-option v-for="(item,key) in people_options" :key="key" :label="item.username" :value="item.userid"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="账号">
                <el-input v-model="ruleForm.Account" size="mini"  autocomplete="off" ></el-input>
            </el-form-item>
            
            <el-form-item label="营业部">
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
            <el-form-item label="姓名">
                <el-input v-model="ruleForm.Name" size="mini" ></el-input>
            </el-form-item>
            <el-form-item label="资金账号" prop="ZijinAccount">
                <el-input v-model="ruleForm.ZijinAccount"  size="mini" ></el-input>
            </el-form-item>
            <el-form-item label="策略">
                <el-select v-model="watct_set" size="mini" >
                  <el-option :label="item.name" :value="item.id" v-for="(item,key) in this.$route.params.options" :key='key'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注" prop="Comments">
                <el-input v-model="ruleForm.Comments" type="textarea" size="mini" ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="mini" @click="addUpload('api/Bond/UpadateAc','ruleForm')">提交</el-button>
                <el-button @click="myCancel" size="mini">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
    </div>
</template>
<script>
import {addUpload,myCancel} from '../../assets/comon'
export default {
    data(){
        var validatePass = (rule, value, callback) => {
            if (this.ruleForm.RePassword !== '') {
              this.$refs.ruleForm.validateField('RePassword');
            }
            callback();
        };
        var validatePass2 = (rule, value, callback) => {
          if (value !== this.ruleForm.Password) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };
        return{
            QuanShangSlect:[],
            people_options:[],
            watch_qs:[],
            watct_set:'',
            watch_set_num:0,
            watch_qs_num:0,
            ruleForm:{
              set_id:'',
              UserId:'',
              Q_Id:'',
              Ac_Id:'',
              Account:"",
              Password:"",
              CommPassword:'',
              YingyebuId:"",
              Cat:"",
              QuanshangId:"",
              Name:"",
              Comments:"",
              ZijinAccount:''
            },
            rules: {
              Password: [
                {required:true,validator: validatePass, trigger: 'blur' }
              ],
              RePassword: [
                {required:true,validator: validatePass2, trigger: 'blur' }
              ],
              Account:[
                {required:true,message:'不能为空',tirgger:'blur'}
              ],
              name:[
                {required:true,message:'不能为空',tirgger:'blur'}
              ],
              logname:[
                {required:true,message:'不能为空',tirgger:'blur'}
              ],
              password:[
                {required:true,message:'不能为空',tirgger:'blur'}
              ],
              repassword:[
                {required:true,message:'不能为空',tirgger:'blur'}
              ]
            },
        }
    },
    watch:{
        watch_qs:function(value){
            this.watch_qs_num++
            if(this.watch_qs_num===1){
              return
            }
            console.log(this.watch_qs_num,'watch........',value)
            console.log(this.QuanShangSlect,)

            this.ruleForm.QuanshangId=this.QuanShangSlect[value].q_Id
            this.ruleForm.Q_Id=this.QuanShangSlect[value].id
        },
        watct_set:function(value){
            if(this.watch_set_num===0){
                this.watch_set_num=1
            }else{
                this.ruleForm.set_id=value
            }
        }
    },
    mounted(){
        console.log(this.$route.params)

        this.watch_qs=this.$route.params.row.bondname
        this.ruleForm.UserId=this.$route.params.row.userid
        this.ruleForm.Q_Id=this.$route.params.row.qid


        this.ruleForm.Account=this.$route.params.row.acAccount
        this.ruleForm.YingyebuId=this.$route.params.row.yybid
        this.ruleForm.Cat=this.$route.params.row.cat
        this.ruleForm.QuanshangId=this.$route.params.row.bondid
  
        this.ruleForm.Name=this.$route.params.row.acname
        this.ruleForm.Comments=this.$route.params.row.remark
        this.ruleForm.ZijinAccount=this.$route.params.row.zijinAccount
        this.ruleForm.Ac_Id=this.$route.params.row.acId
        this.ruleForm.set_id=this.$route.params.row.set_id
        this.watct_set=this.$route.params.row.set_name

        this.axios({
          method: 'post',
          headers:{'Authorization':'Bearer '+localStorage.token},
          url: 'api/Organ/SelectArea',
        }).then((res)=>{
            console.log('初始化数据1111-------',res)
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
            console.log('初始化数据-aaaaaa-------',res)
            this.QuanShangSlect=res.data.result
            
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
      addUpload,
      myCancel,
    }
}
</script>
<style >
    
</style>
