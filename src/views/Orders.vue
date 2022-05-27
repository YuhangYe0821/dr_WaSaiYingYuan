<template>
  <div class="main">
    <div class="isbody">
      <!-- 侧边导航菜单 -->
      <div class="isleft">
        <el-row class="tac">
          <br />
          <p>个人中心</p>
          <el-col>
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              style="border-right: none"
            >
              <el-menu-item index="1" @click="toShoppingCart">
                <i class="el-icon-shopping-cart-2" style="font-size: 24px"></i>
                <span>购物车</span>
              </el-menu-item>
              <el-menu-item index="2" @click="toOrders">
                <i class="el-icon-s-order" style="font-size: 24px"></i>
                <span>我的订单</span>
              </el-menu-item>
              <el-menu-item index="3" @click="toSettings">
                <i class="el-icon-user-solid" style="font-size: 24px"></i>
                <span>个人设置</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </div>
      <div class="isright">
        <br />
        <p>&emsp;&emsp;我的订单</p>
        <!-- card循环显示订单 -->
        <el-card shadow="always" v-for="(item, id) in orderList" :key="id">
          <img :src="item.films_show" class="image" />
          <div class="rleft" style="padding: 8px">
            <p>《{{ item.name }}》</p>
            <p>订购座位：{{ item.seat }}</p>
            <p>下单时间：{{ item.placetime }}</p>
            <!-- v-if 判断支付状态显示支付时间 -->
            <p v-if="item.state == '支付成功'">支付时间：{{ item.paytime }}</p>
          </div>
          <div class="rright" style="float: right">
            <p>¥{{ item.price }}</p>
            <!-- 支付成功 -->
            <p class="succeed" v-if="item.state == '支付成功'">
              {{ item.state }}
            </p>
            <!-- 等待支付 -->
            <a
              :underline="false"
              class="waiting"
              v-else-if="item.state == '等待支付'"
              @click.self="outerVisible = true"
            >
              <!-- @click.self="outerVisible = true" 不添加.self会导致在点击outerVisible外时outerVisible先false再true -->
              {{ item.state }}
              <!--外层对话框 -->
              <el-dialog title="提示" :visible.sync="outerVisible" center>
                <div slot="footer" class="dialog-footer">
                  <p>请您仔细确认订单金额为{{ item.price }}元，是否继续？</p>
                  <el-button @click.stop="outerVisible = false"
                    >取消支付</el-button
                  >
                  <!-- @click.stop="outerVisible = false"  不添加.stop会导致在点击取消支付时outerVisible先false再true(冒泡)-->
                  <el-button type="primary" @click="innerVisible = true"
                    >确认支付</el-button
                  >
                </div>
                <!--内层对话框 -->
                <el-dialog
                  width="30%"
                  title="请扫描二维码"
                  :visible.sync="innerVisible"
                  append-to-body
                  center
                >
                  <img
                    src="../assets/img/zfb.jpg"
                    alt=""
                    style="width: 420px; height: 420px"
                  />
                  <el-button
                    type="primary"
                    @click="(outerVisible = false), (innerVisible = false)"
                    style="margin-left: 38%"
                    >支付成功</el-button
                  >
                </el-dialog>
              </el-dialog>
            </a>
            <!-- 订单异常 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="请联系客服"
              placement="bottom"
              v-else
            >
              <p class="abnormal">{{ item.state }}</p>
            </el-tooltip>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      outerVisible: false,
      innerVisible: false,
      // 订单信息
      orderList: [
        {
          name: "哥斯拉",
          films_show: require("../assets/filmImg/哥斯拉.jpg"),
          seat: "12号",
          placetime: "2022-02-28  14:25",
          paytime: "",
          price: 30,
          state: "等待支付",
        },
        {
          name: "哥斯拉",
          films_show: require("../assets/filmImg/哥斯拉.jpg"),
          seat: "13号",
          placetime: "2022-02-28  14:26",
          paytime: "",
          price: 30,
          state: "订单异常",
        },
        {
          name: "唐人街探案3",
          films_show: require("../assets/images/影视管理--电影列表/u156.png"),
          seat: "4号",
          placetime: "2022-01-28  13:05",
          paytime: "2022-01-28  14:17",
          price: 40,
          state: "支付成功",
        },
        {
          name: "唐人街探案3",
          films_show: require("../assets/images/影视管理--电影列表/u156.png"),
          seat: "5号",
          placetime: "2022-01-28  13:05",
          paytime: "2022-01-28  14:17",
          price: 40,
          state: "支付成功",
        },
      ],
    };
  },
  methods: {
    // 购物车
    toShoppingCart() {
      window.location.href = "/ShoppingCart";
    },
    // 我的订单
    toOrders() {
      window.location.href = "/Orders";
    },
    // 个人设置
    toSettings() {
      window.location.href = "/Settings";
    },
  },
};
</script>

<style scoped lang="scss">
.main {
  margin-top: 40px;
  width: 100%;
  .isbody {
    width: 80%;
    margin: 0 auto;
    float: left;
    margin-left: 10%;
    .isleft {
      width: 20%;
      text-align: center;
      float: left;
      .tac {
        p {
          font-size: 24px;
        }
      }
    }
    .isright {
      float: left;
      border-left: 2px solid rgb(204, 204, 204);
      p {
        font-size: 24px;
      }
      .el-card {
        width: 800px;
        margin-left: 50px;
        margin-bottom: 10px;
        .rleft {
          float: left;
          p:first-child {
            font-size: 19px;
            color: black;
          }
          p {
            font-size: 13px;
            color: gray;
          }
        }
        .rright {
          float: right;
          p {
            font-size: 20px;
            display: inline-block;
            margin-right: 50px;
            margin-top: 80px;
          }
          .succeed {
            color: rgb(21, 253, 0);
          }
          .waiting {
            color: rgb(0, 102, 255);
            font-size: 20px;
            display: inline-block;
            margin-right: 50px;
            margin-top: -5px;
            .el-dialog {
              .dialog-footer {
                p {
                  display: block;
                  margin: 0 auto;
                  margin-bottom: 30px;
                  font-size: 18px;
                  color: red;
                }
              }
            }
          }
          .abnormal {
            color: rgb(255, 196, 0);
          }
        }
        .el-checkbox {
          float: left;
          margin: 80px 10px;
        }
        .image {
          float: left;
          width: 135px;
          height: 193px;
          margin-bottom: 20px;
          margin-right: 40px;
        }
      }
    }

    border-radius: 10px;
    border: 2px solid rgb(204, 204, 204);
  }
}
</style>