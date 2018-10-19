<template lang="pug">
  div.page-list
    ul
      li
        router-link.wide-page.first-page(:to="{name:'TopLife', params:{key:1}}") 第一页
      li(v-for="pageList of pageLists" :key="pageList.id")
        router-link(:to="{name:'TopLife', params:{key:value}}") {{ pageList.id }}
      li.bundle-page
        router-link(:to="{name:'TopLife'}") ...
      li
        router-link.wide-page.next-page(:to="{name:'TopLife'}") 下一页
</template>

<script type="text/javascript">
export default {
  name: 'PageList',
  data () {
    return {
      pageLists: []
    }
  }
}
</script>

<style lang="scss" scoped>
.page-list {
  height: 2em;
  margin-top: 3em;
  ul {
    display: flex;
    width: 100%;
    height: 100%;
    padding-left: 1em;
  }
  a {
    display: block;
    width: 2.5em;
    height: 100%;
    line-height: 2;
    text-align: center;
    margin-right: 2px;
    border-radius: 3px;
    border: 1px solid #C465F0;
    color: $font3;
    transition: background-color 0.2s;
  }
  a.wide-page {
    width: 5em;
  }
  a:hover {
    background-color: $font3;
    color: #fff;
  }
}
</style>
