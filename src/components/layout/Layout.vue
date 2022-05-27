<template>
  <el-container>
    <el-header><Header></Header></el-header>
    <el-main><router-view /></el-main>
    <el-footer><Footer></Footer></el-footer>
  </el-container>
</template>

<script>
import Header from "../layout/Header.vue";
import Footer from "../layout/Footer.vue";
export default {
  data() {
    return {};
  },
  methods: {},

  components: { Header, Footer },
};
</script>

<style scoped lang="scss">
.el-container {
  min-width: 1506px;
  max-width: 1506px;
  margin: 0 auto;
}
</style>