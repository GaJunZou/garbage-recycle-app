<template>
    <div>
        <el-form class="demo-form-inline" inline>
      <el-form-item>
        <el-input size="small" placeholder="请输入内容" @keydown.enter="search" v-model="searchValue" prefix-icon="el-icon-search"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="search">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="success" plain @click="addWaste()">添 加 <i class="el-icon-plus"></i></el-button>
        <el-button size="small" type="primary" @click="save">保 存</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="multipleTable" :data="searchResult" tooltip-effect="dark" style="height:80%">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column label="姓名" width="150">
        <template slot-scope="scope">
          <el-input size="mini" v-model="scope.row.waste_name" placeholder="请输入内容"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="价格" width="120">
        <template slot-scope="scope">
          <el-input size="mini" v-model="scope.row.price" placeholder="请输入内容"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="waste_url" label="图片" width="120">
          <template slot-scope="scope">
            <div class="avatar" @click.stop="showDialog(scope.row.waste_url,scope.$index,scope.row._id)">
              <el-avatar shape="square" size="large" :src="scope.row.waste_url"></el-avatar>
            </div>
        </template>
      </el-table-column>
      <el-table-column prop="species" label="种类" width="120">
        <template slot-scope="scope">
          <el-input size="mini" v-model="scope.row.species" placeholder="请输入内容"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="compute_mode" label="计算方式" width="120">
          <template slot-scope="scope">
            <el-select size="small" v-model="scope.row.compute_mode" placeholder="请选择">
              <el-option size="small" label="按重量" value="by_weight"></el-option>
              <el-option size="small" label="按数量" value="by_quantity"></el-option>
              <el-option size="small" label="按物品" value="by_material"></el-option>
            </el-select>
        </template>
      </el-table-column>

      <el-table-column label="是否可回收" width="120">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.is_recycle" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="removeWaste(scope.$index,scope.row._id)">删除</el-button>
            <el-button size="mini" type="primary" @click="saveWaste(scope.$index)">保存</el-button>
          </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :total="waste.length"></el-pagination>

<el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
   <div style="margin:auto;">
     <el-avatar shape="square" :size="300" fit="contain" :src="currImg"></el-avatar>
   </div>
   <div style="text-align:center">
    <el-upload action="http://192.168.1.105:8002/aliyun-service/upload-image" 
    :auto-upload="false" :on-success="modifySuccess" ref="modify">
      <el-button size="small" type="text">修 改</el-button>
    </el-upload>
   </div>
  <span slot="footer" class="dialog-footer">
    <el-button size="small" type="danger" @click="dialogVisible = false">取 消</el-button>
    <el-button size="small" type="primary" @click="modifySubmit">确 定</el-button>
  </span>
</el-dialog>

<!-- 添加 -->
<el-dialog title="添加废品" :visible.sync="dialogAdd" width="30%">
  <el-form inline class="add" label-width="100px">
    <el-form-item label="废品名称：">
      <el-input size="mini" v-model="newWaste.waste_name" placeholder="请输入内容"></el-input>
    </el-form-item>
    <br>
    <el-form-item label="价格：">
        <el-input size="mini" v-model="newWaste.price" placeholder="请输入内容"></el-input>
    </el-form-item>
    <br>
    <el-form-item label="图片：">
      <el-upload class="upload-demo" action="http://192.168.1.105:8002/aliyun-service/upload-image" 
      :auto-upload="false" :on-success="addSuccess" ref="add">
        <el-button size="small" type="text">点击上传</el-button>
      </el-upload>
    </el-form-item>
    <br>
    <el-form-item label="种类：">
        <el-input size="mini" v-model="newWaste.species" placeholder="请输入内容"></el-input>
    </el-form-item>  
    <br>  
    <el-form-item label="计算方式：">
      <el-select size="small" v-model="newWaste.compute_mode" placeholder="请选择">
        <el-option size="small" label="按重量" value="by_weight"></el-option>
        <el-option size="small" label="按数量" value="by_quantity"></el-option>
        <el-option size="small" label="按物品" value="by_material"></el-option>
      </el-select>
    </el-form-item>
    <br>
    <el-form-item label="是否可回收：">
      <el-col :span="24">
            <el-switch v-model="newWaste.is_recycle" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </el-col>
    </el-form-item>  
    <br>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button size="small" type="danger" @click="dialogAdd = false">取 消</el-button>
    <el-button size="small" type="primary" @click="addSubmit">确 定</el-button>
  </span>
</el-dialog>

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