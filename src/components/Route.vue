<template>
  <el-row class="login">
  </el-row>
</template>

<script>
  export default {
    name: 'route',
    beforeRouteEnter (to, from, next) {
      next({ path: '/login/0/ShenYan' });
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
