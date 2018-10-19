<template lang="pug">
  div.reply-word-container
    i.iconfont.icon-close1(@click="closeReplyWord")
    textarea.reply-word-container-board(placeholder="留下你的意见...", autofocus="true")
    div.submit-reply-word-container
      span.insert-link 链接
      span.submit-word(@click="submitReplyWord") 提交
</template>

<script type="text/javascript">
import axios from 'axios'

export default {
  name: 'ReplyWord',
  methods: {
    closeReplyWord () {
      document.getElementsByClassName('shade-floor')[0].style.display = 'none'
      document.getElementsByClassName('reply-word-container')[0].style.display = 'none'
    },
    submitReplyWord () {
      // let replyWord = document.getElementsByClassName('reply-word-container-board')[0].value
      axios.post('/')
        .then(response => {
          this.leaveWord_data = response.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.reply-word-container {
  display: none;
  position: fixed;
  width: 50%;
  height: 10em;
  left: 25%;
  top: 25%;
  z-index: 200;
  i.icon-close1 {
    position: absolute;
    top: 0;
    left: 100%;
    font-size: 3em;
    cursor: pointer;
    color: #eee;
    transition: color 0.3s;
  }
  i.icon-close1:hover {
    color: #F9753C;
  }
  textarea.reply-word-container-board {
    width: 100%;
    height: 10em;
    line-height: 1.4em;
    padding: 0.5em;
    border: 1px solid #aaa;
    outline: none;
    border-radius: 10px;
    resize: none;
    color: #444;
    font-size: 1.1em;
  }
  .submit-reply-word-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 2.5em;
  }
  span {
    user-select: none;
    display: block;
    width: 5em;
    height: 2.3em;
    line-height: 2.3;
    text-align: center;
    color: #444;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;
  }
  span:hover {
    background: #eee;
  }
}
</style>
