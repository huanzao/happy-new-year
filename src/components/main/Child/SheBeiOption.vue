<template>
  <el-select v-model="role" size="mini" >
    <el-option
      v-for="(item,index) in options"
      :key="index"
      :label="item.name"
      :value="item.id+'-*-'+item.unit+'-*-'+item.name+'-*-'+item.number"
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
      this.newInit_return('api/devicedict/ShowDi',{IndexPage:1,PageSize:100000}).then(res=>{
          this.options=res.data.result_device
          console.log(this.options)
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
