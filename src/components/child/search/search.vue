<template>
    <el-dialog title="搜索" :visible.sync="searchDialog">
          <el-form :model="searchForm">
            <el-form-item label="订单编号" :label-width="formLabelWidth">
              <el-input size="mini" v-model="searchForm.ddbh" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="采购人名称" :label-width="formLabelWidth">
              <el-input size="mini" v-model="searchForm.cgrmc " autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="时间" :label-width="formLabelWidth">
              <el-date-picker size="mine" style='width:100%' v-model="searchForm.time" type="daterange"
                value-format='yyyyMMddHHmmss' range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="searchDialog = false">取 消</el-button>
            <el-button type="primary" @click="MYsearch_par">确 定</el-button>
          </div>
        </el-dialog>
</template>
<script>
import { stringify } from 'querystring'
export default {
    name: "search",
    data(){
        return{
            searchDialog:false,
            formLabelWidth: '120px' ,
            searchForm:{
                ddbh:"",
                cgrmc:"",
                time:""
            },
        }
    },
    mounted(){
        console.log('111',this.props)
    },
    methods:{
        MYsearch_show(){
            this.searchDialog=true
        },
        MYsearch_par(){
            this.searchDialog=false
            this.$emit('my-event',this.searchForm)

        }
    }
}
</script>
<style scoped>

</style>