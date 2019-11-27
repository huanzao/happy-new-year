<template>
    <div style="text-align:left;background:#fff">
          <el-page-header @back="goBack" content="添加商品报价"></el-page-header>
          <el-divider></el-divider>
          <div class="srarch_result">
              <el-input placeholder="请输入内容" size="mini" v-model="searchkey" @keyup.enter.native="search" class="input-with-select">
                <el-select v-model="select" slot="prepend" placeholder="型号名称">
                  <el-option label="型号编号" value="xhbh"></el-option>
                  <el-option label="型号名称" value="xhmc"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click='search'></el-button>
              </el-input>
              <ul v-if='box_show' class="ulstyle">
                  <li v-for="(item,key)  in search_res"  :key='key' @click='liclick(item)'>
                    <span>{{ item.xhbh }}</span> 
                    <span>{{ item.xhmc }}</span>
                    <span>{{item.ppmc}}</span>
                  </li>
              </ul>
          </div>
        <div style="width:60%;padding:20px 0 20px 0">
        
        <el-form :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="型号编号" prop="xhbh">
                <el-input v-model="ruleForm.xhbh" size="mini" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="型号名称" prop="xhmc">
                <el-input v-model="ruleForm.xhmc" size="mini" :disabled="true"></el-input>
            </el-form-item>

            <el-form-item label="品目编号" prop="pmbh">
                <el-input v-model="ruleForm.pmbh" size="mini" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="品目名称" prop="pmmc">
                <el-input v-model="ruleForm.pmmc" size="mini" :disabled="true"></el-input>
            </el-form-item>

            <el-form-item label="品牌编号" prop="ppbh">
                <el-input v-model="ruleForm.ppbh" size="mini" :disabled="true"></el-input>
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
            <el-form-item label="商品地址" prop="productlink">
                <el-input v-model="ruleForm.productlink" size="mini"></el-input>
            </el-form-item>
            <!-- <el-form-item label="地区" prop="area">
                <el-select v-model="ruleForm.area" size="mini" class="myselect" filterable placeholder="请选择">
                  <el-option
                    v-for="(item,ley) in area_options"
                    :key="ley"
                    :label="item.area_name"
                    :value="item.area_name">
                  </el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item label="服务承诺" prop="fwcn">
                <el-input type="textarea" v-model="ruleForm.fwcn" size="mini"></el-input>
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
            search_res:"",
            searchkey:'',
            area_options:'',
            select:'xhmc',
            box_show:false,
            ruleForm:{
              xhbh:'',
              xhmc:'',
              pmbh:'',
              pmmc:'',
              ppbh:'',
              ppmc:'',
              lbbh:'',
              lbmc:'', 
              fwcn:'',
              sjjg:'', 
              productlink:'',
              area:'',
              jgsfyy:''
            },
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
        
    },
    methods:{
        liclick(value){
            this.box_show=false
            console.log(3333,value)
            this.ruleForm.xhbh=value.xhbh
            this.ruleForm.xhmc=value.xhmc
            this.ruleForm.pmbh=value.pmbh
            this.ruleForm.pmmc=value.pmmc
            this.ruleForm.ppbh=value.ppbh
            this.ruleForm.ppmc=value.ppmc
            this.ruleForm.lbbh=value.lbbh
            this.ruleForm.lbmc=value.lbmc
            this.ruleForm.xhbh=value.xhbh
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
