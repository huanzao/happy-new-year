<template>
  <div style="display:inline-block;">
    <el-select v-model="role" size="mini" :disabled="isDisabled">
      <el-option
        v-for="(item,index) in options"
        :key="index"
        :label="item.factoryname"
        :value="item.factoryid"
      />
    </el-select>
  </div>
</template>
<script>
import {newInit_return} from '../../../assets/newAxios'
export default {
  props: {
    isDisabled:Boolean,
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
    console.log(typeof(this.isDisabled))
      this.newInit_return('api/Select/SelectFactory').then(res=>{
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
