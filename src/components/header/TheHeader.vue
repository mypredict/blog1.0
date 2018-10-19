<template lang="pug">
  header.top-header
    div.header-title
      router-link.title-name(:to="{name:'TopHome'}") 结凉果的博客
      p.my-introduction ---爱吃爱玩爱睡觉的家伙
    nav.header-nav
      ul
        li
          router-link.nav-link.nav-home(:to="{name:'TopHome'}") 博客首页
        li
          router-link.nav-link(:to="{name:'WebRouter'}") 技术文章
        li
          router-link.nav-link(:to="{name:'LifeRouter'}") 生活文章
        li
          router-link.nav-link(:to="{name:'TopMyself'}") 关于博主
        li
          router-link.nav-link(:to="{name:'TopBoard'}") 留言板
</template>

<script type="text/javascript">
export default {
  name: 'TheHeader'
}
</script>

<style lang="scss" scoped>
header.top-header {
  width: 100%;
  height: 10em;
  background-color: $mainbgc;
  .header-title {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 65%;
    min-width: 30em;
    height: 45%;
    margin: 0 auto;
    .title-name {
      font-size: 1.7em;
      color: $mainfontc;
    }
    p.my-introduction {
      color: $mainfontc;
    }
  }
  nav.header-nav {
    width: 65%;
    min-width: 30em;
    height: 55%;
    margin: 0 auto;
    padding-top: 1em;
    ul {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 100%;
    }
    .nav-link {
      color: $mainfontc;
      font-size: 1.2em;
    }
    .router-link-active {
      color: $selectc;
    }
    .nav-home {
      color: $mainfontc;
    }
  }
}
</style>
