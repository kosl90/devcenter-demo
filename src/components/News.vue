<template>
<div>
  <div class="title"><h3 class="name">{{ title }}</h3><a class="more" href="#">更多 >></a></div>
  <ul class="content">
    <li class="item" v-for="item in items"><a :href="item.link" target="_blank">{{item.title}}</a></li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'News',
  props: {
    items: {
      /* type: Object, */
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  line-height: 33px;
  overflow: hidden;
  zoom: 1;
  padding-bottom: 20px;
  border-bottom: 1px solid gray;

  .name {
    float: left;
    margin: 0;
  }

  .more {
    float: right;
  }
}

ul, li {
  padding: 0;
}

.item {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding: 0 80px 0 15px;

  // position: relative;
  // a {
  //   position: absolute;
  //   top: 0;
  //   right: 0;
  // }
}
</style>
