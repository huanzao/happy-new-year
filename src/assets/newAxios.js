export function newInit(url,params){
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
        // if(res.data.results.length===0){
        //   this.$message.success('暂无数据');
        // }
        console.log(res.data)
        this.tableData=JSON.parse(res.data.results) 
        console.log(JSON.parse(res.data.results))
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

export function newInit_return(url,params,total){
    // let up_params=params
    // if(this.isSearch){
    //   for(var key in this.shaixuan){
    //     up_params[key]=this.shaixuan[key]
    //   }
    // }
    var ist=total
    const loading = this.$loading({
        lock: true,
        text: '正在请求数据，请稍后',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    });

    return this.axios({
      method: 'post',
      headers:{'Authorization':'Bearer '+localStorage.token},
      timeout:50000,
      url: url,
      data:this.$qs.stringify(params)
    }).then((res)=>{
        loading.close()
        if(res.data.totalpage){
          if(ist===undefined){
            this.totalpage=res.data.totalpage
          }
          
        }
        return res;
    }).catch((error)=>{
        console.log(error)
        loading.close()
        this.$message.warning('网络错误,请稍后再试')
    })
}





//添加操作的提交
export function addUpload_current(url,formName){
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
                this.currentPage=1,
                this.pagesize=10,
                loading.close()
                if(this.Dialog===true) this.addDialog=false
                if(this.drawer===true) this.drawer=false
                console.log(res)
                  if(res.data.response==="success"){
                    this.$message({
                        message: '提交成功',
                        type: 'success'
                    });
                    this.Current_init()
                }else{
                  this.$message({
                    message: res.data.results,
                    type: 'warning'
                  });
                }
                
        }).catch((err)=>{
            loading.close()
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

export function newsmDel(url,params){
    this.isSearch=false
    const loading = this.$loading({
        lock: true,
        text: '正在请求数据，请稍后',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    });
    return this.axios({
      method: 'post',
      headers:{'Authorization':'Bearer '+localStorage.token},
      timeout:5000,
      url: url,
      data:this.$qs.stringify(params)
    }).then((res)=>{
        loading.close()
        return res;
    }).catch((error)=>{
        console.log(error)
        loading.close()
        this.$message.warning('网络错误,请稍后再试')
    })
}

//导出Excel表格

//第一个参数：表头   第二个参数是：表头对应的this.tableData的键   第三个是文件名可以为空 4当this.tableData有两级时把key传过来

export function myExprotExcel(headerArr,keyArr,filename,key){
  if(headerArr.length!==keyArr.length){
    this.$message.warning('表头数据与数组中的数据不能一一匹配')
    return
  }
  this.isExport=true
  import('@/vendor/Export2Excel').then(excel => {
      const tHeader = headerArr
      const filterVal = keyArr
      const list = this.tableData
      const data = aaa(filterVal, list,key)
      excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: filename,
          autoWidth: true,
          bookType: 'xlsx'
          })
          this.isExport = false
      })
}
function aaa(filterVal,jsonData,key) {
  if(key){
    return jsonData.map(
      (v,index) => filterVal.map(j => {
        var a=j.split('.')[1]
        return v[key][a]
      })
    )
  }else{
    return jsonData.map(v => filterVal.map(j => {
        return v[j]
    }))
  }
  
}

