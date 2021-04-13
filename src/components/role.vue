<template>
  <div>
    <div style="float: left; margin-left: 20px">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first">
          <div style="float: left; padding-left: 20px">
            <h2>用户管理</h2>
            <el-form class="demo-form-inline" inline>
              <el-form-item>
                <el-input
                  size="small"
                  placeholder="请输入内容"
                  @keydown.enter="search"
                  v-model="searchValue"
                  prefix-icon="el-icon-search"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="small" @click="search">查询</el-button>
              </el-form-item>
            </el-form>
            <el-table
              ref="multipleTable"
              :data="searchResult"
              tooltip-effect="dark"
              style="height: 80%"
            >
              <el-table-column label="用户名" width="120">
                <template slot-scope="scope">
                  {{ scope.row.name }}
                </template>
              </el-table-column>
              <el-table-column label="账号" width="150">
                <template slot-scope="scope">
                  {{ scope.row.phone }}
                </template>
              </el-table-column>
              <el-table-column label="性别" width="90">
                <template slot-scope="scope">
                  {{ scope.row.gender == 1 ? "男" : "女" }}
                </template>
              </el-table-column>
              <el-table-column label="头像" width="120">
                <template slot-scope="scope">
                  <el-avatar
                    shape="square"
                    size="large"
                    :src="scope.row.portrait_url"
                  ></el-avatar>
                </template>
              </el-table-column>
              <el-table-column label="角色" width="120">
                <template slot-scope="scope">
                  {{ scope.row.role == "user" ? "普通用户" : "回收员" }}
                </template>
              </el-table-column>
              <el-table-column label="冻结账户" width="120">
                <template slot-scope="scope">
                  <el-switch
                    v-model="scope.row.frozen"
                    active-color="#13ce66"
                    inactive-color="#aaa"
                  ></el-switch>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="primary"
                    @click="saveRole(scope.$index)"
                    >保存</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              layout="prev, pager, next"
              :total="role.length"
            ></el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="APP信息" name="second">
          <div style="width: 800px">
            <div style="width: 500px; margin:auto">
              <el-form label-width="100px">
                <el-form-item label="版本号">
                  <el-input
                    size="small"
                    v-model="system.version.number"
                    placeholder="请填写"
                  ></el-input>
                </el-form-item>
                <el-form-item label="作者">
                  <el-input
                    size="small"
                    v-model="system.version.author"
                    placeholder="请填写"
                  ></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱">
                  <el-input
                    size="small"
                    v-model="system.version.email"
                    type="email"
                    placeholder="请填写"
                  ></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                  <el-input
                    size="small"
                    v-model="system.version.phone"
                    type="phone"
                    placeholder="请填写"
                  ></el-input>
                </el-form-item>
                <el-form-item label="联系地址">
                  <el-input
                    size="small"
                    v-model="system.version.address"
                    placeholder="请填写"
                  ></el-input>
                </el-form-item>
                <el-form-item label="app说明">
                  <el-input
                    size="small"
                    v-model="system.version.introduction"
                    type="textarea"
                    rows="8"
                    placeholder="请填写"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button size="small" type="primary" @click="saveVersion"
                    >保存</el-button
                  >
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="使用幫助" name="third">
            <el-button size="small" @click="addHelp" type="success">添加</el-button>
            <el-table
              ref="multipleTable"
              :data="system.help"
              tooltip-effect="dark"
              style="height: 80%"
            >
              <el-table-column label="問" width="300">
                <template slot-scope="scope">
                  <el-input
                    type="textarea"
                    size="small"
                    v-model="scope.row[0]"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column label="答" width="300">
                <template slot-scope="scope">
                  <el-input
                    type="textarea"
                    size="small"
                    v-model="scope.row[1]"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                  <el-button size="mini" type="primary" @click="saveHelp()">保存</el-button>
                  <el-button size="mini" type="danger" @click="removeHelp(scope.$index)">刪除</el-button>
                </template>
              </el-table-column>
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="用戶反饋" name="fourth">
            <el-button size="small" @click="addFeedback" type="success">添加</el-button>
            <el-table
              ref="multipleTable"
              :data="system.feedback"
              tooltip-effect="dark"
              style="height: 80%"
            >
              <el-table-column label="用戶反饋" width="300">
                <template slot-scope="scope">
                  <el-input
                    type="textarea"
                    size="small"
                    v-model="scope.row[0]"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column label="系統回答" width="300">
                <template slot-scope="scope">
                  <el-input
                    type="textarea"
                    size="small"
                    v-model="scope.row[1]"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                  <el-button size="mini" type="primary" @click="saveFeedback()">保存</el-button>
                  <el-button size="mini" type="danger" @click="removeFeedback(scope.$index)">刪除</el-button>
                </template>
              </el-table-column>
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="輪播圖資源" name="fifth">
          <div style="width:700px;padding:50px">
            <el-carousel :autoplay="false" trigger="click" height="400px" @change="changeSwiper">
              <el-carousel-item v-for="item in system.swiper_img" :key="item">
                <el-image :src="item" fit="cover"></el-image>
              </el-carousel-item>
              <p v-if="system.swiper_img.length == 0" class="no-img">暂无图片，快去添加吧~</p>
            </el-carousel>
            <div style="width:100%;margin:20px auto;text-align:center">
              <el-button size="small" @click="removeImg" type="danger">刪除這張圖片</el-button>
              <el-upload style="margin-left:20px;display:inline-block"
              :show-file-list="false"
              :on-success="addImg"
              action="http://192.168.1.105:8002/aliyun-service/upload-image">
                <el-button size="small" type="primary">添加一張圖片</el-button>
              </el-upload>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
      role: "",
      searchResult: "",
      searchValue: "",
      system: {},
      index:0
    };
  },
  created() {
    this.getRole();
    this.getSystemInfo();
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    search() {
      if (this.searchValue == "") {
        this.searchResult = this.role;
      } else {
        this.searchResult = this.searchResult.filter((v) => {
          return (
            v.name.includes(this.searchValue) ||
            v.phone.includes(this.searchValue)
          );
        });
      }
    },
    changeSwiper(curIndex,nextIndex){
      this.index = curIndex
    },
    removeImg(){
      console.log(this.index);
    },
    addHelp(){
      this.system.help.push([[]]);
    },
    saveHelp(){
      this.saveVersion();
    },
    removeHelp(index){
      this.system.help.splice(index,1);
      this.saveVersion();
    },

    addFeedback(){
      this.system.feedback.push([[]]);
    },
    saveFeedback(){
      this.saveVersion();
    },
    removeFeedback(index){
      this.system.feedback.splice(index,1);
      this.saveVersion();
    },

    removeImg(){
      console.log(this.index);
      this.system.swiper_img.splice(this.index,1);
    },
    addImg(res){
      if(res.success){
        this.system.swiper_img.push(res.data.url);
        this.saveVersion();
      }else{
        this.$notify({ title: "失败", message: "上传失败", type: "error" });
      }
    },

    saveVersion() {
      console.log(this.system);
      this.axios
        .post("http://localhost:3000/system/updateSystemInfo", this.system)
        .then((res) => {
          console.log(res);
          if (res.data) {
            this.$notify({
              title: "成功",
              message: "保存成功",
              type: "success",
            });
          } else {
            this.$notify({ title: "失败", message: "保存失败", type: "error" });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    saveRole(index) {
      console.log(this.searchResult[index]);
      this.axios
        .post(
          this.base + "/account/postUserUpdateData",
          this.searchResult[index]
        )
        .then((res) => {
          console.log(res);
          if (res.data.data) {
            this.$notify({
              title: "成功",
              message: "保存成功",
              type: "success",
            });
          } else {
            this.$notify({ title: "失败", message: "保存失败", type: "error" });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getRole() {
      console.log(
        this.axios
          .get(this.base + "/account/getAllUser")
          .then((res) => {
            this.role = res.data;
            this.searchResult = res.data;
          })
          .catch((err) => {
            console.error(err);
          })
      );
    },
    getSystemInfo() {
      this.axios
        .get(this.base + "/system/getSystemInfo")
        .then((res) => {
          this.system = res.data[0];
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>

<style scoped>
.avatar :hover {
  cursor: pointer;
}
.no-img{
  width:100%;
  height:400px;
  background-color:#bbb;
  text-align:center;
  line-height:400px;
  margin:0;
  font-size:30px
}
</style>