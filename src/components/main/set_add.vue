<template>
    <div style="text-align:left;background:#fff">
        <el-page-header @back="myCancel" content="添加策略"></el-page-header>
        <el-divider></el-divider>
        <div style="width:60%;padding:20px 0 20px 0">
        <el-form :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="策略" >
                <el-input v-model="ruleForm.name" size="mini" ></el-input>
            </el-form-item>
            <el-form-item label="买入价" >
                    <el-select v-model="ruleForm.howbuy" size='mini' placeholder="请选择">
                        <el-option
                            v-for="item in buy_option"
                            :key="item.value"
                            :label="item.name+':  '+item.value"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="卖出价" >
                    <el-select v-model="ruleForm.howsale" size='mini' placeholder="请选择">
                        <el-option
                            v-for="item in buy_option"
                            :key="item.value"
                            :label="item.name+':  '+item.value"
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
                name:'',
                howbuy:'',
                howsale:'',
                bz:''
            },
            formLabelWidth: '150px',  
            buy_option:[
                {name:'一档',value:5.01},
                {name:'二档',value:5.02},
                {name:'三档',value:5.03},
                {name:'四档',value:5.04},
                {name:'五档',value:5.05},
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
