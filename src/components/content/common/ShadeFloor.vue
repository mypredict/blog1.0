<template lang="pug">
  div.shade-floor
</template>

<script type="text/javascript">
export default {
  name: 'ShadeFloor'
}
</script>

<style lang="scss" scoped>
.shade-floor {
  display: none;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #000;
  opacity: 0.3;
  z-index: 100;
}
</style>
