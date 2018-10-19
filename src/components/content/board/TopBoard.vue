<template lang="pug">
  div.board-list
    LeaveWord
    div.word-num 共0条留言... (暂不支持留言)
    ul
      li(v-for="leaveWord of leaveWord_data" :key="leaveWord.id")
        figure.author-head
          div.img-container
            img(:src="leaveWord.imgsrc")
        div.users-word
          div.author-word
            p.author-content <span class="author-name">{{ leaveWord.author }}</span>: {{ leaveWord.authorword }}
          div.reply-word
            section(v-for="replyWord of leaveWord.replyWord_data" :key="replyWord.id")
              p <span class="author-name">{{ replyWord.replyname1 }}</span>回复<span class="author-name">{{ replyWord.coverreplyname1 }}</span>: {{ replyWord.replyword1 }}
              footer.time-reply
                //- time {{ replyWord.time }}
                p.reply-good <i class="iconfont icon-combinedshapecopy2" title="回复" @click="writeReply">回复</i><i class="iconfont icon-dianzan1" title="点赞" @click="replyGood"> {{ replyWord.replyGoodNum }}</i>
          footer.first-reply
            time.first-time {{ leaveWord.time }}
            p.first-reply-good <i class="iconfont icon-combinedshapecopy2" title="回复" @click="writeReply">回复</i><i class="iconfont icon-dianzan1" title="点赞" @click="replyGood"> {{ leaveWord.replyGoodNum }}</i>
    LazyLoad(:is-loading="isUpdata", :is-wait="isWait", @updata-more="loadWords")
</template>

<script type="text/javascript">
import LeaveWord from '../common/LeaveWord'
// import axios from 'axios'
import LazyLoad from '@/components/content/common/LazyLoad'

export default {
  name: 'TopBoard',
  components: {
    LeaveWord,
    LazyLoad
  },
  data () {
    return {
      leaveWord_data: [],
      isUpdata: true,
      isWait: true,
      isMoreData: true
    }
  },
  created () {
    // axios.get('http://localhost:8080/static/dataword.json')
    //   .then(response => {
    //     this.leaveWord_data = response.data
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })
  },
  methods: {
    replyGood (e) {
      // if (!e.target.once) {
      //   e.target.style.color = '#E75D21'
      //   e.target.innerText++
      //   e.target.once = true
      // }
    },
    writeReply (e) {
      document.getElementsByClassName('shade-floor')[0].style.display = 'block'
      document.getElementsByClassName('reply-word-container')[0].style.display = 'block'
    },
    loadWords () {
      // this.isWait = false
      // axios.get(`http://localhost:8080/static/dataword2.json`)
      //   .then(response => {
      //     this.leaveWord_data.push(...response.data)
      //     this.isMoreData = false
      //     if (this.isMoreData) {
      //       this.isWait = true
      //     } else {
      //       this.isUpdata = false
      //     }
      //   })
      //   .catch(error => {
      //     console.log(error)
      //   })
    }
  }
}
</script>

<style lang="scss" scoped>
.board-list {
  width: 100%;
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
    // background-color: #F9FFF9;
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
        user-select: none;
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
</style>
