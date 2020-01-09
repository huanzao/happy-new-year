<template>
    <div class="box">
        <h2>Login</h2>
        <form autocomplete="off" >
            <div class="inputBox">
                <input type="text" name="" v-model="ruleForm.Account" autocomplete="off" required="请输入账号">
                <label for="">UserName</label>
            </div>
            <div class="inputBox">
                <input type="password" autocomplete="off" v-model="ruleForm.Password"  @keyup.enter='handLogin' name="" required="请输入密码">
                <label for="">PassWord</label>
            </div>
            <input type="button" value="Submit" @click="handLogin">
        </form>
    </div>
</template>
<script>
    import {mapMutations} from "vuex"
    export default {
        data(){
            return{
                url:'../../assets/bg1.jpg',
                ruleForm:{
                    Account:'',
                    Password:'' 
                }
            }
        },
        methods:{
            handLogin(){
                if(this.ruleForm.Account===""||this.ruleForm.Password===""){
                    this.$message.error("用户名或密码都不得为空");
                }else{
                    const loading = this.$loading({
                        lock: true,
                        text: '登录中，请稍后',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.2)'
                    });
                    let postData = this.$qs.stringify(this.ruleForm)
                    this.axios.post('api/login',postData,{timeout:5000}).then((res)=>{
                        loading.close()
                        console.log(res)
                        localStorage.token=res.data.token
                        localStorage.user=this.ruleForm.Account
                        if(res.data.response==="fail"){
                            this.$message.error("用户名或密码错误");
                        }else{       
                            this.$router.push('/main/echarts')
                            this.$message.success("登录成功");
                        }
                    }).catch((err)=>{
                        loading.close()  
                        this.$notify.error({
                        title: '网路错误',
                        message: '网路波动，请稍后再试'
                        }) 
                    })
                }
                
            }
        }
    }
</script>
<style >
    body{
             margin: 0;
             padding: 0;
             font-family: sans-serif;
             background-image: url('../assets/bg1.jpg');
             background-size:cover;
             background-position: 10% 22%;
         }
         .box{
             position: absolute;
             top:50%;
             left: 50%;
             transform: translate(-50%,-50%);
             width: 400px;
             padding: 40px;
             padding-top:20px; 
             background: rgba(0,0,0,.8);
             box-sizing: border-box;
             border-radius: 10px;
             -webkit-box-reflect: below 1px linear-gradient(transparent,#000);
         }
         .box h2{
             margin: 0;
             padding: 0;
             color: #fff;
             text-align: center;
             padding-bottom: 20px
         }
         .box .inputBox{
             position: relative;
         }
         .box .inputBox input{
             width: 100%;
             padding: 10px 0;
             font-size: 19px;
             color: #fff;
             border: 0;
             border-bottom:1px solid #fff;
             margin-bottom:30px;
             outline: none;
             background: transparent;
         }
         .box .inputBox label{
             position: absolute;
             top: 0;
             left: 0;
             padding: 10px 0;
             font-size: 16px;
             color: #fff;
             pointer-events: none;
             transition: .5s;
         }
         .box .inputBox input:focus~label,
         .box .inputBox input:valid~label{
             top:-26px;
             left: 0;
             color: #03a9f4;
             font-size: 12px;
         }
         .box input[type='button']{
             background: transparent;
             border:none;
             outline: none;
             color: #fff;
             background: #03a9f4;
             padding: 10px 20px;
             cursor: pointer;
             border-radius:5px;
             width: 100%;
         }
         .box input[type='button']:hover{
             background-color: #2b95db;
         }
         .box input[type='button']:active{
             background-color: #3498db;
         }
         /* input:-webkit-autofill{
            -webkit-box-shadow: 0 0 0 1000px rgba(0,0,0,.8) inset; 
            -webkit-text-fill-color: #fff; 
           
        }
        input[type=text]:focus, input[type=password]:focus{
            -webkit-box-shadow: 0 0 0 1000px rgba(0,0,0,.8) inset; 
            -webkit-text-fill-color: #fff;
        } */
</style>