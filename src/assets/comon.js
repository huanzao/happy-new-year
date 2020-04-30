//初始化数据 this.myInit('api/People/ShowPeople',{IndexPage:"1",PageSize:"10"})
export function myInit(url,params){
    // let up_params=params
    // if(this.isSearch){
    //   for(var key in this.shaixuan){
    //     up_params[key]=this.shaixuan[key]
    //   }
    // }

    const loading = this.$loading({
        lock: true,
        text: '正在请求数据，请稍后',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    });
    this.axios({
      method: 'post',
      headers:{'Authorization':'Bearer '+localStorage.token},
      timeout:10000,
      url: url,
      data:this.$qs.stringify(params)
    }).then((res)=>{
        loading.close()
        console.log(res.data)
        if(res.data.results&&res.data.results.length===0){
          this.$message.success('暂无数据');
        }
        if(res.data.result&&res.data.result.length===0){
          this.$message.success('暂无数据');
        }
        if(res.data.result){
          this.tableData=res.data.result
        }else{
          this.tableData=res.data.results
        }
        
        
        this.totalpage=res.data.totalpage
    }).catch((error)=>{
        loading.close()
        console.log(error)
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
      console.log(res)
      if(res.data.results.length===0){
        this.$message.success('暂无数据');
      }
      this.tableData=res.data.results
      this.table_option=res.data.result1
      this.totalpage=res.data.totalpage
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
  })
}

export function myInit3(url,params){
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
      console.log(res)
      if(res.data.results.length===0){
        this.$message.success('暂无数据');
      }
      this.tableData=res.data.results
      this.next_time=res.data.nexttime[0].calDate
      this.totalpage=res.data.totalpage
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
  })
}

//搜索
export function mySearch(url){
  this.searchBoxShow=false
  this.pagesize=10
  this.currentPage=1
  let mypage={'pageSize':this.pagesize,'IndexPage':this.currentPage}
  let mySearchData=this.shaixuan
    Object.keys(mySearchData).forEach(function(key){
      mypage[key]=mySearchData[key]
    });
    console.log(this.$qs.stringify(mypage))
    const loading = this.$loading({
        lock: true,
        text: '正在请求搜索结果，请稍后',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.5)'
    });
    this.axios({
      method: 'post',
      headers:{
          'Authorization':'Bearer '+localStorage.token
      },
      timeout:5000,
      url: url,
      data:this.$qs.stringify(mypage)
    }).then((res)=>{
        console.log(res)
        //还需根据结果再进行判断
        loading.close()
        if(res.data.results==0){
            this.$message.info('没有查询到数据')
        }else{
             this.$message.success('查询数据已成功放回')
        }
        this.searchBoxShow=false
        this.isSearch=true
        this.totalpage=res.data.totalpage
        this.tableData=res.data.results
    }).catch((err)=>{
        loading.close()
        this.searchBoxShow=false
        this.$notify.error({
          title: 'ERROR',
          message: err
        })
    })
}

//全局删除操作
export function myDelete(index,text,params,url,showurl,arrname){
    this.$confirm(`此操作将永久删除${text}, 是否继续?`, '提示', {
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
            if(this.tableData.length===1){
              var key={IndexPage:this.currentPage-1,PageSize:this.pagesize}
              this.axios({
                method: 'post',
                headers:{'Authorization':'Bearer '+localStorage.token},
                url: showurl,
                data:this.$qs.stringify(key)
              }).then((res)=>{
                  loading.close()
                  
                  this.totalpage=res.data.totalpage
                  if(arrname){
                    this.tableData=res.data[arrname]
                  }else{
                    this.tableData=res.data.result
                  }
              })
          }else{
            this.totalpage=this.totalpage*1-1
          }
          this.tableData.splice(index,1);
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          }
      }).catch((err)=>{
          console.log(err)
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

//全局编辑操作
export function myEdit(row,url,type){
  let _url=url
  this.$router.push({
      name: _url,
      params: {
          row:row,
          type:type
      }
  })
}

//全局添加操作
export function myAdd(url,type){
  let _url=url
  this.$router.push({
      name: _url,
      params: {
        type:type
    }
  })
}

//全局分页操作--页面大小变化的函数 select
//val 组件值  url:api接口 prop:加餐 arrName:当返回数据不是result || results 时赋值用
export function handleSizeChange(val,url,prop,arrName) { //分页 
    this.pagesize=val
    let mypage={}
    if(prop){
      for(var i in prop){
        mypage[i]=prop[i]
      }
    }
    
    let _url=url
    if(this.isSearch){
        _url=this.searchAPI
        let mySearchData=this.shaixuan
        Object.keys(mySearchData).forEach(function(key){
          mypage[key]=mySearchData[key]
        });
    }
    mypage.pageSize=this.pagesize
    mypage.IndexPage=this.currentPage
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
      url: _url,
      data:this.$qs.stringify(mypage)
    }).then((res)=>{
      loading.close()
      if(res.data.response==="success"){
        console.log('分页数据',this.tableData)
          this.tableData=res.data.results
          if(res.data.results){
            if(typeof(res.data.results)==='string'){
              this.tableData=JSON.parse(res.data.results)
            }else{
              this.tableData=res.data.results
            }
          }else if(res.data.result){
            if(typeof(res.data.result)==='string'){
              this.tableData=JSON.parse(res.data.result)
            }else{
              this.tableData=res.data.result
              
            }
          }
          if(arrName){
            this.tableData=res.data[arrName]
          }
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
//val 组件值  url:api接口 prop:加餐 arrName:当返回数据不是result || results 时赋值用
export function  handleCurrentChange(val,url,prop,arrName,searchURL) { 
    this.currentPage=val
    let mypage={}
    if(prop){
      for(var i in prop){
        mypage[i]=prop[i]
      }
    }
    
    let _url=url
    if(this.isSearch){
      _url=this.searchAPI
      let mySearchData=this.shaixuan
      Object.keys(mySearchData).forEach(function(key){
        mypage[key]=mySearchData[key]
      });
    }

    mypage.pageSize=this.pagesize
    mypage.IndexPage=this.currentPage
    console.log(mypage)

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
      url: _url,
      data:this.$qs.stringify(mypage)
    }).then((res)=>{
      loading.close()
      console.log('分页数据',this.tableData)
        if(res.data.response==="success"){
            if(res.data.results){
              if(typeof(res.data.results)==='string'){
                this.tableData=JSON.parse(res.data.results)
              }else{
                this.tableData=res.data.results
              }
            }else if(res.data.result){
              if(typeof(res.data.result)==='string'){
                this.tableData=JSON.parse(res.data.result)
              }else{
                this.tableData=res.data.result
              }
            }
            if(arrName){
              this.tableData=res.data[arrName]
            }
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
export function addUpload(url,formName,ret){
  this.$refs[formName].validate((valid) => {
    if (valid) {
      const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
      });
      let updata=this.ruleForm
      this.axios({
          method: 'post',
          headers:{
              'Authorization':'Bearer '+localStorage.token
          },
          timeout:5000,
          url: url,
          data:this.$qs.stringify(updata)
      }).then((res)=>{
              loading.close()
              this.addDialog=false
              console.log(res)
                if(res.data.response==="success"){
                  this.$message({
                      message: '提交成功',
                      type: 'success'
                  });
                  if(ret){
                    window.history.go(-1)
                  }
              }else{
                this.$message({
                  message: res.data.results,
                  type: 'warning'
                });
              }
      }).catch((err)=>{
          loading.close()
          this.addDialog=false
          console.log(err)
          this.$notify.error({
            title: 'ERROR',
            message: err
          });
      })
    } else {
      return false;
    }
  });
}


export function addUpload2(url,formName){
  this.$refs[formName].validate((valid) => {
    if (valid) {
      if(this.ruleForm.QuanshangId==''||this.ruleForm.QId==''){
          this.$message.warning('请务必选择券商')
          return
      }
      const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
      });
      let updata=this.ruleForm
      
      this.axios({
          method: 'post',
          headers:{
              'Authorization':'Bearer '+localStorage.token
          },
          timeout:5000,
          url: url,
          data:this.$qs.stringify(updata)
      }).then((res)=>{
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
      return false;
    }
  });
}

export function myCancel(){
    window.history.go(-1)
}

//<el-table-column label="状态" prop="status" width="160" :formatter='famter_state'></el-table-column>
export function famter_state(row){
  // console.log(row.status)
  if(row.status===undefined){
      if(row.Status=='1'){
        return '启用'
      }else if(row.Status=='0'){
          return '停用'
      }
  }else{
      if(row.status=='1'){
        return '启用'
      }else if(row.status=='0'){
          return '停用'
      }
  }
  
}
