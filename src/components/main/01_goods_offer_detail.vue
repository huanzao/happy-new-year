<template>
    <div style="text-align:left;background:#fff">
        <el-page-header @back="goBack" content="商品详情"></el-page-header>
        <el-divider></el-divider>
        <div style="width:60%;padding:20px">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>基本信息</span>
              </div>
              <ul>
                  <li><span>型号编号</span> <span>{{ pagedata.xhbh }}</span></li>
                  <li><span>型号名称</span> <span>{{ pagedata.xhmc }}</span></li>
                  
                  <li><span>品牌编号</span> <span>{{ pagedata.ppbh }}</span></li>
                  <li><span>品牌名称</span> <span>{{ pagedata.ppmc }}</span></li>
                  
                  <li><span>品目编号</span> <span>{{ pagedata.pmbh }}</span></li>
                  <li><span>品目名称</span> <span>{{ pagedata.pmmc }}</span></li>
                  
                  <li><span>类别编号</span> <span>{{ pagedata.lbbh }}</span></li>
                  <li><span>类别型号</span> <span>{{ pagedata.lbmc }}</span></li>

                  <li><span>状态</span> <span>{{ pagedata.zt }}</span></li>

                  <li><span>价格</span> <span>{{ pagedata.price }}</span></li>
                  <li><span>报价时间</span> <span>{{ pagedata.opreation_time }}</span></li>
                  <li><span>价格上浮原因</span> <span>{{ pagedata.jgsfyy }}</span></li>
                  
                  <li><span>服务承诺</span> <span>{{ pagedata.fwcn }}</span></li>
                  <li><span>商品链接</span> <span><el-link type="primary"  :href='pagedata.productlink' target="_blank" >点击查看</el-link></span></li>
              </ul>
            </el-card>
            <el-card class="box-card" style="margin-top:20px">
              <div slot="header" class="clearfix">
                <span>参数</span>
              </div>
              <div>
                  <template>
                    <el-table
                      :data="tableData"
                      stripe
                      style="width: 100%">
                      
                      <el-table-column
                        prop="CSSM"
                        label="参数说明"
                        width="180">
                      </el-table-column>
                      <el-table-column
                        prop="CSZ"
                        label="参数值">
                      </el-table-column>
                    </el-table>
                  </template>
              </div>
            </el-card>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            pagedata:[],
            tableData:[]
        }
    },
    mounted(){
        let postData = this.$qs.stringify({
            'mess_id':this.$route.params.id
        });
        this.axios.post('api/mess_detail',postData).then((res)=>{
                  console.log(res.data.result[0])
                  this.pagedata=res.data.result[0]
                  var str = res.data.result[0].cs;
                  var reg = new RegExp( "'" , "g" )
                  var newstr = str.replace( reg , '"' );
                  var reg2= new RegExp( "None" , "g" )
                  var aa= newstr.replace( reg2 , '""' )
                  this.tableData=JSON.parse(aa)
                  
        })
    },
    methods:{
      goBack() {
        window.history.go(-1)
      }
    }
}
</script>
<style scoped>
    ul{
      list-style: none;
    }
    ul>li{
      line-height: 26px
    }
    ul>li>span:first-child{
      display: inline-block;
      width: 120px;
    }
</style>
