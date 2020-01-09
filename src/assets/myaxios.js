export function req_AccountList(){
    this.axios({
        method: 'post',
        headers:{'Authorization':'Bearer '+localStorage.token},
        timeout:5000,
        url: 'api/Bond/ShowCapitalAc',
      }).then((res)=>{
          console.log('初始化数据------获取账号-------',res)
          this.AccountList=res.data.result
      }).catch((err)=>{
        //   this.$notify.error({
        //     title: '登录过期',
        //     message: '登录过期，请重新登录'
        //   })
        //   setTimeout(()=>{
        //     this.$router.push('/')
        //   },1000)
      })
}

export function table_req(url,params,type){
    const loading = this.$loading({
        lock: true,
        text: '正在请求数据，请稍后',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    });
    this.axios({
      method: 'post',
      headers:{'Authorization':'Bearer '+localStorage.token},
      timeout:5000,
      url: url,
      data:this.$qs.stringify(params)
    }).then((res)=>{
        loading.close()
        console.log(res)
        if(res.data.result===""){
            this.$message({message:'暂无数据',type:'success'});  
        }else if(res.data.response==="fail"){
            this.$message.warning(res.data.result)
        }else{
            if(type==='sraech'){
                this.tableData=JSON.parse(res.data.result)
            }else if(type==='cc'){
                this.table_chicang=JSON.parse(res.data.result) 
            }else if(type==='wt'){
                this.table_weituo=JSON.parse(res.data.result) 
            }else if(type==='cj'){
                this.table_cj=JSON.parse(res.data.result) 
            }else if(type==='cx'){
                this.table_cx=JSON.parse(res.data.result) 
            }else if(type==='jg'){
                this.table_jg=JSON.parse(res.data.result) 
            }else if(type==='gddm'){
                this.table_gd=JSON.parse(res.data.result) 
            }
        } 
    }).catch((error)=>{
         loading.close()
        if (error.request) {
            this.$message.warning('请求超时,请稍后再试')
        }else{
            this.$notify.error({
                title: '登录过期',
                message: '登录过期，请重新登录'
            })
            setTimeout(()=>{
                this.$router.push('/')
            },1000)
        }   
    });
}

//全局删除操作
export function mySell(index, text,params,url){
    this.$confirm(`确定就出售${text}股票吗?`, '提示', {
      cancelButtonText: '取消',
      confirmButtonText: '确定',
      type: 'warning'
    }).then(() => {
      console.log(url)
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    });
      this.axios({
        method: 'post',
        headers:{'Authorization':'Bearer '+localStorage.token},
        url: url,
        data:this.$qs.stringify(params)
      }).then((res)=>{
        loading.close()
          console.log(res)
          if(res.data.response==="fail"){
            this.$message({
              message: res.data.results,
              type: 'warning'
            });
          }else{
            this.tableData.splice(index,1);
            this.$message({
              type: 'success',
              message: '出售成功!'
            })
          }
      }).catch((err)=>{
          loading.close()
          this.$notify.error({
            title: '错误',
            message: '网路错误，请稍后再试'
          })
      })
    }).catch((err) => {
      console.log(46531523,err)
      this.$message({
        type: 'info',
        message: '已取消删除'
      });          
    });
}