<template>
  <el-select v-model="role" size="mini" >
    <el-option
      v-for="(item,index) in options"
      :key="index"
      :label="item.houseName"
      :value="item.houseId+'-*-'+item.houseName"
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
      this.newInit_return('api/House/showhouse',{IndexPage:"1",PageSize:"1000"}).then(res=>{
          this.options=res.data.result
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
