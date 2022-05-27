<template>
  <div class="main">
    <div class="messageBoard">
      <!-- 循环显示客服 -->
      <div class="waiter">
        <p>客服人员</p>
        <div v-for="(item, id) in wokerList" :key="id">
          <el-avatar :size="80" :src="item.avatar"></el-avatar>
          <span>名字: {{ item.nickname }}</span>
          <span>性别: {{ item.gender }}</span>
          <span class="worker_id">ID: {{ item.id }}</span>
          <el-link type="success" :underline="false" @click="isShow1 = true"
            >我的评价</el-link
          >
          <el-link type="success" :underline="false" @click="isShow2 = true"
            >评价客服</el-link
          >
        </div>
      </div>
      <!-- 循环显示顾客留言 -->
      <div class="customer">
        <p>顾客留言</p>
        <div v-for="(item, id) in commentList" :key="id">
          <el-avatar
            v-if="item.user != null"
            :size="70"
            :src="item.user.avatar"
          ></el-avatar>
          <el-avatar v-else :size="70" src=""></el-avatar>
          <span v-if="item.user != null">顾客: {{ item.user.nickname }}</span>
          <span v-else>&emsp;</span>
          <span>{{ item.leavingMessage.content }}</span>
          <span>Time: {{ item.leavingMessage.createAt }}</span>
        </div>
        <el-button type="success" @click="isShow3 = true">添加留言</el-button>
      </div>
    </div>
    <!-- 我的评价 -->
    <div class="overlay" v-show="isShow1" @click.self="isShow1 = false">
      <div class="center1">
        <p>我的评价</p>
        <!-- 关闭按钮 -->
        <el-button
          type="danger"
          class="el-icon-close"
          circle
          @click="isShow1 = false"
        ></el-button>
        <!-- 表格显示 -->
        <el-table :data="myCommentList" style="width: 100%" height="215">
          <el-table-column prop="createAt" label="日期" width="180">
          </el-table-column>
          <el-table-column prop="content" label="评语" width="480">
          </el-table-column>
          <el-table-column label="满意程度" width="120">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
                <el-tag>{{ scope.row.type }}</el-tag>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 评价客服 -->
    <div class="overlay" v-show="isShow2" @click.self="isShow2 = false">
      <div class="center2">
        <p>评价客服</p>
        <!-- 关闭按钮 -->
        <el-button
          type="danger"
          class="el-icon-close"
          circle
          @click="isShow2 = false"
        ></el-button>
        <div class="assess">
          <span>满意程度</span>&emsp;
          <!-- 选择器 -->
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.assess"
              :value="item.assess"
            >
            </el-option>
          </el-select>
        </div>
        <br />
        <br />
        <div class="content">
          <span>评价内容</span>
          &emsp;
          <div class="isInput">
            <!-- 文本域输入框 -->
            <el-input
              type="textarea"
              :autosize="{ minRows: 8, maxRows: 10 }"
              v-model="input"
              placeholder="请输入内容"
              resize="none"
            ></el-input>
          </div>
        </div>
        <div class="choice">
          <el-button @click="isShow2 = false">取消</el-button>
          <el-button
            @click="(isShow2 = false), myCommentPost(value, input)"
            type="primary"
            >提交评价</el-button
          >
        </div>
      </div>
    </div>
    <!-- 添加留言 -->
    <div class="overlay" v-show="isShow3" @click.self="isShow3 = false">
      <div class="center3">
        <p>添加留言</p>
        <!-- 关闭按钮 -->
        <el-button
          type="danger"
          class="el-icon-close"
          circle
          @click="isShow3 = false"
        ></el-button>
        <div class="content">
          <div class="isInput">
            <!-- 文本域输入框 -->
            <el-input
              type="textarea"
              :autosize="{ minRows: 8, maxRows: 10 }"
              v-model="input"
              placeholder="请输入内容"
              resize="none"
            ></el-input>
          </div>
        </div>
        <div class="choice">
          <el-button @click="isShow3 = false">取消</el-button>
          <el-button @click="isShow3 = false" type="primary"
            >提交评价</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ListAllWorker,
  ListAllComment,
  ListMyComment,
  PostMyComment,
} from "../api/comment";

export default {
  data() {
    return {
      isShow1: false,
      isShow2: false,
      isShow3: false,
      input: "",
      value: "",
      // 客服
      wokerList: [],
      // 顾客
      commentList: [],
      // 我的评价
      myCommentList: [],
      // 选择器
      options: [
        {
          value: "选项1",
          assess: "非常满意",
        },
        {
          value: "选项2",
          assess: "满意",
        },
        {
          value: "选项3",
          assess: "不满意",
        },
      ],
    };
  },
  methods: {
    //显示全部客服
    workerQuery() {
      ListAllWorker().then((res) => {
        if (res.code == 200) {
          this.wokerList = res.data;
        }
        // console.log(this);
      });
    },
    //显示全部留言
    commentQuery() {
      ListAllComment().then((res) => {
        if (res.code == 200) {
          this.commentList = res.data;
        }
      });
    },
    //查看我的评价
    myCommentQuery() {
      ListMyComment().then((res) => {
        if (res.code == 200) {
          this.myCommentList = res.data;
        }
      });
    },
    // 提交我的评价
    myCommentPost(value, input) {
      const myCommentData = {
        // wid: item.id,
        uid: localStorage.uid,
        comtent: input,
        type: value,
      };
      PostMyComment(myCommentData).then((res) => {
        if (res.code == 200) {
          this.$message({
            message: res.msg,
            type: "success",
          });
        }
      });
    },
  },
  mounted() {
    // 全部客服接口
    this.workerQuery();
    // 全部留言接口
    this.commentQuery();
    //我的评价接口
    this.myCommentQuery();
  },
};
</script>

<style scoped lang="scss">
.main {
  margin-top: 40px;
  width: 100%;
  .messageBoard {
    width: 95%;
    margin: 0 auto;
    margin-top: 40px;
    .waiter {
      width: 26%;
      height: 700px;
      float: left;
      background-color: rgba(36, 41, 48, 1);
      overflow: auto;
      p {
        font-size: 20px;
        color: rgb(204, 204, 204);
        margin-left: 40px;
        margin-top: 40px;
      }
      div {
        width: 90%;
        height: 170px;
        margin: 0 auto;
        margin-top: 20px;
        border-bottom: 2px dashed rgb(204, 204, 204);
        .el-avatar {
          margin-left: 20px;
          margin-top: 20px;
          float: left;
        }
        span {
          width: 50%;
          font-size: 16px;
          margin-left: 40px;
          margin-top: 15px;
          color: rgb(204, 204, 204);
          display: inline-block;
        }
        .worker_id {
          //防溢出，溢出的省略号代替，设宽
          display: -webkit-box !important;
          text-overflow: ellipsis;
          overflow: hidden;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          padding-left: 40px;
        }
        .el-link {
          margin-left: 30px;
          margin-right: 20px;
          margin-top: 20px;
        }
      }
    }
    .customer {
      width: 74%;
      height: 700px;
      float: right;
      background-color: rgba(53, 59, 67, 1);
      overflow: auto;
      p {
        font-size: 20px;
        color: rgb(204, 204, 204);
        margin-left: 60px;
        margin-top: 40px;
      }
      div {
        width: 90%;
        height: 170px;
        margin: 0 auto;
        margin-top: 20px;
        .el-avatar {
          margin-left: 20px;
          margin-top: 20px;
          float: left;
        }
        span {
          width: 50%;
          font-size: 16px;
          margin-left: 40px;
          margin-top: 15px;
          color: rgb(204, 204, 204);
          display: inline-block;
        }
      }
    }
    .el-button {
      float: right;
      margin-right: 60px;
      margin-bottom: 40px;
      width: 180px;
      height: 50px;
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
    .center1 {
      background-color: white;
      border-radius: 5px; /*圆角*/
      padding-top: 15px;
      padding-left: 30px;
      padding-bottom: 15px;
      width: 800px;
      height: 300px;
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
      .el-button {
        margin-left: 80%;
      }
    }
    .center2 {
      background-color: white;
      border-radius: 5px; /*圆角*/
      padding-top: 15px;
      padding-left: 30px;
      padding-bottom: 15px;
      width: 800px;
      height: 420px;
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
        margin-left: 80%;
      }
      .assess {
        margin-left: 100px;
      }
      .content {
        margin-left: 100px;
        .isInput {
          width: 80%;
          float: right;
          margin-right: 55px;
        }
      }
      .choice {
        float: right;
        margin-right: 55px;
        margin-top: 40px;
      }
    }
    .center3 {
      background-color: white;
      border-radius: 5px; /*圆角*/
      padding-top: 15px;
      padding-left: 30px;
      padding-bottom: 15px;
      width: 800px;
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
        margin-left: 80%;
      }
      .content {
        .isInput {
          width: 95%;
        }
      }
      .choice {
        float: right;
        margin-right: 5%;
        margin-top: 40px;
      }
    }
  }
}
</style>