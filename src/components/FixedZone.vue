<template>
  <div class="fixed-zone">
    <a>问题反馈</a>
    <a>回到顶部</a>
  </div>
</template>

<script>
  export default {
    name: 'FixedZone',
  };
</script>

<style lang="scss" scoped>
.fixed-zone {
  position: fixed;
  bottom: 10px;
  right: 22.5px;
  width: 58px;
  z-index: 999;
}
</style>
