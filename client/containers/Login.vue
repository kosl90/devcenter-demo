<script>
import LoginBox from '~components/LoginBox';

export default {
  name: 'Login',
  components: {
    LoginBox,
  },
};
</script>

<template>
  <login-box ref="model" actionURL="/loginService"></login-box>
</template>

