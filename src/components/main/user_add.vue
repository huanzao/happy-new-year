<template>
    <div style="text-align:left;background:#fff">
          <el-page-header @back="myCancel" content="添加用户"></el-page-header>
          <el-divider></el-divider>
        <div style="width:60%;padding:20px 0 20px 0">
        <el-form :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="角色" prop="Role">
                <el-select v-model="ruleForm.Role" size="mini">
                    <el-option :label="item.rolename" :value="item.id" v-for="(item,key) in roleEslect" :key='key'></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="登录名" prop="Account">
                <el-input v-model="ruleForm.Account" size="mini"  autocomplete="off" ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="Password">
                <el-input v-model="ruleForm.Password" size="mini"  type="password"  autocomplete="off" ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="RePassword">
                <el-input v-model="ruleForm.RePassword" size="mini" type="password"  autocomplete="off" ></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="Name">
                <el-input v-model="ruleForm.Name" size="mini" ></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="Tel">
                <el-input v-model="ruleForm.Tel" size="mini" ></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="Phone">
                <el-input v-model="ruleForm.Phone" size="mini" ></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="Email">
                <el-input v-model="ruleForm.Email" size="mini" ></el-input>
            </el-form-item>
            
            <el-form-item label="备注" prop="Remark">
                <el-input v-model="ruleForm.Remark" type="textarea" size="mini" ></el-input>
            </el-form-item>
            
            <el-form-item>
                <el-button type="primary" size="mini" @click="addUpload('api/People/AddPeople','ruleForm')">提交</el-button>
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
              Account:"",
              Password:"",
              RePassword:"",
              Name:"",
              Tel:"",
              Phone:"",
              Email:"",
              Role:"",
              Area:'',
              Organize:"",
              Department:"",
              Remark:"",
            },
            rules: {
              Role: [
                {type: 'number',required:true,message:'不能为空',tirgger:'change'}
              ],
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
    beforeMount(){
        this.axios({
          method: 'post',
          headers:{'Authorization':'Bearer '+localStorage.token},
          url: 'api/People/SelectOrgan',
        }).then((res)=>{
            this.organSelect=res.data.results
            this.roleEslect=res.data.resultstwo
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
    watch:{
      
    },
    methods:{
      addUpload,
      myCancel,
      search(){
          const loading = this.$loading({
              lock: true,
              text: 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
          });
          let param = new URLSearchParams()
          param.append(this.select, this.searchkey)
          this.axios({
              method: 'post',
              url: 'api/search_xhmc',
              data: param
          }).then((res)=>{
              loading.close()
              if(res.data.result.length==0){
                  this.$message("暂无数据");
                  this.box_show=false
              }else{
                  this.search_res=res.data.result
                  this.area_options=res.data.area
                  this.box_show=true
              }
          }).catch((res)=>{
              loading.close()
              this.$notify.error({
                title: '错误',
                message: '政府网站崩溃，请稍后再试'
              })
          })

      },
    }
}
</script>
<style >
    
</style>
