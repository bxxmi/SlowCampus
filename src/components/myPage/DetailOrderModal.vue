<template>
  <div class="modal-area">
    <div
      class="overlay"
      @click="$emit('close-modal')"></div>
    <div class="modal-card">
      <slot></slot>
      <div
        class="close-btn"
        @click="$emit('close-modal')">
        <i class="fas fa-times"></i>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal-area {
  width: 100%;
  height: 100vh;
  position: fixed;
  .overlay {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  opacity: 0.3;
  background-color: black;
  }
}

.modal-card {
  width: 600px;
  height: 500px;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  position: fixed;
  z-index: 1;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  position: relative;
  .close-btn {
  width: 30px;
  height: 30px;
  background-color: #ededed;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 25px;
  right: 30px;
  border-radius: 5px;
  cursor: pointer;
  .fa-times {
    color:#999ba6;
  }
}
}
</style>
