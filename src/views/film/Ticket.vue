<template>
  <div class="ticket">
    <el-page-header @back="goBack" content="特惠购票"> </el-page-header>
    <!-- 判断有无排片 -->
    <div v-if="ticketList.length == 0" class="isSorry">
      Sorry,此电影尚未开放购票
    </div>
    <!-- 循环显示排片 -->
    <div v-else class="isBuy" v-for="(item, id) in ticketList" :key="id">
      <img :src="filmList.cover" alt="" class="isImg" />
      <div class="isLeft">
        <p class="isName">{{ item.name }}</p>
        <p class="isTime">{{ item.startTime }}</p>
        <el-tag>{{ item.type }}</el-tag>
      </div>
      <div class="isRight">
        <router-link :to="'/Buy?id=' + item.id"
          ><el-button type="danger" round>选座购票</el-button></router-link
        >
        <p class="isPrice">¥{{ item.price }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { FindFilmTicketById } from "../../api/film";

export default {
  data() {
    return {
      // 排片
      ticketList: [],
      // 电影
      filmList: [],
    };
  },
  methods: {
    goBack() {
      history.back();
    },
    // 查看电影排片
    queryFilmTicket() {
      FindFilmTicketById().then((res) => {
        this.ticketList = res.data.arrangements;
        this.filmList = res.data.film;
      });
    },
  },
  mounted() {
    this.queryFilmTicket();
  },
};
</script>

<style scoped lang="scss">
.ticket {
  margin-top: 80px;
  margin: 100px auto;
  width: 80%;
  .isSorry {
    margin-top: 50px;
    font-size: 20px;
    color: red;
  }
  .isBuy {
    margin-top: 50px;
    .isImg {
      width: 100px;
    }
    .isLeft {
      margin-left: 130px;
      margin-top: -150px;
      .isname {
        font-size: 17px;
      }
      .isTime {
        font-size: 14px;
        color: gray;
      }
    }
    .isRight {
      .isPrice {
        float: right;
        font-size: 20px;
        color: red;
        margin-right: 220px;
        margin-top: -58px;
      }
      .el-button {
        float: right;
        margin-right: 50px;
        margin-top: -63px;
      }
    }
  }

  //   border: 1px solid black;
}
</style>