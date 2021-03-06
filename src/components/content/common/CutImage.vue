<template lang="pug">
  div.cut-board
    div.left-cut-board
      div.img-board(@mouseenter="listenMousewheel", @mouseleave="removeMousewheel", @dragover="allowDrop")
        canvas#canvas-clip
      div.img-option
        div.upload-button
          span.upload-img(@click="focusInput") 上传
          input#taggle-img(type="file", accept="image/*", @change="uploadSuccess")
        div.control-size
          span ~
          div.slide-line
            div.slide-block
          span +
    div.right-show-board
      div.close-cut-board
        i.iconfont.icon-close1(@click="closeCutBoard")
      div.show-board
        canvas#right-canvas(width="400", height="400") 你的浏览器过于老旧无法实现canvas
      div.submit-button
        span.submit-img(@click="upClipImg") 提交
</template>

<script type="text/javascript">
import axios from 'axios'

export default {
  name: 'CutImage',
  data () {
    return {
      theImage: '', // 储存来自不同地方的图片
      theImg: '', // 储存上传的图片这个对象
      fromDragImg: '', // 储存来自拖动来的图片
      isOnlyOne: true, // 用来判断拖动和滚轮滚动在同一时间只能触发一个
      fromDrag: false, // 是否来自拖动来的图片
      isCanvasShow: false, // 让canvas动态赋值一次宽高
      isHaveImg: false, // 是否存在有图片
      isMoveInCanvas: false, // 鼠标是否移入canvas
      isMousedown: false, // canvas 判断鼠标是否按下
      isSlideMousedown: false, // 滑块判断鼠标是否按下
      imgCenterX: 0, // 图片中间位置的横坐标
      imgCenterY: 0, // 图片中间位置的纵坐标
      imgWH: 0, // 图片的长宽比(用于第一次显示的长宽)
      mouseX: 0, // 鼠标按下时的横坐标
      mouseY: 0, // 鼠标按下时的纵坐标
      imgMoveLeft: 0, // canvas 图片放置的横坐标位置(从哪开始画)
      imgMoveTop: 0, // canvas 图片放置的纵坐标的位置
      imgMoveX: 0, // canvas 记录图片在鼠标抬起时图片的横坐标位置
      imgMoveY: 0, // canvas 记录图片在鼠标抬起时图片的纵坐标位置
      slideFirstX: 0, // 鼠标按下时滑块的横坐标
      slideFinalX: 0, // 鼠标抬起时记录的横坐标
      firstImgWidth: 0, // 记录滑块操作后图片的宽度
      firstImgHeight: 0 // 记录滑块操作后图片的高度
    }
  },
  computed: {
    imgBoard () {
      return document.getElementsByClassName('img-board')[0]
    },
    theCanvas () {
      return document.getElementById('canvas-clip')
    },
    canvasCtx () {
      return this.theCanvas.getContext('2d')
    },
    canvasWidth () {
      return this.imgBoard.getBoundingClientRect().width * 2
    },
    canvasHeight () {
      return this.imgBoard.getBoundingClientRect().height * 2
    },
    canvasWH () {
      return this.canvasWidth / this.canvasHeight
    },
    clipLightX () {
      return (this.canvasWidth - 400) / 2
    },
    clipLightY () {
      return (this.canvasHeight - 400) / 2
    },
    slideLine () {
      return document.getElementsByClassName('slide-line')[0]
    },
    slideLineWidth () {
      return this.slideLine.clientWidth
    },
    slideBlock () {
      return document.getElementsByClassName('slide-block')[0]
    },
    lineBlockWidth () {
      return this.slideLine.clientWidth - this.slideBlock.clientWidth
    },
    rightCanvas () {
      return document.getElementById('right-canvas')
    },
    rightCanvasCtx () {
      return this.rightCanvas.getContext('2d')
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.imgBoard.addEventListener('drop', this.dropEvent)
      window.addEventListener('mousedown', this.mousedownEvent)
      window.addEventListener('click', this.clickEvent)
      window.addEventListener('mousemove', this.mousemoveEvent)
      window.addEventListener('mouseup', this.mouseupEvent)
      window.addEventListener('mousewheel', this.mousewheelEvent, false)
      window.addEventListener('DOMMouseScroll', this.DOMMouseScrollEvent, false)
    })
  },
  destroyed () {
    this.imgBoard.removeEventListener('drop', this.dropEvent)
    window.removeEventListener('mousedown', this.mousedownEvent)
    window.removeEventListener('click', this.clickEvent)
    window.removeEventListener('mousemove', this.mousemoveEvent)
    window.removeEventListener('mouseup', this.mouseupEvent)
    window.removeEventListener('mousewheel', this.mousewheelEvent)
    window.removeEventListener('DOMMouseScroll', this.DOMMouseScrollEvent)
  },
  methods: {
    // 触发上传时隐藏的input
    focusInput () {
      document.getElementsByClassName('shade-floor')[0].style.display = 'block'
      document.getElementById('taggle-img').click()
    },
    // 允许直接拖动桌面图片上传
    allowDrop (e) {
      e.preventDefault()
    },
    uploadSuccess () {
      // 只赋值一次canvas宽高等于包含元素(这里其实是两倍,用于解决canvas图片不清晰问题)
      if (!this.isCanvasShow) {
        this.isCanvasShow = true
        this.theCanvas.width = this.canvasWidth
        this.theCanvas.height = this.canvasHeight
      }
      // 第一次打开滑块居中显示
      this.slideFirstX = this.slideLineWidth / 2
      this.slideBlock.style.left = this.slideFirstX + 'px'
      // H5的 FileReader 读取上传的图片
      if (this.fromDrag) {
        this.theImage = this.fromDragImg
        this.fromDrag = false
      } else {
        this.theImage = document.getElementById('taggle-img').files[0]
      }
      let imgReader = new FileReader()
      imgReader.readAsDataURL(this.theImage)
      imgReader.onload = (e) => {
        this.theImg = new Image()
        this.theImg.src = e.target.result
        this.theImg.onload = () => {
          // 当更换图片时重置一些东西
          this.isHaveImg = true
          // 及时清空 input 否则换图时点击取消控制台报错
          document.getElementById('taggle-img').value = null
          // 重新计算新图片的长宽比
          this.imgWH = this.theImg.width / this.theImg.height
          // 计算第一次图片的显示大小和位置
          if (this.imgWH >= this.canvasWH) {
            this.theImg.width = this.canvasWidth
            this.theImg.height = this.theImg.width / this.imgWH
            // 重置图片的起始位置及调动时的起始位置
            this.imgMoveX = this.imgMoveLeft = 0
            this.imgMoveY = this.imgMoveTop = (this.canvasHeight - this.theImg.height) / 2
          } else {
            this.theImg.height = this.canvasHeight
            this.theImg.width = this.theImg.height * this.imgWH
            // 重置图片的起始位置及调动时的起始位置
            this.imgMoveX = this.imgMoveLeft = (this.canvasWidth - this.theImg.width) / 2
            this.imgMoveY = this.imgMoveTop = 0
          }
          // 图片中间位置的坐标
          this.imgCenterX = this.imgMoveX + this.theImg.width / 2
          this.imgCenterY = this.imgMoveY + this.theImg.height / 2
          // 赋值第一次图片拖动时的宽高
          this.firstImgWidth = this.theImg.width
          this.firstImgHeight = this.theImg.height
          this.redrawImage()
        }
      }
    },
    // 准备监听滑轮的事件
    listenMousewheel (e) {
      if (this.isHaveImg) {
        this.isMoveInCanvas = true
      }
    },
    // 移出canvas时移除监听滑轮事件
    removeMousewheel () {
      if (this.isHaveImg) {
        this.isMoveInCanvas = false
      }
    },
    // 每次移动或者操作大小变化时重绘
    redrawImage () {
      // 清屏左边canvas重绘
      this.canvasCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
      this.canvasCtx.drawImage(this.theImg, this.imgMoveLeft, this.imgMoveTop, this.theImg.width, this.theImg.height)
      // 画到右边的canvas上
      let imgClipData = this.canvasCtx.getImageData(this.clipLightX, this.clipLightY, 400, 400)
      this.rightCanvasCtx.clearRect(0, 0, 200, 200)
      this.rightCanvasCtx.putImageData(imgClipData, 0, 0)
      // 加上阴影层
      this.canvasCtx.save() // 保存第一个图层画上的图片
      this.canvasCtx.fillStyle = 'rgba(0, 0, 0, 0.4)'
      this.canvasCtx.fillRect(0, 0, this.canvasWidth, this.canvasHeight)
      this.canvasCtx.rect(this.clipLightX, this.clipLightY, 400, 400)
      this.canvasCtx.fillStyle = 'rgba(255, 255, 255, 10)'
      this.canvasCtx.fill()
      this.canvasCtx.restore()
      // 高亮显示中间的窗口
      this.canvasCtx.save()
      this.canvasCtx.beginPath() // 开始一个路径
      this.canvasCtx.rect(this.clipLightX, this.clipLightY, 400, 400) // 这个路径的路线
      this.canvasCtx.closePath() // 关闭这个路径
      this.canvasCtx.clip() // 剪下这块
      this.canvasCtx.drawImage(this.theImg, this.imgMoveLeft, this.imgMoveTop, this.theImg.width, this.theImg.height)
      this.canvasCtx.restore()
    },
    // 监听拖进图片
    dropEvent (e) {
      e.preventDefault()
      this.fromDrag = true
      this.fromDragImg = e.dataTransfer.files[0]
      if (this.fromDragImg.type.indexOf('image/') === 0) {
        this.uploadSuccess()
      } else {
        alert('请上传正确的图片!!!')
      }
    },
    mousedownEvent (e) {
      // 滑块 鼠标按下时
      if (e.target === this.slideBlock && this.isHaveImg && this.isOnlyOne) {
        this.isOnlyOne = false
        this.isSlideMousedown = true
        this.mouseX = e.clientX
      }
      // canvas 鼠标按下时
      if (e.target === this.theCanvas && this.isHaveImg && this.isOnlyOne) {
        this.isOnlyOne = false
        this.isMousedown = true
        this.mouseX = e.clientX
        this.mouseY = e.clientY
      }
    },
    clickEvent (e) {
      // 监听点击滑线的位置
      if (e.target === this.slideLine && this.isHaveImg) {
        let useMinLeft = this.theImg.width
        let useMinTop = this.theImg.height
        let theDistance = e.offsetX - this.slideFirstX
        this.slideFirstX = e.offsetX
        this.slideBlock.style.left = e.offsetX + 'px'
        this.theImg.width = this.firstImgWidth += theDistance
        this.theImg.height = this.theImg.width / this.imgWH
        if (Math.min(this.theImg.width, this.theImg.height) > 400) {
          this.imgMoveLeft = this.imgMoveX -= theDistance / 2 // 同步图片起始位置
          this.imgMoveTop = this.imgMoveY -= theDistance / 2 / this.imgWH
        } else {
          if (this.imgWH > 1) {
            this.imgMoveTop = this.imgMoveY -= (400 - useMinTop) / 2
            this.imgMoveLeft = this.imgMoveX -= (400 - useMinTop) / 2 * this.imgWH
            this.theImg.height = this.firstImgHeight = 400
            this.theImg.width = this.firstImgWidth = 400 * this.imgWH
          } else {
            this.imgMoveLeft = this.imgMoveX -= (400 - useMinLeft) / 2
            this.imgMoveTop = this.imgMoveY -= (400 - useMinLeft) / 2 / this.imgWH
            this.theImg.width = this.firstImgWidth = 400
            this.theImg.height = this.firstImgHeight = 400 / this.imgWH
          }
        }
        this.redrawImage()
      }
    },
    // 监听鼠标的移动
    mousemoveEvent (e) {
      // 监听图片的移动
      if (this.isMousedown) {
        this.imgMoveLeft = this.imgMoveX + (e.clientX - this.mouseX) * 2
        this.imgMoveTop = this.imgMoveY + (e.clientY - this.mouseY) * 2
        // 拖动时的边界问题
        if (this.imgMoveLeft < -this.theImg.width) {
          this.imgMoveLeft = -this.theImg.width
        }
        if (this.imgMoveLeft > this.canvasWidth) {
          this.imgMoveLeft = this.canvasWidth
        }
        if (this.imgMoveTop < -this.theImg.height) {
          this.imgMoveTop = -this.theImg.height
        }
        if (this.imgMoveTop > this.canvasHeight) {
          this.imgMoveTop = this.canvasHeight
        }
        this.redrawImage()
      }
      // 监听滑块的移动
      if (this.isSlideMousedown) {
        // 监听鼠标的横坐标位移
        let slideMoveX = e.clientX - this.mouseX
        this.slideFinalX = this.slideFirstX + slideMoveX
        if (this.slideFinalX < 0) {
          this.slideFinalX = 0
        }
        if (this.slideFinalX > this.lineBlockWidth) {
          this.slideFinalX = this.lineBlockWidth
        }
        this.slideBlock.style.left = this.slideFinalX + 'px'
        this.theImg.width = this.firstImgWidth + slideMoveX
        this.theImg.height = this.theImg.width / this.imgWH
        if (Math.min(this.theImg.width, this.theImg.height) < 400) {
          if (this.imgWH >= 1) {
            this.theImg.height = 400
            this.firstImgWidth = this.theImg.width = 400 * this.imgWH
            this.imgMoveX = this.imgMoveLeft = this.imgCenterX - this.theImg.width / 2
            this.imgMoveY = this.imgMoveTop = this.imgCenterY - 200
          } else {
            this.firstImgWidth = this.theImg.width = 400
            this.theImg.height = 400 / this.imgWH
            this.imgMoveX = this.imgMoveLeft = this.imgCenterX - 200
            this.imgMoveY = this.imgMoveTop = this.imgCenterY - this.theImg.height / 2
          }
        } else {
          this.imgMoveLeft = this.imgMoveX - slideMoveX / 2 // 同步图片起始位置
          this.imgMoveTop = this.imgMoveY - slideMoveX / 2 / this.imgWH
        }
        this.redrawImage()
      }
    },
    // 监听鼠标抬起
    mouseupEvent (e) {
      if (this.isHaveImg) {
        // canvas 鼠标抬起时记录值
        if (this.isMousedown) {
          this.isOnlyOne = true
          this.isMousedown = false
          this.imgCenterX = this.imgMoveLeft + this.theImg.width / 2
          this.imgCenterY = this.imgMoveTop + this.theImg.height / 2
        }
        // 滑块鼠标抬起时记录值
        if (this.isSlideMousedown) {
          this.isOnlyOne = true
          this.isSlideMousedown = false
          this.slideFirstX = this.slideFinalX
          this.firstImgWidth = this.theImg.width
          this.firstImgHeight = this.theImg.height
        }
        this.imgMoveX = this.imgMoveLeft
        this.imgMoveY = this.imgMoveTop
      }
    },
    // 监听滚轮滚动
    mousewheelEvent (e) {
      if (this.isMoveInCanvas && this.isOnlyOne) {
        e = e || window.event
        e.preventDefault()
        this.theImg.width += e.wheelDelta / 10
        this.theImg.height = this.theImg.width / this.imgWH
        // 图片缩放最小宽高
        if (Math.min(this.theImg.width, this.theImg.height) > 400 || e.wheelDelta > 0) {
          this.imgMoveX = this.imgMoveLeft -= e.wheelDelta / 20 // 同步图片起始位置
          this.imgMoveY = this.imgMoveTop -= e.wheelDelta / 20 / this.imgWH
          this.firstImgWidth = this.theImg.width // 同步滑块的起始图片宽度
        } else {
          if (this.imgWH >= 1) {
            this.theImg.height = 400
            this.firstImgWidth = this.theImg.width = 400 * this.imgWH
            this.imgMoveX = this.imgMoveLeft = this.imgCenterX - this.theImg.width / 2
            this.imgMoveY = this.imgMoveTop = this.imgCenterY - 200
          } else {
            this.firstImgWidth = this.theImg.width = 400
            this.theImg.height = 400 / this.imgWH
            this.imgMoveX = this.imgMoveLeft = this.imgCenterX - 200
            this.imgMoveY = this.imgMoveTop = this.imgCenterY - this.theImg.height / 2
          }
        }
        this.redrawImage()
      }
    },
    // 兼容火狐监听滚轮滚动
    DOMMouseScrollEvent (e) {
      if (this.isMoveInCanvas && this.isOnlyOne) {
        e = e || window.event
        e.preventDefault()
        this.theImg.width -= e.detail * 4
        this.theImg.height = this.theImg.width / this.imgWH
        if (Math.min(this.theImg.width, this.theImg.height) >= 400 || e.detail < 0) {
          this.imgMoveX = this.imgMoveLeft += e.detail * 2 // 同步图片起始位置
          this.imgMoveY = this.imgMoveTop += e.detail * 2 / this.imgWH
          this.firstImgWidth = this.theImg.width // 同步滑块的起始图片宽度
        } else {
          if (this.imgWH >= 1) {
            this.theImg.height = 400
            this.firstImgWidth = this.theImg.width = 400 * this.imgWH
            this.imgMoveX = this.imgMoveLeft = this.imgCenterX - this.theImg.width / 2
            this.imgMoveY = this.imgMoveTop = this.imgCenterY - 200
          } else {
            this.firstImgWidth = this.theImg.width = 400
            this.theImg.height = 400 / this.imgWH
            this.imgMoveX = this.imgMoveLeft = this.imgCenterX - 200
            this.imgMoveY = this.imgMoveTop = this.imgCenterY - this.theImg.height / 2
          }
        }
        this.redrawImage()
      }
    },
    // 关闭这个页面
    closeCutBoard () {
      document.getElementsByClassName('cut-board')[0].style.display = 'none'
      document.getElementsByClassName('shade-floor')[0].style.display = 'none'
    },
    // 提交剪切好的图片
    upClipImg () {
      let dataURL = this.rightCanvas.toDataURL('image/jpeg', 0.95)
      let postImg = new FormData()
      postImg.append('img', dataURL)
      if (document.cookie === 'code=32038glj') {
        axios.post('node/head', postImg, {
          timeout: 5000
        })
          .then((response) => {
            if (response.data === 1) {
              document.getElementsByClassName('cut-board')[0].style.display = 'none'
              document.getElementsByClassName('shade-floor')[0].style.display = 'none'
              window.location.href = 'https://gljblog.com/#/myself'
            } else {
              alert('修改失败')
            }
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        document.getElementsByClassName('cut-board')[0].style.display = 'none'
        document.getElementsByClassName('shade-floor')[0].style.display = 'block'
        document.getElementsByClassName('drag-container')[0].style.display = 'block'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cut-board {
  display: none;
  position: fixed;
  width: 52em;
  height: 26em;
  z-index: 200;
  border-radius: 10px;
  overflow: hidden;
  background: #fff;
  user-select: none; // 很重要,否则会出现拖动bug
  .left-cut-board {
    float: left;
    width: 30em;
    height: 25em;
    margin: 1em 0 1em 1em;
    .img-board {
      width: 100%;
      height: 80%;
      canvas#canvas-clip {
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
    }
    .img-option {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 20%;
      .upload-button {
        width: 5em;
        height: 2.5em;
        overflow: hidden;
        span.upload-img {
          display: block;
          width: 100%;
          height: 100%;
          line-height: 2.5;
          text-align: center;
          cursor: pointer;
          border-radius: 5px;
          border: 1px solid #ddd;
          transition: background 0.3s;
        }
      }
      .control-size {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 18em;
        height: 2.5em;
        .slide-line {
          position: relative;
          width: 14.5em;
          height: 2px;
          cursor: pointer;
          background: #999;
          .slide-block {
            position: absolute;
            width: 0.5em;
            height: 1em;
            top: -0.5em;
            background: #999;
          }
        }
        span {
          font-size: 1.6em;
          color: #999;
        }
      }
    }
  }
  .right-show-board {
    float: right;
    display: flex;
    flex-flow: column wrap;
    justify-content: space-between;
    width: 20em;
    height: 100%;
    .close-cut-board {
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
    .show-board {
      display: flex;
      justify-content: center;
      width: 100%;
      height: 12em;
      canvas#right-canvas {
        border-radius: 50%;
        width: 200px;
        height: 200px;
        box-shadow: 0 0 15px #ddd;
      }
    }
    .submit-button {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 100%;
      height: 20%;
      padding: 0 1em;
      width: 100%;
      height: 5em;
      span.submit-img {
        width: 5em;
        height: 2.5em;
        line-height: 2.5;
        text-align: center;
        cursor: pointer;
        border-radius: 5px;
        border: 1px solid #ddd;
        transition: background 0.3s;
      }
    }
  }
  span.upload-img:hover, span.submit-img:hover {
    background: #eee;
  }
}
</style>
