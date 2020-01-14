export function req_AccountList(){
    this.axios({
        method: 'post',
        headers:{'Authorization':'Bearer '+localStorage.token},
        timeout:5000,
        url: 'api/Bond/ShowCapitalAc',
      }).then((res)=>{
          this.AccountList=res.data.results
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
      timeout:9000,
      url: url,
      data:this.$qs.stringify(params)
    }).then((res)=>{
        loading.close()
        if(res.data.results===""){
            this.$message({message:'暂无数据',type:'success'});  
        }else if(res.data.response==="fail"){
            this.$message.warning(res.data.results)
        }else{
            if(type==='sraech'){
                this.tableData=res.data.results
            }else if(type==='cc'){
                this.table_chicang=res.data.results
            }else if(type==='wt'){
                this.table_weituo=res.data.results
            }else if(type==='cj'){
                this.table_cj=res.data.results
            }else if(type==='cx'){
                this.table_cx=res.data.results
            }else if(type==='jg'){
                this.table_jg=res.data.results
            }else if(type==='gddm'){
                this.table_gd=res.data.results
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
      this.$message({
        type: 'info',
        message: '已取消删除'
      });          
    });
}