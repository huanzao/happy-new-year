<template>
    
    <div style="text-align:left;background:#fff">
        <el-page-header @back="goBack" content="商品报价编辑"></el-page-header>
        <el-divider></el-divider>
        <div style="width:60%;padding:20px 0 20px 0">
        <el-form :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

            <el-form-item label="型号名称" prop="xhmc">
                <el-input v-model="ruleForm.xhmc" size="mini" :disabled="true"></el-input>
            </el-form-item>

            <el-form-item label="品目名称" prop="pmmc">
                <el-input v-model="ruleForm.pmmc" size="mini" :disabled="true"></el-input>
            </el-form-item>

            <el-form-item label="品牌名称" prop="ppmc">
                <el-input v-model="ruleForm.ppmc" size="mini" :disabled="true"></el-input>
            </el-form-item>

            <el-form-item label="类别编号" prop="lbbh">
                <el-input v-model="ruleForm.lbbh" size="mini" :disabled="true"></el-input>
            </el-form-item>

            <el-form-item label="类别名称" prop="lbmc">
                <el-input v-model="ruleForm.lbmc" size="mini" :disabled="true"></el-input>
            </el-form-item>

            <el-form-item label="实际供货价" prop="sjjg">
                <el-input  v-model="ruleForm.sjjg" size="mini"></el-input>
            </el-form-item>
            <!-- <el-form-item label="地区" prop="area">

                <el-select v-model="ruleForm.area" size="mini" class="myselect"  filterable placeholder="请选择">
                  <el-option
                    v-for="(item,ley) in area_options"
                    :key="ley"
                    :label="item.area_name"
                    :value="item.area_name">
                  </el-option>
                </el-select>

            </el-form-item> -->
            <el-form-item label="商品地址" prop="productlink">

                <el-input v-model="ruleForm.productlink" size="mini"></el-input>

                

            </el-form-item>
            <el-form-item label="服务承诺" prop="fwcn">
                <el-input type="textarea" v-model="ruleForm.fwcn" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="价格上浮原因" prop="jgsfyy">
                <el-input type="textarea" v-model="ruleForm.jgsfyy" size="mini"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" size="mini" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')" size="mini">重置</el-button>
            </el-form-item>

        </el-form>
    </div>
    </div>

</template>
<script>
export default {
    data(){
        return{
            originalPrice:'',
            ruleForm:{},
            area_options:"",
            rules: {
              xhbh: [
                { required: true, message: '请输入型号编号', trigger: 'blur' },
              ],
              xhmc: [
                { required: true, message: '请输入型号名称', trigger: 'blur' },
              ],
              pmbh: [
                { required: true, message: '请输入品目编号', trigger: 'blur' },
              ],
              pmmc: [
                { required: true, message: '请输入品目名称', trigger: 'blur' },
              ],
              ppbh: [
                { required: true, message: '请输入品牌编号', trigger: 'blur' },
              ],
              ppmc: [
                { required: true, message: '请输入品牌名称', trigger: 'blur' },
              ],
              lbbh: [
                { required: true, message: '请输入类别编号', trigger: 'blur' },
              ],
              
              lbmc: [
                { required: true, message: '请输入类别名称', trigger: 'blur' },
              ]
            }
        }
    },
    mounted(){
        console.log(this.$route.params)
        this.originalPrice=this.$route.params.row.sjjg
        this.ruleForm=this.$route.params.row
        //获取地区  暂时弃用
        this.axios.post('api/search_xhmc').then((response)=>{
            this.area_options=response.data.area
        }).catch((response)=>{
            
        })
    },
    methods:{
      submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
              });
              let param = new URLSearchParams()
              let obj=this.ruleForm
              Object.keys(obj).forEach(function(key){
                  param.append(key, obj[key])
              })
              this.axios({
                  method: 'post',
                  url: 'api/execute',
                  data: param
              }).then((res)=>{
                       loading.close()
                      if(res.data.success==1){
                          this.$message({
                            message: res.data.result,
                            type: 'success'
                          });
                          this.$router.push('/main/goods_offer')
                      }else{
                          this.$message.error(res.data.result);
                      }
                  }).catch(()=>{
                      loading.close()
                      this.$notify.error({
                        title: '错误',
                        message: '政府网站崩溃，请稍后再试'
                      })
                  })

            
            
            
            
            

            } else {
              console.log('error submit!!');
              return false;
            }
          });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      goBack() {
        window.history.go(-1)
      }
    }
}
</script>
<style scoped>

</style>
