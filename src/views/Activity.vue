<template>
  <div class="main">
    <div class="tem">
      <!-- 时间线 -->
      <el-timeline :reverse="reverse">
        <el-timeline-item
          v-for="(item, id) in activityList"
          class="template"
          :key="id"
        >
          <!-- 开始时间 -->
          <p class="starttime">{{ item.startTime }}</p>
          <div>
            <!-- 活动内容 -->
            <p class="content">{{ item.content }}</p>
            <!-- 结束时间 -->
            <p class="endtime">活动结束时间： {{ item.endTime }}</p>
            <p class="join">
              <!-- 参加按钮 -->
              <el-link type="primary" :underline="false" @click="open(item)"
                >报名参加</el-link
              >
            </p>
          </div>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
import { ListAllActivity, RegistrationActivity } from "../api/activity";

export default {
  data() {
    return {
      reverse: true,
      login: true,
      // 活动列表
      activityList: [],
    };
  },

  methods: {
    // 按钮事件
    open(item) {
      const RegistrationData = {
        aid: item.id,
        uid: localStorage.uid,
      };
      if (this.login == false) {
        this.$confirm("您还没有登录, 是否去登录?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          this.$router.push("/");
        });
      } else {
        RegistrationActivity(RegistrationData).then((res) => {
          if (res.code == 200) {
            // console.log(localStorage.uid);
            this.$message({
              message: res.msg,
              type: "success",
            });
          }
        });
      }
    },
    // 查询所有活动
    activityQuery() {
      ListAllActivity().then((res) => {
        if (res.code == 200) {
          this.activityList = res.data;
        }
      });
    },
  },
  mounted() {
    // 所有活动接口
    this.activityQuery();
  },
};
</script>

<style scoped lang="scss">
.main {
  margin-top: 40px;
  width: 100%;
  .tem {
    width: 90%;
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 50px;
    .starttime {
      // 开始时间
      margin-left: 50px;
      font-size: 16px;
      color: rgb(136, 136, 136);
    }

    div {
      width: 100%;
      margin: 0 auto;
      padding-bottom: 20px;
      padding-top: 20px;
      border: 1px solid black;
      box-shadow: 10px 10px 10px 0 rgba(0, 0, 0, 0.3);
      border-radius: 4px;
      .content {
        margin-left: 50px;
        margin-right: 50px;
        font-size: 19px;
        font-weight: bold;
      }
      .endtime {
        margin-left: 50px;
        font-size: 16px;
        color: rgb(204, 204, 204);
      }
      .join {
        margin-left: 50px;
      }
    }
  }
}
</style>