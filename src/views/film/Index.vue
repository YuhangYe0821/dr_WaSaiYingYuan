<template>
  <div class="main">
    <!-- 简介 -->
    <div class="introduction">
      <!-- 电影图片 -->
      <div class="isImg">
        <img :src="filmList.cover" alt="" />
      </div>
      <!-- 简介 -->
      <div class="isText">
        <h1>{{ filmList.name }}</h1>
        <el-rate
          v-model="filmList.star"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value}"
        >
        </el-rate>
        <p>电影类型：{{ filmList.type }}</p>
        <p>{{ filmList.region }} / {{ filmList.duration }}分钟</p>
        <p>上映日期：{{ filmList.releaseTime }}上映</p>
        <router-link :to="'/Ticket?fid=' + filmId" style="text-decoration: none"
          ><el-button type="danger" @click="toTicket()"
            >特惠购票</el-button
          ></router-link
        >
        <el-button type="danger" @click="open()">评分</el-button>
      </div>
    </div>
    <!-- 评分窗口 -->
    <div class="overlay" v-show="isShow" @click.self="isShow = false">
      <div class="center">
        <p>电影评分</p>
        <!-- 关闭 -->
        <el-button
          type="danger"
          class="el-icon-close"
          circle
          @click="isShow = false"
        ></el-button>
        <el-rate v-model="form.star" :colors="colors"> </el-rate>
        <!-- 输入 -->
        <div class="content">
          <div class="isInput">
            <el-input
              type="textarea"
              :autosize="{ minRows: 8, maxRows: 10 }"
              v-model="form.comment"
              placeholder="请输入内容"
              resize="none"
            ></el-input>
          </div>
        </div>
        <div class="choice">
          <el-button @click="isShow = false">取消</el-button>
          <el-button @click="(isShow = false), submitComment()" type="primary"
            >提交</el-button
          >
        </div>
      </div>
    </div>
    <div><router-view /></div>
  </div>
</template>

<script>
import { FindFilmById, AddFilmEvaluate } from "../../api/film";

export default {
  data() {
    return {
      isShow: false,
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"], // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
      // 电影
      filmList: [],
      filmId: this.$route.query.fid,
      form: {
        fid: "",
        uid: "",
        star: 0,
        comment: "",
      },
    };
  },
  methods: {
    open() {
      if (!localStorage.getItem("uid")) {
        this.$confirm("您还没有登录, 是否去登录?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$router.push("/Login");
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消",
            });
          });
      } else {
        this.isShow = true;
      }
    },
    toTicket() {
      if (!localStorage.getItem("uid")) {
        this.$confirm("您还没有登录, 是否去登录?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$router.push("/Login");
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消",
            });
          });
      }
    },
    //查询电影详情
    queryFimlDetail() {
      FindFilmById().then((res) => {
        if (res.code == 200) {
          this.filmList = res.data;
        }
      });
    },
    //评分
    submitComment() {
      this.form.fid = this.filmId;
      this.form.uid = localStorage.getItem("uid");
      const form = this.form;

      //评分接口
      AddFilmEvaluate(form).then((res) => {
        // this.$message({
        //   message: "评分成功",
        //   type: "success",
        // });
        this.isShow = false;
      });
    },
  },
  mounted() {
    this.queryFimlDetail();
    this.submitComment();
  },
  components: {},
};
</script>

<style scoped lang="scss">
.main {
  margin-top: 40px;
  width: 100%;
  .introduction {
    width: 100%;
    height: 350px;
    margin: 0 auto;
    background-color: rgb(0, 162, 255);
    border-radius: 8px;
    .isImg {
      float: left;
      margin-left: 10%;
      margin-top: 5%;
      img {
        height: 325px;
        border: 4px solid rgb(204, 204, 204);
        border-radius: 8px;
      }
    }
    .isText {
      float: left;
      margin-left: 5%;
      margin-top: 5%;
      color: white;
      h1 {
        display: inline-block;
      }
      .el-rate {
        display: inline-block;
        margin-left: 100px;
      }
      .el-button {
        margin-right: 10px;
        width: 120px;
      }
    }
  }
  .overlay {
    background: rgba(0, 0, 0, 0.6);
    width: 100%;
    margin: auto;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    .center {
      background-color: white;
      border-radius: 5px; /*圆角*/
      padding-top: 15px;
      padding-left: 30px;
      padding-bottom: 15px;
      width: 600px;
      height: 350px;
      position: fixed;
      margin: auto;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      p {
        font-size: 20px;
        font-weight: bold;
        display: inline-block;
      }
      .el-icon-close {
        margin-left: 75%;
      }
      .el-rate {
        margin-bottom: 20px;
      }
      .content {
        .isInput {
          width: 95%;
        }
      }
      .choice {
        float: right;
        margin-right: 5%;
        margin-top: 20px;
      }
    }
  }
}
</style>