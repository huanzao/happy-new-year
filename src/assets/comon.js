//初始化数据 this.myInit('api/People/ShowPeople',{IndexPage:"1",PageSize:"10"})
export function myInit(url,params){
    this.isSearch=false
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
        console.log('初始化数据',res)
        if(res.data.results.length===0){
          this.$message.success('暂无数据');
        }
        this.tableData=res.data.results
        this.totalpage=res.data.totalpage
    }).catch((err)=>{
        loading.close()
        this.$notify.error({
          title: '登录过期',
          message: '登录过期，请重新登录'
        })
        setTimeout(()=>{
          this.$router.push('/')
        },1000)
    })
}
export function myInit2(url,params){
  this.isSearch=false
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
      console.log('初始化数据',res)
      if(res.data.results.length===0){
        this.$message.success('暂无数据');
      }
      this.tableData=res.data.results
      this.table_option=res.data.result1
      this.totalpage=res.data.totalpage
  }).catch((err)=>{
      loading.close()
      this.$notify.error({
        title: '登录过期',
        message: '登录过期，请重新登录'
      })
      setTimeout(()=>{
        this.$router.push('/')
      },1000)
  })
}

//搜索
export function mySearch(url,params){
  this.searchBoxShow=false
  this.isSearch=true
  const loading = this.$loading({
      lock: true,
      text: '正在请求搜索结果，请稍后',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
  });
    this.axios({
      method: 'post',
      headers:{
          'Authorization':'Bearer '+localStorage.token
      },
      timeout:5000,
      url: url,
      data:this.$qs.stringify(params)
    }).then((res)=>{
        //还需根据结果再进行判断
        loading.close()
        console.log('搜索结果',res)
        this.searchBoxShow=false
        this.isSearch=true
        this.tableData=res.data.results
        this.totalPage=res.data.total_page
    }).catch((err)=>{
        loading.close()
        console.log(err)
        this.searchBoxShow=false
        this.$notify.error({
          title: '登录过期',
          message: '登录过期，请重新登录'
        })
        setTimeout(()=>{
          this.$router.push('/')
        },1000)
    })
}
//全局删除操作
export function myDelete(index, text,params,url,showurl){
    console.log(index,params,'我自己的删除方法');
    this.$confirm(`此操作将永久删除${text}, 是否继续?`, '提示', {
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
            if(this.tableData.length===1){
              var key={IndexPage:this.currentPage-1,PageSize:this.pagesize}
              this.axios({
                method: 'post',
                headers:{'Authorization':'Bearer '+localStorage.token},
                url: showurl,
                data:this.$qs.stringify(key)
              }).then((res)=>{
                  loading.close()
                  this.tableData=res.data.result
                  this.totalpage=res.data.totalpage
              })
          }else{
            this.totalpage=this.totalpage*1-1
          }
          this.tableData.splice(index,1);
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          console.log('****',this.totalpage,typeof(this.totalpage))
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

//全局编辑操作
export function myEdit(row,url){
  let _url=url
  console.log(row,url,'我自己的方法--编辑');
  this.$router.push({
      name: _url,
      params: {
          row:row
      }
  })
}

//全局添加操作
export function myAdd(url){
  let _url=url
  this.$router.push({
      name: _url,
  })
}

//全局分页操作--页面大小变化的函数 select
export function handleSizeChange(val,url) { //分页 
    console.log('我自己的方法',url);
    this.pagesize=val
    console.log(this.pagesize,this.currentPage)
    let mypage={'pageSize':this.pagesize,'IndexPage':this.currentPage}
    if(this.isSearch){
        let mySearchData=this.searchData
        Object.keys(mySearchData).forEach(function(key){
          mypage[key]=mySearchData[key]
        });
    }
    const loading = this.$loading({
        lock: true,
        text: '正在请求数据，求稍后',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.5)'
    });
    this.axios({
      method: 'post',
      headers:{'Authorization':'Bearer '+localStorage.token},
      timeout:5000,
      url: url,
      data:this.$qs.stringify(mypage)
    }).then((res)=>{
      console.log(res)
      loading.close()
      if(res.data.response==="success"){
          console.log('分页数据',res)
          this.tableData=res.data.results
          this.totalpage=res.data.totalpage
      }else{
        this.$notify.error({
          title: '错误',
          message: '网路错误，请稍后再试'
        })
      }
  })
  .catch((error)=>{
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
  })
}

//全局分页操作--页数变化的函数 option
export function  handleCurrentChange(val,url) { 
    this.currentPage=val
    console.log(this.pagesize,this.currentPage)
    let mypage={'pageSize':this.pagesize,'IndexPage':this.currentPage}
    if(this.isSearch){
      let mySearchData=this.searchData
      Object.keys(mySearchData).forEach(function(key){
        mypage[key]=mySearchData[key]
      });
    }
    const loading = this.$loading({
        lock: true,
        text: '正在请求数据，求稍后',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.5)'
    });
    this.axios({
      method: 'post',
      headers:{'Authorization':'Bearer '+localStorage.token},
      timeout:5000,
      url: url,
      data:this.$qs.stringify(mypage)
    }).then((res)=>{
      loading.close()
        console.log(res)
        if(res.data.response==="success"){
            this.tableData=res.data.results
            this.totalpage=res.data.totalpage
        }else{
          this.$notify.error({
            title: '错误',
            message: '网路错误，请稍后再试'
          })
        }
    })
    .catch((error)=>{
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
    })
}

//复位操作
export function reSetData(){
  this.currentPage=1
  this.pagesize=10
  this.searchBoxShow=false
  this.axios.post('api/show_order',postData).then((res)=>{
    console.log(res.data)
    this.tableData=res.data.results
    this.totalPage=res.data.total_page
  }).catch((err)=>{
      this.$notify.error({
        title: '错误',
        message: '网路错误，请稍后再试'
      })
  })
}

//添加操作的提交
export function addUpload(url,formName){
  this.$refs[formName].validate((valid) => {
    if (valid) {
      const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
      });
      let updata=this.ruleForm
      console.log('添加或修改提交的信息',updata)
      this.axios({
          method: 'post',
          headers:{
              'Authorization':'Bearer '+localStorage.token
          },
          timeout:5000,
          url: url,
          data:this.$qs.stringify(updata)
      }).then((res)=>{
              console.log('res11111111',res)
              loading.close()
                if(res.data.response==="success"){
                  this.$message({
                      message: '提交成功',
                      type: 'success'
                  });
                  setTimeout(()=>{
                    window.history.go(-1)
                  },1000)
              }else{
                this.$message({
                  message: res.data.results,
                  type: 'warning'
                });
              }
      }).catch((err)=>{
          console.log('error0000000',err)
          loading.close()
          this.$notify.error({
            title: '登录过期',
            message: '请重新登陆'
          });
          setTimeout(()=>{
            this.$router.push('/')
          },1000)
      })
    } else {
      console.log('error submit!!');
      return false;
    }
  });
}

export function myCancel(){
    window.history.go(-1)
}
