<template>
  <div class="login">
    <div class="login_info">
      <div class="login_title">
        <img src="../assets/logo.png" alt="" />
        <div class="logo_text">哇塞电影-后台管理</div>
      </div>

      <div class="login_form">
        <p>Username</p>
        <el-input v-model="username" placeholder="账号"></el-input>
        <p>Password</p>
        <el-input
          v-model="password"
          placeholder="密码"
          show-password
        ></el-input>

        <div class="forget">
          <el-tooltip content="请联系管理员" placement="right" effect="dark">
            <el-link class="login_link" :underline="false">忘记密码?</el-link>
          </el-tooltip>
        </div>

        <div class="btn">
          <el-button
            type="primary"
            class="login-form-button"
            @click="toWorker()"
            >SIGN IN</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    toWorker() {
      window.location.href = "Comments_worker";
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
  }
}
</style>
