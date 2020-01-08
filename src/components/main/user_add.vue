<template>
    <div style="text-align:left;background:#fff">
          <el-page-header @back="myCancel" content="添加用户"></el-page-header>
          <el-divider></el-divider>
        <div style="width:60%;padding:20px 0 20px 0">
        <el-form :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <!-- <el-form-item label="机构" prop="Organize">
                <el-select v-model="WatchOrganize" size="mini">
                    <el-option :label="item.orName" :value="item.id" v-for="(item,key) in organSelect" :key='key'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="地区" prop="Area">
                <el-select v-model="ruleForm.Area" size="mini" v-if='WatchOrganize'>
                    <el-option :label="item.areaname" :value="item.areaid" v-for="(item,key) in area_role.results" :key='key'></el-option>
                </el-select>
                <el-input  size="mini"  autocomplete="off" disabled placeholder="请先选择机构" v-if='!WatchOrganize'></el-input>
            </el-form-item>
            <el-form-item label="部门" prop="Department">
                <el-select v-model="ruleForm.Department" size="mini" v-if='WatchOrganize'  >
                    <el-option :label="item.dename" :value="item.deid" v-for="(item,key) in area_role.resultstwo" :key='key'></el-option>
                </el-select>
                <el-input  size="mini"  autocomplete="off" disabled placeholder="请先选择机构" v-if='!WatchOrganize'></el-input>
            </el-form-item> -->
            
            
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
            options: [{
                value: '1',
                label: '黄金糕'
              }, {
                value: '2',
                label: '双皮奶'
              }, {
                value: '1',
                label: '蚵仔煎'
              }, {
                value: '1',
                label: '龙须面'
              }, {
                value: '1',
                label: '北京烤鸭'
              }
            ],
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
        this.axios({
          method: 'post',
          headers:{'Authorization':'Bearer '+localStorage.token},
          url: 'api/People/SelectOrgan',
        }).then((res)=>{
            console.log('初始化数据22229-------',res)
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
      WatchOrganize:function(value){
        let id=value
        console.log('......',id)
        console.log("test",value)
        this.ruleForm.Organize=value
        this.axios({
          method: 'post',
          headers:{'Authorization':'Bearer '+localStorage.token},
          url: 'api/People/SelectOrgan',
          data:this.$qs.stringify({OrganId:id})
        }).then((res)=>{
            console.log('初始化数据2222222-------',res)
            this.area_role=res.data
        }).catch((err)=>{
            this.$notify.error({
              title: '登录过期',
              message: '登录过期，请重新登录'
            })
            setTimeout(()=>{
              this.$router.push('/')
            },1000)
        })

      }
    },
    methods:{
      addUpload,
      myCancel,
      handclickgs(value){
          console.log(3333,value)
      },
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
              console.log(res.data)
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
