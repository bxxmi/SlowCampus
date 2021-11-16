<template>
  <div class="modal-area">
    <div
      class="overlay"
      @click="$emit('close-modal')"></div>
    <div class="modal-card">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal-area {
  width: 100%;
  height: 100%;
  position: fixed;
  .overlay {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  }
}

.overlay {
  opacity: 0.3;
  background-color: black;
}

.modal-card {
  position: relative;
  width: 800px;
  height: 400px;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  z-index: 1;
}
</style>
