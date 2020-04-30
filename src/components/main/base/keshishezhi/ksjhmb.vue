<template>
  <div>
      <!-- 页头 -->
        <div class="pageHead">
            <span>科室计划模板-废弃</span>
            <el-button size="mini" @click="myAdd"  type="primary">新增</el-button>
        </div>
        <!-- 筛选 -->
        <div class="shaixuan">
            <div>
                <label>耗材名：</label>
                <div>
                    <el-select v-model="shaixuan.hcname" filterable placeholder="请选择" size="mini">
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
                <label>耗材类型：</label>
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
        <!-- 主体表格 -->
        <div>
            <template>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column label="耗材编号"  prop="a"></el-table-column>
                    <el-table-column  label="耗材名称" prop="b"></el-table-column>
                    <el-table-column label="生产厂家" prop="c"></el-table-column>
                    <el-table-column label="规格型号" prop="d"></el-table-column>
                    <el-table-column label="单位" prop="e"></el-table-column>
                    <el-table-column label="计划数量">
                        <template slot-scope="scope" >
                            <input type="number" v-model="publicValue" v-if="scope.row.isEdit">
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
            </template>   
        </div>
        <!-- 分页 -->
        <div class="block" style="height:32px">
            <el-pagination
            style="height:50px"
              @size-change="handleSizeChange($event,'api/People/ShowPeople')"
              @current-change="handleCurrentChange($event,'api/People/ShowPeople')"
              :current-page="currentPage"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalpage">
            </el-pagination>
        </div>
        <!-- 弹框 添加科室类别 -->
        <el-dialog class="myDialog" title="选择耗材" :visible.sync="addDialogShow" width="70%" id='ksjhmb_ID'>
            <div style="height:'1200px'">
                <!-- 侧边栏 -->
            <el-col :span="4" class='snzd_left'>
                    <el-menu default-active="2" class="el-menu-vertical-demo" >
                        <label v-for="(item,index) in arrMenu" :key="index">
                            <el-menu-item v-if='item.children==undefined || item.children.length<=0' :index="String(index)"  @click='myWhitch(item,index,null)'>
                                <span slot="title">{{item.Name}}</span>
                            </el-menu-item>
                            <el-submenu v-if='item.children!==undefined && item.children.length>0' :index="String(index)">
                                <template slot="title">
                                    <span>{{ item.Name }}</span>
                                </template>
                                <el-menu-item-group  style="overflow-x: hidden;">
                                    <el-menu-item v-for="(sm,i) in item.children" :key='i' @click='myWhitch(item,index,i)'>
                                        {{sm.Name}}
                                    </el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                        </label>
                    </el-menu>
            </el-col>
                <el-col :span="20" style="height:300px">
                        <el-table
                            ref="multipleTable"
                            :data="dialogData"
                            tooltip-effect="dark"
                            style="width: 100%"
                            @selection-change="handleSelectionChange">
                            <el-table-column type="selection" height="250px" width="55"> </el-table-column>
                            <el-table-column label="耗材编号" prop="consumeNum"> </el-table-column>
                            <el-table-column label="耗材名称" prop="consumeName"> </el-table-column>
                            <el-table-column label="品牌" prop="brand"> </el-table-column>
                            <el-table-column label="生产厂家" prop="adminRoom"> </el-table-column>
                            <el-table-column label="入库单价" prop="inroomPrice"> </el-table-column>
                            <el-table-column label="单位" prop="unit"> </el-table-column>
                            <el-table-column label="计划数量" >
                                <template slot-scope="scope">
                                    <input type="number" v-model='scope.row.f' >
                                </template>
                            </el-table-column>
                        </el-table>
                        <!-- 分页 -->
                        <div class="block" style="height:32px">
                            <el-pagination
                            @current-change="myFy_change"
                            :current-page.sync="myFy_page"
                            :page-size="10"
                            layout="total,prev,pager,next,jumper"
                            :total="myFy_total">
                            </el-pagination>
                        </div>
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
import {addUpload,myInit,myDelete,myEdit,myAdd,mySearch,handleSizeChange,handleCurrentChange} from '../../../../assets/comon'
import {newInit_return} from '../../../../assets/newAxios'
    export default {
        data(){
            return{
                currentPage:1,
                pagesize:10,
                totalpage:0,
                myFy_total:0,
                myFy_page:1,
                addDialogShow:false,
                isFirst:true,
                shaixuan:{
                    kename:'',
                    hcname:'',
                    type:'',
                },
                publicValue:'',
                tableData:[],
                dialogData:[],
                arrMenu:[],
                uploadArr:[]
            }
        },
        mounted(){
            this.myInit('api/department/ShowPlan',{IndexPage:"1",PageSize:"10",status:0,DepartmentDId:""})
        },
        methods:{
            myInit,
            newInit_return,
            handleSizeChange,
            handleCurrentChange,
            myDelete,
            myAdd(){
                if(this.isFirst===true){
                    this.isFirst=false
                     this.newInit_return('api/department/AddData',{IndexPage:"1",PageSize:"10"},'1').then(res=>{
                        console.log('addData',res)
                        this.dialogData=res.data.results_keshi_type
                        console.log(JSON.parse(res.data.results_side))
                        this.arrMenu=JSON.parse(res.data.results_side)
                        this.myFy_total=res.data.totalpage
                    })
                }
                console.log('新增')
                this.addDialogShow=true
            },
            myFy_change(val){
                console.log(val)
                this.newInit_return('api/department/AddData',{IndexPage:this.myFy_page,PageSize:"10"},'1').then(res=>{
                        console.log('addData',res)
                        this.dialogData=res.data.results_keshi_type
                        console.log(JSON.parse(res.data.results_side))
                        this.arrMenu=JSON.parse(res.data.results_side)
                        this.myFy_total=res.data.totalpage
                    })
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
            upload(){
                var upItemArr=[]
                for(var item of this.uploadArr){
                    upItemArr.push({id:item.id,top:item.top,bottom:item.bottom})
                }
                console.log(upItemArr)
                this.newInit_return('api/department/AddHC',upItemArr).then(res=>{
                    this.addDialogShow=false
                    console.log(res)
                })
            },
            handleSelectionChange(val) {
                this.uploadArr=val
                console.log(val)
            },
            myWhitch(row,index,i){
                console.log(row,index,i)
                this.$message(index+'*********** '+i)
                this.newInit_return('api/department/AddDataTwo',{IndexPage:1,PageSize:"10",Id:row.id},'1').then(res=>{
                    console.log(res)
                    if(res.data.results_sidedata.length===0){
                        this.$message('暂无数据')
                    }else{
                        this.$message.success('数据已返回，待处理！！！')
                    }
                })

            }
        }
    }
</script>
<style>
    #ksjhmb_ID .el-dialog__body{
        height: 390px;
    }
</style>
<style scoped>
    
</style>