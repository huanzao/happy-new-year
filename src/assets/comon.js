export function myDelete(index, row){
    console.log(index, row,'我自己的方法');
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableData.splice(index,1);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
}



export function handleSizeChange(val,url) { //分页 
    console.log('我自己的方法',url);
    this.pagesize=val
    console.log(this.pagesize,this.currentPage)
    console.log('ajax')
    let postData = this.$qs.stringify({'order_zt':2,'pageSize':this.pageSize,'currentPage':this.currentPage});
    console.log(postData)
    this.axios.post('api/show_order',postData).then((res)=>{
        console.log(res.data)
        this.tableData=res.data.result
        this.totalPage=res.data.total_page
    }).catch((err)=>{
        this.$notify.error({
          title: '错误',
          message: '网路错误，请稍后再试'
        })
    })
}

export function  handleCurrentChange(val,url) {
    console.log('我自己的方法',url);
    this.currentPage=val
     console.log(this.pagesize,this.currentPage)
     console.log('ajax')
    let postData = this.$qs.stringify({'order_zt':2,'pageSize':this.pageSize,'currentPage':this.currentPage});
    console.log(postData)
    this.axios.post('api/show_order',postData).then((res)=>{
        console.log(res.data)
        this.tableData=res.data.result
        this.totalPage=res.data.total_page
    }).catch((err)=>{
        this.$notify.error({
          title: '错误',
          message: '网路错误，请稍后再试'
        })
    })
  }