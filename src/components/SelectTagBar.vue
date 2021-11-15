<template>
  <div class="tag-area">
    <ul class="tag-list">
      <li
        class="tag-item">
        👀 ALL
      </li>
      <li class="tag-item">
        👀 ALL
      </li>
      <li class="tag-item">
        👀 ALL
      </li>
      <li class="tag-item">
        👀 ALL
      </li>
      <li class="tag-item">
        👀 ALL
      </li>
      <li class="tag-item">
        👀 ALL
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clicked: true
    }
  }
}
</script>

<style lang="scss" scoped>
.tag-area {
  width: 100%;
  height: 70px;
  background-color: skyblue;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  .tag-list {
    border: 1px solid red;
    display: flex;
    .tag-item {
      border: 2px solid #ededed;
      padding: 8px 15px;
      margin-right: 10px;
      text-align: center;
      background-color: white;
      border-radius: 50px;
    }
  }
}
</style>
