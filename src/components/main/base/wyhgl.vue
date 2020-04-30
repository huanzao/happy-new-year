<template>
    <div>
        <!-- 页头 -->
        <div class="pageHead">
            <span>组织管理</span>
            <el-button size="mini" type="primary" @click='myAdd'>新增</el-button>
        </div>
        <!-- 筛选 -->
        <div>
            <!-- <el-col :span="3" class='snzd_left'>
                    <el-menu default-active="2" class="el-menu-vertical-demo" style="" @open="handleOpen" @close="handleClose">
                        <div style="width:100%;height:50px;line-height: 50px;border-bottom: 1px solid #333;">
                            <span style="display:inline-block;padding-left:3px" v-if='!isAddMb'>委员会名称</span>
                            <div style="font-size: 13px;float:right;cursor:pointer;padding-right:5px" v-if='!isAddMb' @click='isAddMb=true'>
                                <i style="color:#2d8cf0;font-weight: bold;" class="el-icon-plus"></i>
                                <span>新增</span>
                            </div>
                            <input type="text" v-model="MB_name" style="width:50%"  v-if='isAddMb'>
                            <div style="font-size: 13px;float:right;cursor:pointer;padding-right:5px" v-if='isAddMb'>
                                <span @click='uploadMB'><i style="color:#2d8cf0;font-weight: bold;" class="el-icon-check"></i></span>
                                <span @click='isAddMb=false' ><i style="color:#2d8cf0;font-weight: bold;" class="el-icon-close"></i></span>
                            </div>
                        </div>
                        <label v-for="(item,index) in arrMenu" :key="index">
                            <el-menu-item v-if='!item.child' index="index"  @click='myWhitch(item,index,null)'>
                                <span style="color:#409EFF" slot="title">{{item.title}}</span>
                            </el-menu-item>
                            <el-submenu v-if='item.child' index="index">
                                <template slot="title">
                                    <span style="color:#409EFF">{{ item.title }}</span>
                                </template>
                                <el-menu-item-group  style="overflow-x: hidden;">
                                    <el-menu-item v-for="(sm,i) in item.child" :key='i' @click='myWhitch(item,index,i)'>{{sm.title}}</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                        </label>
                    </el-menu>
            </el-col> -->
            <el-col :span="24" class='snzd_right'>
                <div class="shaixuan" style="background:#fff">
                    <div>
                        <label>姓名：</label>
                        <div>
                            <el-input placeholder="请输入内容" prefix-icon="el-icon-search" size="mini" v-model="shaixuan.name"></el-input>
                        </div>
                    </div>
                    <div>
                        <el-button size="mini"><i class="el-icon-aim"></i> 筛选</el-button>
                    </div>
                </div>
                <div>
                    <el-table :data="tableData" style="width: 100%;">
                        <el-table-column label="组织名称" prop="organName"></el-table-column>
                        <el-table-column label="负责人" prop="userName"></el-table-column>
                        <el-table-column label="所属医院" prop="name"></el-table-column>
                        <el-table-column label="创建时间" prop="createtime"></el-table-column>
                        <el-table-column label="备注" prop="organRemark"></el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-link type="primary" @click="myEdit(scope.$index,scope.row)" >编辑</el-link>
                                <el-link type="primary" @click="myDelete(scope.$index,'组织-'+scope.row.rolename,{OrganId:scope.row.organId},'api/Organ/DeleteOrgan','api/Organ/ShowOrgan')" >删除</el-link>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 分页 -->
                    <div class="block" style="height:32px">
                        <el-pagination
                        style="height:50px"
                        @size-change="handleSizeChange($event,'api/Organ/ShowOrgan')"
                        @current-change="handleCurrentChange($event,'api/Organ/ShowOrgan')"
                        :current-page="currentPage"
                        :page-sizes="[10, 20, 50, 100]"
                        :page-size="10"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalpage">
                        </el-pagination>
                    </div>
                </div>
            </el-col>
        </div>
        <!-- 抽屉 -->
        <el-drawer :title="drawerTitle" :visible.sync="drawer" size='30%'  direction="rtl" >
            <el-form class='drawerform demo-ruleForm'    :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="100px"  >
                <el-form-item label="组织名称" prop="Name">
                    <el-input v-model="ruleForm.Name" size="mini"  autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="人员" prop="UserId">
                    <UserOption v-model="ruleForm.UserId" ></UserOption>
                </el-form-item>
                <el-form-item label="医院" prop="HospitalId">
                    <HospitalOption v-model="ruleForm.HospitalId" ></HospitalOption>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="ruleForm.Remark" type="textarea" size="mini"  autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button size="mini" @click="addkeshiShow = false">取 消</el-button>
                    <el-button size="mini" type="primary"  @click="myUp">确 定</el-button>
                </el-form-item>
            </el-form>
        </el-drawer>
    </div>
</template>
<script>
import {addUpload,myInit,myDelete,handleSizeChange,handleCurrentChange} from '../../../assets/comon'
import {addUpload_current} from '../../../assets/newAxios'
import UserOption from '../Child/UserOption'
import HospitalOption from '../Child/HospitalOption'
export default {
    data(){
        return{
            currentPage:1,
            totalpage:10,
            shaixuan:{
                name:'',
                type:'',
            },
            drawer: false,
            drawerTitle:'新增设备',
            isDisabled:true,
            isAddMb:false,
            MB_name:'',
            arrMenu:[],
            tableData:[],
            dialogData:[],
            ruleForm:{
                Id:'',
                Name:'',
                Remark:'',
                UserId:'',
                HospitalId:''
            },  
            rules: {
                Name:[
                    { required: true, message: '此项不能为空', trigger: 'blur' }
                ],
                UserId:[
                    { required: true, message: '此项不能为空', trigger: 'change' }
                ],
                HospitalId:[
                    { required: true, message: '此项不能为空', trigger: 'change' }
                ],
            },
        }
    },
    components:{
        UserOption,
        HospitalOption
    },
    mounted(){
        this.myInit('api/Organ/ShowOrgan',{IndexPage:"1",PageSize:"10"})
    },
    methods: {
        handleSizeChange,
        handleCurrentChange,
        addUpload_current,
        myInit,
        addUpload,
        myDelete,
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        myCancel(index){
            this.tableData[index].isEdit=false
        },
        myPreservation(row,index){
            this.$message('id='+row.a+'数量'+this.publicValue)
            console.log(row.f,this.publicValue)
            if(row.f*1==this.publicValue){
                this.$message.success('数值没变 无需提交到服务器')
            }
        },
        uploadMB(){
            if(this.MB_name===''){
                this.$message.warning('模板名称不能为空')
            }else{
                this.$message.success('AJAx'+this.MB_name)
                setTimeout(()=>{
                    this.isAddMb=false
                },1000)
            }
        },
        myWhitch(row,index,i){
            console.log(row,index,i)
            this.$message(index+'*********** '+i)
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
            console.log(val)
        },
        upload(){
            console.log('弹框中的确定')
        },
        ///////
        myAdd(){
            this.ruleForm
            for( var key in this.ruleForm){
                this.ruleForm[key]=""
            }
            this.drawerTitle='添加'
            this.drawer=true
        },
        myEdit(index,row){
            console.log(row)
            this.drawerTitle='编辑'
            this.drawer=true
            this.ruleForm.Id=row.organId
            this.ruleForm.Name =row.organName
            this.ruleForm.Remark =row.organRemark
            this.ruleForm.UserId =row.userid
            this.ruleForm.HospitalId =row.id
            this.ruleForm.UserId=row.userid+'-*-'+row.userName
        },
        myUp(){

            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    this.ruleForm.UserId=this.ruleForm.UserId.split('-*-')[0]
                    if(this.drawerTitle==='添加'){
                        console.log('添加')
                        this.addUpload_current('api/Organ/AddOrgan','ruleForm')
                    }else{
                        this.addUpload_current('api/Organ/UpadateOrgan','ruleForm')
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        Current_init(){
            this.myInit('api/Organ/ShowOrgan',{IndexPage:'1',PageSize:'10'})
        }
    }
}
</script>

<style scoped>
    .snzd_left{
        height: 100%;
    }
</style>