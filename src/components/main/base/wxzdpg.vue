<template>
  <div>
      <!-- 页头 -->
        <div class="pageHead">
            <span>维修自动派工--没做</span>
            <el-button size="mini" @click="myAdd"  type="primary">添加</el-button>
        </div>
        <!-- 主体表格 -->
        <div>
            <el-tabs v-model="activeName" @tab-click="handleClick" style="padding-left:10px">
                <el-tab-pane label="按科室划分" name="first" myLable='维修科室'></el-tab-pane>
                <el-tab-pane label="按类型划分" name="second" myLable='维修设备类型'></el-tab-pane>
                <el-tab-pane label="按设备划分" name="third" myLable='维修设备'></el-tab-pane>
                <el-tab-pane label="按分类划分" name="fourth" myLable='设备分类'></el-tab-pane>
            </el-tabs>  
            <div style="height:400px">
                <el-table  :data="tableData" style="width: 100%">
                    <el-table-column label="编号" width="120"  prop="id"></el-table-column>
                    <el-table-column label="维修工程师" width="500">
                        <template slot-scope="scope">
                            <el-select size="mini" v-model="scope.row.user">
                                <el-option v-for="item in 10" :key="item" :label="item" :value="item">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column :label="title" >
                        <template slot-scope="scope">
                            <el-select size="mini" v-model="scope.row.fl" multiple filterable allow-create default-first-option placeholder="请选择文章标签">
                                <el-option v-for="item in 10" :key="item" :label="item" :value="item">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button size="mini" @click="upload"  type="primary">保存</el-button>
            </div> 
            
        </div>
  </div>
</template>
<script>
    export default {
        data(){
            return{
                activeName: 'first',
                title:'按科室划分',
                tableData:[
                    {id:1,user:'郭德纲',fl:'aaaa'},
                    {id:2,user:'于谦',fl:'bbb'},
                ]
            }
        },
        mounted(){

        },
        methods:{
            handleClick(tab, event) {
                console.log(tab.$attrs.myLable);
                this.title=tab.$attrs.myLable
            },
            myAdd(){
                this.tableData.push({id:this.tableData.length+1,user:"",fl:''})
            },
            upload(){
                this.tableData=this.tableData.filter(item=>{
                    return item.user!==""&&item.fl.length!==0
                })
                console.log(this.tableData)

            }
        }
    }
</script>
<style scoped>

</style>