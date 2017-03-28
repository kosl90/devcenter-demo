<template>
  <div class="fixed-zone">
    <a>问题反馈</a>
    <a>回到顶部</a>
  </div>
</template>

<script>
  import '~style/FixedZone.scss';

  export default {
    name: 'FixedZone',
    serverCacheKey() {
      return `vee-${this.name}`;
    },
  };

</script>
