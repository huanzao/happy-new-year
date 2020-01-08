<template>
  <div>
      <el-table id='mainTable'
    :data="tableData"
    style="width: 100%">
    
    <el-table-column
      label="序号"
      prop='id'
      width="180">
      
    </el-table-column>
    <el-table-column
      label="名称"
      prop='name'
      width="180">
    </el-table-column>
    
     <el-table-column
      prop="type"
      label="类型"
      width="180">
    </el-table-column>

    <el-table-column
      prop="level"
      label="级别"
      width="180">
    </el-table-column>

    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="myEditaa(scope.$index, scope.row,'myEdit123654')">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="myDel(scope.$index, scope.row,'mydelurl111')">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <dialogEdit ref='edit' :editData='editData'></dialogEdit>
  </div> 
  
</template>

<script>
  import {myDel,myEdit} from '../../../unit/todo'
  import dialogEdit from '../../child/edit/edit'
  export default {
    data() {
      return {
        editData:{
          
        },
        tableData: [
          {
            id:'1',
            name: '王小虎qq',
            type:'品牌qq',
            level:'强制过滤qq',
          },
          {
            id:'1',
            name: '王小虎ww',
            type:'品牌ww',
            level:'强制过滤ww',
          },
          {
            id:'1',
            name: '王小虎ee',
            type:'品牌ee',
            level:'强制过滤ee',
          },
          {
            id:'',
            name: '',
            type:'',
            level:'',
          }
        ]
      }
    },
    components:{
      dialogEdit:dialogEdit
    },
    mounted(){
      
    },
    methods: {
      myDel:myDel,
      myEdit:myEdit,
      myEditaa(index, row){
        this.$refs.edit.ruleForm=[row.id,row.name,row.type,row.level]
        this.$refs.edit.dialogEditVisible=true
       
        this.$refs.edit.rules={
              num: [
                { required: true, message: '请输入序号名称', trigger: 'blur' },
              ],
              name: [
                { required: true, message: '请输入name', trigger: 'blur' },
              ],
              type: [
                { required: true, message: '请输入类型', trigger: 'blur' },
              ],
              level: [
                { required: true, message: '请输入级别', trigger: 'blur' },
              ],
          },
        console.log(index, row,111);
      }
    }
  }
</script>
