<template>
  <section class="footer">
    <!-- TODO: responsive -->
    <footer class="container">
      <h1>{{ a }}</h1>
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
  // import '~style/WebFooter.scss';

  export default {
    name: 'Footer',
    data(a) {
      return {
        a: a ? 'true' : 'false',
      };
    },
    serverCachekey() {
      return `vee-${this.name}`;
    },
  };

</script>
