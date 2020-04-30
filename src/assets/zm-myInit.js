//初始化数据 this.myInit('api/People/ShowPeople',{IndexPage:"1",PageSize:"10"})
export function zmMyInit(url,params){
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
        // console.log(res)
        if(res.data.result.length===0){
          this.$message.success('暂无数据');
        }
        // console.log(res.data)
        this.tableData=res.data.result
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
// 耗材字典
export function zmMyInit2(url,params){
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
        console.log(res.data.result_consumable)
        if(res.data.result_consumable.length===0){
          this.$message.success('暂无数据');
        }
        var dd=JSON.parse(res.data.results_side)
        // console.log(dd[1].children===[])
        this.tableData=res.data.result_consumable
        this.arrMenu=dd
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

// 证件列表
export function zmMyInit3(url,params){
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
        // console.log(res)
        if(res.data.results_papers.length===0){
          this.$message.success('暂无数据');
        }
        console.log(res.data)
        this.tableData=res.data.results_papers
        this.totalpage=res.data.totalpage
    }).catch((error)=>{
        loading.close()
        console.log(error)
        // if (error.request) {
        //   this.$message.warning('请求超时,请稍后再试')
        // }else{
        //     this.$notify.error({
        //         title: '登录过期',
        //         message: '登录过期，请重新登录'
        //     })
        //     setTimeout(()=>{
        //         this.$router.push('/')
        //     },1000)
        // }
    })
}

// 下拉框
export  function selectData(url){
    return this.axios({
        method: 'post',
        headers:{'Authorization':'Bearer '+localStorage.token},
        timeout:5000,
        url: url,
        data:this.$qs.stringify()
        }).then((res)=>{
            // loading.close()
            // console.log(res)
            if(res.data.response==="success"){
                // this.$message.success('设置成功')
                return res
            }else{
                this.$notify.error({
                    title: '错误',
                    message: '网路错误，请稍后再试'
                })
            }
        })
        .catch((error)=>{
            console.log(error)
        // loading.close()
            // this.$notify.error({
            //     title: '登录过期',
            //     message: '登录过期，请重新登录'
            // })
            // setTimeout(()=>{
            //     this.$router.push('/')
            // },1000)
        })

}

// 审批流程
export  function spData(url,params){
    return this.axios({
        method: 'post',
        headers:{'Authorization':'Bearer '+localStorage.token},
        timeout:5000,
        url: url,
        data:this.$qs.stringify(params)
        }).then((res)=>{
            // loading.close()
            // console.log(res)
            if(res.data.response==="success"){
                // this.$message.success('设置成功')
                return res
            }else{
                this.$notify.error({
                    title: '错误',
                    message: '网路错误，请稍后再试'
                })
            }
        })
        .catch((error)=>{
            console.log(error)
        // loading.close()
            // this.$notify.error({
            //     title: '登录过期',
            //     message: '登录过期，请重新登录'
            // })
            // setTimeout(()=>{
            //     this.$router.push('/')
            // },1000)
        })

}
// 设备厂商维护页面渲染
export function zmMyInit4(url,params){
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
        if(res.data.result.length===0){
          this.$message.success('暂无数据');
        }
        console.log(res.data)
        this.tableData=res.data.result
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