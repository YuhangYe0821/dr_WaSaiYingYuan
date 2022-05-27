<template>
  <div class="register">
    <div class="register_info">
      <div class="register_title">
        <img src="../assets/logo.png" alt="" />
        <div class="logo_text">哇塞电影-注册</div>
      </div>
      <!-- 注册框 -->
      <div class="register_form">
        <!-- 用户名 -->
        <p>Username</p>
        <el-input v-model="username" placeholder="账号"></el-input>
        <!-- 密码 -->
        <p>Password</p>
        <el-input
          v-model="password"
          placeholder="密码"
          show-password
        ></el-input>
        <!-- 确认密码 -->
        <p>Check Password</p>
        <el-input
          v-model="checkPass"
          placeholder="确认密码"
          show-password
        ></el-input>
        <!-- 同意协议 -->
        <el-checkbox v-model="checked" class="checkBox"
          >我已同意“哇塞电影”用户协议</el-checkbox
        >
        <!-- 注册按钮 点击注册并跳转到登录-->
        <div class="btn">
          <el-button
            type="primary"
            class="register-form-button"
            @click="toLogin()"
            >SIGN UP</el-button
          >
        </div>
        <!-- 跳转到登录 -->
        <div class="register_footer">
          <el-link :underline="false" class="rg" href="../"
            >我有账号 去登录
            <i class="el-icon-right"></i>
          </el-link>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { Register } from "../api/user";

export default {
  data() {
    return {
      username: "",
      password: "",
      checkPass: "",
      checked: false,
    };
  },
  methods: {
    toLogin() {
      // 检验用户名
      if (this.username.length < 1) {
        this.$message({
          message: "请输入用户名",
          type: "warning",
        });
        return;
      }
      // 输入密码
      if (this.password.length < 6) {
        this.$message({
          message: "请输入不少于6位的密码",
          type: "warning",
        });
        return;
      }
      // 确认密码
      if (this.password !== this.checkPass) {
        this.$message({
          message: "两次输入的密码不同",
          type: "warning",
        });
        return;
      }
      // 检验用户协议
      if (this.checked == false) {
        this.$message({
          message: "请勾选 我已同意“哇塞电影”用户协议",
          type: "warning",
        });
        return;
      }
      // 接口
      const RegisterData = {
        username: this.username,
        password: this.password,
      };
      Register(RegisterData).then((res) => {
        if (res.code == 200) {
          // console.log(this);
          this.$message({
            message: res.msg,
            type: "success",
          });
          // 跳转页面
          this.$router.push("/Login");
        }
      });
    },
  },
};
</script>


<style scoped lang="scss">
.register {
  width: 100%;
  height: 100%;

  .register_info {
    width: 500px;
    margin: 50px auto;

    .register_title {
      height: 75px;
      img {
        width: 75px;
        height: 75px;
        float: left;
        margin-left: 20px;
      }
      .logo_text {
        float: left;
        line-height: 75px;
        font-size: 30px;
        font-weight: bold;
        margin-left: 50px;
      }
    }

    .register_form {
      line-height: 40px;
      font-size: 20px;
      color: #91949c;
      font-weight: bold;
      .checkBox {
        color: #91949c;
        font-weight: bold;
      }
      .btn {
        margin-top: 20px;
        .register-form-button {
          width: 100%;
          height: 50px;
          font-weight: bold;
          font-size: 20px;
        }
      }

      .register_footer {
        height: 50px;
        line-height: 50px;
        text-align: center;
        .rg {
          font-size: 16px;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
