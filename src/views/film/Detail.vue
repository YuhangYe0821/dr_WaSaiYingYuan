<template>
  <div class="detail">
    <el-page-header @back="goBack" content="详情页面"> </el-page-header>
    <!-- 简介 -->
    <h1>剧情简介</h1>
    <p class="isIntroduce">{{ filmList.introduction }}</p>
    <!-- 评论 -->
    <h1>电影评论</h1>
    <div class="isComment" v-for="(item, id) in commentList" :key="id">
      <!-- 头像 -->
      <el-avatar :size="80" :src="item.user.avatar"></el-avatar>
      <p class="isName">{{ item.user.nickname }}</p>
      <br />
      <!-- 评分 -->
      <el-rate
        v-model="item.filmEvaluate.star"
        disabled
        show-score
        text-color="#ff9900"
        score-template="{value}"
      >
      </el-rate>
      <p class="isText">{{ item.filmEvaluate.comment }}</p>
      <p class="isTime">Time: {{ item.filmEvaluate.createAt }}</p>
    </div>
  </div>
</template>

<script>
import { FindFilmById, FindFilmComment } from "../../api/film";

export default {
  data() {
    return {
      // 简介
      filmList: [],
      // 电影评论
      commentList: [],
    };
  },
  methods: {
    goBack() {
      history.back();
    },
    //查询电影详情
    queryFimlDetail() {
      FindFilmById().then((res) => {
        if (res.code == 200) {
          this.filmList = res.data;
        }
      });
    },
    //查询电影评论
    queryFimlComment() {
      FindFilmComment().then((res) => {
        if (res.code == 200) {
          this.commentList = res.data;
        }
      });
    },
  },
  mounted() {
    this.queryFimlDetail();
    this.queryFimlComment();
  },
};
</script>

<style scoped lang="scss">
.detail {
  margin-top: 80px;
  margin: 100px auto;
  width: 80%;
  h1 {
    margin-top: 40px;
  }
  .isIntroduce {
    margin-top: 50px;
    margin-bottom: 50px;
    text-indent: 50px;
  }
  .isComment {
    margin-top: 40px;
    .isName {
      margin-left: 80px;
      margin-top: -80px;
      color: gray;
    }
    .el-rate {
      margin-left: 80px;
      margin-top: -25px;
    }
    .isText {
      color: gray;
      margin-left: 80px;
    }
    .isTime {
      color: rgb(204, 204, 204);
      margin-left: 880px;
    }
  }
  // border: 1px solid black;
}
</style>