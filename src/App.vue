<template>
  <div id="app">
    <section class="header clearfix">
      <div class="container">
        <h1 class="logo"><a href="#"><img src="./assets/logo.png"></a></h1>
        <nav>
          <ul>
            <li><a href="#">应用管理</a></li>
            <li><a href="#">论坛</a></li>
            <li><a href="#">申请记录</a></li>
            <li><a href="#">用户名</a></li>
            <li><a href="#">退出</a></li>
          </ul>
        </nav>
      </div>
    </section>
    <section class="slides">
      <div id="carousel-example" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          <li data-target="#carousel-example" data-slide-to="0" class="active"></li>
          <li data-target="#carousel-example" data-slide-to="1"></li>
          <li data-target="#carousel-example" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner" role="listbox">
            <div class="item active">
              <div>A</div>
            </div>
            <div class="item">
              <div>B</div>
            </div>
            <div class="item">
              <div>C</div>
            </div>
        </div>
      </div>
    </section>
    <section class="news container">
      <div class="row">
        <section class="prod-news col-md-4">
          <news title="产品更新" :items="prodNews" pageLink="#"></news>
        </section>
        <section class="site-news col-md-4">
          <news title="资讯动态" :items="siteNews"></news>
        </section>
        <section class="forum-news col-md-4">
          <news title="论坛" :items="forumNews"></news>
        </section>
      </div>
    </section>
    <fixed-zone></fixed-zone>
    <web-footer></web-footer>
  </div>
</template>

<script>
import Hello from './components/Hello';
import News from './components/News';
import FixedZone from './components/FixedZone';
import WebFooter from './components/WebFooter';

export default {
  name: 'app',
  components: {
    Hello,
    News,
    FixedZone,
    WebFooter,
  },
  data() {
    return {
      prodNews: [
                { link: 'https://baidu.com', title: '百度' },
      ],
      siteNews: [
                { link: 'https://baidu.com', title: '百度' },
      ],
      forumNews: [
                { link: 'https://baidu.com', title: '百度' },
      ],
    };
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
  height: 56px;
  width: 100%;
  background-color: #2e2e2e;

  .logo {
    float: left;
    margin: 0;
    img {
      height: 1.5em;
    }
  }

  nav {
    float: right;

    ol li, ul li {
      list-style: none;
      float: left;
      padding-left: 16px;
    }
    li a {
      color: #fff;
      line-height: 24px;
      padding: 16px 2px;
      display: block;
    }
  }
}

.slides {
  height: 28em;
  text-align:center;
  margin-bottom: 2em;

  .carousel, .carousel-inner, .carousel-inner .item {
    height: 100%;
    background: lightgray;
  }
  .carousel-inner .item:nth-child(even) {
    background-color: lightblue;
  }
}
</style>
