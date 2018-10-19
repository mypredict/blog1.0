<template lang="pug">
  div#app
    TheHeader
    TheContainer
    TheStick
    TheFooter
    DragLogin
    ShadeFloor
    ReplyWord
</template>

<script>
import TheHeader from './components/header/TheHeader'
import TheContainer from './components/content/TheContainer'
import TheFooter from './components/footer/TheFooter'
import TheStick from './components/content/common/TheStick'
import DragLogin from '@/components/content/common/DragLogin'
import ShadeFloor from '@/components/content/common/ShadeFloor'
import ReplyWord from '@/components/content/common/ReplyWord'

export default {
  name: 'App',
  components: {
    TheHeader,
    TheContainer,
    TheStick,
    TheFooter,
    DragLogin,
    ShadeFloor,
    ReplyWord
  }
}
</script>

<style lang="scss">
#app {
  width: 100%;
}
</style>
