<template>
    <div>
    <el-form class="demo-form-inline" inline>
      <el-form-item>
        <el-input size="small" placeholder="请输入内容" @keydown.enter="search" v-model="searchValue" prefix-icon="el-icon-search"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="search">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="multipleTable" :data="searchResult" tooltip-effect="dark" style="height:80%">
      <el-table-column label="用户名" width="150">
        <template slot-scope="scope">
          <el-input size="mini" v-model="scope.row.waste_name" placeholder="请输入内容"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="账号" width="120">
        <template slot-scope="scope">
          <el-input size="mini" v-model="scope.row.price" placeholder="请输入内容"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="性别" width="120">
          <template slot-scope="scope">
            <el-select size="small" v-model="scope.row.compute_mode" placeholder="请选择">
              <el-option size="small" label="按重量" value="by_weight"></el-option>
              <el-option size="small" label="按数量" value="by_quantity"></el-option>
              <el-option size="small" label="按物品" value="by_material"></el-option>
            </el-select>
        </template>
      </el-table-column>
      <el-table-column label="头像" width="120">
          <template slot-scope="scope">
            <div class="avatar" @click.stop="showDialog(scope.row.waste_url,scope.$index,scope.row._id)">
              <el-avatar shape="square" size="large" :src="scope.row.waste_url"></el-avatar>
            </div>
        </template>
      </el-table-column>
      <el-table-column label="角色" width="120">
        <template slot-scope="scope">
          <el-input size="mini" v-model="scope.row.species" placeholder="请输入内容"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="冻结账户" width="120">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.is_recycle" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="saveWaste(scope.$index)">保存</el-button>
          </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :total="waste.length"></el-pagination>

    </div>
</template>

<script>
export default {
    data(){
        return {
        activeName: 'second',
        waste:'',
        searchResult:"",
        searchValue:"",
        dialogVisible:false,
        currImg:'',
        dialogAdd:false,
        newWaste:{},
        index:'',
        id:''
        }
    },
    created () {
        this.getWaste();
    },
    methods:{
        handleClick(tab, event) {
        console.log(tab, event);
      },
      search(){
        if(this.searchValue ==''){
          this.searchResult = this.waste;
        }else{
          this.searchResult = this.searchResult.filter( v => {
            return v.waste_name.includes(this.searchValue)
          })
        }
      },
      save(){
        this.axios.post(this.base+"/waste/batchUpdate",{waste:this.waste})
        .then(res => {
          console.log(res)
          if(res.data){
            this.$notify({ title: '成功', message: '保存成功', type: 'success'});
          }else{
            this.$notify({ title: '失败', message: '保存失败', type: 'error'});
          }          
        })
        .catch(err => {
          console.error(err); 
        })
      },
      removeWaste(index,id){
        this.axios.get(this.base+"/waste/delete/"+id)
        .then(res => {
          console.log(res)
          if(res.data.success == "true"){
            this.$notify({ title: '成功', message: '删除成功', type: 'success'});
            this.searchResult.splice(index,1);
          }else{
            this.$notify({ title: '失败', message: res.data.data, type: 'err'});
          }
        })
        .catch(err => {
          console.error(err); 
        })
      },
      saveWaste(index){
          console.log(this.searchResult[index]);
          this.axios.post(this.base+"/waste/update/"+this.searchResult[index]._id,this.searchResult[index])
          .then(res => {
              console.log(res)
            if(res.data.data){
                this.$notify({ title: '成功', message: '保存成功', type: 'success'});
            }else{
                this.$notify({ title: '失败', message: '保存失败', type: 'error'});
            }
          })
          .catch(err => {
              console.error(err); 
          })
      },
      showDialog(url,index,id){
        this.dialogVisible = true;
        this.currImg = url;
        this.index = index;
        this.id = id;
      },
      addWaste(){
        this.dialogAdd = true;
      },
      addSubmit(){
        this.$refs.add.submit();
        this.dialogAdd = false;
      },
      addSuccess(res){
        this.newWaste.waste_url = res.data.url
        this.axios.post(this.base+"/waste/add",this.newWaste)
        .then(res => {
          if(res.data.success == "true"){
              this.$notify({ title: '成功', message: '添加成功', type: 'success'});
              this.getWaste();
          }else{
              this.$notify({ title: '失败', message: '添加失败', type: 'error'});
          }
        })
        .catch(err => {
          console.error(err); 
        })
      },
     modifySubmit(){
        this.$refs.modify.submit();
      },
      modifySuccess(res){
        this.searchResult[this.index].waste_url = res.data.url;
        this.axios.post(this.base+"/waste/update/"+this.id,{waste_url:res.data.url})
        .then(res => {
          console.log(res)
          if(res.data.data){
            this.$notify({ title: '成功', message: '保存成功', type: 'success'});
          }else{
            this.$notify({ title: '失败', message: '保存失败', type: 'error'});
          }
        })
        .catch(err => {
          console.error(err); 
        })
        this.dialogVisible = false
      },
      getWaste(){
        console.log(this.axios.get(this.base + "/waste/getAllWaste")
        .then(res => {
          this.waste=res.data;
          this.searchResult=res.data;
        })
        .catch(err => {
          console.error(err); 
        }));
        
      }
    }
}
</script>

<style scoped>
.avatar :hover{
  cursor: pointer;
}
</style>