<template>
  <div>
      <!-- 页头 -->
        <div class="pageHead">
            <span>{{ p_title }}</span>
            <el-button size="mini" :underline='false' @click="myCancel" type="primary">返回</el-button>
        </div>
        
        <!-- 主体表格 -->
        <div style="width:70%;display: flex;justify-content: center;margin:auto">
             <el-form class='drawerform demo-ruleForm'  style="width:80%"   :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="100px"  >
                <div class="smTitle">
                    <span>{{ p_title  }}</span>
                </div>
                <div class="myitem">
                    <el-form-item label="合同编号">
                    <el-input v-model="ruleForm.Number" size="mini"  autocomplete="off"  ></el-input>
                    </el-form-item>
                    <el-form-item label="合同名称">
                        <el-input v-model="ruleForm.Name" size="mini"  autocomplete="off"  ></el-input>
                    </el-form-item>
                </div>
                <div class="myitem">
                    <el-form-item label="合同类型">
                    <el-input v-model="ruleForm.Type" size="mini"  autocomplete="off"  ></el-input>
                    </el-form-item>
                    <el-form-item label="乙方单位">
                        <el-input v-model="ruleForm.YifangUnit" size="mini"  autocomplete="off"  ></el-input>
                    </el-form-item>
                </div>
                <div class="myitem">
                    <el-form-item label="乙方练习人">
                    <el-input v-model="ruleForm.YifangPeople" size="mini"  autocomplete="off"  ></el-input>
                    </el-form-item>
                    <el-form-item label="练习电话">
                        <el-input v-model="ruleForm.YifangTel" size="mini"  autocomplete="off"  ></el-input>
                    </el-form-item>
                </div>
                <div class="myitem">
                    <el-form-item label="签证日期">
                    <el-input v-model="ruleForm.QdData" size="mini"  autocomplete="off"  ></el-input>
                    </el-form-item>
                    <el-form-item label="截至日期">
                        <el-input v-model="ruleForm.JzData" size="mini"  autocomplete="off"  ></el-input>
                    </el-form-item>
                </div>
                <div class="myitem">
                    <el-form-item label="合同金额">
                    <el-input v-model="ruleForm.Price" size="mini"  autocomplete="off"  ></el-input>
                    </el-form-item>
                    <el-form-item label="档案编号">
                        <el-input v-model="ruleForm.DaNumber" size="mini"  autocomplete="off"  ></el-input>
                    </el-form-item>
                </div>
                <div class="myitem">
                    <el-form-item label="验收日期">
                    <el-input v-model="ruleForm.YsData" size="mini"  autocomplete="off"  ></el-input>
                    </el-form-item>
                    <el-form-item label="院方负责人">
                        <el-input v-model="ruleForm.DutyPeople" size="mini"  autocomplete="off"  ></el-input>
                    </el-form-item>
                </div>
                <div class="myitem">
                    <el-form-item label="档案管理员">
                    <el-input v-model="ruleForm.DaPeople" size="mini"  autocomplete="off"  ></el-input>
                    </el-form-item>
                    <el-form-item label="录入人">
                        <el-input v-model="ruleForm.WritePeople" size="mini"  autocomplete="off"  ></el-input>
                    </el-form-item>
                </div>
                <el-form-item label="合同内容">
                    <el-input v-model="ruleForm.Content" type="textarea" size="mini"  autocomplete="off"  ></el-input>
                </el-form-item>
                <div class="smTitle" style="margin-bottom: 15px;">
                    <span>付款信息</span>
                    <el-link type="primary" :underline="false" @click="addQ" >添加期数</el-link>
                </div>
                <table>
                    <thead>
                        <th>期数</th>
                        <th>付款金额</th>
                        <th>预计付款日期</th>
                        <th>付款日期</th>
                        <th>状态</th>
                        <th>操作</th>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in ruleForm.PayInformation" :key='index'>
                            <td><el-input v-model="item.a" size="mini"  autocomplete="off"  ></el-input></td>
                            <td><el-input v-model="item.b" size="mini"  autocomplete="off"  ></el-input></td>
                            <td><el-input v-model="item.c" size="mini"  autocomplete="off"  ></el-input></td>
                            <td><el-input v-model="item.d" size="mini"  autocomplete="off"  ></el-input></td>
                            <td>{{ item.e }}</td>
                            <td><el-link type="primary" :underline="false" @click="remove(index)" >移除</el-link></td>
                        </tr>
                    </tbody>
                </table>

                <div class="smTitle"  style="margin-bottom: 15px;margin-top:20px">
                    <span>合同附件信息</span>
                    <el-link type="primary" :underline="false" >上传文件</el-link>
                </div>
                 
                <el-upload
                    class="upload-demo"
                    action="http://172.16.22.11:5000/api/addfile"
                    :on-preview="handlePreview"
                    :before-remove="beforeRemove"
                    multiple
                    :limit="3"
                    :on-exceed="handleExceed"
                    :http-request="uploadFile"
                    :file-list="fileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
                <el-button size="mini" type="primary"  @click="upExcel">上传Excel</el-button>
                <el-form-item>
                    <el-button size="mini" @click="addkeshiShow = false">取 消</el-button>
                    <el-button size="mini" type="primary"  @click="current_up">确 定</el-button>
                </el-form-item>
            </el-form>
        </div>
       
       
  </div>
</template>
<script>
import {addUpload,myCancel} from '../../../assets/comon'
import {newInit_return} from '../../../assets/newAxios'
    export default {
        data(){
            return{
                p_title:'',
                fileList: [],
                ruleForm:{
                    Id:'',
                    Name:'',
                    Number:'',
                    Type:'',
                    YifangUnit:'',
                    YifangPeople:'',
                    YifangTel:'',
                    QdData:'',
                    JzData:'',
                    Price:'',
                    DaNumber:'',
                    DutyPeople:'',
                    DaPeople:'',
                    WritePeople:'',
                    Content:'',
                    PayInformation:[],
                    IsPay:''
                },
                rules: {
                    name:[
                        {required:true,message:'设备名称不能为空',tirgger:'blur'}
                    ]
                },
            }
        },
        mounted(){
            console.log(9999,this.$route.params.type)
            if(this.$route.params.type==='edit'){
                this.p_title='编辑合同'
                this.ruleForm.Id=this.$route.params.row.id
                this.ruleForm.Number=this.$route.params.row.number
                this.ruleForm.Name=this.$route.params.row.name
                this.ruleForm.Type=this.$route.params.row.type
                this.ruleForm.YifangUnit=this.$route.params.row.yifangUnit
                this.ruleForm.YifangPeople=this.$route.params.row.yifangPeople
                this.ruleForm.YifangTel=this.$route.params.row.yifangTel
                this.ruleForm.QdData=this.$route.params.row.qdData
                this.ruleForm.JzData=this.$route.params.row.jzData
                this.ruleForm.Price=this.$route.params.row.price
                this.ruleForm.DaNumber=this.$route.params.row.daNumber
                this.ruleForm.DutyPeople=this.$route.params.row.dutyPeople
                this.ruleForm.DaPeople=this.$route.params.row.daPeople
                this.ruleForm.WritePeople=this.$route.params.row.writePeople
                this.ruleForm.Content=this.$route.params.row.content
                this.ruleForm.PayInformation=this.$route.params.row.payInformation,
                this.ruleForm.IsPay=this.$route.params.row.isPay
            }else{
                this.p_title='新增合同'
            }
        },
        methods:{
            addUpload,
            myCancel,
            newInit_return,
            uploadFile(item){
                console.log('item',item)
                let fileObj = item.file
                const form = new FormData()// FormData 对象
                form.append('file', fileObj)// 文件对象  'upload'是后台接收的参数名
                
                // console.log(form.get('file'))


                this.axios({
                    method: 'post',
                    headers:{'Authorization':'Bearer '+localStorage.token,'Content-Type': 'multipart/form-data'},
                    timeout:50000,
                    url: 'api/addfile',
                    data:{files:form}
                }).then((res)=>{
                    console.log('服务器返回',res)
                }).catch((error)=>{
                    console.log(error)
                    loading.close()
                    this.$message.warning('网络错误,请稍后再试')
                })

            },
            upExcel(){

                this.axios({
                    method: 'post',
                    headers:{'Authorization':'Bearer '+localStorage.token,'Content-Type': 'multipart/form-data'},
                    timeout:50000,
                    url: 'api/addfile',
                    data:this.$qs.stringify({files:this.fileList})
                }).then((res)=>{
                    console.log(res)
                }).catch((error)=>{
                    console.log(error)
                    loading.close()
                    this.$message.warning('网络错误,请稍后再试')
                })



                
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            addQ(){
                this.ruleForm.PayInformation.push({a:this.ruleForm.PayInformation.length+1,b:'',c:'',d:'',e:'未付款'})
            },
            remove(index){
                this.ruleForm.PayInformation.splice(index,1)
            },
            current_up(){
                if(this.$route.params.type='edit'){
                    this.addUpload('api/agreement/Upadate','ruleForm',true)
                }else{
                    this.addUpload('api/agreement/Add','ruleForm',true)
                }
            },
        }
    }
</script>
<style scoped>
    .myitem{
        display: flex;
    }
    .myitem .el-form-item{
        width: 50%;
    }
    .myitem .el-input{
       width: 100%;
    }   
    .smTitle{
        height: 30px;
        border-bottom: 1px solid #2ea8e5;
        line-height: 26px;
        font-size: 13px;
        padding-left: 10px;
        color: #2ea8e5;
    }
    .smTitle .el-link{
        display: block;
        float: right;
    }
    table{
        border-collapse: collapse;
        margin: 0 auto;
        text-align: center;
    }
    table td, table th{
        border: 1px solid #cad9ea;
        color: #666;
        height: 30px;
    }
    table thead th{
        /* background-color: #CCE8EB; */
        width: 100px;
    }
    table tr:nth-child(odd){
        background: #fff;
 
    }
    table tr:nth-child(even){
        background: #F5FAFA;
 
    }
</style>