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
  <login-box actionURL="/loginService"></login-box>
</template>

