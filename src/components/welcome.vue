<template>
  <div class="welcome-div">
    欢迎进入刷卡指南后台系统！
  </div>
</template>

<script>
  import Api from '../commons/api';
  export default{
    name:"welcome",
    data () {
        return {

        };
    },
    methods: {
      // 获取银行卡列表
      getBanks () {
        Api.getBanks().then((response) => {
        });
      }
    },
    mounted () {
        this.getBanks();
    }
  }
</script>

<style lang="scss">
  .welcome-div{
    text-align: center;
    padding-top: 100px;
    font-size: 30px;
    color: #409EFF;
  }
</style>
