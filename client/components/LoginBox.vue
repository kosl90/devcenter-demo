<template>
<div class="login-box-wrapper">
  <div class="login-box">
    <h1 class="title">登录</h1>
    <form class="login-form" @submit="onSubmit($event)" method="POST" :action="actionURL">
      <div class="form-group"><input v-model="userNameModel" name="user[name]" placeholder="邮箱" class="form-control" type="text" /></div>
      <!-- FIXME: add a crsf token here -->
      <input type="hidden" name="_token" value="crsftoken" />
      <div class="form-group"><input v-model="pwdModel" name="user[pwd]" placeholder="密码" class="form-control" type="password" /></div>
      <div class="notification">
      <label><input v-model="useLDAPModel" type="checkbox">使用LDAP登录</label>
      <a v-if="!useLDAPModel" href="#">忘记密码？</a>
      </div>
      <button class="btn btn-primary btn-block" type="submit">登录</button>
    </form>
  </div>
  <div class="switch-block">
    没有账户？<a href="javascript:;">注册</a>
  </div>
</div>
</template>

<script>
// TODO: import bootstrap

export default {
  name: 'LoginBox',
  mounted() {
    this.useLDAPModel = this.useLDAP;
  },
  props: {
    title: String,
    showCloseBtn: Boolean,
    actionURL: {
      type: String,
      required: true,
    },
    useLDAP: Boolean,
  },
  data() {
    return {
      useLDAPModel: false,
      userNameModel: '',
      pwdModel: '',
    };
  },
  computed: {
    isUseLDAP() {
      return this.useLDAPModel;
    },
    userName() {
      return this.userNameModel.trim();
    },
    pwd() {
      return this.pwdModel.trim();
    },
  },
  methods: {
    onSubmit(e) {
      // FIXME: can this submit event be stopped.
      this.$emit('submit', e);
    },
  },
};
</script>

<style lang="scss" scoped>
.login-box-wrapper {
  max-width: 350px;
  padding: 10px 0;
  margin: 0 auto 10px;
  background-color: #fff;
}

.login-form {
  padding: 20px 40px 0;
}

.login-box {
  margin: 0 0 20px;
  padding: 0 0 20px;
  border: 1px solid #e6e6e6;
  .title {
    margin: 22px auto 8px;
    text-align: center;
    height: 51px;
    width: 175px;
  }
}

.switch-block {
  text-align: center;
  border: 1px solid #e6e6e6;
  padding: 15px;
}
</style>
