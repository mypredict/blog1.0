<template lang="pug">
  footer.top-footer
    a(href="http://www.miitbeian.gov.cn/", target="_blank") 豫ICP备18009358号
</template>

<script type="text/javascript">
export default {
  name: 'TheFooter'
}
</script>

<style lang="scss" scoped>
footer.top-footer {
  width: 100%;
  height: 3em;
  line-height: 3;
  text-align: center;
  border-top: 1px solid $cutlinec;
  a {
    color: $font2;
  }
  a:hover {
    color: $linkhoverc;
  }
}
</style>
