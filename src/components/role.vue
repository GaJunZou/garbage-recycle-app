<template>
    <div>
      <div style="float:left;padding-left:20px">
        <h2>用户管理</h2>
        <el-form class="demo-form-inline" inline>
      <el-form-item>
        <el-input size="small" placeholder="请输入内容" @keydown.enter="search" v-model="searchValue" prefix-icon="el-icon-search"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="search">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table ref="multipleTable" :data="searchResult" tooltip-effect="dark" style="height:80%">
      <el-table-column label="用户名" width="120">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="账号" width="150">
        <template slot-scope="scope">
          {{scope.row.phone}}
        </template>
      </el-table-column>
      <el-table-column label="性别" width="90">
        <template slot-scope="scope">
          {{scope.row.gender == 1 ? '男' : '女'}}
        </template>
      </el-table-column>
      <el-table-column label="头像" width="120">
          <template slot-scope="scope">
              <el-avatar shape="square" size="large" :src="scope.row.portrait_url"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column label="角色" width="120">
        <template slot-scope="scope">
          {{scope.row.role == 'user' ? '普通用户' : '回收员'}}
        </template>
      </el-table-column>
      <el-table-column label="冻结账户" width="120">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.frozen" active-color="#13ce66" inactive-color="#aaa"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="saveRole(scope.$index)">保存</el-button>
          </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :total="role.length"></el-pagination>
      </div>
      <div style="float:left;margin-left:20px">
        <h2>系统管理</h2>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="APP管理" name="first">
            <div style="width:800px">
              <div style="width:400px;margin:auto">
              <el-form  class="demo-form-inline">
                <el-form-item label="版本号">
                  <el-input size="small" v-model="system.version.number" placeholder="请填写"></el-input>
                </el-form-item>
                <el-form-item label="作者">
                  <el-input size="small" v-model="system.version.author" placeholder="请填写"></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱">
                  <el-input size="small" v-model="system.version.email" type="email" placeholder="请填写"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                  <el-input size="small" v-model="system.version.phone" type="phone" placeholder="请填写"></el-input>
                </el-form-item>
                <el-form-item label="联系地址">
                  <el-input size="small" v-model="system.version.address" placeholder="请填写"></el-input>
                </el-form-item>
                <el-form-item label="app说明">
                  <el-input size="small" v-model="system.version.introduction" type="textarea" rows="5" placeholder="请填写"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button size="small" type="primary" @click="saveVersion">保存</el-button>
                </el-form-item>
              </el-form>
            </div>
            </div>

          </el-tab-pane>
          <el-tab-pane label="app反馈" name="second">

          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
        activeName: 'second',
        role:'',
        searchResult:"",
        searchValue:"",
        version:{},
        system:{}
        }
    },
    created () {
        this.getRole();
        this.getSystemInfo();
    },
    methods:{
        handleClick(tab, event) {
        console.log(tab, event);
      },
      search(){
        if(this.searchValue ==''){
          this.searchResult = this.role;
        }else{
          this.searchResult = this.searchResult.filter( v => {
            return v.name.includes(this.searchValue) || v.phone.includes(this.searchValue)
          })
        }
      },

      saveVersion(){
        console.log(this.system);
        this.axios.post("http://localhost:3000/system/updateSystemInfo",this.system)
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
      saveRole(index){
          console.log(this.searchResult[index]);
          this.axios.post(this.base+"/account/postUserUpdateData",this.searchResult[index])
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
      getRole(){
        console.log(this.axios.get(this.base + "/account/getAllUser")
        .then(res => {
          this.role=res.data;
          this.searchResult=res.data;
        })
        .catch(err => {
          console.error(err); 
        }));
      },
      getSystemInfo(){
        this.axios.get(this.base + "/system/getSystemInfo")
        .then(res => {
          this.system=res.data[0];
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
</style>