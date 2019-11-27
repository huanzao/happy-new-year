<template>
    <div class="login">
        <h3></h3>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item style="text-align:left;color:#fff">
              <h2>登录</h2>
          </el-form-item>
          <el-form-item label="账号" prop="pass">
            <el-input type="text" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" @keyup.enter.native="submitForm('ruleForm')"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" >提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
    </div>
</template>
<script>
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账号'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再输入密码'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        var cookie='name'+encodeURIComponent('赵欢欢')
        cookie+=";max-age="+10
        document.cookie=cookie

        this.$router.push('/main/echarts')
        // this.$refs[formName].validate((valid) => {
        //   if (valid) {
        //      //**** */
        //      let postData = this.$qs.stringify({
        //         'account':this.ruleForm.pass,
        //         'password':this.ruleForm.checkPass,
        //      });
        //      this.axios.post('api/login',postData).then((res)=>{
        //         if(res.data.success==0){
        //             this.$message.error("用户名或密码错误");
        //         }else{
        //             sessionStorage.user=this.ruleForm.pass            
        //             this.$router.push('/main/order_sure')
        //             this.$message.success("登录成功");
        //         }
        //     })
        //   } else {
        //     return false;
        //   }
        // });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style scoped>
    .login{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        background-image: url('../assets/login-bg_meitu_1.jpg');
        background-repeat:no-repeat;
        background-size:100% 100%;
    }
    .el-form-item{
        width: 450px
    }
    .demo-ruleForm{
      padding-left: 50%
    }
</style>>