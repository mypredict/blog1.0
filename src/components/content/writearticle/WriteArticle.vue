<template lang="pug">
  div.write-article
    input.write-title(placeholder="请输入标题...", autofocus="true")
    input.write-lable(placeholder="请输入标签...", maxlength="8")
    input.write-img(placeholder="请输入图片地址")
    textarea#write-article-board(@keyup="updateHtml", placeholder="正文文章...")
    div.article-submit
      span.submit-data(@click="submitData") 提交
    div.look-html 预览样式
    div#show-html
</template>

<script type="text/javascript">
import showdown from 'showdown'
import axios from 'axios'

export default {
  name: 'WriteArticle',
  data () {
    return {
      showHtml: ''
    }
  },
  methods: {
    updateHtml (e) {
      e.target.style.height = 0
      e.target.style.height = e.target.scrollHeight + 'px'
      let text = document.getElementById('write-article-board').value
      let converter = new showdown.Converter()
      this.showHtml = converter.makeHtml(text)
      document.getElementById('show-html').innerHTML = this.showHtml
    },
    submitData () {
      let articleTitle = document.getElementsByClassName('write-title')[0].value
      let articleLable = document.getElementsByClassName('write-lable')[0].value
      let articleImg = document.getElementsByClassName('write-img')[0].value
      let formData = new FormData()
      let postUrl = ''
      if (window.location.href.indexOf('web') > 1) {
        formData.append('type', 'web')
        postUrl = 'web'
      }
      if (window.location.href.indexOf('life') > 1) {
        formData.append('type', 'life')
        postUrl = 'life'
      }
      if (articleImg) {
        formData.append('img', articleImg)
      }
      formData.append('title', articleTitle)
      formData.append('lable', articleLable)
      formData.append('article', this.showHtml)
      if (articleTitle && articleLable && this.showHtml) {
        axios.post(`/node/publish`, formData, {
          timeout: 10000
        })
          .then((response) => {
            if (response.data === 1) {
              window.location.href = `https://gljblog.com/#/${postUrl}`
            } else {
              document.getElementsByClassName('shade-floor')[0].style.display = 'block'
              document.getElementsByClassName('drag-container')[0].style.display = 'block'
            }
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        alert('请填写完整')
      }
    }
  }
}
</script>

<style lang="scss">
.write-article {
  h1, h2, h3, h4, h5, h6 {
    color: #333;
    line-height: 2em;
    font-weight: 500;
  }
  li, p, span, a {
    font-size: 1.1em;
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
  }
  ul {
    list-style: disc;
  }
}
</style>

<style lang="scss" scoped>
.write-article {
  width: 100%;
  min-height: 50em;
  background: #fff;
}
input.write-title {
  width: 100%;
  height: 2em;
  padding: 0;
  border: none;
  outline: none;
  font-size: 1.5em;
  color: #333;
}
input.write-lable, input.write-img {
  width: 100%;
  height: 2em;
  margin: 2em auto;
  padding: 0;
  border: none;
  outline: none;
  font-size: 1.2em;
  color: #555;
}
.look-html {
  width: 100%;
  height: 4em;
  line-height: 4;
  font-size: 1.4em;
  color: #33A3A2;
}
textarea#write-article-board {
  width: 100%;
  min-height: 5em;
  margin: 0;
  padding: 0;
  overflow: hidden;
  resize: none;
  border: none;
  outline: none;
  font-size: 1.1em;
  line-height: 1.3em;
  color: #555;
  font-family: PingFangSC-Light;
}
#show-html {
  width: 100%;
  min-height: 5em;
  word-wrap: break-word;
  color: #333;
}
.article-submit {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 2.5em;
  margin-top: 2em;
  span {
    user-select: none;
    display: block;
    cursor: pointer;
    width: 5em;
    height: 2.3em;
    line-height: 2.3;
    text-align: center;
    color: #555;
    border: 1px solid #eee;
    border-radius: 5px;
    transition: background-color 0.3s;
  }
  span:hover {
    background-color: #eee;
  }
}
</style>
