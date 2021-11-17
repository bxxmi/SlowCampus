<template>
  <div
    v-show="cart"
    class="shadow">
    <div class="cart-modal">
      <p class="modal-description">
        <span class="title">ADD TO CART</span> <br />
        장바구니 담기완료!<br />
        지금 장바구니를 확인하시겠어요?
      </p>
      <button
        type="button"
        aria-label="닫기"
        class="close-btn btn"
        @click="close">
        X
      </button>
      <div class="btn-group">
        <RouterLink
          class="go-cart-btn btn"
          to="/cart">
          장바구니 이동
        </RouterLink>
        <button
          type="button"
          class="go-main-btn btn"
          @click="close">
          쇼핑계속하기
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        cart: {
            type: Boolean,
            defalut: false
        },
        incart: {
            type: Boolean,
            defalut: false
        },
    },
    data() {
        return {
            cartProps: false 
        }
    },
    methods: {
        close() {
            this.$emit('close')
        }
    }
}
</script>

<style lang="scss" scoped>
.btn {
    outline: none;
    border: 0;
    font-size: 14px;
    text-decoration: none;
    cursor: pointer;
    border-radius: 4px;
}

.go-main-btn {
    width: 130px;
    height: 36px;
    background-color: #0d6efd;
    color: #fff;
    
    &:hover {
        opacity: .7;
    }
}

.close-btn {
    position: absolute;
    top: 0;
    right: 0;
    padding: 15px;
    background-color: transparent;
    color: #000;
}

.go-cart-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 130px;
    height: 36px;
    background: rgb(230, 230, 230);
    color: #000;
    
    &:hover {
        opacity: .7;
    }
}

.shadow {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,.5);
    z-index: 10;

    .cart-modal {
        position: absolute;
        top: 50%;
        left: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        transform:translate(-50%,-50%);
        width: 30%;
        height: 200px;
        background-color: #fff;
        z-index: 20;
        border-radius: 10px;

        .modal-description {
            text-align: center;
            margin-bottom: 20px;
        }       
    }
}

.btn-group {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    > * {
        margin-right: 10px;

        &:last-child {
            margin-right: 0;
        }
    }
}

.title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 5px;
}
</style>
