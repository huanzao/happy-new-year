<template>
  <div style="display:inline-block;width:100%">
    <el-select v-model="role" size="mini">
      <el-option
        v-for="(item,index) in options"
        :key="index"
        :label="item.qixiename"
        :value="item.qixieid"
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
      this.newInit_return('api/Select/SelectQiXie').then(res=>{
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
