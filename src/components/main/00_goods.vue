<template>
    <div>
      <h1>{{ count }}</h1>
      <h2>{{ myCount }}</h2>
      <h2>{{ user }}</h2>
        <button @click="add">添加</button>
        <button @click="del">减少</button>
        <button @click="userfun('赵欢欢')">减少999999</button>
        <div style="height: 30px;line-height: 30px;margin-bottom: 15px;padding:5px;background:#fff">
            <el-breadcrumb separator="/" style="line-height:30px" >
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item><a href="/">订单</a></el-breadcrumb-item>
                <!-- <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
                
                <el-button type="success" icon="el-icon-plus" size="mini" @click='child'  style="display:inline-block;float:right">子组件</el-button>
            </el-breadcrumb>
        </div>
        <search ref='searchchild'  @my-event="getMyEvent" ></search>
         
         <el-table max-height="700"
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
            prop="img"
            label="图片"
            width="100">
              <template slot-scope="scope">
                <div>
                  <el-tooltip placement="right" effect="light">
                    <div slot="content"><img :src="scope.row.img" style="height:300px" alt=""></div>
                    <img :src="scope.row.img" style="width:40px;height:30px" alt="">
                  </el-tooltip>
                </div>
            </template>
              <!-- <img  slot-scope="scope"  :src="scope.row.img"  style="width:40px;height:30px"> -->
          </el-table-column>
          
          <el-table-column
            prop="title"
            label="标题"
            width="600">
          </el-table-column>
          
          <el-table-column
            prop="SKU"
            label="SKU"
            width="200"
            >
          </el-table-column>

          <el-table-column
            prop="time"
            label="时间"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="操作" width="250">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="success" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
              <!-- <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template> -->
            <el-button
                size="mini"
                type="danger"
                @click="myDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      <div class="block" style="height:32px">
            <el-pagination
            style="height:50px"
              @size-change="handleSizeChange($event,'myurl')"
              @current-change="handleCurrentChange($event,'myurl')"
              :current-page="currentPage"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400">
            </el-pagination>
      </div>
    </div>
</template>

<script>
  import { mapState,mapMutations,mapActions,mapGetters } from "vuex"
  import { myDelete,handleSizeChange,handleCurrentChange } from '../../assets/comon'
  import search from '../child/search/search.vue'
  export default {
    data() {
      return {
        childVal:false,
        currentPage:1,
        pagesize:10,
        tableData: [
          {
          img: 'http://caijiqi.oss-cn-hangzhou.aliyuncs.com/update/201992715/wQvTwmi2WU.jpg',
          title: '調整可能なトラクションロープナイロントラクションロープペット犬首輪屋外トレーニング',
          SKU:'ax13q53nQipMSVf',
          time:'2019-09-22 19:56:38'
        },{
          img: 'http://caijiqi.oss-cn-hangzhou.aliyuncs.com/update/201992715/wQvTwmi2WU.jpg',
          title: '調整可能なトラクションロープナイロントラクションロープペット犬首輪屋外トレーニング',
          SKU:'ax13q53nQipMSVf',
          time:'2019-09-22 19:56:38'
        },{
          img: 'http://caijiqi.oss-cn-hangzhou.aliyuncs.com/update/201992715/wQvTwmi2WU.jpg',
          title: '調整可能なトラクションロープナイロントラクションロープペット犬首輪屋外トレーニング',
          SKU:'ax13q53nQipMSVf',
          time:'2019-09-22 19:56:38'
        },{
          img: 'http://caijiqi.oss-cn-hangzhou.aliyuncs.com/update/201992715/wQvTwmi2WU.jpg',
          title: '調整可能なトラクションロープナイロントラクションロープペット犬首輪屋外トレーニング ',
          SKU:'ax13q53nQipMSVf',
          time:'2019-09-22 19:56:38'
        },{
          img: 'http://caijiqi.oss-cn-hangzhou.aliyuncs.com/update/201992715/wQvTwmi2WU.jpg',
          title: '調整可能なトラクションロープナイロントラクションロープペット犬首輪屋外トレーニング ',
          SKU:'ax13q53nQipMSVf',
          time:'2019-09-22 19:56:38'
        },{
          img: 'http://caijiqi.oss-cn-hangzhou.aliyuncs.com/update/201992715/wQvTwmi2WU.jpg',
          title: '調整可能なトラクションロープナイロントラクションロープペット犬首輪屋外トレーニング',
          SKU:'ax13q53nQipMSVf',
          time:'2019-09-22 19:56:38'
        },{
          img: 'http://caijiqi.oss-cn-hangzhou.aliyuncs.com/update/201992715/wQvTwmi2WU.jpg',
          title: '調整可能なトラクションロープナイロントラクションロープペット犬首輪屋外トレーニング',
          SKU:'ax13q53nQipMSVf',
          time:'2019-09-22 19:56:38'
        },{
          img: 'http://caijiqi.oss-cn-hangzhou.aliyuncs.com/update/201992715/wQvTwmi2WU.jpg',
          title: '調整可能なトラクションロープナイロントラクションロープペット犬首輪屋外トレーニング',
          SKU:'ax13q53nQipMSVf',
          time:'2019-09-22 19:56:38'
        },{
          img: 'http://caijiqi.oss-cn-hangzhou.aliyuncs.com/update/201992715/wQvTwmi2WU.jpg',
          title: '調整可能なトラクションロープナイロントラクションロープペット犬首輪屋外トレーニング',
          SKU:'ax13q53nQipMSVf',
          time:'2019-09-22 19:56:38'
        },{
          img: 'http://caijiqi.oss-cn-hangzhou.aliyuncs.com/update/201992715/wQvTwmi2WU.jpg',
          title: '調整可能なトラクションロープナイロントラクションロープペット犬首輪屋外トレーニング',
          SKU:'ax13q53nQipMSVf',
          time:'2019-09-22 19:56:38'
        }
        ]
      }
    },  
    computed:{
      ...mapState(['count','user']),
      ...mapGetters(['myCount']),
    },
    components:{
        search:search
    },
    methods: {
      myDelete,
      handleSizeChange,
      handleCurrentChange,
      ...mapMutations(['increment','decrement','userfun']),
      ...mapActions(['myAdd','myDel']),
      
      add(){
        console.log(123)
          //this.increment()
          //this.$store.commit(increment)===this.increment()
          //add===increment
          //this.$store.state.count+=1  (不推荐这样写)
          this.myAdd()
      },
      del(){
          this.decrement()
      },
      child(){
          this.$refs.searchchild.searchDialog=true
      },
      getMyEvent(msg){
          console.log(msg)
      },
      handleDetail(){
        console.log(this)
      },
      handleEdit(index, row) { //编辑
        console.log(index, row);
         this.$router.push({
          name: 'goods_edit',
          params: {
            id: index,
            row:row
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
      },
    }
  }
</script>
<style scoped>
    
</style>
