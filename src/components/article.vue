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
        <div style="width:120px">
          <el-select size="small" @change="onlyShowType" v-model="onlyShow">
            <el-option size="small" label="全部" value="-1"></el-option>
            <el-option size="small" label="环保卫士" value="0"></el-option>
            <el-option size="small" label="生活达人" value="1"></el-option>
            <el-option size="small" label="探索更多" value="2"></el-option>
          </el-select>
        </div>
      </el-form-item>    
      <el-form-item>
        <el-button size="small" type="success" plain @click="addArticle()">添 加 <i class="el-icon-plus"></i></el-button>

        <el-button size="small" type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="multipleTable" :data="searchResult" tooltip-effect="dark" style="height:80%">
      <el-table-column label="类型" width="120">
          <template slot-scope="scope">
            <el-select size="small" v-model="scope.row.type" placeholder="请选择">
              <el-option size="small" label="环保卫士" value="0"></el-option>
              <el-option size="small" label="生活达人" value="1"></el-option>
              <el-option size="small" label="探索更多" value="2"></el-option>
            </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="内容" width="100">
        <template slot-scope="scope">
          <el-button type="text" @click="checkArticle(scope.$index,scope.row._id)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="waste_url" label="图片" width="120">
          <template slot-scope="scope">
            <div class="avatar" @click.stop="showDialog(scope.row.head_img,scope.$index,scope.row._id)">
              <el-avatar shape="square" fit="contain" size="large" :src="scope.row.head_img"></el-avatar>
            </div>
        </template>
      </el-table-column>
      <el-table-column label="时间" width="180">
          <template slot-scope="scope">
            <el-input size="mini" disabled v-model="scope.row.time" placeholder="请输入内容"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="作者" width="120">
          <template slot-scope="scope">
            <el-input size="mini" disabled v-model="scope.row.author" placeholder="请输入内容"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="removeArticle(scope.$index,scope.row._id)">删除</el-button>
            <el-button size="mini" type="primary" @click="saveArticle(scope.$index)">保存</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :total="article.length"></el-pagination>

<!-- 修改 -->
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
<el-dialog title="添加文章" :visible.sync="dialogAdd" width="70%">
  <el-form class="add" label-width="100px">
    <el-form-item label="文章类型：">
      <el-select size="small" v-model="newArticle.type" placeholder="请选择">
        <el-option size="small" label="环保卫士" value="0"></el-option>
        <el-option size="small" label="生活达人" value="1"></el-option>
        <el-option size="small" label="探索更多" value="2"></el-option>
      </el-select>
    </el-form-item>
    <br>
    <el-form-item label="图片：">
      <el-upload class="upload-demo" action="http://192.168.1.105:8002/aliyun-service/upload-image" 
      :auto-upload="false" :on-success="addSuccess" ref="add">
        <el-button size="small" type="text">点击上传</el-button>
      </el-upload>
    </el-form-item>
    <br>
    <el-form-item label="标题：">
      <el-input size="mini" v-model="newArticle.title" placeholder="请输入内容"></el-input>
    </el-form-item>
    <br>
    <el-form-item label="子标题：">
      <el-col :span="24">
        <el-input size="mini" rows="3" type="textarea" v-model="newArticle.subtitle" placeholder="请输入内容"></el-input>
      </el-col>
    </el-form-item>
    <br>
    <el-form-item label="内容：">
      <el-col :span="24">
        <el-input size="mini" rows="10" type="textarea" v-model="newArticle.content" placeholder="请输入内容"></el-input>
      </el-col>
    </el-form-item>
    <br>
    <el-form-item label="时间：">
      {{new Date().format("yyyy-MM-dd hh:mm:ss")}}
    </el-form-item>
    <br>
    <el-form-item label="作者：">
      admin
    </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button size="small" type="danger" @click="dialogVisible = false">取 消</el-button>
    <el-button size="small" type="primary" @click="addSubmit">确 定</el-button>
  </span>
</el-dialog>

<el-drawer size="45%" title="文章内容" :visible.sync="drawer" direction="rtl">
  <div class="form">
    <el-form class="demo-form-inline">
      <el-form-item label="标题">
        <el-input placeholder="请输入内容" v-model="searchResult[index].title"></el-input>
      </el-form-item>
      <el-form-item label="子标题">
        <el-input placeholder="请输入内容" rows="3" type="textarea" v-model="searchResult[index].subtitle"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input placeholder="请输入内容" rows="20" type="textarea" v-model="searchResult[index].content"></el-input>
      </el-form-item>
    </el-form>
        <el-button class="drawer-btn" type="primary" @click="submitContent">提交修改</el-button>
  </div>
</el-drawer>
    </div>
</template>

<script>
export default {
    data(){
        return {
        activeName: 'second',
        article:'',
        newArticle:{},
        searchResult:[],
        searchValue:"",
        dialogVisible:false,
        dialogAdd:false,
        currImg:'',
        drawer:false,
        index:0,
        id:"",
        onlyShow:"全部"
        }
    },
    created () {
        this.getArticle();
        console.log(this.searchResult);
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
      addArticle(){
        this.dialogAdd = true;
      },
      async addSubmit(){
        await this.$refs.add.submit();
        this.dialogAdd = false;
      },
      addSuccess(res){
        this.newArticle.head_img = res.data.url;
        this.newArticle.author = "admin";
        this.newArticle.time = new Date().format("yyyy-MM-dd hh:mm:ss");
        this.axios.post(this.base+"/article/add",this.newArticle)
        .then(res => {
          console.log(res)
          if(res.data){
            this.$notify({ title: '成功', message: '添加成功', type: 'success'});
            this.getArticle();
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
        this.searchResult[this.index].head_img = res.data.url;
        this.axios.post(this.base+"/article/update/"+this.id,{head_img:res.data.url})
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
      
      removeArticle(index,id){
        this.axios.get(this.base+"/article/delete/"+id)
        .then(res => {
          console.log(res)
          if(res.data.success == "true"){no
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
      saveArticle(index){
          console.log(this.searchResult[index]);
          this.axios.post(this.base+"/article/update/"+this.searchResult[index]._id,this.searchResult[index])
          .then(res => {
              console.log(res);
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
      onlyShowType(e){
        this.searchResult = this.article;
        if(e == -1){

        }else{
          this.searchResult = this.searchResult.filter(v=>{
            return v.type == e
          })
        }
      },
      submitContent(){
        this.axios.post(this.base+"/article/update/"+this.id,this.searchResult[this.index])
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
        this.drawer = false
      },
      showDialog(url,index,id){
        this.dialogVisible = true;
        this.currImg = url;
        this.index = index;
        this.id = id;
      },
      checkArticle(index,id){
        this.index = index;
        this.id = id;
        this.drawer = true
      },
      save(){
        this.axios.post(this.base+"/article/batchUpdate",{article:this.article})
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
      getArticle(){
        this.axios.get("http://localhost:3000/article/getAllArticle")
        .then(res => {
          console.log(res);
          this.article=res.data;
          this.searchResult=res.data;
        })
        .catch(err => {
          console.error(err); 
        });
        
      }
    }
}
</script>

<style scoped>
.avatar :hover{
  cursor: pointer;
}

.form{
  padding: 0 10px;
}
.form .drawer-btn{
  margin-bottom: 10px;
}
</style>