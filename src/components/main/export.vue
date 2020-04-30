<template>
  <div>
      <!-- 页头 -->
        <div class="pageHead">
            <span>导出excel表格</span>
            <el-button size="mini" @click="con"  type="primary">console.log</el-button>
            <el-button size="mini" @click="myExprotExcel(tHeader,filterVal,'德玛西亚')"  type="primary">批量导出</el-button>
            <el-button size="mini" @click="daoru"  type="primary">导入数据</el-button>
        </div>
        <div style="width:80%">
            <el-tree
                :data="TreeData"
                :accordion='true'
                :props="props"
                :load="loadNode"
                lazy>

                <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span>{{ node.label }}</span>
                    <span>
                        <el-button
                            type="text"
                            size="mini"
                            @click.stop="() => append(node,data)">
                            添加
                        </el-button>
                        <el-button
                            type="text"
                            size="mini"
                            @click.stop="() => deit(node, data)">
                            编辑
                        </el-button>
                    </span>
                </span>
            </el-tree>
        </div>
        <!-- 筛选 -->
        <div class="shaixuan">
            <div>
                <label>科室名称：</label>
                <div>
                    <el-input placeholder="请输入内容" prefix-icon="el-icon-search" size="mini" v-model="shaixuan.name"></el-input>
                </div>
            </div>
            <FactoryOption  v-model="shaixuan.role" :isDisabled='isDistbled' ></FactoryOption>
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
        <!-- 导入EXCEL -->
        <div class="app-container">
            <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
        </div>
        <!-- 主体表格 -->
        <div>   
            <template>
                <el-table  :data="tableData" style="width: 100%">
                    <el-table-column label="科室编号"  prop="id"></el-table-column>
                    <el-table-column  label="科室名称" prop="name"></el-table-column>
                    <el-table-column label="座机" prop="remark"></el-table-column>
                    <el-table-column label="操作" width="180">
                        <template slot-scope="scope">
                            <el-link type="primary" @click="myEditKS('first',scope.row,scope.$index)">编辑</el-link>
                            <el-link type="primary" @click="myStop(scope.row,scope.$index)">{{scope.row.state==0?'停用':'启用'}}</el-link>
                            <el-link type="primary" @click="addKeshi('second',scope.row)">添加子科室</el-link>
                        </template>
                    </el-table-column>
                </el-table>
            </template>   
        </div>
        <div ref="print">
            <h1>二维码</h1>
            <div id="qrcode" style="width:200px;height:200px;border:1px solid red" ></div>
        </div>
        <div>
            <h1>print</h1>
            <template>
                <!-- <section ref="print">
                    打印内容
                    <div class="no-print">不要打印我</div>
                </section> -->
            </template>
            <el-button type="primary" @click='myprint'></el-button>
        </div>
        <el-upload
        action="api/addfile"
        list-type="picture-card"
        accept="*"
        :limit="imgLimit"
        :file-list="productImgs"
        :multiple="isMultiple"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :on-exceed="handleExceed"
        :on-error="imgUploadError">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
  </div>
</template>
<script>
// import {addUpload,myInit,myDelete,myEdit,myAdd,mySearch,handleSizeChange,handleCurrentChange} from '../../../../assets/comon'
import {newInit_return,myExprotExcel} from '../../assets/newAxios'
import FactoryOption from './Child/FactoryOption'
import UploadExcelComponent from './Child/UploadExcel/index'
import QRCode  from "qrcodejs2"
    export default {
        data(){
            return{
                dialogImageUrl: '',
                dialogVisible: false,
                productImgs: [],
                isMultiple: true,
                imgLimit: 6,
                props: {
                    label: 'name',
                    children: 'zones',
                    isLeaf: 'leaf'
                },
                isDistbled:true,
                tHeader:['ID','标题','编号','备注'],
                filterVal:['id', 'name', 'number', 'remark'],
                currentPage:1,
                pagesize:10,
                totalpage:0,
                role:'',
                shaixuan:{
                    role:'',
                    name:'',
                    type:'',
                },
                tableHeader: [],
                TreeData:[],
                tableData:[
                    {id: 1,name: "第一类dd",number: null,remark: "测试ddc"},
                    {id: 1,name: "第一类dd",number: null,remark: "测试ddc"},
                    {id: 1,name: "第一类dd",number: null,remark: "测试ddc"},
                    {id: 1,name: "第一类dd",number: null,remark: "测试ddc"},
                ]
            }
        },
        mounted(){

        
            // this.newInit_return('api/department/ShowDe',{IndexPage:"1",PageSize:"100000",id:0}).then(res=>{
            //     this.TreeData=res.data.results.map(item=>{
            //         console.log(item)
            //         item.id=item.department.id
            //         item.name=item.department.name
            //         return item
            //     })
            // })

            // this.newInit_return('api/Select/SelectKeShiType').then(res=>{
                
            //     console.log(res)
            // })
            this.qrcode()



        },
        components:{
            FactoryOption,
            UploadExcelComponent
        },
        methods:{
            myExprotExcel,
            newInit_return,

        handleRemove(file, fileList) {//移除图片
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {//预览图片时调用
            console.log(file);
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
 
        beforeAvatarUpload(file) {//文件上传之前调用做一些拦截限制
            console.log(file);
            const isJPG = true;
            // const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;
    
            // if (!isJPG) {
            //   this.$message.error('上传头像图片只能是 JPG 格式!');
            // }
            if (!isLt2M) {
            this.$message.error('上传图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        handleAvatarSuccess(res, file) {//图片上传成功
            console.log(res);
            console.log(file);
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        handleExceed(files, fileList) {//图片上传超过数量限制
            this.$message.error('上传图片不能超过6张!');
            console.log(file, fileList);
        },
        imgUploadError(err, file, fileList){//图片上传失败调用
            console.log(err)
            this.$message.error('上传图片失败!');
        },


















            loadNode(node, resolve) {
                console.log(node)
                console.log(resolve)
                if (node.level > 20) return resolve([]);
                console.log('打开还是关闭')
                this.newInit_return('api/department/ShowDe',{IndexPage:"1",PageSize:"100000",id:node.data.id}).then(res=>{
                    const data = res.data.results.map(item=>{
                        console.log(item)
                        item.id=item.department.id
                        item.name=item.department.name
                        return item
                    })
                    resolve(data);
                })
            },
            append(node,data) {
                console.log('添加')

                // const newChild = { id: id++, label: 'testtest', children: [] };
                // if (!data.children) {
                // this.$set(data, 'children', []);
                // }
                // data.children.push(newChild);
            },

            deit(node, data) {
                this.$message.success('详情数据 已在控制台输出')
                console.log('4545',node.data)
                // const parent = node.parent;
                // const children = parent.data.children || parent.data;
                // const index = children.findIndex(d => d.id === data.id);
                // children.splice(index, 1);
            },














            handleExport() {
            },
            con(){
                console.log(this.shaixuan)
            },
            daoru(){
                console.log(7789)
            },
            beforeUpload(file) {
                const isLt1M = file.size / 1024 / 1024 < 1
                if (isLt1M) {
                    return true
                }
                this.$message({
                    message: 'Please do not upload files larger than 1m in size.',
                    type: 'warning'
                })
                return false
            },
            qrcode(){
                let that=this
                var qrcode_le=document.querySelectorAll('qrcode')
                let qrcode=new QRCode('qrcode',{
                    width:125,
                    height:125,
                    text:'恒华科技'
                })
            },
            handleSuccess({ results, header }) {
                this.tableData = results
                this.tableHeader = header
                console.log('表格中读取的数据',results)
            },
            myprint(){
                this.$print(this.$refs.print)
            }
        },
    }
</script>
<style >
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
</style>