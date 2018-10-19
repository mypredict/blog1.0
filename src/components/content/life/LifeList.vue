<template lang="pug">
  div.life-list
    div.write-life-article
      router-link.write-life-link(:to="{name:'LifeRouter/WriteArticle'}") 发表文章
    ul
      li(v-for="lifeList of lifeLists_data" :key="lifeList.id")
        section
          figure.article-left
            router-link.article-img(:to="{name:'LifeRouter/ShowArticle', params:{id:lifeList}}", title="查看本篇文章...")
              ImgCenterMove(:img-src="lifeList.img")
          div.article-right
            header.article-top
              router-link.article-title(:to="{name:'LifeRouter/ShowArticle', params:{id:lifeList}}", :title="lifeList.title") {{ lifeList.title }}
              //- span.article-ranking {{ lifeList.id }}
            p.article-content {{ lifeList.article.replace(/<.*?>/ig, "") }}
            footer.article-introduce
              router-link.article-lable(:to="{name:'LifeRouter'}", title="转到本模块...") {{ lifeList.lable }}
              time {{ lifeList.time }}
              span.article-look 浏览: {{ lifeList.looks }}
    LazyLoad(:is-loading="isUpdata", :is-wait="isWait", @updata-more="loadArticle")
</template>

<script type="text/javascript">
import LazyLoad from '@/components/content/common/LazyLoad'
import ImgCenterMove from '@/components/content/common/ImgCenterMove'
import axios from 'axios'

export default {
  name: 'LifeList',
  components: {
    LazyLoad,
    ImgCenterMove
  },
  data () {
    return {
      lifeLists_data: [],
      dataListNum: 1,
      isUpdata: true,
      isWait: true
    }
  },
  computed: {
    lifeListLength () {
      return this.lifeLists_data.length
    }
  },
  created () {
    axios.get('/node/get?type=life&count=0')
      .then(response => {
        // 判断是否还有数据
        if (response.data.pop().isMore) {
          this.isWait = true
        } else {
          this.isUpdata = false
        }
        this.lifeLists_data.push(...response.data)
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    loadArticle () {
      this.isWait = false
      this.dataListNum++
      axios.get(`/node/get?type=life&count=${this.lifeListLength}`)
        .then(response => {
          // 判断是否还有数据
          if (response.data.pop().isMore) {
            this.isWait = true
          } else {
            this.isUpdata = false
          }
          this.lifeLists_data.push(...response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.life-list {
  width: 100%;
  padding: 2em 0;
  .write-life-article {
    width: 100%;
    height: 2em;
    line-height: 2;
    margin-bottom: 2em;
    padding-right: 1em;
    .write-life-link {
      cursor: pointer;
      font-size: 1.1em;
      color: $mainfontc;
      float: right;
      transition: color 0.3s;
    }
    .write-life-link:hover {
      color: $linkhoverc;
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
