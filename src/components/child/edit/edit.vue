<template>
    <el-dialog title="editData.title" :visible.sync="dialogEditVisible">
        <el-form   ref="ruleForm" label-width="100px" class="demo-ruleForm">
            
            <el-form-item v-for='(item,index) in lable' :key='index' :label="item"   >
                <el-input v-model="ruleForm[index]" ></el-input>
            </el-form-item>
        </el-form>  

        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogEditVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
        </div> 
        </el-dialog>
    </template>
<script>
export default {
    data() {
      return {
        dialogEditVisible:false,
        title:String,
        lable:['序号','名称','类型','级别'],
        prop:['num','name','type','level'],
        ruleForm:Array,
        rules:Object
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }


    // props:['editData'],
    // data(){
    //     return{
    //         dialogEditVisible:false,
    //         formLabelWidth: '120px',
    //         rules:Object
    //     }
    // },
    // updated(){
    //     console.log(this.rules)
    // },
    // methods:{
    //     click_upload(){
    //         console.log(this.editData.value)

    //         this.$refs["editform"].validate((valid) => {
    //           if (valid) {
    //              alert(999999999)
    //           } else {
    //               console.log(666)
    //             return false;
    //           }
    //         });


    //     }
    // }
}
</script>
<style>

</style>