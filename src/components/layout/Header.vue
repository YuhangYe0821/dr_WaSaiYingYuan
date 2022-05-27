<template>
  <div class="homepage_header">
    <img src="../../assets/logo.png" alt="" />
    <span class="logo_text">哇塞影院</span>
    <!-- 跳转页面 -->
    <el-link :underline="false" href="/Homepage" class="to">首页</el-link>
    <el-link :underline="false" href="/Films" class="to">电影</el-link>
    <el-link :underline="false" href="/Activity" class="to">活动</el-link>
    <el-link :underline="false" href="/Comments" class="to">留言</el-link>
    <!-- 搜索框 -->
    <div class="header-search">
      <el-autocomplete
        v-model="state"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入电影名"
        @select="handleSelect"
      />
    </div>
    <!-- 用户 -->
    <el-link
      v-if="isLogin == false"
      href="/Login"
      :underline="false"
      style="
        float: right;
        padding-right: 120px;
        padding-top: 25px;
        font-size: 20px;
      "
      >登录</el-link
    >
    <div class="user" v-if="isLogin == true">
      <el-avatar :size="40" :src="user.avatar"></el-avatar>
      <el-dropdown>
        <span class="username">{{ user.nickname }}</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            ><el-link
              href="/ShoppingCart"
              :underline="false"
              style="padding-right: 7px"
              ><i
                class="el-icon-shopping-cart-2"
                style="font-size: 15px; padding-right: 3px"
              ></i
              >购物车</el-link
            ></el-dropdown-item
          >
          <el-dropdown-item divided
            ><el-link
              href="/Orders"
              :underline="false"
              style="padding-right: 7px"
              ><i
                class="el-icon-s-order"
                style="font-size: 15px; padding-right: 3px"
              ></i
              >我的订单</el-link
            ></el-dropdown-item
          >
          <el-dropdown-item divided>
            <el-link
              href="/Settings"
              :underline="false"
              style="padding-right: 7px"
              ><i
                class="el-icon-user-solid"
                style="font-size: 15px; padding-right: 3px"
              ></i
              >个人设置</el-link
            ></el-dropdown-item
          >
          <el-dropdown-item divided>
            <el-link
              @click="handleLogout"
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
    <p></p>
  </div>
</template>

<script>
import { UserInfo } from "@/api/user";
import { SearchFilm } from "../../api/user";

export default {
  data() {
    return {
      isLogin: false,
      searchList: [],
      state: "",
      timeout: null,
      user: {},
    };
  },
  methods: {
    // 用户接口
    queryUser() {
      if (localStorage.getItem("uid") !== null) {
        UserInfo().then((res) => {
          console.log(res);
          this.isLogin = true;
          this.user = res.data;
        });
      }
    },
    handleLogout() {
      localStorage.clear();
      this.$router.push("/login");
    },
    // 远程搜索，从服务端搜索数据
    // loadAll() {
    //   return [
    //     { value: "狮子王" },
    //     { value: "受益人" },
    //     { value: "小小的愿望" },
    //     { value: "刺杀小说家" },
    //     { value: "人潮汹涌" },
    //     { value: "21座桥" },
    //     { value: "波斯语课" },
    //     { value: "我的姐姐" },
    //     { value: "日不落酒店" },
    //     { value: "哥斯拉大战金刚" },
    //   ];
    // },
    // 头部模糊查询
    querySearchAsync(queryString, cb) {
      if (queryString) {
        SearchFilm().then((res) => {
          setTimeout(() => {
            this.searchList = res.data;
            cb(this.loadSearchList());
          }, 500);
        });
      }
    },
    loadSearchList() {
      let arr = new Array(0);
      for (let i = 0; i < this.searchList.length; i++) {
        arr.push({
          id: this.searchList[i].id,
          value: this.searchList[i].name,
        });
      }
      return arr;
    },
    // querySearchAsync(queryString, cb) {
    //   var films = this.films;
    //   var results = queryString
    //     ? films.filter(this.createStateFilter(queryString))
    //     : films;

    //   clearTimeout(this.timeout);
    //   this.timeout = setTimeout(() => {
    //     cb(results);
    //   }, 500 * Math.random());
    // },
    // createStateFilter(queryString) {
    //   return (state) => {
    //     return (
    //       state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    //     );
    //   };
    // },
    handleSelect(item) {
      console.log(item);
      // this.$router.push("/Index");
      // this.$router.push("/film/datail?fid=" + item.id);
    },
  },
  mounted() {
    // console.log(localStorage.getItem("uid"));
    this.queryUser();
    // this.films = this.loadAll();
  },
};
</script>

<style scoped lang="scss">
.homepage_header {
  width: 100%;
  height: 100%;
  img {
    width: 65px;
    height: 65px;
    float: left;
    margin-left: 120px;
  }
  .logo_text {
    float: left;
    font-size: 32px;
    font-weight: bold;
    line-height: 64px;
  }
  .to {
    font-size: 20px;
    margin-left: 40px;
  }
  .header-search {
    display: inline-block;
    width: 15%;
    margin-left: 40px;
    margin-top: 15px;
  }
  .user {
    float: right;
    margin-top: 20px;
    margin-right: 120px;
    .username {
      font-size: 18px;
      float: left;
      margin-bottom: 8px;
    }
  }
}
p {
  width: 103.7%;
  height: 15px;
  margin-left: -29px;
  box-shadow: 2px 12px 0 rgb(0 0 0/5%);
}
</style>