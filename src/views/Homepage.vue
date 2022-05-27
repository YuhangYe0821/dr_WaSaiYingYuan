<template>
  <div class="main">
    <!-- 走马灯/轮播图 -->
    <div class="carousel">
      <el-carousel indicator-position="outside" height="520px">
        <el-carousel-item v-for="(item, index) in posterList" :key="index">
          <img :src="item.url" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- card循环显示电影 -->
    <h1>正在热映</h1>
    <div class="cards">
      <el-row>
        <el-col
          :span="5"
          v-for="(item, id) in filmsList"
          :key="id"
          :offset="id >= 0 ? 1 : 0"
        >
          <router-link
            :to="'/Detail?fid=' + item.id"
            style="text-decoration: none"
          >
            <el-card :body-style="{ padding: '0px' }">
              <img :src="item.cover" class="image" />
              <div style="padding: 8px">
                <span>{{ item.hot }}人想看</span>
              </div>
            </el-card>
          </router-link>
          <p>{{ item.releaseTime }}上映</p>
        </el-col>
      </el-row>
    </div>
    <!-- 排行榜 -->
    <div class="ranking">
      <h1>热门榜单Top10</h1>
      <!-- 热度排名1-3名的电影-->
      <div class="top1">
        <img :src="topList[0].cover" :alt="topList[0].name" />
        <ul>
          <li>{{ topList[0].name }}</li>
          <li>上映时间:{{ topList[0].releaseTime }}</li>
          <li>热度值:{{ topList[0].hot }}</li>
        </ul>
      </div>
      <div class="top2">
        <img :src="topList[1].cover" alt="" />
        <ul>
          <li>{{ topList[1].name }}</li>
          <li>热度值:{{ topList[1].hot }}</li>
        </ul>
      </div>
      <div class="top3">
        <img :src="topList[2].cover" alt="" />
        <ul>
          <li>{{ topList[2].name }}</li>
          <li>热度值:{{ topList[2].hot }}</li>
        </ul>
      </div>
      <!-- 表格显示热度排名4-10名的电影 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="rank" label="" width="70px"> </el-table-column>
        <el-table-column prop="name" label="" width="235px"> </el-table-column>
        <el-table-column prop="hot" label="" width="60px"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {
  ListAllPoster,
  ListNowFilm,
  ListHots,
  ListTableData,
} from "../api/film";

export default {
  data() {
    return {
      //走马灯/轮播图
      posterList: [],
      status: 1,

      //正在热映电影
      filmsList: [],

      // 热度排名1-3的电影
      topList: [],

      // 热度排名4-10的电影
      tableData: [],
    };
  },
  methods: {
    // 查询轮播图
    postQuery() {
      ListAllPoster().then((res) => {
        if (res.code == 200) {
          this.posterList = res.data;
        }
      });
    },
    // 正在热映
    nowPlaying() {
      ListNowFilm().then((res) => {
        if (res.code == 200) {
          this.filmsList = res.data;
        }
      });
    },
    // 热门榜单Top1-3
    topListQuery() {
      ListHots().then((res) => {
        if (res.code == 200) {
          this.topList = res.data;
        }
      });
    },
    // 热门榜单Top4-10
    tableDataQuery() {
      ListTableData().then((res) => {
        if (res.code == 200) {
          this.tableData = res.data;
        }
      });
    },
  },
  mounted() {
    // 轮播图查询接口
    this.postQuery();
    // 正在热映查询接口
    this.nowPlaying();
    // 热门榜单Top1-3查询接口
    this.topListQuery();
    // 热门榜单Top4-10查询接口
    this.tableDataQuery();
  },
};
</script>

<style scoped lang="scss">
.main {
  .carousel {
    width: 100%;
    margin-top: 20px;
    img {
      height: 100%;
    }
  }
  h1 {
    color: orange;
    margin-left: 130px;
  }
  .cards {
    width: 50%;
    margin-left: 100px;
    margin-bottom: 50px;
    float: left;
    .el-col {
      margin-bottom: 15px;
      .el-card {
        .image {
          width: 100%;
          height: 215px; //不设置高度会导致card位置出错
          display: block;
        }
        div {
          span {
            color: orange;
          }
        }
      }
      p {
        font-size: 14px;
        text-align: center;
        color: #91949c;
      }
    }
  }
  .ranking {
    width: 25%;
    float: right;
    margin-right: 80px;
    h1 {
      color: orange;
      margin-top: -50px;
      margin-left: 0px;
    }
    .top1 {
      height: 215px;
      border: 1px solid rgb(204, 204, 204);
      margin-bottom: 20px;
      border-radius: 5px;
      img {
        float: left;
        width: 155px;
        height: 215px;
      }
      ul {
        list-style: none;

        li:nth-child(1) {
          width: 190px;
          float: left;
          font-size: 18px;
          color: gray;
          margin-top: 40px;
          margin-left: 10px;
          //防溢出，溢出的省略号代替，设宽
          display: -webkit-box !important;
          text-overflow: ellipsis;
          overflow: hidden;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        li:nth-child(2) {
          float: left;
          font-size: 18px;
          color: gray;
          margin-top: 10px;
          margin-left: 10px;
        }
        li:nth-child(3) {
          float: left;
          color: orange;
          margin-top: 20px;
          margin-left: 10px;
        }
      }
    }
    .top2 {
      float: left;
      height: 265px;
      width: 155px;
      border-radius: 5px;
      border: 1px solid rgb(204, 204, 204);
      img {
        float: left;
        width: 155px;
        height: 215px;
      }
      ul {
        list-style: none;
        margin-left: -35px;
        li:nth-child(1) {
          float: left;
          font-size: 18px;
          color: gray;
          //防溢出，溢出的省略号代替，设宽
          width: 150px;
          display: -webkit-box !important;
          text-overflow: ellipsis;
          overflow: hidden;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        li:nth-child(2) {
          float: left;
          color: orange;
        }
      }
    }
    .top3 {
      float: right;
      height: 265px;
      width: 155px;
      border-radius: 5px;
      border: 1px solid rgb(204, 204, 204);
      img {
        width: 155px;
        height: 215px;
      }
      ul {
        list-style: none;
        margin-left: -35px;
        margin-top: -5px;
        li:nth-child(1) {
          float: left;
          font-size: 18px;
          color: gray;
          //防溢出，溢出的省略号代替，设宽
          width: 150px;
          display: -webkit-box !important;
          text-overflow: ellipsis;
          overflow: hidden;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        li:nth-child(2) {
          float: left;
          color: orange;
        }
      }
    }

    // height: 1500px;
    // border: 1px solid black;
  }
}
</style>