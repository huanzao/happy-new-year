<template>
    <div style="text-align:left;background:#fff">
          <el-page-header @back="myCancel" content="编辑券商"></el-page-header>
          <el-divider></el-divider>
        <div style="width:60%;padding:20px 0 20px 0">
        <el-form :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            
    
            <el-form-item label="券商名称">
                <el-input v-model="ruleForm.Name" size="mini"  autocomplete="off" ></el-input>
            </el-form-item>
            <el-form-item label="IP">
                <el-input v-model="ruleForm.Ip" size="mini"  autocomplete="off" ></el-input>
            </el-form-item>
            <el-form-item label="端口" >
                <el-input v-model="ruleForm.Port" size="mini"  autocomplete="off" ></el-input>
            </el-form-item>
            <el-form-item label="券商ID" >
                <el-input v-model="ruleForm.Q_Id" size="mini"  autocomplete="off" ></el-input>
            </el-form-item>
            <el-form-item label="客户端版本" >
                <el-input v-model="ruleForm.ClientVersion" size="mini"  autocomplete="off" ></el-input>
            </el-form-item>
            
            <el-form-item>
                <el-button type="primary" size="mini" @click="addUpload('api/Bond/UpdateCo','ruleForm')">提交</el-button>
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
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            if (this.ruleForm.RePassword !== '') {
              this.$refs.ruleForm.validateField('RePassword');
            }
            callback();
          }
        };
        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.ruleForm.Password) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };
        return{
            WatchOrganize:"",
            search_res:"",
            searchkey:'',
            area_options:'',
            box_show:false,
            organSelect:[],
            roleEslect:[],
            area_role:'',
            ruleForm:{
              Q_Id:'',
              Name:"",
              Ip:"",
              Port :"",
              ClientVersion:""
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
    mounted(){
       console.log(this.$route.params.row)
       this.ruleForm.Id=this.$route.params.row.id
       this.ruleForm.Name=this.$route.params.row.name
       this.ruleForm.Ip=this.$route.params.row.ip
       this.ruleForm.Port=this.$route.params.row.port
       this.ruleForm.Q_Id=this.$route.params.row.q_Id

       this.ruleForm.ClientVersion=this.$route.params.row.clientVersion
    },
    methods:{
      addUpload,
      myCancel,
    }
}
</script>
<style >
    
</style>
