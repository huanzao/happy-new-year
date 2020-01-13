<template>
    <div style="text-align:left;background:#fff">
        <el-page-header @back="myCancel" content="策略编辑"></el-page-header>
        <el-divider></el-divider>
        <div style="width:60%;padding:20px 0 20px 0">
        <el-form :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="策略" >
                <el-input v-model="ruleForm.name" size="mini" ></el-input>
            </el-form-item>
            <el-form-item label="买入价" >
                    <el-select v-model="watchbuy" size='mini' placeholder="请选择">
                        <el-option
                            v-for="item in buy_option"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="卖出价" >
                    <el-select v-model="watchsale" size='mini' placeholder="请选择">
                        <el-option
                            v-for="item in buy_option"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="ruleForm.bz" size="mini" ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="mini" @click="addUpload('api/Settings/Upadate','ruleForm')">提交</el-button>
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
            ruleForm:{
                s_Id:'',
                name:'',
                howbuy:'',
                howsale:'',
                bz:''
            },
            watchbuy:'',
            watchbuy_num:0,
            watchsale:'',
            watchsale_num:0,
            formLabelWidth: '150px',  
            buy_option:[
                {name:'一价',value:2},
                {name:'二价',value:3},
                {name:'三价',value:4},
                {name:'四价',value:5},
                {name:'五价',value:6},
            ],
            rules: {
              name:[
                {required:true,message:'不能为空',tirgger:'blur'}
              ],
              organ:[
                {required:true,message:'不能为空',tirgger:'blur'}
              ],
            }
        }
    },
    watch:{
        watchbuy(value){
            console.log(value)
            console.log(11111,this.watchbuy_num)
            if(this.watchbuy_num===0){
                 this.watchbuy_num=2   
            }else{
                this.ruleForm.howbuy=value
            }
        },
        watchsale(value){
            console.log(value)
            if(this.watchsale_num===0){
                this.watchsale_num=2
            }else{
                this.ruleForm.howsale=value
            }
        }
    },
    mounted(){
        console.log(this.$route.params)
        this.ruleForm.s_Id=this.$route.params.row.id
        this.ruleForm.name=this.$route.params.row.seName
        this.ruleForm.howbuy=this.$route.params.row.howbuy
        this.ruleForm.howsale=this.$route.params.row.howsale
        this.ruleForm.bz=this.$route.params.row.bz

        this.lable_jia(this.ruleForm.howbuy,'buy')
        this.lable_jia(this.ruleForm.howsale,'sale')

    },
    methods:{
      addUpload,
      myCancel,
      lable_jia(value,type){
          var key=''
          if(value==2){
            key='一价'
          }else if(value==3){
            key='二价'
          }else if(value==4){
            key='三价'
          }else if(value==5){
            key='四价'
          }else if(value==6){
            key='五价'
          }
          
          if(type=='buy'){
              this.watchbuy=key
          }else if(type=='sale'){
              this.watchsale=key
          }
      }
    }
}
</script>
<style >
</style>
