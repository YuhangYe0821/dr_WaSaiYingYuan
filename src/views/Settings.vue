<template>
  <div class="main">
    <div class="isbody">
      <!-- 侧边导航菜单 -->
      <div class="isleft">
        <el-row class="tac">
          <br />
          <p>个人中心</p>
          <el-col>
            <el-menu
              default-active="3"
              class="el-menu-vertical-demo"
              style="border-right: none"
            >
              <el-menu-item index="1" @click="toShoppingCart">
                <i class="el-icon-shopping-cart-2" style="font-size: 24px"></i>
                <span>购物车</span>
              </el-menu-item>
              <el-menu-item index="2" @click="toOrders">
                <i class="el-icon-s-order" style="font-size: 24px"></i>
                <span>我的订单</span>
              </el-menu-item>
              <el-menu-item index="3" @click="toSettings">
                <i class="el-icon-user-solid" style="font-size: 24px"></i>
                <span>个人设置</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </div>
      <div class="isright">
        <br />
        <p>&emsp;&emsp;个人设置</p>
        <!-- 表单 -->
        <el-form
          label-position="top"
          label-width="100px"
          :model="userList"
          class="isList"
        >
          <el-form-item label="昵称">
            <el-input v-model="userList.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="userList.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="userList.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="出生年月">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="请选择日期"
                v-model="userList.birthday"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="userList.email"></el-input>
          </el-form-item>
          <el-form-item label="个人简介">
            <el-input type="textarea" v-model="userList.biography"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="update" plain
              >更新基本信息</el-button
            >
          </el-form-item>
        </el-form>
        <!-- 头像 -->
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <!-- :before-upload="beforeAvatarUpload" -->
          <!-- 
              action 上传地址,show-file-list	是否显示已上传文件列表,on-success	文件上传成功时的钩子,
              before-upload	上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
               -->
          <img
            v-if="userList.avatarUrl"
            :src="userList.avatarUrl"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userList: {
        username: "华强",
        password: "123",
        sex: "男",
        birthday: "2022-3-27",
        email: "123456789@qq.com",
        biography: "无",
        avatarUrl: require("../assets/biaoqing/21.png"),
      },
    };
  },
  methods: {
    toShoppingCart() {
      window.location.href = "/ShoppingCart";
    },
    toOrders() {
      window.location.href = "/Orders";
    },
    toSettings() {
      window.location.href = "/Settings";
    },
    update() {
      const h = this.$createElement;

      this.$notify({
        title: "个人信息",
        message: h("i", { style: "color: teal" }, "更新失败"),
      });
    },
    handleAvatarSuccess(res, file) {
      this.userList.avatarUrl = URL.createObjectURL(file.raw);
    },
    // beforeAvatarUpload(file) {
    //   const isJPG = file.type === "image/jpeg";
    //   const isLt2M = file.size / 1024 / 1024 < 2;

    //   if (!isJPG) {
    //     this.$message.error("上传头像图片只能是 JPG 格式!");
    //   }
    //   if (!isLt2M) {
    //     this.$message.error("上传头像图片大小不能超过 2MB!");
    //   }
    //   return isJPG && isLt2M;
    // },
  },
};
</script>

<style scoped lang="scss">
.main {
  margin-top: 40px;
  width: 100%;
  .isbody {
    width: 80%;
    margin: 0 auto;
    float: left;
    margin-left: 10%;
    .isleft {
      width: 20%;
      text-align: center;
      float: left;
      .tac {
        p {
          font-size: 24px;
        }
      }
    }
    .isright {
      float: left;
      border-left: 2px solid rgb(204, 204, 204);
      p {
        font-size: 24px;
      }
      .isList {
        margin-left: 48px;
        .el-form-item {
          .el-input {
            width: 300px;
          }
        }
      }

      .avatar-uploader {
        width: 178px;
        border: 2px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: absolute;
        overflow: hidden;
        margin-left: 600px;
        margin-top: -700px;
        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 178px;
          height: 178px;
          line-height: 178px;
          text-align: center;
        }
        .avatar {
          width: 178px;
          height: 178px;
          display: block;
        }
      }
      .avatar-uploader:hover {
        border-color: #409eff;
      }
    }

    border-radius: 10px;
    border: 2px solid rgb(204, 204, 204);
  }
}
</style>