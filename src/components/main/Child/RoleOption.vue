<template>
  <div style="display:inline-block;">
    <label class="radio-label">Book Type: </label>
    <el-select v-model="role" size="mini" style="width:120px;">
      <el-option
        v-for="(item,index) in options"
        :key="index"
        :label="item.rolename"
        :value="item.roleid"
      />
    </el-select>
  </div>
</template>
<script>
import {newInit_return} from '../../../assets/newAxios'
export default {
  props: {
    value: {
      type:[String,Number],
    }
  },
  data() {
    return {
      options: []
    }
  },
  methods:{
      newInit_return,
  },
  created(){
      this.newInit_return('api/Select/SelectUser').then(res=>{
          console.log(78978979,res)
          this.options=res.data.results
      })
  },
  computed: {
    role: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>
