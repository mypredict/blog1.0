<template lang="pug">
  div.home-list
    div.login-register
      span.login-register-link(@click="loginRegister") 登录/注册
    ul
      li(v-for="homeList of homeLists_data" :key="homeList.id")
        section
          figure.article-left
            router-link.article-img(:to="{name:'WebRouter/ShowArticle', params:{id:homeList}}", title="查看本篇文章...")
              ImgCenterMove(:img-src="homeList.img")
          div.article-right
            header.article-top
              router-link.article-title(:to="{name:'WebRouter/ShowArticle', params:{id:homeList}}", :title="homeList.title") {{ homeList.title }}
              //- span.article-ranking {{ homeList.id }}
            p.article-content {{ homeList.article.replace(/<.*?>/ig, "") }}
            footer.article-introduce
              router-link.article-lable(:to="{name:'WebRouter'}", title="转到本模块...") {{ homeList.lable }}
              time {{ homeList.time }}
              span.article-look 浏览: {{ homeList.looks }}
    div.article-loading
      span.font-loading(@click="loadArticle", v-if="showMore===1") 加载更多...
      div.loading-animation(v-else-if="showMore===2")
        div.loading-circle
        div.loading-circle
        div.loading-circle
      span.font-noloading(v-else) 没有更多了...
</template>

<script type="text/javascript">
import axios from 'axios'
import ImgCenterMove from '@/components/content/common/ImgCenterMove'

export default {
  name: 'TopHome',
  components: {
    ImgCenterMove
  },
  data () {
    return {
      homeLists_data: [],
      showMore: 1
    }
  },
  computed: {
    articleListLength () {
      return this.homeLists_data.length
    }
  },
  created () {
    document.getElementsByClassName('nav-home')[0].style.color = '#24C513'
    // axios.get('/node/get?type=web&count=0')
    //   .then(response => {
    //     // 判断是否还有数据
    //     if (response.data.pop().isMore) {
    //       this.showMore = 1
    //     } else {
    //       this.showMore = 10
    //     }
    //     this.homeLists_data.push(...response.data)
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })
  },
  destroyed () {
    document.getElementsByClassName('nav-home')[0].style.color = '#33A3A2'
  },
  methods: {
    loadArticle () {
      this.showMore = 2
      axios.get(`../../../static/aa.json`)
        .then(response => {
          console.log(response.data)
          var aaa = JSON.parse(response.data)
          console.log(aaa)
        })
        .catch(error => {
          console.log(error)
        })
      // axios.get(`/node/get?type=web&count=${this.articleListLength}`)
      //   .then(response => {
      //     // 判断是否还有数据
      //     if (response.data.pop().isMore) {
      //       this.showMore = 1
      //     } else {
      //       this.showMore = 10
      //     }
      //     this.homeLists_data.push(...response.data)
      //   })
      //   .catch(error => {
      //     console.log(error)
      //   })
    },
    loginRegister () {
      document.getElementsByClassName('shade-floor')[0].style.display = 'block'
      document.getElementsByClassName('drag-container')[0].style.display = 'block'
    }
  }
}
</script>

<style lang="scss" scoped>
.home-list {
  width: 100%;
  padding: 2em 0;
  .login-register {
    width: 100%;
    height: 2em;
    line-height: 2;
    margin-bottom: 2em;
    padding-right: 1em;
    .login-register-link {
      cursor: pointer;
      font-size: 1.1em;
      color: $mainfontc;
      float: right;
      transition: color 0.3s;
    }
    .login-register-link:hover {
      color: $linkhoverc;
    }
  }
  .article-loading {
    width: 100%;
    height: 3em;
    line-height: 3;
    text-align: center;
    span.font-loading {
      cursor: pointer;
      color: $font2;
      transition: color 0.5s;
    }
    span.font-loading:hover {
      color: $font2hover;
    }
    span.font-noloading {
      color: $font2;
    }
    .loading-animation {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 4em;
      height: 100%;
      margin: 0 auto;
      .loading-circle {
        width: 0.8em;
        height: 0.8em;
        border-radius: 50%;
        animation: loading-circle linear 1s infinite;
        background: $font2;
      }
      .loading-circle:nth-child(1) {
        animation-delay: 0s;
      }
      .loading-circle:nth-child(2) {
        animation-delay: 0.2s;
      }
      .loading-circle:nth-child(3) {
        animation-delay: 0.4s;
      }
      @keyframes loading-circle {
        0%,60%,100% { transform: scale(1); }
        30% { transform: scale(1.5); }
      }
    }
  }
  li {
    height: 12em;
    border-bottom: 1px solid $cutlinec;
    margin-bottom: 2em;
  }
  section {
    display: flex;
    justify-content: space-between;
    height: 100%;
    padding: 1em;
    figure.article-left {
      width: 30%;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .article-right {
      display: flex;
      flex-flow: column wrap;
      justify-content: space-between;
      width: 68%;
      overflow: hidden;
      header.article-top {
        display: flex;
        justify-content: space-between;
        width: 100%;
        max-height: 35%;
        overflow: hidden;
        .article-title {
          max-width: 85%;
          line-height: 1.5;
          font-size: 1.1em;
          color: $titlelinkc;
        }
        .article-title:hover {
          color: $linkhoverc;
        }
        span.article-ranking {
          line-height: 1.5;
          width: 15%;
          text-align: right;
          color: $lablefontc;
        }
      }
      p.article-content {
        max-height: 45%;
        line-height: 1.5;
        overflow: hidden;
        color: #555;
      }
      footer.article-introduce {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        height: 20%;
        .article-lable {
          min-width: 6em;
          height: 1.8em;
          line-height: 1.8;
          background-color: $hoverc;
          transition: background-color 0.5s;
          font-size: 0.9em;
          color: #FFF;
          border-radius: 5px;
          text-align: center;
        }
        .article-lable:hover {
          background-color: $lablehoverc;
        }
        time, span.article-look {
          font-size: 0.9em;
          color: $lablefontc;
        }
      }
    }
  }
}
</style>
