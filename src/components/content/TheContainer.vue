<template lang="pug">
  div.top-container
    router-view(name="TopHome")
    router-view(name="WebRouter")
    router-view(name="LifeRouter")
    router-view(name="TopMyself")
    router-view(name="TopBoard")
</template>

<script type="text/javascript">
export default {
  name: 'TheContainer'
}
</script>

<style lang="scss" scoped>
.top-container {
  width: 60%;
  min-width: 30em;
  min-height: 40em;
  margin: 3em auto;
  // background-color: #F9FFF9;
}
</style>
