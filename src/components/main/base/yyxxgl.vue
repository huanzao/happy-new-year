<template>
  <div>
      <!-- 页头 -->
        <div class="pageHead">
            <span>医院信息管理</span>
        </div>
        <!-- 主体表格 -->
        <div>
            <el-card class="box-card">
                <div class="text item" style="line-height: 50px;" >
                    <span style=''>医院logo</span> 
                    <div style="display: inline-block;width:70px;height:30px;">
                        <img src="../../../assets/bg1.jpg"  style='width:100%;height:100%'>
                    </div>
                    
                </div>
                <div class="text item">
                    <span>平台代码</span>
                    <div>456546645</div>
                </div>
                <div class="text item">
                    <span>医院名称</span>
                    <div>河南恒华医院</div>
                </div>
                <div class="text item">
                    <span>医院地址</span>
                    <div>
                        <span v-if="!addressIs">{{ editArr[0].name }}</span>
                        <span v-if="!addressIs">{{ editArr[0].number }}</span>
                        <el-input v-if="addressIs" size="mini" style="width:15%" v-model="editArr[0].name"></el-input>
                        <el-input v-if="addressIs" size="mini" style="width:15%" v-model="editArr[0].number"></el-input>
                        <el-link :underline="false" type="primary" v-if="!addressIs" @click='addressIs=true'>编辑</el-link>
                        <el-link :underline="false" type="primary" v-if="addressIs"  @click='upload(0)'>确定</el-link>
                        <el-link :underline="false" type="primary" v-if="addressIs"  @click='addressIs=false'>取消</el-link>
                    </div>
                </div>
                <div class="text item">
                    <span>采购年限下线</span>
                    <div>
                        <span v-if="!caigouIs">{{ editArr[1].money }}</span>
                        <el-input v-if="caigouIs" size="mini" style="width:15%" v-model="editArr[1].money"></el-input>
                        <el-link :underline="false" type="primary" v-if="!caigouIs" @click='caigouIs=true'>编辑</el-link>
                        <el-link :underline="false" type="primary" v-if="caigouIs"  @click='upload(1)'>确定</el-link>
                        <el-link :underline="false" type="primary" v-if="caigouIs"  @click='caigouIs=false'>取消</el-link>
                    </div>
                </div>
                <div class="text item">
                    <span>LED设置</span>
                    <div>
                       <el-link :underline="false" type="primary" v-if="!ledIs" @click='ledIs=true' >编辑</el-link> 
                       <el-link :underline="false" type="primary" v-if="ledIs" @click='ledIs=false' >取消</el-link> 
                    </div>
                    <p v-if='ledIs'>
                        <el-form :model="editArr[2]"    label-width="120px" class="demo-ruleForm">
                            <el-form-item label="LED标题">
                                <el-input v-model="editArr[2].title" size="mini"  autocomplete="off"  ></el-input>
                            </el-form-item>
                            <el-form-item label="每行页数">
                                <el-input v-model="editArr[2].page" size="mini"    autocomplete="off"  ></el-input>
                            </el-form-item>
                            <el-form-item label="轮播频率(3)" prop="ksName">
                                <el-input v-model="editArr[2].pl" size="mini"   autocomplete="off" ></el-input>
                            </el-form-item>
                            <el-form-item label="LED音效">
                                <el-input v-model="editArr[2].mp3" size="mini" ></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button size="mini" @click="ledIs=false">取 消</el-button>
                                <el-button size="mini" type="primary"  @click="addUpload('api/People/AddPeople','ruleForm')">确 定</el-button>
                            </el-form-item>
                        </el-form>
                        
                    </p>
                </div>
                <div class="text item">
                    <span>采购额度设置</span>
                    <div>
                       <el-link :underline="false" type="primary" v-if="!edIs" @click='edIs=true' >编辑</el-link> 
                       <el-link :underline="false" type="primary" v-if="edIs" @click='edIs=false' >取消</el-link> 
                    </div>
                    <p v-if='edIs'>
                        <el-form :model="editArr[3]"    label-width="120px" class="demo-ruleForm">
                            <el-form-item label="政府招标额度">
                                <el-input v-model="editArr[3].a" size="mini"  autocomplete="off"  ></el-input>
                            </el-form-item>
                            <el-form-item label="内部招标额度">
                                <el-input v-model="editArr[3].b" size="mini"    autocomplete="off"  ></el-input>
                            </el-form-item>
                            <el-form-item label="自行招标额度" prop="ksName">
                                <el-input v-model="editArr[3].c" size="mini"   autocomplete="off" ></el-input>
                            </el-form-item>
                            <el-form-item label="是否重置额度">
                                <el-radio v-model="editArr[3].d" label=true >是</el-radio>
                                <el-radio v-model="editArr[3].d" label=false >否</el-radio>
                            </el-form-item>
                            <el-form-item>
                                <el-button size="mini" @click="edIs=false">取 消</el-button>
                                <el-button size="mini" type="primary"  @click="addUpload('api/People/AddPeople','ruleForm')">确 定</el-button>
                            </el-form-item>
                        </el-form>
                        
                    </p>
                </div>
                <div class="text item">
                    <span>资产编号规则</span>
                    <div>
                       <el-link :underline="false" type="primary" v-if="!gzIs" @click='gzIs=true' >编辑</el-link> 
                       <el-link :underline="false" type="primary" v-if="gzIs" @click='gzIs=false' >取消</el-link> 
                    </div>
                    <p v-if='gzIs'>
                        <el-form :model="editArr[4]"    label-width="120px" class="demo-ruleForm">
                            <el-form-item label="生成规则">
                                <el-select v-model="editArr[4].a" filterable placeholder="请选择" size="mini">
                                    <el-option v-for="item in 20" :key="item" :label="item" :value="item"> </el-option>
                                </el-select> 
                            </el-form-item>
                            <el-form-item>
                                <el-button size="mini" @click="gzIs=false">取 消</el-button>
                                <el-button size="mini" type="primary"  @click="addUpload('api/People/AddPeople','ruleForm')">确 定</el-button>
                            </el-form-item>
                        </el-form>
                        
                    </p>
                </div>
            </el-card>
        </div>
  </div>
</template>
<script>
 export default {
        data(){
            return{
                addressIs:false,
                caigouIs:false,
                ledIs:false,
                edIs:false,
                gzIs:false,
                editArr:[
                    {name:'郑州市升龙广场一号楼A座1606',number:'044200'},
                    {money:'5456'},
                    {title:'',page:'',pl:'',mp3:''},
                    {a:'',b:'',c:'',d:false},
                    {a:''},
                ]
            }
        },
        mounted(){

        },
        methods:{
            upload(index){
                console.log(index)
            },
            text(index){
                this.isEdit[index]=true
                console.log(this.isEdit[index])
            }
        }
    }
</script>
<style scoped>
    .box-card>div>div{
         line-height:50px;
         border-bottom: 1px solid #333;   
         display: flex;
         align-items: center;
         flex-wrap:wrap;
         padding: 0px 20px;
    }
    .box-card>div>div:last-child{
        border-bottom: 0;
    }
    .box-card>div>div>span{
        width: 15%;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .box-card>div>div>p{
        width: 100%;
        margin: 0;
        padding: 5px;
    }
    .box-card>div>div>div{
        width: 85%;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        
    }
    .box-card>div>div>div>a{
        float: right;
        padding: 0 10px;
    }
    .demo-ruleForm .el-input,.demo-ruleForm .el-select{
        width: 40%;
    }
</style>