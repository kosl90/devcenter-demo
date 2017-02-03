<template>
  <section class="footer">
    <footer class="container">
      <section class="pull-left">
      <p>@ 2017 <a href="#">使用前必读.</a></p>
      </section>
      <section class="pull-right">
      <p>数据库服务: abcd</p>
      </section>
    </footer>
  </section>
</template>

<script>
  export default {
    name: 'Footer',
  };
</script>

<style lang="scss" scoped>
  .footer {
    flex: 0;
    padding: 18px 0;
    font-size: 12px;
    background-color: #d3d3d3;

    p {
      margin: 0;
    }
  }
</style>
