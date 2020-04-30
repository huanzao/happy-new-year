<template>
    <div>
        <!-- 页头 -->
        <div class="pageHead">
            <span>耗材字典维护-m</span>
            <el-button size="mini" type="primary" @click="myAdd">新增字典</el-button>
            <el-button size="mini" type="primary">批量导入</el-button>
            <el-button size="mini" type="primary">Excel导入</el-button>
            <el-button size="mini" type="primary">导出Excel</el-button>
            <el-button size="mini" type="primary">打印条码</el-button>
        </div>
        <!-- 筛选 -->
        <div>
            <!-- 侧边栏 -->
            <el-col :span="3" class='snzd_left'>
                    <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
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
            <el-col :span="21" class='snzd_right'>
                <div class="shaixuan" style="background:#fff">
                    <div>
                        <label>耗材名称：</label>
                        <div>
                            <el-input placeholder="请输入内容" prefix-icon="el-icon-search" size="mini" v-model="shaixuan.name"></el-input>
                        </div>
                    </div>
                    <div>
                        <label>状态：</label>
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
                        <label>管理类别：</label>
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
                        <label>供应商：</label>
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
                        <el-table-column label="耗材编号" prop="consumeNum"></el-table-column>
                        <el-table-column label="耗材名称" prop="consumeName"></el-table-column>
                        <el-table-column label="供应商" prop="supplier"></el-table-column>
                        <el-table-column label="规格型号" prop="spec"></el-table-column>
                        <el-table-column label="单位" prop="unit"></el-table-column>
                        <el-table-column label="入库单价" prop="inroomPrice"></el-table-column>
                        <el-table-column label="状态" prop="status" :formatter='famter_state'>
                        </el-table-column>
                        <el-table-column label="操作" width="150">
                            <template slot-scope="scope">
                                <el-link type="primary" @click="myCopy(scope.row,scope.$index)" >复制新增</el-link>
                                <el-link type="primary" @click="myEdit(scope.row,scope.$index)">编辑</el-link>
                                <el-link type="primary" @click="myUse(scope.row,scope.$index)">{{scope.row.state?'启用':'停用' }}</el-link>
                                <!-- <el-link type="primary"  @click="myDelete(scope.$index, '字典'+scope.row.name,{PeopleId:scope.row.peopleid},'api/People/DeletePeople','api/People/ShowPeople')">删除</el-link> -->
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="block" style="height:32px">
                        <el-pagination style="height:50px"
                        @size-change="handleSizeChange($event,'api/ConsumableDict/ShowConsumableDict')"
                        @current-change="handleCurrentChange($event,'api/ConsumableDict/ShowConsumableDict')"
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
        <el-drawer :title="drawer_title" width="400px;" :visible.sync="drawer" :direction="direction" :before-close="handleClose_drawer">
            <el-form class='drawerform demo-ruleForm'  :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="80px" >
                <el-col :span="12">
                    <el-form-item label="耗材名称：" >
                        <el-input v-model="ruleForm.ConsumeName" size="mini"  autocomplete="on" @input="change($event)"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="注册证件号：">
                        <el-input v-model="ruleForm.PapersNum" size="mini"    autocomplete="off"  ></el-input>
                        <span> +</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="通用名称" >
                        <el-input v-model="ruleForm.PopularName" size="mini"  autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="耗材编号：">
                        <el-input v-model="ruleForm.ConsumeNum" size="mini"    autocomplete="off"  ></el-input>
                        
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label=" 分类：" >
                        <el-input v-model="ruleForm.ApplianceId" size="mini"  autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="特征码：">
                        <el-input v-model="ruleForm.TraitCode" size="mini"    autocomplete="off"  ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="采购平台代码：" >
                        <el-input v-model="ruleForm.PurchasingPlatformCode" size="mini"  autocomplete="off"></el-input>
                        
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="生产厂家：">
                        <el-input v-model="ruleForm.Manufacturer" size="mini"    autocomplete="off"  ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="品牌：" >
                        <el-input v-model="ruleForm.Brand" size="mini"  autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="产地：">
                        <el-input v-model="ruleForm.Organ" size="mini"    autocomplete="off"  ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="耗材分类：" >
                        <el-input v-model="ruleForm.ConsumeTypeIda" size="mini"  autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="是否进口：">
                        <el-input v-model="ruleForm.IsImport" size="mini"    autocomplete="off"  ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="管理类别：" >
                        <el-input v-model="ruleForm.AdminType" size="mini"  autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="管理级别：">
                        <el-input v-model="ruleForm.AdminLevel" size="mini"    autocomplete="off"  ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="入库单价：" >
                        <el-input v-model="ruleForm.InroomPrice" size="mini"  autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="单位：">
                        <el-input v-model="ruleForm.Unit" size="Unit"    autocomplete="off"  ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12"> 
                    <el-form-item label="最小包装：" >
                        <el-input v-model="ruleForm.MinPack" size="mini"  autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="默认供应：">
                        <el-input v-model="ruleForm.Supplier" size="mini"    autocomplete="off"  ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="是否计费：" >
                        <el-input v-model="ruleForm.IsBilling" size="mini"  autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="收费编码：">
                        <el-input v-model="ruleForm.ChargeCode" size="mini"    autocomplete="off"  ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="是否多规格：" >
                        <el-input v-model="ruleForm.IsNoreSpec" size="mini"  autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="规格型号：">
                        <el-input v-model="ruleForm.Spec" size="mini"    autocomplete="off"  ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="管理仓库：" >
                        <el-input v-model="ruleForm.AdminRoom" size="mini"  autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="管理模式：">
                        <el-input v-model="ruleForm.AdminModel" size="mini"    autocomplete="off"  ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="招标方式：" >
                        <el-input v-model="ruleForm.BiddingType" size="mini"  autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="招标编号：">
                        <el-input v-model="ruleForm.BiddingNum" size="mini"    autocomplete="off"  ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="库存上限" >
                        <el-input v-model="ruleForm.RepertoryMax" size="mini"  autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="库存下限：">
                        <el-input v-model="ruleForm.RepertoryMin" size="mini"    autocomplete="off"  ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="状态：" >
                        <el-input v-model="ruleForm.Status" size="mini"  autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="加价率：">
                        <el-input v-model="ruleForm.MarkupPercentage" size="mini"    autocomplete="off"  ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="包装规格：" >
                        <el-input v-model="ruleForm.PackingSize" size="mini"  autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="用途：">
                        <el-input v-model="ruleForm.Purpose" size="mini"    autocomplete="off"  ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="功能：" >
                        <el-input v-model="ruleForm.Function" size="mini"  autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="材质：">
                        <el-input v-model="ruleForm.Material" size="mini"    autocomplete="off"  ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="附件信息：" >
                        <el-input v-model="ruleForm.accessoryPath" size="mini"  autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-form-item>
                    <el-button size="mini" @click="addkeshiShow = false">取 消</el-button>
                    <el-button size="mini" type="primary"  @click="addUpload('api/People/AddPeople','ruleForm')">确 定</el-button>
                </el-form-item>
            </el-form>
        </el-drawer>
    </div>
</template>
<script>
import {addUpload,myInit,myDelete,handleSizeChange,handleCurrentChange,famter_state} from '../../../assets/comon'
import {zmMyInit2} from '../../../assets/zm-myInit'
import {addUpload_current} from '../../../assets/newAxios'
export default {
    data(){
        return{
            currentPage:1,
            pagesize:10,
            totalpage:0,
            shaixuan:{
                name:'',
                type:'',
            },
            //抽屉
            drawer: false,
            direction: 'rtl',
            drawer_title:'新增设备',
            isDisabled:true, 
            arrMenu:[
                {title:'全部设备',child:null},
                {title:'生命支持类',child:[
                    {title:'生命一号'},
                    {title:'生命二号'},
                ]},
                
            ],
            tableData:[
                
            ],
            ruleForm:{
               
            },  
        rules: {
              name:[
                {required:true,message:'设备名称不能为空',tirgger:'blur'}
              ]
            },
        }
    },
    mounted(){
        var arrMenu=[]
        this.zmMyInit2('api/ConsumableDict/ShowConsumableDict',{IndexPage:"1",PageSize:"10"})
        console.log(this.arrMenu)
    },
    methods: {
        handleSizeChange,
        handleCurrentChange,
        addUpload,
        myDelete,
        zmMyInit2,
        famter_state,
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose_drawer(done) {
                done();
        },
        myEdit(row,index){
            this.drawer_title='编辑耗材',
            this.drawer=true
            console.log(row,index)
            this.ruleForm.number=row.number
            this.ruleForm.name=row.name
            this.ruleForm.danwei=row.danwei
            this.ruleForm.fenlie=row.fenlie
            this.ruleForm.leixing=row.leixing
            this.ruleForm.jiliang=row.jiliang
            this.ruleForm.state=row.state
            this.ruleForm.bz=row.bz
        },
        change(e){
            this.$forceUpdate()
        },
        myAdd(){
            this.drawer_title='添加耗材',
            this.drawer=true 
            for(let key in this.ruleForm){
                this.ruleForm[key]=""
            }
        },
        myCopy(row,index){
            this.$message.success('编号为'+row.number+'复制成功')
             this.drawer_title='复制耗材'
            this.drawer=true
        },
        myUse(row,index){
            if(row.state===1){
                this.$message('已停用')
                this.tableData[index].state=0
            }else{
                this.$message.success('已启用')
                this.tableData[index].state=1
            }
        },
        myWhitch(row,index,i){
            console.log(row,index,i)
            this.$message(index+'*********** '+i)
        }
    }
}
</script>

<style>
    .snzd_left{
        height: 100%;
    }
    .el-drawer.rtl{
 
        overflow: scroll;
    }
</style>