<template>
  <div>
      <!-- 页头 -->
        <div class="pageHead">
            <span>合同管理</span>
            <!-- <el-button size="mini"   type="primary">导入</el-button> -->
            <el-button size="mini" @click="myAdd('addht','add')"  type="primary">新增</el-button>
        </div>
        <!-- 筛选 -->
        <div class="shaixuan">
            <div>
                <label>乙方单：</label>
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
                <label>和同名：</label>
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
                <label>合同类型：</label>
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
                <label>签订日期：</label>
                <div>
                    <el-date-picker
                        size="mini"
                        v-model="shaixuan.type"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        format="yyyy-MM-dd"
                        end-placeholder="结束日期">
                    </el-date-picker> 
                </div>
            </div>
            <div>
                <el-button size="mini"><i class="el-icon-aim"></i> 筛选</el-button>
            </div>
        </div>
        <!-- 主体表格 -->
        <div>
            <template>
                <el-table  :data="tableData" style="width: 100%">
                    <el-table-column label="合同编号"  prop="number"></el-table-column>
                    <el-table-column  label="合同名称" prop="name"></el-table-column>
                    <el-table-column label="合同类型" prop="type"></el-table-column>
                    <el-table-column label="乙方单位" prop="yifangUnit"></el-table-column>
                    <el-table-column label="乙方联系人" prop="yifangPeople"></el-table-column>
                    <el-table-column label="联系电话" prop="yifangTel"></el-table-column>
                    <el-table-column label="签订日期" prop="qdData"></el-table-column>
                    <el-table-column label="截至日期" prop="jzData"></el-table-column>
                    <el-table-column label="合同内容" prop="content"></el-table-column>
                    <el-table-column label="操作" width="180">
                        <template slot-scope="scope">
                            <el-link :underline="false" type="primary" @click="myEdit(scope.row,'addht','edit')">编辑</el-link>
                             <el-link type="primary"  @click="myDelete(scope.$index, '合同'+scope.row.name,{agreementId:scope.row.id},'api/agreement/Delete','api/agreement/Show')">删除</el-link>
                        </template>
                    </el-table-column>
                </el-table>
            </template>   
        </div>
        <!-- 分页 -->
        <div class="block" style="height:32px">
            <el-pagination
            style="height:50px"
              @size-change="handleSizeChange($event,'api/agreement/Show')"
              @current-change="handleCurrentChange($event,'api/agreement/Show')"
              :current-page="currentPage"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalpage">
            </el-pagination>
        </div>
        <!-- 抽屉 -->
        <el-drawer title="编辑合同" :visible.sync="drawer" size='40%'  direction="rtl" >
            <el-form class='drawerform demo-ruleForm' style="padding-right: 20px;height: 80%;overflow-y: scroll;"   :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="90px"  >
                <div class="myitem">
                   <el-form-item label="注册证编号">
                        <el-input v-model="ruleForm.number" size="mini"  autocomplete="off" ></el-input>
                    </el-form-item>
                    <el-form-item label="产品名称">
                        <el-input v-model="ruleForm.number" size="mini"  autocomplete="off"  ></el-input>
                    </el-form-item> 
                </div>
                <div class="myitem">
                   <el-form-item label="企业名称">
                        <el-input v-model="ruleForm.number" size="mini"  autocomplete="off" ></el-input>
                    </el-form-item>
                    <el-form-item label="规格型号">
                        <el-input v-model="ruleForm.number" size="mini"  autocomplete="off"  ></el-input>
                    </el-form-item> 
                </div>
                <div class="myitem">
                   <el-form-item label="代理商">
                        <el-input v-model="ruleForm.number" size="mini"  autocomplete="off" ></el-input>
                    </el-form-item>
                    <el-form-item label="批准日期">
                        <el-input v-model="ruleForm.number" size="mini"  autocomplete="off"  ></el-input>
                    </el-form-item> 
                </div>
                <div class="myitem">
                   <el-form-item label="有效日期">
                        <el-input v-model="ruleForm.number" size="mini"  autocomplete="off" ></el-input>
                    </el-form-item>
                    <el-form-item label="审批部门">
                        <el-input v-model="ruleForm.number" size="mini"  autocomplete="off"  ></el-input>
                    </el-form-item> 
                </div>
                <div class="myitem">
                   <el-form-item label="变更日期">
                        <el-input v-model="ruleForm.number" size="mini"  autocomplete="off" ></el-input>
                    </el-form-item>
                    <el-form-item label="是否进口">
                        <el-input v-model="ruleForm.number" size="mini"  autocomplete="off"  ></el-input>
                    </el-form-item> 
                </div>
                <el-form-item label="变更情况">
                    <el-input v-model="ruleForm.number" size="mini" type="textarea" autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="生产地址">
                    <el-input v-model="ruleForm.number" size="mini" type="textarea" autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="储存条件">
                    <el-input v-model="ruleForm.number" size="mini" type="textarea" autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="主要成分">
                    <el-input v-model="ruleForm.number" size="mini" type="textarea" autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="使用范围">
                    <el-input v-model="ruleForm.number" size="mini" type="textarea" autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="预期用途">
                    <el-input v-model="ruleForm.number" size="mini" type="textarea" autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="生产标准">
                    <el-input v-model="ruleForm.number" size="mini" type="textarea" autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="组织及构成">
                    <el-input v-model="ruleForm.number" size="mini" type="textarea" autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="其他内容">
                    <el-input v-model="ruleForm.number" size="mini" type="textarea" autocomplete="off" ></el-input>
                </el-form-item>
                
                <el-form-item>
                    <el-button size="mini" @click="addkeshiShow = false">取 消</el-button>
                    <el-button size="mini" type="primary"  @click="addUpload('api/People/AddPeople','ruleForm')">确 定</el-button>
                   
                </el-form-item>
            </el-form>
        </el-drawer>
  </div>
</template>
<script>
import {addUpload,myInit,myDelete,myAdd,myEdit,mySearch,handleSizeChange,handleCurrentChange} from '../../../assets/comon'
import {newInit,newInit_return} from '../../../assets/newAxios'
    export default {
        data(){
            return{
                drawer:false,
                currentPage:1,
                pagesize:10,
                totalpage:0,
                shaixuan:{
                    name:'',
                    type:'',
                },
                ruleForm:{
                    Name :'',
                    TypeId :'',
                    QixieId :'',
                    Unit :'',
                    Iscount :'',
                    Status :'',
                    Remark :'',
                },
                tableData:[{state:'qwqwqw'}],
                rules: {
                    name:[
                        {required:true,message:'设备名称不能为空',tirgger:'blur'}
                    ]
                },
            }
        },
        mounted(){
            this.newInit_return('api/agreement/Show',{IndexPage:"1",PageSize:"10"}).then(res=>{
                console.log(res)
                this.tableData=res.data.results_papers
            })
        },
        methods:{
            newInit_return,
            myDelete,
            handleSizeChange,
            handleCurrentChange,
            myEdit,
            myAdd,
            
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
</style>