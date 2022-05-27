<template>
  <div class="main">
    <!-- Timeline 时间线 -->
    <el-steps :active="2" align-center>
      <el-step title="步骤1" description="选择电影场次"></el-step>
      <el-step title="步骤2" description="选择座位号"></el-step>
      <el-step title="步骤3" description="加入购物车"></el-step>
      <el-step title="步骤4" description="结算付款"></el-step>
    </el-steps>
    <div class="isBuy">
      <div class="isLeft">
        <!-- 电影信息 -->
        <div class="isFilm">
          <img :src="filmList.cover" alt="" class="isImg" />
          <div class="isInfo">
            <p class="isName">{{ filmList.name }}</p>
            <p>类型：{{ filmList.type }}</p>
            <p>地区：{{ filmList.region }}</p>
            <p>时长：{{ filmList.duration }}分钟</p>
          </div>
        </div>
        <!-- 本场次信息 -->
        <div class="isTicket">
          <p>放映：{{ ticketList.type }}</p>
          <p class="isStartTime">
            开场：{{ ticketList.date }}&emsp;{{ ticketList.startTime }}
          </p>
          <p>散场：{{ ticketList.date }}&emsp;{{ ticketList.endTime }}</p>
          <p>票价：¥{{ ticketList.price }}/张</p>
        </div>
        <el-divider></el-divider>
        <!-- 选座情况+总计 -->
        <div class="isChoose">
          已选座位：
          <el-tag
            v-for="(item, id) in userSelectSeats"
            :key="id"
            type="danger"
            style="margin-right: 5px"
            effect="plain"
          >
            {{ item }}号</el-tag
          >
          <p class="isTotal">
            总计：<span>¥{{ total }}</span>
          </p>
        </div>
        <el-divider></el-divider>
        <!-- 加入购物车 -->
        <div class="isAdd">
          <el-input v-model="input" placeholder="请输入手机号码"></el-input>
          <el-button type="danger" round @click="submitSeats()"
            >加入购物车</el-button
          >
        </div>
      </div>
      <!-- 选座 -->
      <div class="isRight">
        <div class="isImg">
          <img src="../assets/img/seat3.png" alt="" /><span>可选座位</span>
          <img src="../assets/img/seat1.png" alt="" /><span>已售座位</span>
          <img src="../assets/img/seat2.png" alt="" /><span>已选座位</span>
        </div>
        <br />
        <div class="isScreen"></div>
        <p>银幕中央</p>
        <div class="screen-line"></div>
        <div class="isSeats">
          <div style="margin: 0 auto; width: 480px; height: 200px">
            <span v-for="(item, index) in seats" :key="index">
              <!-- 不可选 -->
              <span v-if="item.status === 0" class="seat sold item"></span>
              <!-- 可选 -->
              <span
                v-if="item.status === 1"
                class="seat selectable item"
                @click="handleSelect(index)"
              ></span>
              <!-- 已选 -->
              <span
                v-if="item.status === 2"
                class="seat selected item"
                @click="handleDisSelect(index)"
              ></span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FindArrangementById, FindArrangementSeats } from "../api/film";

export default {
  data() {
    return {
      input: "",
      total: 0,
      // 本场次信息
      ticketList: [],
      // 电影信息
      filmList: [],
      // 不可选座位
      selectSeats: [],
      // 已选座位
      userSelectSeats: [],
      // 全部座位
      seats: [],
    };
  },
  methods: {
    // 校验座位和手机号
    check() {
      if (this.userSelectSeats.length === 0) {
        this.$message({
          message: "请选择座位",
          type: "warning",
        });
        return false;
      }
      if (this.input.length !== 11) {
        this.$message({
          message: "请输入11位的电话号码",
          type: "warning",
        });
        return false;
      } else {
        return true;
      }
    },

    // 加入购物车
    submitSeats() {
      if (this.check()) {
        for (var i = 0; i < this.userSelectSeats.length; i++) {
          this.seats += this.userSelectSeats[i] + "号";
        }
        this.$message({
          message: "已为您添加到购物车,请尽快付款",
          type: "success",
        });
        this.$router.go(-1);
      }
    },

    // 选择座位
    handleSelect(index) {
      if (this.userSelectSeats.length > 3) {
        //最多选四个座位，选第五个座位会使第一个座位取消选择
        var d = this.userSelectSeats[0] - 1;
        this.seats[d].status = 1;
        this.userSelectSeats.splice(0, 1);
        this.userSelectSeats.push(index + 1);
        this.seats[index].status = 2;
        this.total = this.ticketList.price * this.userSelectSeats.length;
      } else {
        this.userSelectSeats.push(index + 1);
        this.seats[index].status = 2;
        this.total = this.ticketList.price * this.userSelectSeats.length;
      }
    },

    // 取消选择座位
    handleDisSelect(index) {
      this.userSelectSeats.splice(this.userSelectSeats.indexOf(index + 1), 1);
      this.seats[index].status = 1;
      this.total = this.ticketList.price * this.userSelectSeats.length;
    },

    // 查看排片详情以及座位
    queryArrangement() {
      FindArrangementById(this.$route.query.id).then((res) => {
        this.ticketList = res.data.arrangements;
        this.filmList = res.data.film;
        FindArrangementSeats(this.$route.query.id).then((res) => {
          this.selectSeats = res.data;
          this.loadSeat();
        });
      });
    },
    // 座位
    loadSeat() {
      const n = this.ticketList.seatNumber;
      let arr = new Array(0);
      for (let i = 0; i < n; i++) {
        if (this.selectSeats.indexOf(i + 1) === -1) {
          arr[i] = { seat: i + 1, status: 1 };
        } else {
          arr[i] = { seat: i + 1, status: 0 };
        }
      }
      this.seats = arr;
    },
  },

  mounted() {
    this.queryArrangement();
  },
};
</script>

<style scoped lang="scss">
.main {
  margin-top: 40px;
  width: 100%;
  .el-steps {
    margin-top: 40px;
    margin-bottom: 40px;
  }
  .isBuy {
    width: 90%;
    margin: 0 auto;
    box-shadow: 10px 10px 10px 0 rgba(0, 0, 0, 0.3);
    .isLeft {
      width: 30%;
      height: 750px;
      float: left;
      background-color: rgb(243, 243, 243);
      .isFilm {
        .isImg {
          width: 150px;
          margin: 30px;
        }
        .isInfo {
          margin-top: -250px;
          margin-left: 210px;
          .isName {
            font-size: 22px;
            font-weight: bold;
          }
          p {
            font-size: 14px;
          }
        }
      }
      .isTicket {
        margin: 30px;
        margin-top: 100px;
        .isStartTime {
          color: red;
        }
      }
      .isChoose {
        margin: 30px;
        .isTotal {
          span {
            color: red;
            font-size: 20px;
          }
        }
      }
      .isAdd {
        margin: 30px;
        .el-button {
          width: 100%;
          margin-top: 30px;
        }
      }
    }
    .isRight {
      width: 70%;
      float: right;
      height: 750px;
      position: relative;
      .isImg {
        margin-top: 40px;
        text-align: center;
        position: relative;
        img {
          width: 30px;
          margin-right: 90px;
        }
        span {
          font-size: 14px;
          position: absolute;
          margin-left: -85px;
          margin-top: 3px;
        }
      }
      .isScreen {
        width: 80%;
        height: 20px;
        background: rgb(219, 218, 218);
        margin: 0 auto;
      }
      p {
        text-align: center;
      }
      .screen-line {
        width: 0;
        height: 30%;
        border-left: 1px dashed rgb(219, 218, 218);
        position: absolute;
        top: 160px;
        bottom: 0;
        left: 50%;
      }
      .isSeats {
        width: 80%;
        margin: 0 auto;
        .seat {
          display: inline-block;
          font-size: 0;
          width: 30px;
          height: 26px;
          margin: 0 5px;
          background: url("../assets/img/seat3.png") no-repeat;
          background-position: 0 1px;
        }
        .sold {
          background-image: url("../assets/img/seat1.png");
        }
        .selected {
          background-image: url("../assets/img/seat2.png");
        }
        .item {
          padding-bottom: 20px;
        }
      }
    }
  }
}
</style>