<template>
    <div class="home-div">
      <el-container>
        <el-header>
          <span>刷卡指南</span>
          <a class="collapse-btn" @click="collapseClick"><i class="el-icon-menu"></i></a>
          <!--<span class="welcome-text">欢迎，我叫小贝贝</span>
          <a class="logout-btn">退出</a>-->
        </el-header>
        <el-container>
          <el-aside :width="asideWidth">
            <el-menu
              default-active="1"
              :collapse="collapse"
              @open="handleOpen"
              @close="handleClose">
              <el-menu-item index="1" @click="toPath('/cardPage/message')">
                <i class="el-icon-tickets"></i>
                <span slot="title">每日信息</span>
              </el-menu-item>
            </el-menu>
          </el-aside>
          <el-main>
            <router-view/>
          </el-main>
        </el-container>
      </el-container>
    </div>
</template>

<script>
    export default {
        name: "home",
        data () {
          return {
            collapse: false,
            asideWidth: '180px'
          }
        },
        methods: {
          handleOpen(key, keyPath) {
            console.log(key, keyPath);
          },
          handleClose(key, keyPath) {
            console.log(key, keyPath);
          },
          collapseClick () {
            this.collapse = !this.collapse;
            this.asideWidth = this.collapse ? "65px" : "180px";
          },
          toPath(path) {
            this.$router.push(path);
          }
        },
        mounted(){

        }
    }
</script>

<style lang="scss">
  .home-div{
    position: relative;
    .collapse-btn{
      cursor: pointer;
      font-size: 16px;
    }
    .welcome-text{
      position: absolute;
      right: 80px;
      top: 0;
      font-size: 14px;
    }
    .logout-btn{
      position: absolute;
      right: 30px;
      top: 0;
      font-size: 14px;
      text-decoration: none;
      cursor: pointer;
    }
  }
  .el-header{
    height: 50px !important;
    line-height: 50px;
    padding: 0 30px !important;
    background-color: #409EFF;
    color: #fff;
    font-size: 24px;
  }
  .el-container{
    height: 100%;
  }
  .el-menu{
    min-height: 100%;
  }
</style>
