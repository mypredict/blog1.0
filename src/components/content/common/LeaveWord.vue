<template lang="pug">
  div.leave-word
    textarea.leave-word-board(placeholder="留下你的意见...")
    div.submit-leave-word
      span.insert-link 链接
      span.submit-word 提交
</template>

<script type="text/javascript">
export default {
  name: 'LeaveWord'
}
</script>

<style lang="scss" scoped>
.leave-word {
  width: 100%;
  min-height: 10em;
  height: 100%;
  textarea.leave-word-board {
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
  .submit-leave-word {
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
