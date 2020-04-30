<template>
    <div>
        <!-- 页头 -->
        <div class="pageHead">
            <span>手术模板设置</span>
            <el-button size="mini" type="primary" @click='addDialogShow=true' >新增耗材</el-button>
            <el-button size="mini" type="primary">导出Excel</el-button>
        </div>
        <!-- 筛选 -->
        <div>
            <el-col :span="3" class='snzd_left'>
                <el-menu default-active="2" class="el-menu-vertical-demo" style="" @open="handleOpen" @close="handleClose">
                    <div style="width:100%;height:50px;line-height: 50px;border-bottom: 1px solid #333;">
                        <span style="display:inline-block;padding-left:3px" v-if='!isAddMb'>模板名称</span>
                        <div style="font-size: 13px;float:right;cursor:pointer;padding-right:5px" v-if='!isAddMb' @click='isAddMb=true'>
                            <i style="color:#2d8cf0;font-weight: bold;" class="el-icon-plus"></i>
                            <span>添加模板</span>
                        </div>
                        <input type="text" v-model="MB_name" style="width:50%"  v-if='isAddMb'>
                        <div style="font-size: 13px;float:right;cursor:pointer;padding-right:5px" v-if='isAddMb'>
                            <span @click='uploadMB'><i style="color:#2d8cf0;font-weight: bold;" class="el-icon-check"></i></span>
                            <span @click='isAddMb=false' ><i style="color:#2d8cf0;font-weight: bold;" class="el-icon-close"></i></span>
                        </div>
                    </div>
                    <label v-for="(item,index) in arrMenu" :key="index">
                        <el-menu-item class='mysideShow' v-if='!item.child' index="index" >
                            <div style="color:#409EFF" slot="title">
                                <span  @click='myWhitch(item,index,null)'>{{item.name}}</span> 
                                <span  :name='index' @click='sideEdit(index,item)' underline='false'>编辑</span>
                                <span  :name='index' @click='sideDel(index,item)' underline='false'>删除</span>
                            </div> 
                        </el-menu-item>
                        <el-submenu v-if='item.child' index="index">
                            <template slot="title">
                                <span style="color:#409EFF">{{ item.name }}</span>
                            </template>
                            <el-menu-item-group  style="overflow-x: hidden;">
                                <el-menu-item v-for="(sm,i) in item.child" :key='i' @click='myWhitch(item,index,i)'>{{sm.title}}</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </label>
                </el-menu>
            </el-col>
            <el-col :span="21" class='snzd_right'>
                <div class="shaixuan" style="background:#fff">
                    <div>
                        <label>科室名称：</label>
                        <div>
                            <el-input placeholder="请输入内容" prefix-icon="el-icon-search" size="mini" v-model="shaixuan.name"></el-input>
                        </div>
                    </div>
                    <div>
                        <label>科室类别：</label>
                        <div>
                            <el-select v-model="shaixuan.type" filterable placeholder="请选择" size="mini">
                                 <el-option
                                v-for="item in 20"
                                :key="item"
                                :label="item"
                                :value="item">
                                </el-option>
                            </el-select> 
                        </div>
                    </div>
                    <div>
                        <el-button size="mini"><i class="el-icon-aim"></i> 筛选</el-button>
                    </div>
                </div>
                <div>
                    <el-table :data="tableData" style="width: 100%;">
                        <el-table-column label="设备编号" prop="number"></el-table-column>
                        <el-table-column label="设备名称" prop="name"></el-table-column>
                        <el-table-column label="规格型号" prop="danwei"></el-table-column>
                        <el-table-column label="所属分类" prop="fenlie"></el-table-column>
                        <el-table-column label="生产厂家" prop="leixing"></el-table-column>
                        <el-table-column label="单位" prop="jiliang"></el-table-column>
                        <el-table-column label="入库单价" prop="state" width="160" ></el-table-column>
                        <el-table-column label="计划数量">
                        <template slot-scope="scope" >
                            <input type="number" v-model="publicValue" v-if="scope.row.isEdit" style="width:100px">
                            <span v-if="!scope.row.isEdit">{{scope.row.f}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-link type="primary" @click="myEdit(scope.$index)" v-if="!scope.row.isEdit">编辑</el-link>
                            <el-link type="primary" @click="myDelete(scope.$index,'角色-'+scope.row.rolename,{RoleId:scope.row.id},'api/Role/DeleteRole','api/Role/ShowRole')" v-if="!scope.row.isEdit">删除</el-link>
                            <el-link type="primary" @click="myPreservation(scope.row,scope.$index)" v-if="scope.row.isEdit">保存</el-link>
                            <el-link type="primary" @click="myCancel(scope.$index)" v-if="scope.row.isEdit">取消</el-link>
                        </template>
                    </el-table-column>
                    </el-table>
                </div>
                <!-- 分页 -->
                <div class="block" style="height:32px">
                    <el-pagination
                    style="height:50px"
                    @size-change="handleSizeChange($event,'api/department/ShowPlan',{status:1})"
                    @current-change="handleCurrentChange($event,'api/department/ShowPlan',{status:1})"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalpage">
                    </el-pagination>
                </div>
            </el-col>
        </div>
        <!-- 弹框 添加侧边栏 -->
        <el-dialog class="myDialog" title="编辑模板"  :visible.sync="dialogFormVisible">
            <el-form :modal="sideForm">
                <el-form-item label="模板名称" label-width="200">
                    <el-input size="mini" v-model="sideForm.name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="sideUpload">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 弹框 添加科室类别 -->
        <el-dialog class="myDialog" title="选择耗材" :visible.sync="addDialogShow" width="70%" height='500px'>
            
            <div>
                <el-col :span="4">
                     <el-input placeholder="请输入内容" prefix-icon="el-icon-search" size="mini" v-model="shaixuan.ksname" ></el-input>
               <ul style="padding-left:5px">
                    <li>全部耗材</li>
                    <li>全部耗材</li>
                    <li>全部耗材</li>
                </ul>
            </el-col>
            <el-col :span="20" style="height:300px">
                    <el-table
                        ref="multipleTable"
                        :data="dialogData"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                        <el-table-column type="selection" height="250px" width="55"> </el-table-column>
                        <el-table-column label="耗材编号" prop="a"> </el-table-column>
                        <el-table-column label="耗材名称" prop="b"> </el-table-column>
                        <el-table-column label="规格型号" prop="c"> </el-table-column>
                        <el-table-column label="生产厂家" prop="d"> </el-table-column>
                        <el-table-column label="入库单价" prop="e"> </el-table-column>
                        <el-table-column label="单位" prop="f"> </el-table-column>
                        <el-table-column label="计划数量" >
                            <template slot-scope="scope">
                                 <input type="number" v-model='scope.row.f' >
                            </template>
                        </el-table-column>
                    </el-table>
            </el-col>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="addDialogShow=false">取 消</el-button>
                <el-button size="mini" type="primary"  @click="upload">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import {addUpload,myInit,myDelete,handleSizeChange,handleCurrentChange} from '../../../../assets/comon'
import {newInit_return} from '../../../../assets/newAxios'
export default {
    data(){
        return{
            shaixuan:{
                name:'',
                type:'',
            },
            currentPage:1,
            pagesize:10,
            totalpage:0,
            addDialogShow: false,
            drawer_title:'新增设备',
            dialogFormVisible: false,
            sideForm:{
                id:'',
                name:'',
                key:''
            },
            isDisabled:true,
            isAddMb:false,
            MB_name:'',
            arrMenu:[],
            tableData:[],
            dialogData:[
                    {
                        a:'1',
                        b:'2323',
                        c:'qwe',
                        d:'qwe',
                        e:'qwe',
                        f:0
                    },
                    {
                        a:'2',
                        b:'2323',
                        c:'qwe',
                        d:'qwe',
                        e:'qwe',
                        f:0
                    },
                    {
                        a:'3',
                        b:'2323',
                        c:'qwe',
                        d:'qwe',
                        e:'qwe',
                        f:0
                    }
                ],
            ruleForm:{
                number:'',
                name:'',
                danwei:'',
                fenlie:'',
                leixing:'',
                jiliang:'',
                state:'',
                bz:'',
            },  
        rules: {
              name:[
                {required:true,message:'设备名称不能为空',tirgger:'blur'}
              ]
            },
        }
    },
    mounted(){
        this.myInit('api/department/ShowPlan',{IndexPage:"1",PageSize:"10",status:1})
        this.newInit_return('api/department/ShowModels',{IndexPage:"1",PageSize:"1000"}).then(res=>{
            console.log(999,res)
            this.arrMenu=res.data.results_side
        })
    },
    methods: {
        myInit,
        newInit_return,
        handleSizeChange,
        handleCurrentChange,
        addUpload,
        myDelete,
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose_drawer(done) {
                done();
        },
        myEdit(index){
            this.tableData.map(item=>{
                item.isEdit=false
            })
            this.tableData[index].isEdit=true
            this.publicValue=this.tableData[index].f
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
                this.newInit_return('api/department/AddModels',{name:this.MB_name}).then(res=>{
                    console.log(res)
                    if(res.data.results==="添加成功"){
                        this.$message.success('添加成功')
                        this.newInit_return('api/department/ShowModels',{IndexPage:"1",PageSize:"1000"}).then(res=>{    
                            this.arrMenu=res.data.results_side
                        })
                    }else{
                        this.$message(res.data.results)
                    }
                })
                setTimeout(()=>{
                    this.isAddMb=false
                },1000)
            }
        },
        sideEdit(index,item){
            console.log(item)
            this.dialogFormVisible=true
            this.sideForm.id=item.id,
            this.sideForm.name=item.name
            this.sideForm.key=index
        },
        sideUpload(){
            this.newInit_return('api/department/UpadateModels',this.sideForm).then(res=>{
                console.log(res)
                if(res.data.results==="修改成功"){
                    this.$message.success('修改成功')
                    this.arrMenu[this.sideForm.key].name=this.sideForm.name
                    this.dialogFormVisible=false
                }else{
                    this.$message(res.data.results)
                    this.dialogFormVisible=false
                }
            })
        },
        sideDel(index,item){ 
            this.newInit_return('api/department/DeleteModels',{modelsId:item.id}).then(res=>{
                console.log(res)
                if(res.data.results==="删除成功"){
                    this.arrMenu.splice(index,1)
                    this.$message.success('删除成功')
                }else{
                    this.$message(res.data.results)
                }
            })
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
        }
    }
}
</script>

<style scoped>
    .snzd_left{
        height: 100%;
    }
    .mysideShow{
        padding: 0 5px !important;
        /* display: flex; */
        width: 100%;
    }
    .mysideShow>div>span:nth-child(1){
        display: inline-block;
        width: 79px;
        overflow: hidden;
    }
    .mysideShow>div>span:nth-child(2),.mysideShow>div>span:nth-child(3){
        display: inline-block;
        float: right;
        padding: 0 2px;
        display: none;
    }
    .mysideShow:hover span{
        display: inline-block !important;
    }
</style>