<template>
  <div class="main">
    <!-- 选择类型、地区 -->
    <div class="choose">
      <ul>
        <li class="isType">
          类型:
          <ul>
            <li
              v-for="(item, index) in typeList"
              :key="index"
              class="typeList"
              :class="selectType === item ? 'active' : ''"
              @click="handleTypeSelect(item)"
            >
              <router-link
                :to="'/Films?region=' + selectRegion + '&type=' + item"
                >{{ item }}</router-link
              >
            </li>
          </ul>
        </li>
        <li class="isRegion">
          地区:
          <ul>
            <li
              v-for="(item, index) in regionList"
              :key="index"
              :class="selectRegion === item ? 'active' : ''"
              @click="handleRegionSelect(item)"
            >
              <router-link
                :to="'/Films?region=' + item + '&type=' + selectType"
                >{{ item }}</router-link
              >
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!-- card循环显示电影 -->
    <div class="cards">
      <el-row>
        <el-col
          :span="3"
          v-for="(item, id) in filmsList"
          :key="id"
          :offset="id >= 0 ? 1 : 0"
        >
          <el-link href="/Detail" :underline="false">
            <el-card :body-style="{ padding: '0px' }">
              <img :src="item.cover" class="image" />
              <p>{{ item.name }}</p>
            </el-card>
          </el-link>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { ListAllFilm, FindFilmByRegionAndType } from "../api/film";
export default {
  data() {
    return {
      selectType: "全部",
      selectRegion: "全部",
      // 类型
      typeList: [
        "全部",
        "家庭",
        "惊悚",
        "科幻",
        "爱情",
        "动作",
        "喜剧",
        "恐怖",
        "悬疑",
        "犯罪",
        "冒险",
        "战争",
        "历史",
        "武侠",
        "传记",
        "古装",
        "其他",
      ],
      // 地区
      regionList: [
        "全部",
        "内地",
        "香港",
        "台湾",
        "美国",
        "韩国",
        "日本",
        "泰国",
        "印度",
        "法国",
        "英国",
        "德国",
        "其他",
      ],
      // 电影
      filmsList: [],
    };
  },
  methods: {
    //所有电影接口
    AllFilmQuery() {
      ListAllFilm().then((res) => {
        if (res.code == 200) {
          this.filmsList = res.data;
        }
      });
    },
    //选择地区和类型来查询电影(测试)
    reloadFilmList() {
      FindFilmByRegionAndType().then(
        //FindFilmByRegionAndType(this.selectRegion, this.selectType)
        (res) => {
          this.filmsList = res.data;
        }
      );
    },
    handleTypeSelect(item) {
      this.selectType = item;
      this.reloadFilmList();
    },
    handleRegionSelect(item) {
      this.selectRegion = item;
      this.reloadFilmList();
    },
  },
  mounted() {
    // 所有电影接口
    this.AllFilmQuery();
  },
};
</script>

<style scoped lang="scss">
.main {
  margin-top: 40px;
  width: 100%;
  .choose {
    width: 80%;
    margin: 0 auto;
    height: 115px;
    border: 1px solid rgb(204, 204, 204);
    border-radius: 4px;
    ul {
      list-style: none;

      .isType {
        float: left;
        margin-left: -20px;
        margin-bottom: 30px;

        li {
          float: left;
          margin-left: 20px;
          margin-top: -20px;
          border-radius: 15px;
          width: 45px;
          height: 25px;
          text-align: center;
          line-height: 25px;
          a {
            color: black;
            text-decoration: none;
          }
        }
        .active {
          background-color: red;
          a {
            color: white;
          }
        }
      }
      .isRegion {
        float: left;
        margin-left: -20px;
        li {
          float: left;
          margin-left: 20px;
          margin-top: -20px;
          border-radius: 15px;
          width: 45px;
          height: 25px;
          text-align: center;
          line-height: 25px;
          a {
            color: black;
            text-decoration: none;
          }
        }
        .active {
          background-color: red;
          a {
            color: white;
          }
        }
      }
    }
  }
  .cards {
    width: 80%;
    margin-left: 100px;
    margin-top: 50px;
    float: left;
    .el-col {
      margin-bottom: 15px;
      .el-card {
        .image {
          width: 100%;
          height: 215px; //不设置高度会导致card位置出错
          display: block;
        }
        p {
          text-align: center;
          //防溢出，溢出的省略号代替，设宽
          display: -webkit-box !important;
          text-overflow: ellipsis;
          overflow: hidden;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
}
</style>