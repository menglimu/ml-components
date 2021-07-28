<script>
export default {
  name: "App",
};
</script>

<template>
  <router-view id="app"></router-view>
</template>

<style lang="scss">
body,
html {
  height: 100%;
  padding: 0;
  margin: 0;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
}

* {
  box-sizing: border-box;
}

#app {
  width: 100%;
}

h3 {
  font-size: 20px;
}

h5 {
  margin-top: 50px;
  font-size: 18px;
}

.el-textarea__inner {
  font-family: inherit;
}

.page {
  line-height: 1.5em;

  li {
    display: flex;
    margin: 10px 0;
    color: #333;

    label {
      display: inline-block;
      flex-shrink: 0;
      width: 140px;
      color: #666;
    }
  }
}

// table:not(.el-table__header):not(.el-table__body) {
//   width: 100%;
//   margin-bottom: 45px;
//   font-size: 14px;
//   line-height: 1.5em;
//   border-collapse: collapse;
//   background-color: #fff;

//   td,
//   th {
//     max-width: 250px;
//     padding: 15px;
//     border-bottom: 1px solid #dcdfe6;
//   }

//   th {
//     font-weight: 400;
//     color: #909399;
//     text-align: left;
//     white-space: nowrap;
//   }
// }
</style>
