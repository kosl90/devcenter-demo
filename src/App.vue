<template>
  <div id="app">
    <div class="content">
      <nav class="navbar navbar-default navbar-fixed-top header">
        <div class="container-fluid">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-example"
            aria-expanded="false">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#"><img class="logo" alt="Brand" src="./assets/logo.png"></a>
          </div>
          <div class="collapse navbar-collapse" id="navbar-example">
            <ul class="nav navbar-nav navbar-right">
              <li><a href="#">应用管理</a></li>
              <li><a href="#">论坛</a></li>
              <li><a href="#">申请记录</a></li>
              <li><a href="#">用户名</a></li>
              <li><a href="#">退出</a></li>
            </ul>
          </div>
        </div>
      </nav>
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
      </div>
      <web-footer></web-footer>
      <fixed-zone></fixed-zone>
      <!-- maybe v-model is better than ref -->
      <login-box ref='loginBox' actionURL="/login" @submit="onLogin"></login->
  </div>
</template>

<script>
import News from './components/News';
import FixedZone from './components/FixedZone';
import WebFooter from './components/WebFooter';
import LoginBox from './components/LoginBox';

export default {
  name: 'app',
  components: {
    News,
    FixedZone,
    WebFooter,
    LoginBox,
  },
  data() {
    return {
      prodNews: [
                { link: 'https://baidu.com', title: '百度' },
                { link: 'https://baidu.com', title: '百度' },
                { link: 'https://baidu.com', title: '百度' },
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
  methods: {
    onLogin(e) {
      e.preventDefault();
      const loginBox = this.$refs.loginBox;
      /* eslint-disable no-console */
      console.log(loginBox.userName);
      console.log(loginBox.pwd);
      console.log(loginBox.isUseLDAP);
      loginBox.isUseLDAP = false;
    },
  },
};
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  display: flex;
  flex-flow: column;
  min-height: 100vh;

  .content {
    flex: 1;
  }
}

.header {
  margin-bottom: 0;
  .logo {
    height: 2em;
    margin-top: -20%;
  }
}

.slides {
  margin-top: 50px;
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
