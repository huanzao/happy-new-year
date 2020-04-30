<template>
    <div>
        <!-- 页头 -->
        <div class="pageHead">
            <span>设备分类</span>
            <el-button size="mini" @click="add"  type="primary">新增</el-button>
            <el-button size="mini" v-if='isSearch'  @click="myReset" type="primary" icon='el-icon-refresh'></el-button>

        </div>
        <!-- 筛选 -->
        <div class="shaixuan">
            <div>
                <label>分类名称：</label>
                <div>
                    <el-input size='mini' v-model="shaixuan.typename"></el-input>
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
                <el-button size="mini" @click="goSearch"><i class="el-icon-aim"></i> 筛选</el-button>
            </div>
        </div>
        <!-- 主体表格 -->
        <div>
            <template>
                <el-table v-if='isReload'  :data="tableData" style="width: 100%"
                    row-key="typeid"
                    lazy
                    :load="load"
                    :tree-props="{children: 'children', hasChildren: 'hasChildren'}" >
                    <el-table-column label="分类编号" prop="s.number"></el-table-column>
                    <el-table-column label="分类名称" prop="s.name"></el-table-column>
                    <el-table-column label="最后修改人" prop="s.editPeople"></el-table-column>
                    <el-table-column label="最后修改时间" prop="s.editTime"></el-table-column>
                    <el-table-column label="启用状态" prop="s.status"  :formatter='famter_state'></el-table-column>
                    <el-table-column label="备注" prop="s.remark"></el-table-column>
                    <el-table-column label="操作" width="150">
                        <template slot-scope="scope">
                            <el-link type="primary" @click="edit(scope.row,scope.$index)">编辑</el-link>
                            <!-- <el-link type="primary" @click="myDelete(scope.$index,'分类-'+scope.row.s.name,{DeId :scope.row.typeid},'api/devicedicttype/DeleteDi','api/devicedicttype/ShowDi')">删除</el-link> -->
                        </template>
                    </el-table-column>
                </el-table>
            </template>   
        </div>
        <!-- 分页 -->
        <div class="block" style="height:32px">
            <el-pagination
            style="height:50px"
              @size-change="handleSizeChange($event,'api/devicedicttype/ShowDi',{id:0})"
              @current-change="handleCurrentChange($event,'api/devicedicttype/ShowDi',{id:0})"
              :current-page="currentPage"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalpage">
            </el-pagination>
        </div>
        <!-- 弹框  -->
        <el-drawer :title="drawer_title" width="400px;" :visible.sync="drawerShow" :direction="direction" :before-close="cancel">
            <el-form :model="ruleForm"    :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" style="padding-right:20px">
                <el-form-item label="分类编号：" v-if="!isEdit">
                    <el-input v-model="ruleForm.Number" size="mini" :placeholder="place"  autocomplete="off" :disabled="isDisabled1" ></el-input>
                </el-form-item>
                <el-form-item label="分类名称：" prop="Name">
                    <el-input v-model="ruleForm.Name" size="mini"    autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="所属分类："    v-if="drawer_title=='添加分类'">
                    <el-cascader style="width:100%" placeholder='如果不选择就是第一类' v-model="ruleForm.MyPid" size="mini" :options="prevFenlei" :props="Lives"></el-cascader>
                </el-form-item>
                <el-form-item label="状态：">
                    <el-radio v-model="ruleForm.Status" label="1">启用</el-radio>
                    <el-radio v-model="ruleForm.Status" label="0">停用</el-radio>
                </el-form-item>
                <el-form-item label="备注：">
                    <el-input v-model="ruleForm.Remark" size="mini" ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button size="mini" @click="cancel">取 消</el-button>
                    <el-button size="mini" type="primary"  @click="upload">确 定</el-button>
                </el-form-item>
            </el-form>      
        </el-drawer>
    </div>
</template>
<script>
import {addUpload,myInit,myDelete,myEdit,myAdd,mySearch,handleSizeChange,handleCurrentChange} from '../../../assets/comon'
import {addUpload_current,newInit_return} from '../../../assets/newAxios'
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
    data() {
      return {
        Lives: {
            value:'id',
            checkStrictly: true,
            label:'name',
            lazy: true,
            lazyLoad (node, resolve) {
                const { level,data } = node;
                console.log(222,data)
                if(data){
                    Mylives('api/devicedicttype/searchson',{shangji_id:data.id},true).then(res=>{
                        const nodes = Array.from(res.data.results_son)
                        resolve(nodes);
                    })
                }
            }
        },
        isReload:true,
        isSearch:false,
        searchAPI:'api/search/devicetype',
        shaixuan:{
            typename:'',
            status:''
        },
        watchFenLei:[],
        prevFenlei:[],
        labelPosition:'left',
        currentPage:1,
        pagesize:10,
        totalpage:0,
        editShow: false,
        addShow: false,    //添加科室弹框
        isEdit:false,
        keshiDialogTitle:'',
        isDisabled:true,       
        addkKeTypeShow:false,  //科室类别
        drawerShow:false,
        drawer_title:"",
        direction:'rtl',
        place:'',
        uploadUrl:'',
        isDisabled1:true,
        ruleForm:{
            Id:'',
            Number:'',
            Name:'',
            Pid:'',
            EditTime:'',
            EditPeople:'',
            Remark:'',
            Status:1,
            MyPid:''
        },  
        rules: {
            Name:[
                {required:true,message:'此项不能为空',tirgger:'blur'}
            ],
            MyPid:[
                {required:true,message:'此项不能为空'}
            ],
        },
        keshiType:[],
        tableData:[]
      }
    },
    watch:{

    },
    created(){
        this.newInit_return('api/devicedicttype/searchson',{shangji_id:0}).then(res=>{
            this.prevFenlei=res.data.results_son
        })
    },
    mounted(){
        this.myInit('api/devicedicttype/ShowDi',{IndexPage:"1",PageSize:"10",id:0})
    },
    methods:{
        myInit,
        myDelete,  
        myEdit,
        myAdd,
        mySearch,
        handleSizeChange,
        handleCurrentChange,
        addUpload,
        addUpload_current,
        famter_state(row){
            if(row.s.status*1===1){
                return '启用'
            }else{
                return '禁用'
            }
        },
        newInit_return,
        load(tree, treeNode, resolve){
            console.log('treee',tree)
            console.log('treeNode',treeNode)
            this.newInit_return('api/devicedicttype/ShowDi',{IndexPage:"1",PageSize:"100",id:tree.typeid},true).then(res=>{    
                console.log(res) 
                resolve(res.data.results)
            })
        },
        myReset(){
            this.myInit('api/devicedicttype/ShowDi',{IndexPage:this.currentPage,PageSize:this.pagesize,id:0})
            this.isSearch=false
            for(var key in this.shaixuan){
                this.shaixuan[key]=""
            }
        },
        goSearch(){
            this.myInit(this.searchAPI,{IndexPage:'1',PageSize:'10',typename:this.shaixuan.typename,status:this.shaixuan.status})
            this.isSearch=true
        },
        handleChangeLeve(value){
            console.log(value)
        },
        edit(row,index){
            this.isEdit=true
            this.drawerShow=true   
            this.isDisabled1=true      
            this.drawer_title='编辑分类'
            this.uploadUrl='api/devicedicttype/UpdateDi'
            this.ruleForm.Id=row.typeid
            this.ruleForm.Name=row.s.name
            this.ruleForm.Remark=row.s.remark
            this.ruleForm.Status=row.s.status
            this.ruleForm.Pid=row.s.pid
            // this.newInit_return('api/devicedicttype/searchson',{shangji_id:row.pid}).then(res=>{
            //     this.prevFenlei=res.data.results_son
            // })
        },
        add(){
            for(var key in this.ruleForm){
                this.ruleForm[key]=""
            }
            this.isEdit=false
            this.drawerShow=true        
            this.place="如不输入则系统自动生成" 
            this.isDisabled1=false
            this.drawer_title='添加分类'
            this.uploadUrl='api/devicedicttype/AddDi'
            this.ruleForm.Status='1'
            this.newInit_return('api/devicedicttype/searchson',{shangji_id:0}).then(res=>{
                console.log(999,res)
                this.prevFenlei=res.data.results_son
            })
        },
        Current_init(){
            this.drawerShow=false
            this.myInit('api/devicedicttype/ShowDi',{IndexPage:"1",PageSize:"10"})
        },
        upload(){
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    
                    if(this.drawer_title=="添加分类"){
                        if(this.ruleForm.MyPid!=""){
                            this.ruleForm.Pid=this.ruleForm.MyPid.reverse()[0]
                            this.isReload=false
                        }else{
                            this.ruleForm.Pid=0
                        }
                        this.newInit_return('api/devicedicttype/AddDi',this.ruleForm).then(res=>{
                            console.log('******',res)
                            
                            if(res.data.response=="success"){
                                this.$message.success(res.data.results)
                            }else{
                                this.$message.warning(res.data.results)
                            }

                            if( this.ruleForm.Pid===0){
                                this.myInit('api/devicedicttype/ShowDi',{IndexPage:this.currentPage,PageSize:this.pagesize,id:0})
                            }

                            this.isReload=true
                            this.drawerShow=false
                        })
                    }else{
                        if( this.ruleForm.Pid!=0){
                            this.isReload=false
                        }
                        this.newInit_return('api/devicedicttype/UpdateDi',this.ruleForm).then(res=>{
                            console.log(res)
                            if(res.data.response==="success"){
                                this.$message.success(res.data.results)
                                this.drawerShow=false
                                this.newInit_return('api/devicedicttype/ShowDi',{IndexPage:this.currentPage,PageSize:this.pagesize,id:0}).then(res=>{
                                    
                                    this.tableData=res.data.results
                                    this.isReload=true
                                })
                            }else{
                                this.isReload=true
                                this.$message.warning(res.data.results)
                            }
                        })
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        cancel(){
            this.drawerShow=false
            this.ruleForm.Number=""
            this.ruleForm.Name=""
            this.ruleForm.Pid=""
            this.ruleForm.EditTime=""
            this.ruleForm.EditPeople=""
            this.ruleForm.Remark=""
            this.ruleForm.Status=""
        },
        ksType_edit(row){
            console.log(row)
            this.keshiType.map(item=>{
                item.show=2
                if(item.id===row.id){
                    item.show=1
                }
                return item
            })
        },
        ksType_cancel(row,index){
            console.log(111,row)
             this.addShow=false
            if(row.id===null){
                this.keshiType.splice(index,1)
            }else{
                this.keshiType[index].show=2
                console.log(222,this.keshiType[index])
            }
        },
        add_quxiao(){
            let newarr=this.keshiType.filter(item=>{
                return item.id!==null
            })
            this.keshiType=newarr
            this.addShow=false
        },
        edit_quxiao(){
            let newarr=this.keshiType.filter(item=>{
                return item.id!==null
            })
            this.keshiType=newarr
            this.addShow=false
        },
        addksType(){
            console.log(112)
            var itme={id:null,name:'',show:1}
            this.keshiType.unshift(itme)
        },
        ksType_sure(item){
            this.$message('发送AJAx'+item.name)
        },
        myStop(row,index){
            console.log(row,index)
        }
    }
  }
</script>
<style scoped>
    .addkeTyoestyle{
        border: 1px solid #333;
        border-bottom: 0;
    }
    .addkeTyoestyle>li{
        border-bottom:1px solid #333; 
        padding: 5px;
    }
    .addkeTyoestyle>li>div{
        height: 30px;
        padding-right:30px; 
    }
    .addkeTyoestyle>li>div p{
        line-height: 30px;
    }
    .addkeTyoestyle>li>div span{
        display:block;
        float: right;
        line-height: 30px;
        cursor: pointer;
        padding:0 10px ;
    }
</style>
