<template>
    <div style="text-align:left;background:#fff">
        <el-page-header @back="myCancel" content="编辑角色"></el-page-header>
        <el-divider></el-divider>
        <div style="width:60%;padding:20px 0 20px 0">
        <el-form :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="角色名称" prop="Rolename">
                <el-input v-model="ruleForm.Rolename" size="mini" ></el-input>
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="ruleForm.Roleremark" size="mini" ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="mini" @click="addUpload('api/Role//UpadateRole','ruleForm')">提交</el-button>
                <el-button @click="myCancel" size="mini">重置</el-button>
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
                 Id:'',
                 Rolename:'',
                 Roleremark:''
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
        console.log('role',this.$route.params.row)
        this.ruleForm.Id=this.$route.params.row.id
        this.ruleForm.Rolename=this.$route.params.row.rolename
        this.ruleForm.Roleremark=this.$route.params.row.roleremark
    },
    methods:{
      addUpload,
      myCancel
    }
}
</script>
<style >
</style>
