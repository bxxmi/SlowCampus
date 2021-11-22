<template>
  <div class="sales-area">
    <h1>상품 판매 내역입니다.</h1>
  </div>
  <SoldList />
</template>

<script>
import SoldList from '~/components/admin/SoldList'

export default {
  components: {
    SoldList
  }
}
</script>

