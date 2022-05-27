<template>
  <div class="main">
    <!-- 侧边导航菜单 -->
    <div class="isLeft">
      <el-row class="tac">
        <br />
        <img src="../../assets/logo.png" alt="" />
        <p>哇塞影院-客服</p>
        <el-col>
          <el-menu
            class="el-menu-vertical-demo"
            background-color="#454c52"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-menu-item @click="toComments">
              <i class="el-icon-s-promotion"></i>
              <span>影院留言</span>
            </el-menu-item>
            <el-menu-item @click="toEvents">
              <i class="el-icon-s-flag"></i>
              <span>活动安排</span>
            </el-menu-item>
            <el-menu-item @click="toOrders">
              <i class="el-icon-s-data"></i>
              <span>信息统计</span>
            </el-menu-item>
            <el-menu-item @click="toAssess">
              <i class="el-icon-s-comment"></i>
              <span>我的评价</span>
            </el-menu-item>
            <el-menu-item @click="toSettings">
              <i class="el-icon-s-tools"></i>
              <span>个人设置</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <div class="isRight">
      <!-- 顶部user -->
      <div class="top">
        <div class="user">
          <el-avatar :size="40" :src="avatarUrl"></el-avatar>
          <el-dropdown>
            <span class="username">{{ this.username }}</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item divided>
                <el-link href="" :underline="false"
                  ><i
                    class="el-icon-s-tools"
                    style="font-size: 15px; padding-right: 3px"
                  ></i
                  >个人设置</el-link
                ></el-dropdown-item
              >
              <el-dropdown-item divided>
                <el-link
                  href="/Login_worker"
                  :underline="false"
                  style="padding-right: 7px"
                  ><i
                    class="el-icon-switch-button"
                    style="font-size: 15px; padding-right: 3px"
                  ></i
                  >退出登录</el-link
                ></el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <!-- 子路由 -->
      <div class="isRouter">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "华强",
      avatarUrl: require("../../assets/biaoqing/21.png"),
      isShow: false,
    };
  },
  methods: {
    // 影院留言
    toComments() {
      window.location.href = "/Comments_worker";
    },
    // 活动安排
    toEvents() {
      window.location.href = "/Events_worker";
    },
    // 信息统计(订单)
    toOrders() {
      window.location.href = "/Orders_worker";
    },
    // 我的评价
    toAssess() {
      window.location.href = "/Assess_worker";
    },
    // 个人设置
    toSettings() {
      window.location.href = "/Settings_worker";
    },
  },
};
</script>

<style scoped lang="scss">
.main {
  width: 90%;
  height: 745px;
  margin: 0 auto;
  margin-top: -8px;
  .isLeft {
    width: 20%;
    height: 745px;
    float: left;
    text-align: center;
    background-color: #454c52;
    .tac {
      img {
        width: 40px;
        height: 40px;
        float: left;
        margin-left: 20px;
        margin-top: 20px;
      }
      p {
        display: inline-block;
        font-size: 24px;
        color: white;
      }
      span {
        font-weight: bold;
        font-size: 18px;
      }
      .el-col {
        .el-menu-vertical-demo {
          border-right: none;
        }
      }
    }
  }
  .isRight {
    width: 80%;
    height: 745px;
    float: left;
    background: rgb(204, 204, 204);
    .top {
      width: 100%;
      height: 60px;
      background: rgb(238, 238, 238);
      .user {
        float: right;
        margin-top: 10px;
        margin-right: 120px;
        .username {
          font-size: 18px;
          float: left;
          margin-bottom: 8px;
        }
      }
    }
    .isRouter {
      margin-left: 2%;
      margin-top: 15px;
      width: 96%;
      background: white;
      height: 655px;
    }
  }
}
</style>