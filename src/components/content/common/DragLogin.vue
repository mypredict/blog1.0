<template lang="pug">
  div.drag-container
    div.drag-flex
      header.drag-header(@mousedown="mouseDown")
        i.iconfont.icon-close1(@click="dragClose", title="关闭")
      div.input-message
        div.point-out
          span.account-login(v-if="isPointout === 0") 账号登录
          span.sms-login(v-else-if="isPointout === 1") 短信登录
          span.user-register(v-else-if="isPointout === 2") 用户注册
          span.forget-password(v-else) 重置密码
        form#submit-login-register(name="loginform")
          //- 账号登录
          template(v-if="isInput === 0")
            input.drag-username(key="username-input", type="text", name="username", placeholder="手机号/账号", required, autofocus)
            input.drag-password(key="pw0-input", type="password", name="password", placeholder="密码", required)
            input.login-submit.submit(type="submit", name="submit", value="登录", @click="theLogin")
          //- 短信登录
          template(v-else-if="isInput === 1")
            input.drag-telephone(type="tel", name="telephone", placeholder="手机号(暂不支持)", required, autofocus)
            p <input class="drag-testcode" type="text" name="textcode" placeholder="验证码" required><span class="get-testcode">获取验证码</span>
            input.login-submit.submit(type="submit", name="submit", value="登录")
          //- 用户注册获取验证码
          template(v-else-if="isInput === 2")
            input.drag-telephone(type="tel", name="telephone", placeholder="手机号(暂不支持)", required, autofocus)
            p <input class="drag-testcode" type="text" name="textcode" placeholder="验证码" required><span class="get-testcode">获取验证码</span>
            input.login-submit.submit(type="button", name="submit", value="下一步", @click="registerSkip")
          //- 用户注册填写用户名和密码
          template(v-else-if="isInput === 3")
            input.drag-username(key="usernames-input", type="text", name="username", placeholder="用户名(暂不支持)", required, autofocus)
            input.drag-password(key="pw1-input", type="password", name="password", placeholder="输入密码", required)
            input.again-password(key="pw2-input", type="password", name="password", placeholder="确认密码", required)
            input.login-submit.submit(type="submit", name="submit", value="完成")
          //- 忘记密码获取短信验证码
          template(v-else-if="isInput === 4")
            input.drag-telephone(type="tel", name="telephone", placeholder="手机号(暂不支持)", required, autofocus)
            p <input class="drag-testcode" type="text" name="textcode" placeholder="验证码" required><span class="get-testcode">获取验证码</span>
            input.login-submit.submit(type="button", name="submit", value="下一步", @click="isInput = 5")
          //- 用户更改密码再次确认最后一步
          template(v-else)
            input.drag-password(key="pw3-input", type="password", name="password", placeholder="输入密码", required)
            input.again-password(key="pw4-input", type="password", name="password", placeholder="确认密码", required)
            input.login-submit.submit(type="submit", name="submit", value="完成")
        div.toggle-forget-login
          span.forget-password(@click="isInput = 4, isPointout = 3") 忘记密码？
          span.sms-login(v-if="isAccount", @click="isAccount = !isAccount") 短信登录
          span.account-login(v-else, @click="isAccount = !isAccount") 账号登录
      footer.drag-footer
        span.toggle-register(v-if="isShow", @click="isShow = !isShow") 注册
        span.toggle-login(v-else, @click="isShow = !isShow") 登录
</template>

<script type="text/javascript">
import axios from 'axios'

export default {
  name: 'DragLogin',
  data () {
    return {
      displays: true,
      isMousedown: false,
      containerX: '',
      containerY: '',
      mouseX: '',
      mouseY: '',
      mouseContainerX: '',
      mouseContainerY: '',
      isPointout: 0,
      isAccount: true,
      isInput: 0,
      isShow: true
    }
  },
  computed: {
    theForm () {
      return document.getElementById('submit-login-register')
    }
  },
  watch: {
    isShow (val) {
      if (val) {
        if (this.isAccount) {
          this.isPointout = 0
          this.isInput = 0
        } else {
          this.isPointout = 1
          this.isInput = 1
        }
      } else {
        this.isPointout = 2
        this.isInput = 2
      }
    },
    isAccount (val) {
      if (val) {
        this.isPointout = 0
        this.isShow = true
        this.isInput = 0
      } else {
        this.isPointout = 1
        this.isShow = true
        this.isInput = 1
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      window.addEventListener('mousemove', this.dragMousemoveEvent)
      window.addEventListener('mouseup', this.dragMouseupEvent)
    })
  },
  destroyed () {
    window.removeEventListener('mousemove', this.dragMousemoveEvent)
    window.removeEventListener('mouseup', this.dragMouseupEvent)
  },
  methods: {
    theLogin (e) {
      e.preventDefault()
      let formData = new FormData()
      if (this.theForm.password.value) {
        formData.append('username', this.theForm.username.value)
        formData.append('password', this.theForm.password.value)
      }
      axios.post('/node/login', formData, {
        timeout: 10000
      })
        .then(response => {
          if (response.data === 1) {
            this.dragClose()
          } else {
            alert('密码或者账号错误')
          }
        })
        .catch(error => {
          alert(error)
        })
    },
    registerSkip (e) {
      e.preventDefault()
      let theTelephone = this.theForm.telephone.value
      let textCode = this.theForm.textcode.value
      if (theTelephone && textCode) {
        this.isInput = 3
      } else {
        alert('请填写完整')
      }
    },
    mouseDown (e) {
      this.isMousedown = true
      this.containerX = this.$el.getBoundingClientRect().left
      this.containerY = this.$el.getBoundingClientRect().top
      this.mouseX = e.clientX
      this.mouseY = e.clientY
      this.mouseContainerX = this.mouseX - this.containerX
      this.mouseContainerY = this.mouseY - this.containerY
    },
    dragMousemoveEvent (e) {
      if (this.isMousedown) {
        this.$el.style.left = (e.clientX - this.mouseContainerX) + 'px'
        this.$el.style.top = (e.clientY - this.mouseContainerY) + 'px'
      }
    },
    dragMouseupEvent () {
      this.isMousedown = false
    },
    dragClose () {
      this.$el.style.display = 'none'
      document.getElementsByClassName('shade-floor')[0].style.display = 'none'
    }
  }
}
</script>

<style lang="scss" scoped>
.drag-container {
  display: none;
  position: fixed;
  width: 23em;
  height: 27em;
  top: 150px;
  left: 500px;
  background-color: #FFF;
  z-index: 200;
  user-select: none;
  .drag-flex {
    display: flex;
    flex-flow: column wrap;
    justify-content: space-between;
    width: 100%;
    height: 100%;
  }
  header.drag-header {
    width: 100%;
    height: 2.5em;
    text-align: right;
    cursor: move;
    overflow: hidden;
    i.icon-close1 {
      font-size: 2.5em;
      cursor: pointer;
      color: #999;
      transition: background 0.3s, color 0.3s;
    }
    i.icon-close1:hover {
      color: #FFF;
      background: #23C4D8;
    }
  }
  .input-message {
    display: flex;
    flex-flow: column wrap;
    justify-content: space-between;
    width: 100%;
    height: 19em;
    padding: 0 1em;
    .point-out {
      width: 100%;
      height: 2em;
      line-height: 2;
      font-size: 1.1em;
      span {
        color: #33A3A2;
      }
    }
    form#submit-login-register {
      display: flex;
      flex-flow: column wrap;
      justify-content: space-between;
      width: 100%;
      height: 12em;
      input {
        width: 100%;
        height: 2.5em;
        padding-left: 0.5em;
        color: #333;
        font-size: 0.95em;
        border: none;
        border-bottom: 1px solid #eee;
        outline: none;
      }
      input:focus {
        border-bottom: 1px solid #23c4d8;
      }
      p {
        display: block;
        width: 100%;
        height: 2.5em;
      }
      span.get-testcode {
        float: right;
        width: 45%;
        height: 100%;
        line-height: 2.5;
        color: #555;
        text-align: center;
        border: 1px solid #eee;
        cursor: pointer;
        transition: background 0.3s;
      }
      span.get-testcode:hover {
        background: #eee;
      }
      input.submit {
        background: #23c4d8;
        color: #fff;
        cursor: pointer;
        transition: background 0.3s;
      }
      input.submit:hover {
        background: #5BDAEA;
      }
      .drag-testcode {
        width: 50%;
      }
    }
    .toggle-forget-login {
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 2em;
      line-height: 2;
      span {
        color: #425EDD;
        font-size: 0.9em;
        cursor: pointer;
      }
      span:hover {
        color: #6486F0;
      }
    }
  }
  footer.drag-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 4.5em;
    padding-right: 1em;
    span {
      width: 4em;
      height: 2em;
      line-height: 2;
      text-align: center;
      border-radius: 5px;
      border: 1px solid #eee;
      color: #555;
      cursor: pointer;
      transition: background 0.3s, color 0.3s;
    }
    span:hover {
      color: #333;
      background: #eee;
    }
  }
}
</style>
