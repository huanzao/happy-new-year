<template>
  <div>
        <!-- 页头 -->
        <div class="pageHead">
            <span>科室计划申请</span>
            <el-button size="mini" type="primary" @click='importPrev'>引用上次数据</el-button>
            <el-button size="mini" type="primary" @click="importModel">引用计划模板</el-button>
            <el-button size="mini" type="primary" @click="createOrder">生成订单{{'('+dd_number+')'}}</el-button>
        </div>
        <!-- 筛选 -->
        <div class="shaixuan">
            <div>
                <label>科室名称：</label>
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
                <label>耗材名称：</label>
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
                <label>生产厂家：</label>
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
                <label>耗材类别：</label>
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
                <label>耗材名称：</label>
                <div>
                    <el-input v-model="shaixuan.type" size="mini" placeholder="请输入内容"></el-input>
                </div>
            </div>
            <div>
                <label>规格型号：</label>
                <div>
                    <el-input v-model="shaixuan.type" size="mini" placeholder="请输入内容"></el-input>
                </div>
            </div>
            <div>
                <label>品牌：</label>
                <div>
                    <el-input v-model="shaixuan.type" size="mini" placeholder="请输入内容"></el-input>
                </div>
            </div>
            <div>
                <el-checkbox v-model="shaixuan.check">显示常用耗材</el-checkbox>
            </div>
            <div>
                <el-button size="mini"><i class="el-icon-aim"></i> 筛选</el-button>
            </div>
        </div>
        <!-- 主体表格 -->
        <div>
            <template>
                <el-table  :data="tableData" style="width: 100%" ref="multipleTable"  @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55"> </el-table-column>
                    <el-table-column label="耗材编号"  prop="consumeNum"></el-table-column>
                    <el-table-column  label="耗材名称" prop="consumeName"></el-table-column>
                    <el-table-column label="规格型号" prop="spec"></el-table-column>
                    <el-table-column label="单位" prop="unit"></el-table-column>
                    <el-table-column label="品牌" prop="brand"></el-table-column>
                    <el-table-column label="包装规格" prop="packingSize"></el-table-column>
                    <el-table-column label="计划剩余数" prop="state"></el-table-column>
                    <el-table-column label="入库单价" prop="inroomPrice"></el-table-column>
                    <el-table-column label="生产厂家" prop="factoryname"></el-table-column>
                    <el-table-column label="科室库存" prop="state"></el-table-column>
                    <el-table-column label="科室计划量">
                        <template slot-scope="scope">
                            <input size="mini" type='number' v-model='scope.row.JhCount' @change='numChange($event)' style='display: inline-block;width:60px;'/>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="180">
                        <template >
                            <el-link type="primary" >详情</el-link>
                        </template>
                    </el-table-column>
                </el-table>
            </template>   
        </div>
        <!-- 分页 -->
        <div class="block" style="height:32px">
            <el-pagination
            style="height:50px"
              @size-change="handleSizeChange($event,'api/hcplan/allhc')"
              @current-change="handleCurrentChange($event,'api/hcplan/allhc')"
              :current-page="currentPage"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalpage">
            </el-pagination>
        </div>
        <div style="height:10px;background:#eee"></div>
        <!-- 引用--数据表格 -->
        <div v-if='import_show'>
            <div class="pageHead">
                <span>{{ import_title }}</span>
                <el-button size="mini" type="primary" @click='import_quxiaoi'>取消</el-button>
            </div>
            <el-table  :data="importData" style="width: 100%" ref="multipleTable"  @selection-change="handleSelectionChange">
                <el-table-column label="耗材编号"  prop="number"></el-table-column>
                <el-table-column  label="耗材名称" prop="name"></el-table-column>
                <el-table-column label="规格型号" prop="model"></el-table-column>
                <el-table-column label="单位" prop="unit"></el-table-column>
                <el-table-column label="包装规格" prop="package"></el-table-column>
                <el-table-column label="生产厂家" prop="factory"></el-table-column>
                <el-table-column label="耗材类别" prop="hcType"></el-table-column>
                <el-table-column label="入库单价" prop="inroomPrice"></el-table-column>
                <el-table-column label="计划数量" prop="jhCount"></el-table-column>
                <el-table-column label="品牌" prop="brand"></el-table-column>
            </el-table>
        </div>
        <!-- 生成订单 -->
        <el-dialog class="myDialog" title="订单详情" :visible.sync="dialog_createOrder">
            <el-form :model="tijiaoData" :rules="rules" ref="tijiaoData"  label-width="120px">
                <el-form-item label="申请科室" prop="myKeshi">
                    <KeShiTypeOption size="mini" v-model="tijiaoData.myKeshi" autocomplete="off"></KeShiTypeOption>
                </el-form-item>
                <el-form-item label="申请人" prop="myPeople">
                    <UserOption size="mini" v-model="tijiaoData.myPeople" autocomplete="off"></UserOption>
                </el-form-item>
                <el-form-item label="总数量" prop="TotalCount">
                    <el-input size="mini" v-model="tijiaoData.TotalCount" :disabled="true" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="总金额" prop="TotalPrice">
                    <el-input size="mini" v-model="tijiaoData.TotalPrice" :disabled="true" autocomplete="off"></el-input>
                </el-form-item>
                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="dialog_createOrder = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="submitForm('tijiaoData')">确 定</el-button>
            </div>
        </el-dialog>
  </div>
</template>
<script>
import {addUpload,myInit,myDelete,myEdit,myAdd,mySearch,handleSizeChange,handleCurrentChange} from '../../../assets/comon'
import {newInit_return} from '../../../assets/newAxios'    
import KeShiTypeOption from '../Child/KeShiTypeOption'
import UserOption  from '../Child/UserOption'
    export default {
        data(){
            return{
                dd_number:0,
                currentPage:1,
                pagesize:10,
                totalpage:0,
                shaixuan:{
                    name:'',
                    type:'',
                    check:false,
                },
                tableData:[],
                importData:[],
                dialog_createOrder:false,
                tijiaoData:{
                    AllData:[],
                    ApplyDepartment:'',
                    ApplyDeId:'',
                    ApplyPeople:'',
                    TotalCount:0,
                    TotalPrice:0,
                    Status:0,
                    myPeople:"",
                    myKeshi:'',
                },
                import_show:false,
                import_title:"",
                rules:{
                    myKeshi: [
                        { required: true, message: '请选择科室', trigger: 'blur' }
                    ],
                    myPeople: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' }
                    ],
                    TotalCount: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' }
                    ],
                    TotalPrice: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' }
                    ],
                    Status: [
                        { required: true, message: '请输入活动名称', trigger: 'change' }
                    ],
                }
            }
        },
        mounted(){
            this.newInit_return('api/hcplan/allhc',{IndexPage:1,PageSize:10}).then(res=>{
                this.tableData=res.data.result
            })
        },
        components:{
            UserOption,KeShiTypeOption
        },
        methods:{
            newInit_return,
            handleSizeChange,
            handleCurrentChange,
            import_quxiaoi(){
                this.import_show=false,
                this.importData=[]
            },
            pushData(){
                this.tijiaoData.AllData=[]
                this.tijiaoData.TotalPrice=0
                this.tijiaoData.TotalCount=0
                if(this.importData.length!==0){
                    this.tijiaoData.TotalPrice+=(item.inroomprice*1)*(item.count*1)
                    this.tijiaoData.TotalCount+=(item.count*1)
                    this.importData.filter(item=>{
                        this.tijiaoData.AllData.push({
                            Number:item.number,
                            Name:item.name,
                            Model:item.model,
                            Unit:item.unit,
                            Brand:item.brand,
                            Package:item.package,
                            InroomPrice:item.inroomprice,
                            Factory:item.factory,
                            HcId:item.haocaiId,
                            JhCount:item.count,
                        })
                    })
                }
                this.tableData.filter(item=>{
                    if(item.JhCount!==""&&item.JhCount!==undefined){
                        this.tijiaoData.TotalPrice+=(item.inroomPrice*1)*(item.JhCount*1)
                        this.tijiaoData.TotalCount+=(item.JhCount*1)
                        this.tijiaoData.AllData.push({
                            Number:item.consumeNum,
                            Name:item.consumeName,
                            Model:item.spec,
                            Unit:item.unit,
                            Brand:item.brand,
                            Package:item.packingSize,
                            InroomPrice:item.inroomPrice,
                            Factory:item.factoryname,
                            HcId:item.manufacturer,
                            JhCount:item.JhCount,
                        })
                    }
                })
                this.dd_number=this.tijiaoData.AllData.length
            },
            numChange(prop){
                // this.pushData() 
            },
            createOrder(){
                this.pushData()
                if(this.dd_number===0){
                    this.$message('请选择耗材')
                }else{
                    this.dialog_createOrder=true
                }
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    console.log(this.tijiaoData)
                    this.tijiaoData.ApplyDeId=this.tijiaoData.myKeshi.split('-*-')[0]
                    this.tijiaoData.ApplyDepartment=this.tijiaoData.myKeshi.split('-*-')[1]
                    this.tijiaoData.ApplyPeople=this.tijiaoData.myPeople.split('-*-')[0]

                    if (valid) {
                        this.tijiaoData.AllData=JSON.stringify(this.tijiaoData.AllData)
                        this.newInit_return('api/hcplan/addplan',this.tijiaoData).then(res=>{
                            console.log(res)
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            importPrev(){
                this.newInit_return('api/hcplan/copylast',{departmentid:1}).then(res=>{
                    console.log(res)
                    if(res.data.results.length===0){
                        this.$message.warning('暂无数据')
                    }else{
                        this.import_show=true,
                        this.import_title="引用上次数据列表"
                        this.importData=res.data.results
                    }
                })
            },
            importModel(){
                this.newInit_return('api/hcplan/copymodels',{departmentid:1}).then(res=>{
                    console.log(res)
                    if(res.data.results.length===0){
                        this.$message.warning('暂无数据')
                    }else{
                        this.import_show=true,
                        this.import_title="引用上次数据列表"
                        this.importData=res.data.results
                    }
                })
            },
            toggleSelection(rows) {
                if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
                } else {
                this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
            
        }
    }
    
</script>
<style scoped>

</style>