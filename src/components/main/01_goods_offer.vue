<template>
    <div>
        <div style="height: 30px;line-height: 30px;margin-bottom: 15px;padding:5px;background:#fff">
            <el-breadcrumb separator="/" style="line-height:30px" >
                <el-breadcrumb-item>商品报价</el-breadcrumb-item>
                <el-tooltip class="item" effect="dark" content="添加商品报价" placement="top-end">
                    <el-button type="success" icon="el-icon-plus" size="mini"  @click="handleAdd" style="display:inline-block;float:right"></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="搜索" placement="top-end">
                    <el-button type="primary" icon="el-icon-search" size="mini"  @click="searchDialog=true" style="display:inline-block;float:right;margin-right:10px"></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="刷新复位" placement="top-end">
                    <el-button type="info" icon="el-icon-refresh" size="mini"  @click="myReload" style="display:inline-block;float:right;"></el-button>
                </el-tooltip>

            </el-breadcrumb>
        </div>
        <el-table
        max-height="700"
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    
    <el-table-column
      label="型号名称"
      width="300"
      prop="xhmc"
      >
    </el-table-column>

    <el-table-column
      label="品目名称"
      width="150"
      prop="pmmc"
      >
    </el-table-column>
    <el-table-column
      label="品牌名称"
      width="150"
      prop="ppmc"
      >
    </el-table-column>
    <el-table-column
      label="类别名称"
      width="150"
      prop="lbmc"
      >
    </el-table-column>
    <el-table-column
      prop="sjjg"
      label="实际供货价"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="opreation_time"
      label="商品操作时间"
      :formatter="stateFormat_time"
      show-overflow-tooltip> 
    </el-table-column>
    <el-table-column
      prop="area"
      label="地区"
      show-overflow-tooltip> 
    </el-table-column>
    <el-table-column
      prop="zt"
      label="状态"
      width="100"
      :formatter="stateFormat_zt"
      show-overflow-tooltip> 
    </el-table-column>
    
    <el-table-column label="操作" width="380">
      <template slot-scope="scope">
        <el-button size="mini" type="info"  @click="handleRevoke(scope.$index, scope.row)">撤销</el-button>
        <el-button size="mini" type="danger"  @click="handleCancel(scope.$index, scope.row)">下架</el-button>
        <el-button size="mini" type="success" @click="handleUp(scope.$index, scope.row)">上架</el-button>
        <el-button size="mini" type="warning" @click="handleEdit(scope.$index, scope.row)">重新报价</el-button>
        <el-button size="mini" type="primary" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
      </template>
    </el-table-column>
  </el-table>
      <div class="block" style="height:32px">
    <el-pagination
    style="height:50px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total=totalPage>
    </el-pagination>
  </div>
    <!-- 搜索框 -->
        <el-dialog title="搜索" :visible.sync="searchDialog">
          <el-form :model="searchForm">
            <el-form-item label="型号名称" :label-width="formLabelWidth">
              <el-input size="mini" v-model="searchForm.xhmc" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="品目名称" :label-width="formLabelWidth">
              <el-input size="mini" v-model="searchForm.pmmc " autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="品牌名称" :label-width="formLabelWidth">
              <el-input size="mini" v-model="searchForm.ppmc" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="类别名称" :label-width="formLabelWidth">
              <el-input size="mini" v-model="searchForm.lbmc" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="操作时间" :label-width="formLabelWidth">
              <el-date-picker size="mine" style='width:100%' v-model="searchForm.time" type="daterange"
                value-format='yyyyMMddHHmmss' range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>


            <el-form-item label="活动区域" :label-width="formLabelWidth">
              <el-select size="mini" v-model="searchForm.zt" placeholder="请选择活动区域" style='width:100%'>
                <el-option label="商品待审核" value="1"></el-option>
                <el-option label="商品上线" value="2"></el-option>
                <el-option label="商品下架" value="3"></el-option>
                <el-option label="品牌下架" value="4"></el-option>
                <el-option label="撤销报价" value="5"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="searchDialog = false">取 消</el-button>
            <el-button type="primary" @click="MYsearch_par">确 定</el-button>
          </div>
        </el-dialog>
    </div>
</template>

<script>
import { log } from 'util'
  export default {
    data() {
      return {
        ISfen:false,
        currentPage:1,
        pageSize:10,
        totalPage:0,
        tableData:[],
        formLabelWidth:'140px',
        searchDialog:false,
        searchForm:{
            xhmc:"",
            pmmc:"",
            ppmc:"",
            lbmc:"",
            time:"",
            zt:""
        } 
      }
    },
    mounted(){
        this.paging()
    },
    beforeRouteLeave (to, from , next) {
      // const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
      // if (answer) {
        next()
      // } else {
      //   next(false)
      // }
    },
    methods: {
      myReload(){
          this.pageSize=10
          this.currentPage=1
          this.ISfen=false
          this.paging()
      },
      MYsearch_par(){
        this.pageSize=10
        this.currentPage=1
        this.ISfen=true
        this.MYsearch()
      },
      MYsearch(){
          let postData = this.$qs.stringify({
              'pageSize':this.pageSize,
              'currentPage':this.currentPage,
              'xhmc':this.searchForm.xhmc,
              'pmmc':this.searchForm.pmmc,
              'ppmc':this.searchForm.ppmc,
              'lbmc':this.searchForm.lbmc,
              'time':this.searchForm.time[0]+'-'+this.searchForm.time[1],
              'zt'  :this.searchForm.zt
          });
          
          console.log(postData)
          this.axios.post('api/mess_search',postData).then((res)=>{
              if(res.data.result.length==0){
                  this.$message.error('没有查询到任何数据');
              }else{
                  this.searchDialog=false
                  this.$message.success('查询的数据已成功返回');
                  this.tableData=res.data.result
                  this.totalPage=res.data.total_page
              }
              
          }).catch((err)=>{
              this.$notify.error({
                title: '错误',
                message: '网路错误，请稍后再试'
              })
          })
      },
      paging(){
          let postData = this.$qs.stringify({'pageSize':this.pageSize,'currentPage':this.currentPage});
          this.axios.post('api/show_mess',postData).then((res)=>{
              console.log(res.data)
              console.log('789546512--',res.data.total_page)
              this.tableData=res.data.result
              this.totalPage=res.data.total_page
          }).catch((err)=>{
              this.$notify.error({
                title: '错误',
                message: '网路错误，请稍后再试'
              })
          })
      },
      stateFormat_zt(row, column){
          if(row.zt==1){
              return '商品待审核'
          }else if(row.zt==2){
              return '商品上线'
          }else if(row.zt==3){
              return '商品下架'
          }else if(row.zt==4){
              return '品牌下架'
          }else if(row.zt==5){
              return '撤销报价'
          }
      },
      stateFormat_time(row){
        if(row.opreation_time){
            return row.opreation_time.slice(0,4)+"-"+row.opreation_time.slice(4,6)+"-"+row.opreation_time.slice(6,8)+" "+row.opreation_time.slice(8,10)+":"+row.opreation_time.slice(10,12)+":"+row.opreation_time.slice(12,14)
        }else{
          return '暂无时间'
        }
        
      },
      handleAdd(){
          this.$router.push({
          name: 'goods_offer_add',
        })
      },  
      handleDetail(index,row){   //详情
          this.$router.push({
            name: 'goods_offer_detail',
            params: {
              id:row.id
            }
          })
      },
      handleEdit(index, row) { //编辑
        this.$router.push({
          name: 'goods_offer_edit',
          params: {
            row:row
          }
        })
      },
      handleRevoke(index, row){     //撤销报价
              this.$confirm('确定撤销该商品的报价吗', '温馨提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              const loading = this.$loading({
                  lock: true,
                  text: 'Loading',
                  spinner: 'el-icon-loading',
                  background: 'rgba(0, 0, 0, 0.7)'
              });
              let param = new URLSearchParams()
              param.append('xhmc', row.xhmc)
              this.axios({
                  method: 'post',
                  url: 'api/cancel_execute',
                  data: param
              }).then((res)=>{
                  console.log(res)
                  loading.close()
                  if(res.data.success==0){
                      this.$message.error(res.data.result);
                  }else{
                      this.$message.success(res.data.result);
                  }
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '放弃撤销'
              });          
            });
       
             
      },
      handleDelete(index, row) { //删除
        console.log(index, row);
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableData.splice(index,1);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      
      },
      handleCancel(index, row){ //下架
   
          this.$prompt('请输入下架原因', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(({ value }) => {
            const loading = this.$loading({
              lock: true,
              text: 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
          });
          let param = new URLSearchParams()
          param.append('xhbh', row.xhbh)
          param.append('zt', 2)
          param.append('xjyy', value)
          param.append('mess_id', row.id)
          this.axios({
              method: 'post',
              url: 'api/execSpDown',
              data: param
          }).then((res)=>{
              loading.close()
              if(res.data.success==1){
                  this.$message({
                  message: res.data.result,
                  type: 'success'
                  });
              }else{
                  this.$message.error(res.data.result);
              }
          }).catch(()=>{
              loading.close()
              this.$notify.error({
              title: '错误',
              message: '政府网站崩溃，请稍后再试'
              })
          })


          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入'
            });       
          });
      
        
      },
      handleUp(index, row){ //上架
          const loading = this.$loading({
              lock: true,
              text: 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
          });
          let param = new URLSearchParams()
          param.append('xhbh', row.xhbh)
          param.append('zt', 1)
          param.append('xjyy', "")
          param.append('mess_id', row.id)
          this.axios({
              method: 'post',
              url: 'api/execSpDown',
              data: param
          }).then((res)=>{
              loading.close()
              if(res.data.success==1){
                  this.$message({
                  message: res.data.result,
                  type: 'success'
                  });
              }else{
                  this.$message.error(res.data.result);
              }
          }).catch(()=>{
              loading.close()
              this.$notify.error({
              title: '错误',
              message: '政府网站崩溃，请稍后再试'
              })
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
      },
      handleSizeChange(val) { //分页 
        this.pagesize=val
        console.log(this.pagesize,this.currentPage)
        if(this.ISfen==false){
              this.paging()
         }else{
              this.MYsearch()
         }
      },
      handleCurrentChange(val) {
         this.currentPage=val
         console.log(this.pagesize,this.currentPage)
         
         if(this.ISfen==false){
              this.paging()
         }else{
              this.MYsearch()
         }
      }
      
    }
  }
</script>
<style scoped>
    
</style>
