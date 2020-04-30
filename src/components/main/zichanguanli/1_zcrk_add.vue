<template>
  <div>
      <!-- 页头 -->
        <div class="pageHead">
            <span>{{ p_title }}</span>
            <el-button size="mini" :underline='false' @click="myCancel" type="primary">返回</el-button>
        </div>
        
        <!-- 主体表格 -->
        <div style="width:70%;display: flex;justify-content: center;margin:auto">
             <el-form class=' demo-ruleForm'  style="width:80%"   :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="100px"  >
                <div class="smTitle">
                    <span>{{ p_title  }}</span>
                </div>
                <div class="myitem">
                    <el-form-item label="选择设备">
                        <span slot="label"><i style="color:red">*</i>  选择设备</span>
                        <el-select size="mini" v-model="sb_Messaage_index" filterable >
                            <el-option v-for="(item,index) in sb_Messaage"  :disabled="item.status==0" :key="index" :value="index" :label="item.name" ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="设备编号">
                        <el-input v-model="ruleForm.DeviceNum" :disabled="true" size="mini"  autocomplete="off"  ></el-input>
                    </el-form-item>
                </div>
                <div class="myitem">
                    <el-form-item label="设备类型">
                        <el-input :value="show_message.type_name" size="mini" :disabled="true"  autocomplete="off"  ></el-input>
                    </el-form-item>
                    <el-form-item label="器械分类">
                        <el-input :value="show_message.qixie_name" size="mini" :disabled="true"  autocomplete="off"  ></el-input>
                    </el-form-item>
                </div>
                <div class="myitem">
                    <el-form-item label="单位">
                        <el-input v-model="ruleForm.Unit" size="mini" :disabled="true"  autocomplete="off"  ></el-input>
                    </el-form-item>
                    <el-form-item label="通用名称">
                        <el-input v-model="ruleForm.UsallyName" size="mini"  autocomplete="off"  ></el-input>
                    </el-form-item>
                </div>
                <div class="myitem">
                    <el-form-item label="原设备编号">
                        <el-input v-model="ruleForm.OldNum" size="mini"  autocomplete="off"  ></el-input>
                    </el-form-item>
                    <el-form-item label="注册证号">
                        <el-input v-model="ruleForm.RegisterNum" size="mini"  autocomplete="off"  ></el-input>
                    </el-form-item>
                </div>
                <div class="myitem">
                    <el-form-item>
                        <span slot="label"><i style="color:red">* </i>设备原值</span>
                        <el-input v-model="ruleForm.InitPrice" size="mini"  type="number" autocomplete="off"  ></el-input>
                    </el-form-item>
                    <el-form-item label="设备来源">
                        <el-input v-model="ruleForm.DeviceSource" size="mini"  autocomplete="off"  ></el-input>
                    </el-form-item>
                </div>
                <div class="myitem">
                    <el-form-item>
                        <span slot="label"><i style="color:red">* </i>设备数量</span>
                        <el-input v-model="ruleForm.DeviceCount" size="mini"  type='number' autocomplete="off"  ></el-input>
                    </el-form-item>
                    <el-form-item label="规格型号">
                        <el-input v-model="ruleForm.Devicemodel" size="mini"  autocomplete="off"  ></el-input>
                    </el-form-item>
                </div>
                <div class="myitem">
                    <el-form-item label="供应商">
                        <el-input v-model="ruleForm.Supplier" size="mini"  autocomplete="off"  ></el-input>
                    </el-form-item>
                    <el-form-item label="品牌">
                        <el-input v-model="ruleForm.Brand" size="mini"  autocomplete="off"  ></el-input>
                    </el-form-item>
                </div>
                <div class="myitem">
                    <el-form-item label="生产厂商">
                        <el-input v-model="ruleForm.Factory" size="mini"  autocomplete="off"  ></el-input>
                    </el-form-item>
                    <el-form-item label="购入日期">
                        <el-date-picker v-model="ruleForm.BuyDate" format="yyyy-MM-dd" size="mini"  type="date" placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                </div>
                <div class="myitem">
                    <el-form-item label="出厂编号">
                        <el-input v-model="ruleForm.LeaveFactoryNum" size="mini"  autocomplete="off"  ></el-input>
                    </el-form-item>
                    <el-form-item label="出厂日期">
                        <el-date-picker v-model="ruleForm.LeaveFactoryDate"  format="yyyy-MM-dd" size="mini"  type="date" placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                </div>
                <div class="myitem">
                    <el-form-item label="设备序列号">
                    <el-input v-model="ruleForm.DeviceSerialNumber" size="mini"  autocomplete="off"  ></el-input>
                    </el-form-item>
                    <el-form-item label="维保商">
                        <el-input v-model="ruleForm.RepairFactory" size="mini"  autocomplete="off"  ></el-input>
                    </el-form-item>
                </div>
                <div class="myitem">
                    <el-form-item label="维保截止日期">
                        <el-date-picker v-model="ruleForm.RepairEndDate"  format="yyyy-MM-dd" size="mini"  autocomplete="off"  ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="发票号">
                        <el-input v-model="ruleForm.BillNum" size="mini"  autocomplete="off"  ></el-input>
                    </el-form-item>
                </div>
                <div class="myitem">
                    <el-form-item label="财务编号">
                    <el-input v-model="ruleForm.FinaunceNum" size="mini"  autocomplete="off"  ></el-input>
                    </el-form-item>
                    <el-form-item label="折旧总额">
                        <el-input v-model="ruleForm.ZhejiuTotal" size="mini"  autocomplete="off"  ></el-input>
                    </el-form-item>
                </div>
                <div class="myitem">
                    <el-form-item label="折旧月数">
                    <el-input v-model="ruleForm.ZhejiuMonths" size="mini"  autocomplete="off"  ></el-input>
                    </el-form-item>
                    <el-form-item label="国有资产编号">
                        <el-input v-model="ruleForm.CountryNum" size="mini"  autocomplete="off"  ></el-input>
                    </el-form-item>
                </div>
                <div class="myitem">
                    <el-form-item label="存放地点">
                    <el-input v-model="ruleForm.ProducePlace" size="mini"  autocomplete="off"  ></el-input>
                    </el-form-item>
                    <el-form-item label="档案编号">
                        <el-input v-model="ruleForm.DanganNum" size="mini"  autocomplete="off"  ></el-input>
                    </el-form-item>
                </div>
                <div class="myitem">
                    <el-form-item label="是否计量">
                        <el-radio v-model="ruleForm.IsCount" disabled label="1">是</el-radio>
                        <el-radio v-model="ruleForm.IsCount" disabled label="0">否</el-radio>
                    </el-form-item>
                    <el-form-item label="外账设备">
                        <el-radio v-model="ruleForm.IsOutDevice" label="1">是</el-radio>
                        <el-radio v-model="ruleForm.IsOutDevice" label="0">否</el-radio>
                    </el-form-item>
                </div>
                <div class="myitem">
                    <el-form-item label="大型设备">
                        <el-radio v-model="ruleForm.IsBigdevice" label="1">是</el-radio>
                        <el-radio v-model="ruleForm.IsBigdevice" label="0">否</el-radio>
                    </el-form-item>
                    <el-form-item label="公用设备">
                        <el-input v-model="ruleForm.IsUseForPublic" size="mini"  autocomplete="off"  ></el-input>
                    </el-form-item>
                </div>
                <div class="myitem">
                    <el-form-item label="效益分析">
                    <el-input v-model="ruleForm.IsProfit" size="mini"  autocomplete="off"  ></el-input>
                    </el-form-item>
                    <el-form-item label="附资产">
                        <el-input v-model="ruleForm.IsExtraDevice" size="mini"  autocomplete="off"  ></el-input>
                    </el-form-item>
                </div>
                <div class="myitem">
                    <el-form-item label="自筹资金">
                    <el-input v-model="ruleForm.SelfMoney" size="mini"  autocomplete="off"  ></el-input>
                    </el-form-item>
                    <el-form-item label="政府拨款">
                        <el-input v-model="ruleForm.GovermentMoney" size="mini"  autocomplete="off"  ></el-input>
                    </el-form-item>
                </div>
                <div class="myitem">
                    <el-form-item label="科研经费">
                    <el-input v-model="ruleForm.ScienceMoney" size="mini"  autocomplete="off"  ></el-input>
                    </el-form-item>
                    <el-form-item label="教学经费">
                        <el-input v-model="ruleForm.TeachMoney" size="mini"  autocomplete="off"  ></el-input>
                    </el-form-item>
                </div>
                <div class="myitem">
                    <el-form-item label="接受捐款">
                    <el-input v-model="ruleForm.DonatedMoney" size="mini"  autocomplete="off"  ></el-input>
                    </el-form-item>
                    <el-form-item label="其他资金">
                        <el-input v-model="ruleForm.OthersMoney" size="mini"  autocomplete="off"  ></el-input>
                    </el-form-item>
                </div>
                <div class="myitem">
                    <el-form-item label="备注">
                    <el-input v-model="ruleForm.Remark" size="mini"  autocomplete="off"  ></el-input>
                    </el-form-item>
                    <el-form-item label="设备资料文档">
                        <el-input v-model="ruleForm.DeviceFile" size="mini"  autocomplete="off"  ></el-input>
                    </el-form-item>
                </div>
                <div class="myitem">
                    <el-form-item>
                        <span slot="label"><i style="color:red">* </i>仓库名称</span>
                        <ChangKuOption v-model="room" ></ChangKuOption>
                    </el-form-item>
                    <el-form-item>
                        <span slot="label"><i style="color:red">* </i>领取部门</span>
                        <!-- <KeShiTypeOption v-model="bumen" ></KeShiTypeOption> -->
                        <el-cascader style="width:100%"  v-model="bumen" size="mini" :options="prevFenlei" :props="Lives"></el-cascader>
                    </el-form-item>
                    <el-form-item>
                        <span slot="label"><i style="color:red">* </i>领取人</span>
                        <UserOption v-model="people" ></UserOption>
                    </el-form-item>
                </div>
                <el-form-item>
                    <el-button size="mini" @click="addkeshiShow = false">取 消</el-button>
                    <el-button size="mini" type="primary"  @click="current_up">确 定</el-button>
                </el-form-item>
            </el-form>
        </div>
  </div>
</template>
<script>
import {addUpload,myCancel} from '../../../assets/comon'
import {newInit_return} from '../../../assets/newAxios' 
import UserOption from '../Child/UserOption'
import ChangKuOption from '../Child/ChangKuOption'
import KeShiTypeOption from '../Child/KeShiTypeOption'
import SheBeiOption from '../Child/SheBeiOption' 
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
                prevFenlei:[],
                sb_Messaage:[],
                sb_Messaage_index:'',
                prevFenlei:[],
                p_title:'',
                fileList: [
                    {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
                    {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
                room:"",
                bumen:"",
                people:"",
                roomtype:1,
                MYdevice:"",
                show_message:{
                    type_name:'',
                    qixie_name:''
                },
                ruleForm:{
                    DeviceId:"",
                    DeviceNum:"",
                    OldNum:"",
                    RegisterNum:"",
                    Devicename:"",
                    UsallyName:"",
                    DeviceSource:"",
                    InitPrice:"",
                    DeviceCount:"",
                    Devicemodel:"",
                    Roomid:"",
                    Unit:"",
                    TypeId:"",
                    QixieId:"",
                    Supplier:"",
                    Brand:"",
                    Factory:"",
                    BuyDate:"",
                    LeaveFactoryNum:"",
                    LeaveFactoryDate:"",
                    DeviceSerialNumber:"",
                    RepairFactory:"",
                    RepairEndDate:"",
                    BillNum:"",
                    FinaunceNum:"",
                    ZhejiuTotal:"",
                    ZhejiuMonths:"",
                    CountryNum:"",
                    ProducePlace:"",
                    DanganNum:"",
                    IsCount:"",
                    IsOutDevice:"",
                    IsBigdevice:"",
                    IsUseForPublic:"",
                    IsProfit:"",
                    IsExtraDevice:"",
                    SelfMoney:"",
                    GovermentMoney:"",
                    ScienceMoney:"",
                    TeachMoney:"",
                    DonatedMoney:"",
                    OthersMoney:"",
                    Remark:"",
                    DeviceFile:"",
                    Roomname:""
                },
                rules: {
                    name:[
                        {required:true,message:'此项不能为空',tirgger:'blur'}
                    ],
                    InitPrice:[
                        {required:true,message:'此项不能为空',tirgger:'blur'}
                    ],
                    DeviceCount:[
                        {required:true,message:'此项不能为空',tirgger:'blur'}
                    ]
                },
            }
        },
        components:{
            ChangKuOption,KeShiTypeOption,UserOption,SheBeiOption,
        },
        created(){
            this.newInit_return('api/department/ShowDe',{IndexPage:"1",PageSize:"10000",id:0},true).then(res=>{
                this.prevFenlei=res.data.results
            })
        },
        watch:{
            sb_Messaage_index:function(value){
                console.log(value)
                this.ruleForm.DeviceId=this.sb_Messaage[this.sb_Messaage_index].id
                this.ruleForm.Unit=this.sb_Messaage[this.sb_Messaage_index].unit
                this.ruleForm.DeviceNum=this.sb_Messaage[this.sb_Messaage_index].number

                this.ruleForm.Devicename=this.sb_Messaage[this.sb_Messaage_index].name

                this.ruleForm.TypeId=this.sb_Messaage[this.sb_Messaage_index].type_id
                this.show_message.type_name=this.sb_Messaage[this.sb_Messaage_index].type_name

                this.ruleForm.QixieId=this.sb_Messaage[this.sb_Messaage_index].qixieid
                this.show_message.qixie_name=this.sb_Messaage[this.sb_Messaage_index].qixiename

                this.ruleForm.IsCount=this.sb_Messaage[this.sb_Messaage_index].iscount
            },
            // MYdevice:function(value){
            //     var arr=value.split('-*-')
            //     this.ruleForm.DeviceId=arr[0]
            //     this.ruleForm.Unit=arr[1]
            //     this.ruleForm.DeviceNum=arr[3]
            // }
        },
        mounted(){
            this.newInit_return('api/devicedict/ShowDi',{IndexPage:1,PageSize:100000}).then(res=>{
                this.sb_Messaage=res.data.result_device
                console.log(this.sb_Messaage)
            })
            // this.newInit_return('api/devicedicttype/searchson',{shangji_id:0}).then(res=>{
            //     this.prevFenlei=res.data.results_son
            //     console.log('label:',this.prevFenlei)
            // })

            console.log(9999,this.$route.params.type)
            this.p_title='新增台账'     
        },
        methods:{
            newInit_return,
            addUpload,
            myCancel,
            
            myCon(){
                console.log(this.fileList)
            },
            uploadFile(item){
                let fileObj = item.file
                const form = new FormData()// FormData 对象
                form.append('upload', fileObj)// 文件对象  'upload'是后台接收的参数名
                console.log(fileObj,form)
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            addQ(){
                this.ruleForm.PayInformation.push({a:this.ruleForm.PayInformation.length+1,b:'',c:'',d:'',e:'未付款'})
            },
            remove(index){
                this.ruleForm.PayInformation.splice(index,1)
            },
            current_up(){


                console.log(this.sb_Messaage_index=="")
                if(this.sb_Messaage_index===""){
                    this.$message.warning('请选择设备')
                    return
                }else if(this.ruleForm.InitPrice===""){
                    this.$message.warning('请填写设备原值')
                    return
                }else if(this.ruleForm.DeviceCount===""){
                    this.$message.warning('请填写设备数量')
                    return
                }else if(this.room===""){
                    this.$message.warning('请选择仓库')
                    return
                }else if(this.bumen===""){
                    this.$message.warning('请选择部门')
                    return
                }else if(this.people===""){
                    this.$message.warning('请选择领取人')
                    return
                }
                
                this.ruleForm.Roomid=this.room.split('-*-')[0]
                this.ruleForm.Roomname=this.room.split('-*-')[1]
                var dataUP={
                    AllData:JSON.stringify({allhc:[this.ruleForm]}),
                    roomid:this.room.split('-*-')[0],
                    roomname:this.room.split('-*-')[1],
                    roomtype:this.roomtype,
                    DeId:this.bumen.reverse()[0].split('*-*')[0],
                    DeName:this.bumen.reverse()[0].split('*-*')[1],
                    peopleid:this.people.split('-*-')[0],
                    peoplename:this.people.split('-*-')[1]
                }
                console.log(dataUP)
                this.newInit_return('api/device/inroom',dataUP).then(res=>{
                    console.log(res)
                    if(res.data.response=='success'){
                        this.$message.success('添加成功')
                        this.myCancel()
                    }else{
                        this.$message.warning(res.data.results)
                    }
                })
                
            },
            upFile(e){
                console.log(e)
            }
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
    .smTitle{
        height: 30px;
        border-bottom: 1px solid #2ea8e5;
        line-height: 26px;
        font-size: 13px;
        padding-left: 10px;
        color: #2ea8e5;
    }
    .smTitle .el-link{
        display: block;
        float: right;
    }
    table{
        border-collapse: collapse;
        margin: 0 auto;
        text-align: center;
    }
    table td, table th{
        border: 1px solid #cad9ea;
        color: #666;
        height: 30px;
    }
    table thead th{
        /* background-color: #CCE8EB; */
        width: 100px;
    }
    table tr:nth-child(odd){
        background: #fff;
 
    }
    table tr:nth-child(even){
        background: #F5FAFA;
 
    }
</style>