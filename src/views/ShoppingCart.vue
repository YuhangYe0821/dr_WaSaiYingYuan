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
              default-active="1"
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
        <p>&emsp;&emsp;购物车</p>
        <!-- card循环显示购物车 -->
        <el-card shadow="always" v-for="(item, index) in cartList" :key="index">
          <el-checkbox
            v-model="selectList[index].checked"
            @change="handleCheck"
          ></el-checkbox>
          <img :src="item.films_show" class="image" />
          <div class="rleft" style="padding: 8px">
            <p>《{{ item.name }}》</p>
            <p>座位：{{ item.seat }}</p>
            <p>手机号码：{{ item.phone }}</p>
            <p>开场时间：{{ item.time }}</p>
          </div>
          <div class="rright" style="float: right">
            <p>¥{{ item.price }}</p>
            <!-- 删除 -->
            <el-button type="text" @click="isDelete(index)">删除</el-button>
          </div>
        </el-card>
        <div class="checkout">
          <div class="checkout_left">
            <el-checkbox v-model="checkAll" @change="handleCheckAll"
              >全选</el-checkbox
            >
            <p class="issum" style="color: orange">合计：¥{{ isSum }}</p>
          </div>
          <!-- 结算 -->
          <div class="checkout_right">
            <el-button
              type="danger"
              @click="(outerVisible = true), submitCart"
              class="btn"
              >结算</el-button
            >
            <!--内层对话框 -->
            <el-dialog title="提示" :visible.sync="outerVisible" center>
              <el-dialog
                width="30%"
                title="请扫描二维码"
                :visible.sync="innerVisible"
                append-to-body
                center
              >
                <!-- 二维码 -->
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
              <!--外层对话框 -->
              <div slot="footer" class="dialog-footer">
                <p>请您仔细确认订单金额为{{ isSum }}元，是否继续？</p>
                <el-button @click="outerVisible = false">取消支付</el-button>
                <el-button type="primary" @click="innerVisible = true"
                  >确认支付</el-button
                >
              </div>
            </el-dialog>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 购物车已选订单
      selectList: [
        {
          checked: false,
          price: 40,
        },
        {
          checked: false,
          price: 30,
        },
        {
          checked: false,
          price: 30,
        },
      ],
      isSum: 0,
      checkAll: false,
      outerVisible: false,
      innerVisible: false,
      // 购物车所有订单信息
      cartList: [
        {
          name: "狮子王",
          films_show: require("../assets/filmImg/狮子王.jpg"),
          seat: "30号",
          phone: "13569984562",
          time: "2022-01-20  14:25",
          price: 40,
        },
        {
          name: "唐人街探案3",
          films_show: require("../assets/images/影视管理--电影列表/u156.png"),
          seat: "3号",
          phone: "13569984562",
          time: "2022-02-20  14:25",
          price: 30,
        },
        {
          name: "唐人街探案3",
          films_show: require("../assets/images/影视管理--电影列表/u156.png"),
          seat: "4号",
          phone: "13569984562",
          time: "2022-02-20  14:25",
          price: 30,
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
    // 删除
    isDelete(index) {
      this.cartList.splice(index, 1);
      this.loadCarts();
    },
    // 点击触发
    handleCheck(index) {
      this.checkOut();
    },
    // 全选
    handleCheckAll() {
      if (this.checkAll) {
        this.changeAllChecked(true);
        this.checkOut();
      } else {
        this.changeAllChecked(false);
        this.isSum = 0;
      }
    },
    //传checkbox是否选中的状态
    changeAllChecked(status) {
      for (let i = 0; i < this.selectList.length; i++) {
        this.selectList[i].checked = status;
      }
    },
    // 结算
    // submitCart() {
    //   let result = this.selectList.filter((item) => {
    //     return item.checked;
    //   });
    //   if ((result, length > 0)) {
    //     alert("结算");
    //   } else {
    //     alert("请选择电影");
    //   }
    // },

    //查询购物车数据后台接口
    // loadCarts() {
    //   this.selectList = this.cartList.map((item) => {
    //     return {
    //       checked: false,
    //       cart: Object.assign({}, item),
    //     };
    //   });
    // },

    // checkOut() {
    //   this.isSum = 0;
    //   for (let i = 0; i < this.selectList.length; i++) {
    //     this.isSum += this.selectList[i].cart.price;
    //   }
    // },

    // 计算金额
    checkOut() {
      this.isSum = 0;
      for (let i = 0; i < this.selectList.length; i++) {
        if (this.selectList[i].checked) {
          this.isSum += this.selectList[i].price;
        }
        if (!this.selectList[i].checked) {
          this.checkAll = false;
        }
      }
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
          p:last-child {
            color: red;
          }
        }
        .rright {
          float: right;
          p {
            font-size: 20px;
            color: red;
            display: inline-block;
            margin-right: 50px;
            margin-top: 80px;
          }
          .el-button {
            font-size: 20px;
            color: red;
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
      .checkout {
        width: 800px;
        height: 50px;
        margin-left: 50px;
        margin-top: 150px;
        margin-bottom: 10px;
        .checkout_left {
          width: 80%;
          height: 50px;
          background-color: gray;
          float: left;
          border-radius: 5px 0 0 5px;
          .el-checkbox {
            margin-left: 20px;
            margin-top: 15px;
            color: black;
          }
          .issum {
            float: right;
            font-size: 16px;
            margin-right: 30px;
          }
        }
        .checkout_right {
          width: 20%;
          height: 50px;
          float: right;
          .btn {
            width: 100%;
            height: 100%;
            font-size: 20px;
            border-radius: 0 5px 5px 0;
          }
          .el-dialog {
            .dialog-footer {
              p {
                font-size: 18px;
                margin-top: -50px;
              }
            }
          }
        }
      }
    }
    border-radius: 10px;
    border: 2px solid rgb(204, 204, 204);
  }
}
</style>