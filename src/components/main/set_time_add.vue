<template>
    <div style="text-align:left;background:#fff">
        <el-page-header @back="myCancel" content="添加时间"></el-page-header>
        <el-divider></el-divider>
        <div style="width:60%;padding:20px 0 20px 0">
        <el-form :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
            <el-form-item label="名称" >
                <el-input v-model="ruleForm.name" size="mini" ></el-input>
            </el-form-item>
            <el-form-item label="获取买入价格时间" >
                <el-time-picker v-model="ruleForm.getbuytime" size="mini" value-format="HH:mm:ss" placeholder="获取买入价格时间"></el-time-picker>
            </el-form-item>
            <el-form-item label="买入时间" >
                <el-time-picker v-model="ruleForm.buytime" size="mini" value-format="HH:mm:ss" placeholder="买入时间"></el-time-picker>
            </el-form-item>
            <el-form-item label="获取卖出价格时间" >
                <el-time-picker v-model="ruleForm.getsaletime" size="mini" value-format="HH:mm:ss" placeholder="获取卖出价格时间"></el-time-picker>
            </el-form-item>
            <el-form-item label="卖出时间" >
                <el-time-picker v-model="ruleForm.saletime" size="mini" value-format="HH:mm:ss" placeholder="卖出时间"></el-time-picker>
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="ruleForm.bz"  type="textarea" size="mini" ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="mini" @click="addUpload('api/SettingsTime/Add','ruleForm')">提交</el-button>
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
                name:'',
                getbuytime:'',
                buytime:'',
                getsaletime:'',
                saletime:'',
                bz:''
            },
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
    mounted(){
        
    },
    methods:{
      addUpload,
      myCancel
    }
}
</script>
<style >
</style>
