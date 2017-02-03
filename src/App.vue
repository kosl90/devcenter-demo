<template>
  <div id="app">
    <section class="header clearfix">
      <span class="banner"><a href="#"><img src="./assets/logo.png"></a></span>
      <nav>
        <ul>
          <li><a href="#">应用管理</a></li>
          <li><a href="#">论坛</a></li>
          <li><a href="#">申请记录</a></li>
          <li><a href="#">用户名</a></li>
          <li><a href="#">退出</a></li>
        </ul>
      </nav>
    </section>
    <section class="slides">
    this is slide.
    </section>
    <section class="news container">
      <div class="row">
        <section class="prod-news col-md-4">A</section>
        <section class="site-news col-md-4">B</section>
        <section class="forum-news col-md-4">C</section>
      </div>
    </section>
    <footer>
      This is Footer.
    </footer>
  </div>
</template>

<script>
import Hello from './components/Hello';

export default {
  name: 'app',
  components: {
    Hello,
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.header {
  width: 100%;
  .banner {
    float: left;
    img {
      height: 1.5em;
    }
  }

  nav {
    float: right;
    ol li, ul li {
      list-style: none;
      float: left;
    }
  }
}

.slides {
  height: 28em;
  text-align:center;
}
</style>
