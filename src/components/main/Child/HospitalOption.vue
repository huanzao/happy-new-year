<template>
    <el-select v-model="role" size="mini">
      <el-option
        v-for="(item,index) in options"
        :key="index"
        :label="item.hospitalname"
        :value="item.hospitalId"
      />
    </el-select>
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
      this.newInit_return('api/Select/SelectHospital').then(res=>{
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
