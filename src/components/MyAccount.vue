<template>
  <div>
    <Check>계좌확인</Check>
    <Add>계좌추가</Add>
    <Close>계좌해지</Close>
  </div>
</template>

<script>
import Close from '~/components/accountSelectors/Close'
import Check from '~/components/accountSelectors/Check'
import Add from '~/components/accountSelectors/Add'

export default {
  components: {
    Close,
    Check,
    Add
  },
}
</script>

<style lang="scss" scoped>
div {
  display: flex;
  flex-direction: column;
}
</style>
