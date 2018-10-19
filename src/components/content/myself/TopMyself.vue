<template lang="pug">
  div.myself-list
    div.myself-bigimg
      div.bigimg-close
        i.iconfont.icon-close1(@click="closeBigimg")
      div.bigimg-container
        img.show-the-img(src="/image/qqcode.png")
    CutImage
    ShadeFloor(ref="closes")
    div.myself-profile-photo(@mouseenter="showSwitchHead", @mouseleave="hiddenSwitchHead", @click="showCutBoard")
      div.taggle-head 切换头像
      img(src="/image/head.jpg")
    div.myself-name-job
      span 郭良杰 - web开发
    span.myself-title 联系方式
    div.myself-contact-way
      div.myself-qq(@mouseenter="showImgcode1 = !showImgcode1", @mouseleave="showImgcode1 = !showImgcode1")
        img(src="/image/qq.png")
        transition(name="imgcode1")
          div.myself-code(v-if="showImgcode1")
            a(target="_blank", href="http://wpa.qq.com/msgrd?v=3&uin=1367950207&site=qq&menu=yes")
              i.iconfont.icon-tianjia(title="添加好友")
            img(src="/image/qqcode.png", title="点击看大图", @click="showBigimg")
      div.myself-wechat(@mouseenter="showImgcode2 = !showImgcode2", @mouseleave="showImgcode2 = !showImgcode2")
        img(src="/image/wechat.png")
        transition(name="imgcode2")
          div.myself-code(v-if="showImgcode2")
            img(src="/image/wechatcode.png", title="点击看大图", @click="showBigimg")
      div.myself-qqgroup(@mouseenter="showImgcode3 = !showImgcode3", @mouseleave="showImgcode3 = !showImgcode3")
        img(src="/image/qqgroup.jpg")
        transition(name="imgcode3")
          div.myself-code(v-if="showImgcode3")
            a(target="_blank", href="https://jq.qq.com/?_wv=1027&k=5oxDG0E")
              i.iconfont.icon-tianjia(title="添加qq群")
            img(src="/image/qqgroupcode.png", title="点击看大图", @click="showBigimg")
    span.myself-title 专业技能
    div.myself-major-tree
      figure.myself-major
        div.major-container
          ImgCenter(img-src="/image/html.jpg")
        figcaption 熟悉
      figure.myself-major
        div.major-container
          ImgCenter(img-src="/image/css.jpg")
        figcaption 熟悉
      figure.myself-major
        div.major-container
          ImgCenter(img-src="/image/js.png")
        figcaption 熟悉
      figure.myself-major
        div.major-container
          ImgCenter(img-src="/image/es6.jpg")
        figcaption 熟悉
      figure.myself-major
        div.major-container
          ImgCenter(img-src="/image/vue.png")
        figcaption 略懂
      figure.myself-major
        div.major-container
          ImgCenter(img-src="/image/node.jpg")
        figcaption 略懂
    span.myself-title 个人兴趣
    div.myself-personal-interest
      span 研究最新技术,开阔眼界
</template>

<script type="text/javascript">
import ImgCenter from '@/components/content/common/ImgCenter'
import CutImage from '@/components/content/common/CutImage'
import ShadeFloor from '@/components/content/common/ShadeFloor'

export default {
  name: 'TopMyself',
  components: {
    ImgCenter,
    CutImage,
    ShadeFloor
  },
  data () {
    return {
      showImgcode1: false,
      showImgcode2: false,
      showImgcode3: false
    }
  },
  methods: {
    showSwitchHead () {
      let upSwitchHead = document.getElementsByClassName('taggle-head')[0]
      upSwitchHead.style.transition = 'transform 300ms ease-out'
      upSwitchHead.style.transform = 'translate(0px, -3em)'
    },
    hiddenSwitchHead () {
      let downSwitchHead = document.getElementsByClassName('taggle-head')[0]
      downSwitchHead.style.transition = 'transform 300ms ease-out'
      downSwitchHead.style.transform = 'translate(0px, 0)'
    },
    showCutBoard () {
      document.getElementsByClassName('cut-board')[0].style.display = 'block'
      document.getElementsByClassName('shade-floor')[0].style.display = 'block'
    },
    closeBigimg () {
      document.getElementsByClassName('myself-bigimg')[0].style.display = 'none'
      document.getElementsByClassName('shade-floor')[0].style.display = 'none'
    },
    showBigimg (e) {
      document.getElementsByClassName('myself-bigimg')[0].style.display = 'block'
      document.getElementsByClassName('shade-floor')[0].style.display = 'block'
      document.getElementsByClassName('show-the-img')[0].src = e.target.src
    }
  }
}
</script>

<style lang="scss" scoped>
.myself-list {
  width: 100%;
  background-color: #FFF;
  text-align: center;
  .myself-bigimg {
    display: none;
    position: fixed;
    width: 70%;
    height: 70%;
    top: 15%;
    left: 15%;
    background: #FFF;
    z-index: 200;
    .bigimg-close {
      width: 100%;
      height: 3em;
      text-align: right;
      overflow: hidden;
      i.icon-close1 {
        font-size: 3em;
        cursor: pointer;
        color: #999;
        transition: background-color 0.3s, color 0.3s;
      }
      i.icon-close1:hover {
        color: #FFF;
        background: $lablehoverc;
      }
    }
    .bigimg-container {
      width: 100%;
      height: 80%;
    }
    img {
      height: 100%;
    }
  }
  .myself-profile-photo {
    position: relative;
    width: 10em;
    height: 10em;
    margin: 0 auto;
    border-radius: 50%;
    cursor: pointer;
    overflow: hidden;
    .taggle-head {
      position: absolute;
      width: 100%;
      height: 3em;
      line-height: 3;
      left: 0;
      top: 100%;
      color: #fff;
      background-color: #000;
      opacity: 0.3;
    }
    img {
      width: 100%;
    }
  }
  .myself-name-job {
    width: 100%;
    margin: 2em 0 10em;
    text-align: center;
    span {
      font-size: 1.2em;
      color: #777;
    }
  }
  .myself-contact-way, .myself-major-tree, .myself-personal-interest {
    width: 100%;
    min-height: 10em;
    margin: 2em 0 10em;
    text-align: center;
  }
  .myself-contact-way {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .myself-qq, .myself-wechat, .myself-qqgroup {
      position: relative;
      width: 10em;
      height: 6em;
      overflow: hidden;
      padding: 0.5em;
      border: 1px solid #DDD;
      cursor: pointer;
      img {
        height: 100%;
      }
      .myself-code {
        position: absolute;
        text-align: center;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        padding: 0.5em;
        i.icon-tianjia {
          position: absolute;
          bottom: 0.2em;
          right: 0.2em;
          color: #777;
          font-size: 1.4em;
          transition: color 0.3s;
        }
        i.icon-tianjia:hover {
          color: #999;
        }
        img {
          height: 100%;
        }
      }
      .imgcode1-enter-active {
        animation: imgcode-in1 0.3s;
      }
      .imgcode1-leave-active {
        animation: imgcode-in1 0.3s reverse;
      }
      @keyframes imgcode-in1 {
        0% {
          transform: scale(0);
        }
        50% {
          transform: scale(1.3);
        }
        100% {
          transform: scale(1);
        }
      }
      .imgcode2-enter-active {
        animation: imgcode-in2 0.3s;
      }
      .imgcode2-leave-active {
        animation: imgcode-in2 0.3s reverse;
      }
      @keyframes imgcode-in2 {
        0% {
          transform: scale(0);
        }
        50% {
          transform: scale(1.3);
        }
        100% {
          transform: scale(1);
        }
      }
      .imgcode3-enter-active {
        animation: imgcode-in3 0.3s;
      }
      .imgcode3-leave-active {
        animation: imgcode-in3 0.3s reverse;
      }
      @keyframes imgcode-in3 {
        0% {
          transform: scale(0);
        }
        50% {
          transform: scale(1.3);
        }
        100% {
          transform: scale(1);
        }
      }
    }
  }
  .myself-major-tree {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    figure.myself-major {
      width: 30%;
      height: 10em;
      margin: 2em 0;
      .major-container {
        margin: 0 auto;
        width: 6em;
        height: 7em;
        overflow: hidden;
        img {
          width: 100%;
          height: 7em;
        }
      }
      figcaption {
        width: 100%;
        height: 3em;
        line-height: 3;
        color: #444;
      }
    }
  }
  .myself-personal-interest {
    span {
      color: #444;
    }
  }
  span.myself-title {
    font-size: 1.5em;
    color: #444;
  }
}
</style>
