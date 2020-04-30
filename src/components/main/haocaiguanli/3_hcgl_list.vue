<template>
  <div>
      <!-- 页头 -->
        <div class="pageHead">
            <span>耗材列表</span>
            <el-button size="mini" v-if='isSearch'  @click="myReset" type="primary" icon='el-icon-refresh'></el-button>
        </div>
        <!-- 筛选 -->
        <div class="shaixuan">
            <div>
                <label>耗材名称：</label>
                <div>
                    <el-input size="mini" v-model="shaixuan.haocainame"></el-input>
                </div>
            </div>
            <!-- <div>
                <label>申请部门：</label>
                <div>
                     <el-cascader style="width:100%"  v-model="shaixuan.deid_show" size="mini" :options="prevFenlei" :props="Lives"></el-cascader>
                </div>
            </div> -->
            <div>
                <el-button size="mini" @click="goSearch"><i class="el-icon-aim"></i> 筛选</el-button>
            </div>
        </div>
        <!-- 主体表格 -->
        <div>
            <template>
                <el-table  :data="tableData" style="width: 100%">
                    <el-table-column label="编号"  prop="useNumber"></el-table-column>
                    <el-table-column label="耗材名称" prop="name"></el-table-column>
                    <el-table-column label="价格" prop="price"></el-table-column>
                    <el-table-column label="数量" prop="count"></el-table-column>
                    <el-table-column label="单位" prop="unit"></el-table-column>
                    <el-table-column label="厂商" prop="factory"></el-table-column>
                    <el-table-column label="状态" prop="status" :formatter='famter_state'></el-table-column>
                    <el-table-column label="操作" width="180">
                        <template slot-scope="scope">
                            <el-link type="primary" @click="Tuiroom(scope.row,scope.$index)">退库</el-link>
                        </template>
                    </el-table-column>
                </el-table>
            </template>   
        </div>
        <!-- 分页 -->
        <div class="block" style="height:32px">
            <el-pagination
            style="height:50px"
              @size-change="handleSizeChange($event,'api/HaoCai/haocailist')"
              @current-change="handleCurrentChange($event,'api/HaoCai/haocailist')"
              :current-page="currentPage"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalpage">
            </el-pagination>
        </div>
        <!-- 抽屉--退库 -->
        <el-drawer title="退库"  style="overflow-y: scroll;" :visible.sync="drawer" size='30%'  direction="rtl" >
            <el-form class='drawerform demo-ruleForm'    :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="100px"  >
                <el-form-item label="耗材编号">
                    <el-input v-model="ruleForm.HCId" :disabled="true" size="mini"  autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="耗材名称">
                    <el-input v-model="ruleForm.Name" :disabled="true" size="mini"  autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="规格型号">
                    <el-input v-model="ruleForm.Model" :disabled="true" size="mini"  autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="单位">
                    <el-input v-model="ruleForm.Unit" :disabled="true" size="mini"  autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="品牌">
                    <el-input v-model="ruleForm.Brand" :disabled="true" size="mini"  autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="包装规格">
                    <el-input v-model="ruleForm.Package" :disabled="true" size="mini"  autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="入库价格">
                    <el-input v-model="ruleForm.Inroomprice" :disabled="true" size="mini"  autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="厂商">
                    <el-input v-model="ruleForm.Factory" :disabled="true" size="mini"  autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="耗材种类">
                    <el-input v-model="ruleForm.Hctype" :disabled="true" size="mini"  autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="数量" prop="HCcount">
                    <el-input v-model="ruleForm.HCcount" type='number'  size="mini"  autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="申请人" prop="People" >
                    <UserOption v-model="ruleForm.People"  size="mini"  autocomplete="off"  />
                </el-form-item>
                <el-form-item label="申请科室">
                    <el-input size="mini" v-model="ruleForm.new_Dname" :disabled="true" ></el-input>
                    <!-- <el-cascader style="width:100%"  v-model="ruleForm.req_KS" size="mini" :options="prevFenlei" :props="Lives"></el-cascader> -->
                </el-form-item>
                <el-form-item label="仓库" prop="roomid">
                    <ChangKuOption v-model="ruleForm.roomid"></ChangKuOption>
                </el-form-item>
                <el-form-item>
                    <el-button size="mini" @click="drawer = false">取 消</el-button>
                    <el-button size="mini" type="primary" @click="myUp" >确 定</el-button>
                </el-form-item>
            </el-form>
        </el-drawer>
  </div>
</template>
<script>
import {addUpload,myInit,myDelete,myEdit,myAdd,mySearch,handleSizeChange,handleCurrentChange,famter_state} from '../../../assets/comon'
import { newInit_return } from '../../../assets/newAxios'
import UserOption from '../Child/UserOption'
import ChangKuOption from '../Child/ChangKuOption'
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
                value:'nameandid',
                label:'departmentname',
                checkStrictly: true,
                lazy: true,
                lazyLoad (node, resolve) {
                    const { level,data } = node;
                    if(data){
                        Mylives('api/department/ShowDe',{IndexPage:1,PageSize:10000,id:data.departmentid}).then(res=>{
                            console.log(res.data.results)
                            const nodes = Array.from(res.data.results)
                            resolve(nodes);
                        })
                    }
                }
            },
            isSearch:false,
            searchAPI:'api/search/haocailist',
            shaixuan:{
                IndexPage:'1',
                PageSize:"10",
                haocainame:'',
                haocainumber:'',
                modelid:'',
                factoryid:'',
                deid:'',
                peopleid:'',
                deid_show:''
            },
            prevFenlei:[],
            drawer:false,
            currentPage:1,
            pagesize:10,
            totalpage:0,
            globIndex:"",
            tableData:[],
            ruleForm:{
                HCId:"",
                HCcount:'',
                Number:"", 
                Name:"",
                Model:"",
                Unit:"",
                Brand:"", 
                Package:"",
                Inroomprice:"",
                Factory :"",
                Hctype:"",
                roomid:'',
                roomname:'',
                People:'',
                peoplename:'',
                peopleid:"",
                DeName:'',
                DeId:'',
                req_KS:'',
                listid:'',
                Supplier:'',
                HCtype:'',
                new_Did:'',
                new_Dname:''
            },
            rules: {
                HCcount:[
                    { required: true, message: '数量不能为空', trigger: 'blur' },
                ],
                roomid:[
                    { required: true, message: '仓库不能为空', trigger: 'change' },
                ],
                People:[
                    { required: true, message: '申请人不能为空', trigger: 'change' },
                ],
                req_KS:[
                    { required: true, message: '申请科室不能为空', trigger: 'change' },
                ]
            },
        }
    },
    created(){
        this.newInit_return('api/department/ShowDe',{IndexPage:"1",PageSize:"10000",id:0},true).then(res=>{
            this.prevFenlei=res.data.results
        })
    },
    mounted(){
        this.myInit('api/HaoCai/haocailist',{IndexPage:1,PageSize:10})
    },
    components:{
        UserOption,
        ChangKuOption
    },
    methods:{
        myInit,
        newInit_return,
        handleSizeChange,
        handleCurrentChange,
        famter_state,
        goSearch(){
            if(this.shaixuan.deid_show!=""){
                this.shaixuan.deid=this.shaixuan.deid_show.reverse()[0]
            }
            this.newInit_return(this.searchAPI,this.shaixuan).then(res=>{
                console.log(res)
                this.tableData=res.data.results
                this.totalpage=res.data.totalpage
                this.isSearch=true
            })
        },
        myReset(){
            this.myInit('api/HaoCai/haocailist',{IndexPage:1,PageSize:10})
            for(var key in this.shaixuan){
                this.shaixuan[key]=""
            }
            this.isSearch=false
        },
        Tuiroom(row,index){
            this.drawerTitle='退库'
            console.log(row,index,'11111111111111')
            this.drawer=true
            //数量 申请人自己选
            this.globIndex=index
            this.ruleForm.HCId=row.haocaiid
            this.ruleForm.listid=row.id
            this.ruleForm.Number=row.number
            this.ruleForm.Name=row.name
            this.ruleForm.Model=row.model
            this.ruleForm.Unit=row.unit
            this.ruleForm.Brand=row.brand
            this.ruleForm.Package=row.packpage
            this.ruleForm.Inroomprice=row.price
            this.ruleForm.Factory=row.factory
            this.ruleForm.roomname=row.name
            this.ruleForm.Supplier=row.supplier
            this.ruleForm.Hctype=row.type
            

            this.ruleForm.new_Did=row.deId
            this.ruleForm.new_Dname=row.deName
            console.log(9999,this.ruleForm)
        },
        myUp(){
            this.$refs.ruleForm.validate((valid) => {
            if (valid) {
                this.ruleForm.peoplename=this.ruleForm.People.split('-*-')[1]
                this.ruleForm.peopleid=this.ruleForm.People.split('-*-')[0]
                this.ruleForm.roomid=this.ruleForm.roomid.split('-*-')[0]
                console.log(this.ruleForm)
                if(this.roomtype===0 && this.itemMax*1<this.ruleForm.HCcount*1){
                    this.$message.warning('库存数量不足')
                    return
                }
                var ahcArr=[]
                ahcArr.push(this.ruleForm)
                var uploadData={
                    allhc:ahcArr
                }
                
                this.newInit_return('api/HaoCai/tuiku',
                            {
                                AllData:JSON.stringify(uploadData),
                                roomid:this.ruleForm.roomid,
                                roomtype:this.roomtype,
                                username:this.ruleForm.peoplename,
                                userId:this.ruleForm.peopleid,
                                de_id:this.ruleForm.new_Did,
                                de_name:this.ruleForm.new_Dname
                            }
                    ).then(res=>{
                    console.log(res)
                    if(res.data.response==="success"){
                        this.$message.success("操作成功,应返回到待审批")
                        this.drawer=false

                        // this.tableData[this.globIndex].count=this.tableData[this.globIndex].count*1-this.ruleForm.HCcount*1

                    }else{
                        this.$message.warning(res.data.results)
                    }
                })
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
    }
}
</script>
<style scoped>

</style>