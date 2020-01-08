<template>
    <el-dialog :title="parentData.imgList[parentData.index]"
            :visible.sync="imglookShow"
            height="70%"
            center>
            <el-image
        style="width: 100%; height: 100%;"
        :src="parentData.imgList[parentData.index]"
        :fit="fit">
        </el-image>
        <div class='leftright'>
            <span @click="scllLeft" class="el-icon-back"></span>
            <span @click="scllRight" class="el-icon-right"></span>
        </div>  
    </el-dialog>
</template>
<script>
    export default{
        props:['parentData'],
        data(){
            return {
                fit:'scale-down',
                imglookShow: false,
            }
        },
        mounted(){
            console.log('999',this.parentData)
        },
        methods:{
            scllLeft(){
                if(this.parentData.index>0){
                    this.parentData.index--
                }else{
                   this.imglookShow=false
                }
                
            },
            scllRight(){
                if(this.parentData.index<this.parentData.imgList.length-1){
                    this.parentData.index++
                }else{
                   this.imglookShow=false
                }
                
            }
        }
    }
</script>
<style>
    .leftright{
        width: 100%;
        height: 50px;
        z-index: 5000;
        position: absolute;
        top:50%;
    }
    .leftright>span{
        display: inline-block;
        width: 60px;
        height: 60px;
        line-height: 60px;
        border-radius:50%;  
        text-align: center; 
        cursor: pointer;
        background: #333;
        font-size: 23px;
    }
    .leftright>span:hover{
        background: greenyellow;
        font-size: 30px;
    }
    .leftright>span:nth-child(2){
        float: right;
        margin-right: 50px;
    }
</style>