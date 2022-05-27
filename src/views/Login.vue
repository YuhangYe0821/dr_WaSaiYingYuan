<template>
  <div class="login">
    <div class="login_info">
      <div class="login_title">
        <img src="../assets/logo.png" alt="" />
        <div class="logo_text">哇塞电影-登录</div>
      </div>
      <!-- 登录框 -->
      <div class="login_form">
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
        <!-- 忘记密码 -->
        <div class="forget">
          <el-tooltip content="请联系管理员" placement="right" effect="dark">
            <el-link class="login_link" :underline="false">忘记密码?</el-link>
          </el-tooltip>
        </div>
        <!-- 登录按钮 -->
        <div class="btn">
          <el-button
            type="primary"
            class="login-form-button"
            @click="toHomepage()"
            >SIGN IN</el-button
          >
        </div>
        <!-- 注册 -->
        <div class="login_footer">
          <el-link :underline="false" class="rg" href="Register"
            >还没注册账号?去注册
            <i class="el-icon-right"></i>
          </el-link>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { Login } from "../api/user";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    toHomepage() {
      // 用户名
      if (this.username.length < 1) {
        this.$message({
          message: "请输入用户名",
          type: "warning",
        });
        return;
      }
      // 输入密码
      if (this.password.length < 1) {
        this.$message({
          message: "请输入密码",
          type: "warning",
        });
        return;
      }
      // 登录接口
      const LoginData = {
        username: this.username,
        password: this.password,
      };
      Login(LoginData).then((res) => {
        // console.log(res);
        if (res.code == 200) {
          // 存储本地数据
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("uid", res.data.user.id);
          this.$message({
            message: res.msg,
            type: "success",
          });
          // 跳转页面
          this.$router.push("/Homepage");
        } else if (res.code == 400) {
          this.$message({
            message: res.msg,
            type: "warning",
          });
        }
      });

      // this.$axios
      //   .post(this.$store.state.url + "/api/user/login", LoginData) //post请求
      //   .then((res) => {
      //     if (res.data.code == 200) {
      //       this.$message({
      //         message: "登陆成功",
      //         type: "success",
      //       });
      //       // 存储本地数据
      //       localStorage.setItem("token", res.data.data.token);
      //       localStorage.setItem("userid", res.data.data.user.id);
      //       // 跳转页面
      //       this.$router.push("/Homepage");
      //       // 或 window.location.href = "Homepage";
      //     }
      //   });
    },
  },
};
</script>


<style scoped lang="scss">
.login {
  width: 100%;
  height: 100%;

  .login_info {
    width: 500px;
    margin: 50px auto;

    .login_title {
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

    .login_form {
      line-height: 40px;
      font-size: 20px;
      color: #91949c;
      font-weight: bold;
    }

    .forget {
      float: right;
      .login_link {
        font-size: 20px;
        color: #91949c;
        font-weight: bold;
        line-height: 80px;
      }
    }

    .login-form-button {
      width: 100%;
      height: 50px;
      font-weight: bold;
      font-size: 20px;
    }

    .login_footer {
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
</style>
