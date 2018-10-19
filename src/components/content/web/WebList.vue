<template lang="pug">
  div.article-list
    div.write-web-article
      router-link.write-web-link(:to="{name:'WebRouter/WriteArticle'}") 发表文章
    ul
      li(v-for="articleList of articleLists_data" :key="articleList._id")
        section
          figure.article-left
            router-link.article-img(:to="{name:'WebRouter/ShowArticle', params:{id:articleList}}", title="查看本篇文章...")
              ImgCenterMove(:img-src="articleList.img")
          div.article-right
            header.article-top
              router-link.article-title(:to="{name:'WebRouter/ShowArticle', params:{id:articleList}}", :title="articleList.title") {{ articleList.title }}
              //- span.article-ranking {{ articleList.id }}
            p.article-content {{ articleList.article.replace(/<.*?>/ig, "") }}
            footer.article-introduce
              router-link.article-lable(:to="{name:'WebRouter'}", title="转到本模块...") {{ articleList.lable }}
              time {{ articleList.time }}
              span.article-look 浏览: {{ articleList.looks }}
    LazyLoad(:is-loading="isUpdata", :is-wait="isWait", @updata-more="loadArticle")
</template>

<script type="text/javascript">
import LazyLoad from '@/components/content/common/LazyLoad'
import ImgCenterMove from '@/components/content/common/ImgCenterMove'
import axios from 'axios'

export default {
  name: 'WebList',
  components: {
    LazyLoad,
    ImgCenterMove
  },
  data () {
    return {
      articleLists_data: [],
      dataListNum: 1,
      isUpdata: true,
      isWait: true
    }
  },
  computed: {
    articleListLength () {
      return this.articleLists_data.length
    }
  },
  created () {
    axios.get('/node/get?type=web&count=0')
      .then(response => {
        // 判断是否还有数据
        if (response.data.pop().isMore) {
          this.isWait = true
        } else {
          this.isUpdata = false
        }
        this.articleLists_data.push(...response.data)
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    loadArticle () {
      this.isWait = false
      axios.get(`/node/get?type=web&count=${this.articleListLength}`)
        .then(response => {
          // 判断是否还有数据
          if (response.data.pop().isMore) {
            this.isWait = true
          } else {
            this.isUpdata = false
          }
          this.articleLists_data.push(...response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.article-list {
  width: 100%;
  padding: 2em 0;
  .write-web-article {
    width: 100%;
    height: 2em;
    line-height: 2;
    margin-bottom: 2em;
    padding-right: 1em;
    .write-web-link {
      cursor: pointer;
      font-size: 1.1em;
      color: $mainfontc;
      float: right;
      transition: color 0.3s;
    }
    .write-web-link:hover {
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
        // span.article-ranking {
        //   line-height: 1.5;
        //   width: 15%;
        //   text-align: right;
        //   color: $lablefontc;
        // }
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
