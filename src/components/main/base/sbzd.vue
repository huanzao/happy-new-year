<template>
    <div>
        <!-- 页头 -->
        <div class="pageHead">
            <span>设备字典</span>
            <el-button size="mini" type="primary" @click="myAdd">新增字典</el-button>
            <!-- <el-button size="mini" type="primary">批量导入</el-button> -->
            <el-button size="mini" type="primary">导出Excel</el-button>
            <el-button size="mini" v-if='isSearch'  @click="myReset" type="primary" icon='el-icon-refresh'></el-button>
        </div>
        <!-- 筛选 -->
        <div>
            <div class="shaixuan" style="background:#fff">
                <div>
                    <label>字典名称：</label>
                    <div>
                        <el-input placeholder="请输入内容" prefix-icon="el-icon-search" size="mini" v-model="shaixuan.dictname"></el-input>
                    </div>
                </div>
                <div>
                    <label>器械分类：</label>
                    <div>
                        <el-select v-model="shaixuan.qixieid" filterable placeholder="请选择" size="mini">
                            <el-option v-for="item in qixefenleiArr" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </div>
                </div>
                <div>
                    <label>设备分类：</label>
                    <div>
                        <el-cascader style="width:100%"  v-model="watch_SX_did" size="mini" :options="prevFenlei" :props="Lives"></el-cascader>
                    </div>
                </div>
                <div>
                    <label>状态：</label>
                    <div>
                        <el-select v-model="shaixuan.status" filterable placeholder="请选择" size="mini">
                                <el-option label="启用" value="1"> </el-option>
                                <el-option label="停用" value="0"> </el-option>
                        </el-select> 
                    </div>
                </div>


                <div>
                    <label>计量设备：</label>
                    <div>
                        <el-select v-model="shaixuan.iscount" filterable placeholder="请选择" size="mini">
                            <el-option label="是" value="1"> </el-option>
                            <el-option label="否" value="0"> </el-option>
                        </el-select> 
                    </div>
                </div>
                <div>
                    <el-button size="mini" @click="goSearch"><i class="el-icon-aim"></i> 筛选</el-button>
                </div>
            </div>
            <div>
                <el-table :data="tableData" style="width: 100%;">
                    <el-table-column label="设备编号" prop="number"></el-table-column>
                    <el-table-column label="设备名称" prop="name"></el-table-column>
                    <el-table-column label="单位" prop="unit"></el-table-column>
                    <el-table-column label="设备分类" prop="type_name"></el-table-column>
                    <el-table-column label="器械分类" prop="qixiename"></el-table-column>
                    <el-table-column label="计量设备" prop="iscount" :formatter="famter_iscount"></el-table-column>
                    <el-table-column label="状态" prop="status" width="160" :formatter='famter_state'></el-table-column>
                    <el-table-column label="备注" prop="remark"></el-table-column>
                    <el-table-column label="操作" width="150">
                        <template slot-scope="scope">
                            <el-link type="primary" @click="myEdit(scope.row,scope.$index)">编辑</el-link>
                            
                            <el-link type="primary"  @click="myDelete(scope.$index, '字典'+scope.row.name,{PeopleId:scope.row.peopleid},'api/devicedict/DeleteDi','api/devicedict/ShowDi','result_device')">删除</el-link>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- 分页 -->
            <div class="block" style="height:32px">
                <el-pagination
                style="height:50px"
                @size-change="handleSizeChange($event,'api/devicedict/ShowDi',{},'result_device')"
                @current-change="handleCurrentChange($event,'api/devicedict/ShowDi',{},'result_device')"
                :current-page="currentPage"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalpage">
                </el-pagination>
            </div>
        </div>
        <el-drawer :title="drawer_title" :visible.sync="drawer" :direction="direction">
            <el-form class='drawerform demo-ruleForm'  :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="120px" >
                <el-form-item label="设备名称" prop="name">
                    <el-input v-model="ruleForm.Name" size="mini"    autocomplete="off"  ></el-input>
                </el-form-item>
                <el-form-item label="设备分类" v-if="drawer_title=='添加设备'">
                     <el-cascader style="width:100%"  v-model="ruleForm.MyPid" size="mini" :options="prevFenlei" :props="Lives"></el-cascader>
                </el-form-item>
                <el-form-item label="器械分类">
                    <el-select v-model="wactch_qx" filterable placeholder="请选择" size="mini">
                        <el-option v-for="item in qixefenleiArr" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="单位">
                    <el-input v-model="ruleForm.Unit" size="mini" ></el-input><span @click='addkKeTypeShow=true'></span>
                </el-form-item>
                <el-form-item label="是否计量设备">
                    <el-radio v-model="ruleForm.Iscount" label="1">否</el-radio>
                    <el-radio v-model="ruleForm.Iscount" label="0">是</el-radio>
                </el-form-item>
                <el-form-item label="状态">
                    <el-radio v-model="ruleForm.Status" label="1">启用</el-radio>
                    <el-radio v-model="ruleForm.Status" label="0">停用</el-radio>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="ruleForm.Remark" type="textarea" size="mini" ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button size="mini" @click="addkeshiShow = false">取 消</el-button>
                    <el-button size="mini" type="primary"  @click="myUp">确定</el-button>
                </el-form-item>
            </el-form>
        </el-drawer>
    </div>
</template>
<script>
import {addUpload,myInit,myDelete,handleSizeChange,handleCurrentChange,famter_state} from '../../../assets/comon'
import {newInit_return,addUpload_current} from '../../../assets/newAxios'
import axios from 'axios'
import qs from 'qs'
function Mylives(url,params){
    return axios({
        method: 'post',
        headers:{'Authorization':'Bearer '+localStorage.token},
        timeout:5000,
        url: url,
        data:qs.stringify(params)
    }).then((res)=>{
        return res;
    }).catch((error)=>{
        loading.close()
        this.$message.warning('网络错误,请稍后再试')
    })
}
export default {
    data(){
        return{
            Lives: {
                value:'id',
                label:'name',
                checkStrictly: true,
                lazy: true,
                lazyLoad (node, resolve) {
                    const { level,data } = node;
                    console.log(22233333,data)
                    if(data){
                        Mylives('api/devicedicttype/searchson',{shangji_id:data.id}).then(res=>{
                            const nodes = Array.from(res.data.results_son)
                            resolve(nodes);
                        })
                    }
                    
                }
            },
            prevFenlei:[],
            currentPage:1,
            pagesize:10,
            totalpage:0,
            isSearch:false,
            searchAPI:'api/search/devicedict',
            shaixuan:{
                dictname:'',
                status:'',
                qixieid:'',
                devicetypeid:'',
                iscount:'',
            },
            watch_SX_did:"",
            //抽屉
            drawer: false,
            direction: 'rtl',
            drawer_title:'新增设备',
            arrMenu:[],
            tableData:[],
            wactch_qx:'',
            wactch_qx_change:true,
            ruleForm:{
                Id:'',
                Name :'',
                TypeId :'',
                QixieId :'',
                Unit :'',
                Iscount :'',
                Status :'',
                Remark :'',
                MyPid:""
            },  
            rules: {
                Name:[
                        {required:true,message:'设备名称不能为空',tirgger:'blur'}
                    ]
            },
            qixefenleiArr:[]
        }
    },
    watch:{
        // watch_SX_did:function(value){
        //     if(value!=""){
        //         this.shaixuan.devicetypeid=value.reverse()[0]
        //     }
        // },
        wactch_qx:function(value){
            if(this.wactch_qx_change===false){
                this.wactch_qx_change=true
                console.log(999)
            }else{
                this.ruleForm.QixieId=value
                console.log('便表白')
            }
        }
    },
    created(){
        this.newInit_return('api/devicedicttype/searchson',{shangji_id:0}).then(res=>{
            this.prevFenlei=res.data.results_son.map(item=>{
               item.children=[] 
               return item
            })
            console.log(999,this.prevFenlei)
        })
    },
    mounted(){
        this.newInit_return('api/devicedict/ShowDi',{IndexPage:"1",PageSize:"10"}).then((res)=>{
            console.log(res)
            this.arrMenu=res.data.results_side
            // console.log(this.arrMenu.length)
            this.tableData=res.data.result_device
            console.log(this.arrMenu)
            this.qixefenleiArr=res.data.results_qixie
        })
    },
    methods: {
        addUpload_current,
        addUpload,
        myDelete,
        myInit,
        newInit_return,
        famter_state,
        handleSizeChange,
        handleCurrentChange,
        myReset(){
            this.newInit_return('api/devicedict/ShowDi',{IndexPage:"1",PageSize:"10"}).then((res)=>{
                this.tableData=res.data.result_device
            })
            this.isSearch=false
            for(var key in this.shaixuan){
                this.shaixuan[key]=""
            }
            this.watch_SX_did=""
        },
        goSearch(){
            this.newInit_return('api/search/devicedict',{
                IndexPage:"1",
                PageSize:"10",
                dictname:this.shaixuan.dictname,
                status:this.shaixuan.status,
                qixieid:this.shaixuan.qixieid,
                devicetypeid:this.shaixuan.devicetypeid,
                iscount:this.shaixuan.iscount,
            }).then((res)=>{
                this.tableData=res.data.result_device
            })
            this.isSearch=true
        },
        Current_init(){
             this.newInit_return('api/devicedict/ShowDi',{IndexPage:this.currentPage,PageSize:this.pagesize}).then((res)=>{
                console.log(this.arrMenu.length)
                this.tableData=res.data.result_device
            })
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        famter_iscount(row){
            if(row.iscount==1){
                return '是'
            }else{
                return '否'
            }
        },
        myEdit(row,index){
            this.wactch_qx_change=false
            this.wactch_qx=row.type_name
            this.drawer_title='编辑设备',
            this.drawer=true
            console.log(row,index)
            this.ruleForm.Id=row.id
            this.ruleForm.Name=row.name
            this.ruleForm.TypeId=row.type_id
            this.ruleForm.QixieId=row.qixieid
            this.ruleForm.Unit=row.unit
            this.ruleForm.Iscount=row.iscount
            this.ruleForm.Status=row.status
            this.ruleForm.Remark=row.remark
        },
        myAdd(){
            this.drawer_title='添加设备',
            this.drawer=true 
            this.wactch_qx_change=true
            for(let key in this.ruleForm){
                this.ruleForm[key]=""
            }
            this.wactch_qx=""
        },
        myUp(){
            console.log(this.drawer_title)
            if(this.drawer_title=='添加设备'){
                this.ruleForm.TypeId=this.ruleForm.MyPid.reverse()[0]
                this.addUpload_current('api/devicedict/AddDi','ruleForm')
                this.drawer=false
            }else{
                this.addUpload_current('api/devicedict/UpdateDi','ruleForm')
                this.drawer=false
            }
        },
    }
}
</script>
<style scoped>
    .snzd_left{
        height: 100%;
    }
</style>