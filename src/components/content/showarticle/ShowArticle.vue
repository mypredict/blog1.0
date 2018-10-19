<template lang="pug">
  div.show-article
    header.show-article-title
      h1.show-title {{ $route.params.id.title }}
      div.show-little-lable
        time 更新: {{ $route.params.id.time }}
        span 浏览: {{ $route.params.id.looks }}
    div.show-article-content
    //- div.show-article-words
    //-   LeaveWord
    //-   div.word-num 共593条评论... (暂不支持)
      //- ul
      //-   li(v-for="leaveWord of leaveWord_data" :key="leaveWord.id")
      //-     figure.author-head
      //-       div.img-container
      //-         img(:src="leaveWord.imgsrc")
      //-     div.users-word
      //-       div.author-word
      //-         p.author-content <span class="author-name">{{ leaveWord.author }}</span>: {{ leaveWord.authorword }}
      //-       div.reply-word
      //-         section(v-for="replyWord of leaveWord.replyWord_data" :key="replyWord.id")
      //-           p <span class="author-name">{{ replyWord.replyname1 }}</span>回复<span class="author-name">{{ replyWord.coverreplyname1 }}</span>: {{ replyWord.replyword1 }}
      //-           footer.time-reply
      //-             time {{ replyWord.time }}
      //-             p.reply-good <i class="iconfont icon-combinedshapecopy2" title="回复" @click="writeReply">回复</i><i class="iconfont icon-dianzan1" title="点赞" @click="replyGood"> {{ replyWord.replyGoodNum }}</i>
      //-       footer.first-reply
      //-         time.first-time {{ leaveWord.time }}
      //-         p.first-reply-good <i class="iconfont icon-combinedshapecopy2" title="回复" @click="writeReply">回复</i><i class="iconfont icon-dianzan1" title="点赞" @click="replyGood"> {{ leaveWord.replyGoodNum }}</i>
</template>

<script type="text/javascript">
import LeaveWord from '../common/LeaveWord'
import axios from 'axios'

export default {
  name: 'ShowArticle',
  components: {
    LeaveWord
  },
  data () {
    return {
      leaveWord_data: []
    }
  },
  created () {
    // 每进一次就统计一次浏览
    let theId = this.$route.params.id._id
    let theType = this.$route.params.id.type
    let theLooks = this.$route.params.id.looks
    axios.get(`/node/looks?id=${theId}&type=${theType}&looks=${theLooks}`)
      .then(response => {
        if (response.data === 1) {
          this.$route.params.id.looks++
        }
      })
      .catch(error => {
        console.log(error)
      })
  },
  mounted () {
    document.getElementsByClassName('show-article-content')[0].innerHTML = this.$route.params.id.article
  },
  methods: {
    replyGood (e) {
      if (!e.target.once) {
        e.target.style.color = '#E75D21'
        e.target.innerText++
        e.target.once = true
      }
    },
    writeReply (e) {
      document.getElementsByClassName('shade-floor')[0].style.display = 'block'
      document.getElementsByClassName('reply-word-container')[0].style.display = 'block'
    }
  }
}
</script>

<style lang="scss">
.show-article {
  h1, h2, h3, h4, h5, h6 {
    color: #333;
    line-height: 2.5;
    font-weight: 500;
  }
  .show-article-content {
    width: 100%;
    ul {
      list-style: disc;
    }
    li {
      margin-left: 1em;
      font-size: 1.1em;
      line-height: 1.6em;
      color: #555;
    }
    p {
      font-size: 1.2em;
      line-height: 1.6em;
      color: #555;
    }
    pre {
      min-width: 100%;
      margin: 1em auto;
      padding: 1em;
      overflow: auto;
      background: #eee;
    }
    code {
      line-height: 1.4em;
      font-size: 1em;
    }
    img {
      max-width: 100%;
      margin: 2em 0;
    }
    a {
      color: #248F8E;
    }
    a:hover {
      color: #2356D8;
    }
  }
}
</style>

<style lang="scss" scoped>
.show-article {
  width: 80%;
  margin: auto;
  h1, h2, h3, h4, h5, h6 {
    color: #333;
    line-height: 2;
    font-weight: 500;
  }
  header.show-article-title {
    width: 100%;
    margin: 2em auto;
    text-align: center;
    .show-little-lable {
      width: 100%;
      height: 3em;
      line-height: 3;
      color: #555;
    }
    time {
      margin-right: 5em;
    }
  }
  .show-article-content {
    width: 100%;
    p {
      font-size: 1.2em;
      line-height: 1.6em;
      color: #555;
    }
    pre {
      min-width: 100%;
      margin: 1em auto;
      padding: 1em;
      overflow: auto;
      background: #eee;
    }
    code {
      line-height: 1.4em;
      font-size: 1em;
    }
    img {
      max-width: 100%;
      margin: 2em 0;
    }
  }
  .show-article-words {
    width: 100%;
    margin-top: 5em;
    .word-num {
      width: 100%;
      height: 3em;
      line-height: 3;
      margin: 3em auto;
      padding-left: 0.5em;
      color: $mainfontc;
      border-bottom: 1px solid $cutlinec;
    }
    ul {
      background-color: #F9FFF9;
      padding: 1em;
      width: 100%;
      li {
        display: flex;
        justify-content: space-between;
        width: 100%;
        min-height: 3em;
        margin-top: 2em;
        padding-bottom: 1em;
        border-bottom: 1px solid $cutlinec;
        color: $boardfontc;
      }
      span.author-name {
        color: $mainfontc;
      }
      figure.author-head {
        width: 4em;
        .img-container {
          width: 3em;
          margin: 0 auto;
          border-radius: 50%;
          border: 1px solid #ccc;
          overflow: hidden;
          img {
            width: 100%;
          }
        }
      }
      .users-word {
        width: 90%;
      }
      .author-word {
        width: 100%;
        p.author-content {
          font-size: 1.1em;
          line-height: 1.5;
        }
      }
      .reply-word {
        width: 100%;
        padding-left: 1em;
        section {
          margin: 0.5em auto;
          border-bottom: 1px solid $cutlinec;
          p {
            letter-spacing: 2px;
            line-height: 1.5em;
          }
        }
      }
      footer.time-reply {
        display: flex;
        justify-content: flex-end;
        width: 100%;
        height: 2em;
        color: #666;
        time {
          line-height: 2.5;
          font-size: 0.9em;
          margin-right: 3em;
        }
        p.reply-good {
          line-height: 2.5;
          font-size: 0.9em;
          i {
            font-size: 1em;
            letter-spacing: 0;
            cursor: pointer;
            margin-right: 1em;
            transition: color 0.3s;
          }
          i:hover {
            color: $titlelinkc;
          }
        }
      }
      footer.first-reply {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 2em;
        line-height: 3;
        color: #666;
        margin-top: 2em;
        i {
          letter-spacing: 0;
          cursor: pointer;
          margin-left: 1em;
          transition: color 0.3s;
        }
        i:hover {
          color: $titlelinkc;
        }
      }
    }
  }
}
</style>
