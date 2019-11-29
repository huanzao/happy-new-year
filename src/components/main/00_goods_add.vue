<template>
        <div style="padding-bottom:5px;height:100%">
             <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="用户管理" name="first">
                    <el-form :label-position="labelPosition" label-width="120px" :model="formLabelAlign">
                        <el-form-item label="名称">
                            <el-input v-model="formLabelAlign.name"></el-input>
                        </el-form-item>
                        <el-form-item label="活动区域">
                            <el-input v-model="formLabelAlign.region"></el-input>
                        </el-form-item>
                        <el-form-item label="活动形式">
                            <el-input v-model="formLabelAlign.type"></el-input>
                        </el-form-item>
                        <div>
                            <input type="file" id='upgteimg' multiple @change="upImg($event)">
                            <ul class='ztimg imgbox'>
                                <li v-for="(item,index) in img" :key='index'>
                                    <el-image :src="item" :fit='fittype' :preview-src-list="img"></el-image>
                                    <p>
                                        <a @click="left(index,'zt')"><i class="el-icon-back"></i></a>
                                        <a @click="del(index,'zt')" ><i class="el-icon-delete"></i></a>
                                        <a  ><i class="el-icon-s-open"></i></a>
                                        <a  ><i class="el-icon-rank"></i></a>  
                                        <a @click="right(index,'zt')"><i class="el-icon-right"></i></a> 
                                    </p>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <el-button type="primary" @click='addBt'>添加变体</el-button>
                            <el-button type="success" @click='consoleData'>添加变体</el-button>
                            <div class='btbox'>
                                <table>
                                    <tbody>
                                        <tr v-for="(item,index) in btData" :key='index'>
                                            <td>
                                                <tr>
                                                    <td><input type="text" v-model="item.name"></td>
                                                    <td><input type="text" v-model="item.cb"></td>
                                                    <td><input type="text" v-model="item.price"></td>
                                                    <td><input type="text" v-model="item.kc"></td>
                                                    <td><input type="text" v-model="item.txm"></td>
                                                    <td><input type="button" value='删除' @click="delBt(index)"></td> 
                                                </tr>
                                                <tr>
                                                    <td>图片列表</td>
                                                    <td>
                                                        <ul class='ztimg imgbox'>
                                                            <li v-for="(aa,i) in item.imgs" :key='i'>
                                                                <el-image :src="aa" :fit='fittype' :preview-src-list="item.imgs"></el-image>
                                                                <p>
                                                                    <a @click="left(index,'bt',i)"><i class="el-icon-back"></i></a>
                                                                    <a @click="del(index,'bt',i)" ><i class="el-icon-delete"></i></a>
                                                                    <a  ><i class="el-icon-s-open"></i></a>
                                                                    <a  ><i class="el-icon-rank"></i></a>  
                                                                    <a @click="right(index,'bt',i)"><i class="el-icon-right"></i></a> 
                                                                </p>
                                                            </li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                            </td>
                                            
                                        </tr>
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                       
                        
                    </el-form>   
                </el-tab-pane>
                <el-tab-pane label="配置管理" name="second">
                    <h1>用户管理dsfasdfasdfa</h1>    
                </el-tab-pane>
            </el-tabs>  
        </div>
</template>
<script>
    export default {
        data() {
            return {
                fittype:'scale-down',
                url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                srcList: [
                'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
                'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
                ],
                activeName: 'first',
                labelPosition: 'right',
                formLabelAlign: {
                    name: '',
                    region: '',
                    type: ''
                },
                img:[
                    'http://caijiqi.oss-cn-hangzhou.aliyuncs.com/upload/zhouzong/201911261628/473i6JCF8cT2hdu.jpg',
                    'http://caijiqi.oss-cn-hangzhou.aliyuncs.com/upload/201911271445/584ywZiVBEJT0av.jpg',
                    'http://caijiqi.oss-cn-hangzhou.aliyuncs.com/upload/zhouzong/201911271444/96LWaP8vY1JUlBF.jpg'
                ],
                btData:[
                    {
                        name:'123',cb:'234',price:'324',kc:'345',txm:'ret',
                        imgs:['http://caijiqi.oss-cn-hangzhou.aliyuncs.com/upload/zhouzong/201911281320/GliL7X3KoMDvxkq.jpg',
                              'http://caijiqi.oss-cn-hangzhou.aliyuncs.com/upload/zhouzong/201911281319/71m4kJRONs1jF96.jpg',
                              'http://caijiqi.oss-cn-hangzhou.aliyuncs.com/upload/zhouzong/201911281510/3vs9jXIbDN38hdt.jpg'
                          ]
                    }
                ]
            };
        },
        mounted(){
            
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            /*左右移动*/
            left(index,type,i){
                if(index>0 || i>0){
                    if(type==='zt'){
                        var fromimg=this.img[index]
                        var toimg=this.img[index-1]
                        this.img.splice(index,1,toimg) 
                        this.img.splice(index-1,1,fromimg) 
                    }else if(type==='bt'){
                        var fromimg=this.btData[index].imgs[i]
                        var toimg=  this.btData[index].imgs[i-1]
                        console.log(fromimg,toimg)
                        this.btData[index].imgs.splice(i,1,toimg) 
                        this.btData[index].imgs.splice(i-1,1,fromimg) 
                    }
                }else{
                    return
                }
            },
            right(index,type,i){
                if(index<this.img.length-1&type==='zt'){
                    
                        var fromimg=this.img[index]
                        var toimg=this.img[index+1]
                        this.img.splice(index,1,toimg) 
                        this.img.splice(index+1,1,fromimg)
                    
                }else if(i<this.btData[index].imgs.length-1&type==='zt'){
                    var fromimg=this.btData[index].imgs[i]
                        var toimg=  this.btData[index].imgs[i+1]
                        this.btData[index].imgs.splice(i,1,toimg) 
                        this.btData[index].imgs.splice(i+1,1,fromimg) 
                }else{
                    return
                }
            },
            del(index,type,i){
                if(type==='zt'){
                    this.img.splice(index,1)
                }else if(type==='bt'){
                    this.btData[index].imgs.splice(i,1)
                }
                
            },
            upImg(e){
                console.log(e.target.files)
                const myFiles=e.target.files
                var data = new FormData()
                for(var index = 0; index < myFiles.length; index++){
                    data.append('key',myFiles[index])
                    console.log(data)
                }
                console.log(data)

                let postData = this.$qs.stringify({
                    'img':data
                });
                this.axios.post('http://127.0.0.1:3000/img',postData).then((res)=>{
                        console.log(res.data.result[0])
                        this.pagedata=res.data.result[0]
                        this.tableData=JSON.parse(aa) 
                })

            },
            addBt(){
                this.btData.push({name:'',cb:'',price:'',kc:'',txm:'',imgs:[]})
            },
            delBt(index){
                this.btData.splice(index,1)
            },
            consoleData(){
                console.log(this.btData)
            }
        }   
    }
</script>
<style>
  .el-input{
      width: 60%
  }
  .imgbox{
      display: flex;
  }
  .imgbox>li{
      width: 150px;
      height: 150px;
      border-radius:3px;
      cursor: pointer;
      overflow: hidden; 
      position: relative; 
      box-sizing: border-box;
      margin: 5px;
  }
  .imgbox>li:hover{
      box-shadow: 10px 10px 5px #888888
  }
  .imgbox>li:hover .el-image {
      transform: scale(1.2,1.2)
  }
  .imgbox>li:hover p {
      height: 30px;
  }
  .imgbox>li>.el-image{
      transition:all 0.2s ease-in;
      height: 150px;
  }

  .imgbox>li>p{
      color: #fff;
      width: 100%;
      height: 0px;
      background-color: rgba(33, 33, 33, .7);  
      position:absolute;
      bottom:0px;
      transition:all 0.2s ease-in;
      display: flex;
      justify-content: space-around;
      align-items:center;
      overflow: hidden;
  }
  
  
  .el-image-viewer__close{
      color:red
  }
</style>