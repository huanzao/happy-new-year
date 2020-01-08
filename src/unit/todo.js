
export function myDel(a,b,url) {
    let postData = this.$qs.stringify({
        'id':b.id,
    });
    console.log(postData)
    this.tableData.splice(a,1)
    this.axios.post('api/'+url,postData).then((res)=>{
        if(res.data.result.length==0){
            this.$message.error('删除失败');
        }else{
            this.$message.success('删除成功');
        }
    }).catch((err)=>{
        this.$notify.error({
          title: '错误',
          message: '网路错误，请稍后再试'
        })
    })
}    

export function myEdit(a,b,url){
    console.log(arguments)
    this.$refs.dialogEditVisible=true
    console.log(this.$refs)
}