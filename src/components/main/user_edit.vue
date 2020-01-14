<template>
    <div style="text-align:left;background:#fff">
          <el-page-header @back="myCancel" content="编辑用户"></el-page-header>
          <el-divider></el-divider>
        <div style="width:60%;padding:20px 0 20px 0">
        <el-form :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="角色" prop="Role">
                <el-select v-model="watch_role" size="mini">
                    <el-option  v-for="(item,key) in roleEslect" :key='key' :label="item.rolename" :value="item.id" ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="登录名" >
                <el-input v-model="ruleForm.Account" size="mini"  disabled autocomplete="off" ></el-input>
            </el-form-item>
            <el-form-item label="姓名" >
                <el-input v-model="ruleForm.Username" size="mini" ></el-input>
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
                <el-button type="primary" size="mini" @click="addUpload('api/People/UpdatePeople','ruleForm')">提交</el-button>
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
        return{
            area_options:'',
            box_show:false,
            organSelect:[],
            roleEslect:[],
            area_role:'',
            watch_role:'',
            watch_role_num:0,
            ruleForm:{
                Id:'',
                Roleid:'',
                Account:'',
                Username:'',
                Email:'',
                Phone:'',
                Tel:'',
                Remark:''
            },
            rules: {
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
        watch_role:function(value){
            if(this.watch_role_num===0){
              this.watch_role_num=1
            }else{
              this.ruleForm.Roleid=value
            }
        }
    },
    mounted(){
        this.axios({
          method: 'post',
          headers:{'Authorization':'Bearer '+localStorage.token},
          url: 'api/People/SelectOrgan',
        }).then((res)=>{
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

        this.watch_role=this.$route.params.row.rolename

        this.ruleForm.Id=this.$route.params.row.peopleid
        this.ruleForm.Account=this.$route.params.row.account
        this.ruleForm.Username=this.$route.params.row.username
        this.ruleForm.Phone=this.$route.params.row.phone
        this.ruleForm.Tel=this.$route.params.row.tel
        this.ruleForm.Email=this.$route.params.row.email
        this.ruleForm.Roleid=this.$route.params.row.roleid
        this.ruleForm.Remark=this.$route.params.row.remark
    },
    methods:{
      addUpload,
      myCancel,
    }
}
</script>
<style >
    
</style>
